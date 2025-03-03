import {TitleComponent} from "@/app/components/login-signup/TitleComponent";
import {ActionButton} from "@/app/components/login-signup/ActionButton";
import {ToggleLink} from "@/app/components/login-signup/ToggleLink";
import {InputField} from "@/app/components/login-signup/InputField";
import {ModalContainer} from "@/app/components/login-signup/ModalContainer";
import React from "react";

type SignupProps = {
    toggleFunction: () => void
    closeModal: () => void
}

export function Signup({toggleFunction, closeModal}: SignupProps) {
    return (
        <>
            <ModalContainer onClose={closeModal}>
                <TitleComponent mode="Sign-up!" />

                <form className="space-y-4 mt-4">
                    <InputField inputProps={{
                        name: "username",
                        type: "text",
                        id: "username",
                        labelText: "Username:"
                    }} />

                    <InputField inputProps={{
                        name: "email",
                        type: "email",
                        id: "email",
                        labelText: "Email:"
                    }} />

                    <InputField inputProps={{
                        name: "password",
                        type: "password",
                        id: "password",
                        labelText: "Create a Password:"
                    }} />

                    <div className="mt-4">
                        <ToggleLink mode="signup" toggleFunction={toggleFunction} />
                    </div>

                    <div className="mt-4">
                        <ActionButton buttonText="Sign Up" />
                    </div>
                </form>
            </ModalContainer>
        </>
    )
}