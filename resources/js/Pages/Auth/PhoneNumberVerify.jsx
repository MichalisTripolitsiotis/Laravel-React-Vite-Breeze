import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from '@/Layouts/GuestLayout';

export default function PhoneNumberVerify() {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: ''
    });

    const submit = (e) => {
        e.preventDefault();

        console.log(here);
    };

    return (
        <GuestLayout>
            <Head title="Phone Verification" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="code" value="Code" />

                    <TextInput
                        id="code"
                        type="number"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('code', e.target.value)}
                    />

                    <InputError message={errors.code} className="mt-2" />
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

