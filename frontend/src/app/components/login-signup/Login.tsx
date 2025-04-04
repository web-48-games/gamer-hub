import {TitleComponent} from "@/app/Components/login-signup/TitleComponent";
import {ActionButton} from "@/app/Components/login-signup/ActionButton";
import {ToggleLink} from "@/app/Components/login-signup/ToggleLink";
import {InputField} from "@/app/Components/login-signup/InputField";
import {ModalContainer} from "@/app/Components/login-signup/ModalContainer";
import React, {useState} from "react";
import {Status} from "@/utils/interfaces/Status";
import {SignIn, SignInProfileSchema} from "@/utils/models/sign-in/sign-in.model";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {postSignIn} from "@/utils/models/sign-in/sign-in.action";
import {DisplayError} from "@/app/components/display-error";
import {DisplayStatus} from "@/app/components/display-status";
import {useRouter} from "next/navigation";

type LoginProps = {
    toggleFunction: () => void
    closeModal: () => void
}

export function Login({toggleFunction, closeModal}: LoginProps) {
    const [status, setStatus] = useState<Status|null>(null)

    // define my default values
    const defaultValues : SignIn = {
        profileEmail: '',
        profilePassword: ''
    }
    // get access to return values from react hook form and provide validation
    const {register, handleSubmit, reset, formState:{errors}} = useForm<SignIn>({
        resolver: zodResolver(SignInProfileSchema),
        defaultValues,
        mode:'onBlur'
    })

    // register form fields with react hook form
    // create a place to display errors
    // create a place to display status


    // define what happens onSubmit
    const fireServerAction = async (data: SignIn) => {
        try {
            // call to the postSignIn server action
            const response = await postSignIn(data)

            if (response.status === 200) {
                // if status object returned from express is 200 resetForm
                reset()
                //refresh page upon successful login
            }
            // use setStatus to display status from express
            setStatus(response)

        } catch (error) {
            console.error(error)
            // if an error occurs let user know to try later
            setStatus({status: 500, message: 'sign in request failed try again', data:undefined})
        }
    }

    return (
        <>
            <ModalContainer onClose={closeModal}>
                <TitleComponent mode="Challenge Mode" />

                <form className="space-y-4 mt-4" onSubmit={handleSubmit(fireServerAction)}>
                    <InputField inputProps={{
                        name: "profileEmail",
                        type: "text",
                        id: "profileEmail",
                        labelText: "Email:",
                        register: register
                    }} />
                    <DisplayError error={errors?.profileEmail?.message} />

                    <InputField inputProps={{
                        name: "profilePassword",
                        type: "password",
                        id: "profilePassword",
                        labelText: "Password:",
                        register: register
                    }} />
                    <DisplayError error={errors?.profilePassword?.message} />

                    <div className="mt-4">
                        <ToggleLink mode="login" toggleFunction={toggleFunction} />
                    </div>

                    <div className="mt-4">
                        {/* why was this onClick added? ActionButton only take in one prop for buttonText */}
                        <ActionButton buttonText="Log In" />
                    </div>
                    <DisplayStatus status={status} />
                </form>
            </ModalContainer>
        </>
    )
}