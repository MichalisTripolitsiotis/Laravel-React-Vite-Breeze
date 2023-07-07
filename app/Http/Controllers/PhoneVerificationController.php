<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Twilio\Rest\Client;

class PhoneVerificationController extends Controller
{
    public function index()
    {
        if (Auth::user()->phone_verified) {
            return redirect()->route('dashboard');
        }

        $this->sendCode();

        return Inertia::render('Auth/PhoneNumberVerify', [
            'errors' => session('errors') ?? [],
            'message' => session('message') ?? [],
        ]);
    }

    public function verify(Request $request)
    {
        try {
            $twilio = $this->connect();
            $checkCode = $twilio->verify
                ->v2
                ->services(getenv('TWILIO_VERIFICATION_SID'))
                ->verificationChecks
                ->create([
                    'to' => '+30' . str_replace('-', '', Auth::user()->phone_number),
                    'code' => $request->input('code'),
                ]);

            if ($checkCode->valid === true) {
                User::where('id', Auth::user()->id)
                    ->update([
                        'phone_verified' => $checkCode->valid,
                    ]);
            } else {
                session()->flash('errors', 'Verification failed, Invalid code.');
            }
        } catch (\Exception $e) {
            Log::error("twilio error: " . $e->getMessage());
        }
    }

    /**
     * @return void
     */
    private function sendCode()
    {
        try {
            $twilio = $this->connect();
            $verification = $twilio->verify
                ->v2
                ->services(getenv("TWILIO_VERIFICATION_SID"))
                ->verifications
                ->create("+30" . str_replace('-', '', Auth::user()->phone_number), "sms");

            if ($verification->status === "pending") {
                session()->flash('message', 'OTP sent successfully');
            }
        } catch (\Exception $e) {
            Log::error("twilio error: " . $e->getMessage());
        }
    }

    /**
     * @return Client
     */
    private function connect(): Client
    {
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio = new Client($sid, $token);
        return $twilio;
    }
}
