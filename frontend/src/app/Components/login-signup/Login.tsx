import {TitleComponent} from "@/app/components/login-signup/TitleComponent";
import {ActionButton} from "@/app/components/login-signup/ActionButton";
import {ToggleLink} from "@/app/components/login-signup/ToggleLink";
import {InputField} from "@/app/components/login-signup/InputField";
import {ModalContainer} from "@/app/components/login-signup/ModalContainer";
import React from "react";

type LoginProps = {
    toggleFunction: () => void
    closeModal: () => void
}

export function Login({toggleFunction, closeModal}: LoginProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // add more login logic here
    }

    return (
        <>
            <ModalContainer onClose={closeModal}>
                <TitleComponent mode="Welcome!" />

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    <InputField inputProps={{
                        name: "username",
                        type: "text",
                        id: "username",
                        labelText: "Username or Email:"
                    }} />

                    <InputField inputProps={{
                        name: "password",
                        type: "password",
                        id: "password",
                        labelText: "Password:"
                    }} />

                    <div className="mt-4">
                        <ToggleLink mode="login" toggleFunction={toggleFunction} />
                    </div>

                    <div className="mt-4">
                        <ActionButton buttonText="Log In" />
                    </div>
                </form>
            </ModalContainer>
        </>
    )
}