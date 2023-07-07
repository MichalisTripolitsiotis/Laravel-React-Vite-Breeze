import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
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
                    <InputLabel htmlFor="code" value="Code" />

                    <TextInput
                        id="code"
                        type="number"
                        name="code"
                        pattern="[0-9]*"
                        value={data.code}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('code', e.target.value)}
                    />

                    <InputError message={errors} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Verify code
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
};

