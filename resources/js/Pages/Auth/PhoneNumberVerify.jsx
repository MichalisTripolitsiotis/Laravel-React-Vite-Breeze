import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from '@/Layouts/GuestLayout';

export default function PhoneNumberVerify({ errors, message }) {
    const { data, setData, post, processing } = useForm({
        code: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('verify.phone.verify'), {
            onSuccess: (response) => {
                window.location.href = route('dashboard');
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Phone Verification" />
            <InputLabel value={message} className="mt-2" />
            <form onSubmit={submit}>
                <div>
                    <h2 className="font-bold text-lg mb-4 text-center">Enter the 6-digit code found in your authenticator app</h2>
                    <TextInput
                        id="code"
                        type="number"
                        placeholder="Authentication code"
                        name="code"
                        pattern="[0-9]*"
                        value={data.code}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('code', e.target.value)}
                    />

                    <InputError message={errors} className="mt-2" />
                </div>

                <div className="flex flex-col items-center mt-4">
                    <PrimaryButton className="ml-4 bg-secondary" disabled={processing}>
                        Confirm
                    </PrimaryButton>

                    <Link
                        href="/"
                        className="mt-6 text-secondary font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Use another authentication method
                    </Link>

                    <Link
                        href="/"
                        className="mt-3 text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Need help authenticating?
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
};

