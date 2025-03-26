import {TitleComponent} from "@/app/Components/login-signup/TitleComponent";
import {ActionButton} from "@/app/Components/login-signup/ActionButton";
import {ToggleLink} from "@/app/Components/login-signup/ToggleLink";
import {InputField} from "@/app/Components/login-signup/InputField";
import {ModalContainer} from "@/app/Components/login-signup/ModalContainer";
import React, { useState } from "react";
import { DisplayStatus } from "../display-status";
import { DisplayError } from "../display-error";
import { Status } from "@/utils/interfaces/Status";
import { SignUp } from "@/utils/models/sign-up/sign-up.model";

type SignupProps = {
    toggleFunction: () => void
    closeModal: () => void
}

export function Signup({toggleFunction, closeModal}: SignupProps) {

    const [status, setStatus] = useState<Status | null>(null)

    const defaultValues : SignUp = {
        profileName: '',
        profileEmail: '',
        profilePassword: '',
        profilePasswordConfirm: ''
    }

    return (
        <>
            <ModalContainer onClose={closeModal}>
                <TitleComponent mode="Sign-up!" />

                <form className="space-y-4 mt-4">
                    <InputField inputProps={{
                        name: "profileName",
                        type: "text",
                        id: "profileName",
                        labelText: "Name:",
                        register: register
                    }} />
                    <DisplayError error={errors?.profileName?.message} />

                    <InputField inputProps={{
                        name: "profileEmail",
                        type: "email",
                        id: "profileEmail",
                        labelText: "Email:",
                        register: register
                    }} />
                    <DisplayError error={errors?.profileEmail?.message} />

                    <InputField inputProps={{
                        name: "profilePassword",
                        type: "password",
                        id: "profilePassword",
                        labelText: "Create a Password:",
                        register: register
                    }} />
                    <DisplayError error={errors?.profilePassword?.message} />

                    <InputField inputProps={{
                        name: "profilePasswordConfirm",
                        type: "password",
                        id: "profilePasswordConfirm",
                        labelText: "Confirm Password:",
                        register: register
                    }} />
                    <DisplayError error={errors?.profilePasswordConfirm?.message} />

                    <div className="mt-4">
                        <ToggleLink mode="signup" toggleFunction={toggleFunction} />
                    </div>

                    <div className="mt-4">
                        <ActionButton buttonText="Sign Up" />
                    </div>
                    <DisplayStatus status={status} />
                </form>
            </ModalContainer>
        </>
    )
}