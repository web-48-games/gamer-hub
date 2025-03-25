'use client'
import { Modal, ModalBody, ModalHeader} from "flowbite-react";
import React from "react";
import {SignUpForm} from "@/app/sign-in/sign-in-form/sign-up-form-modal/sign-up-form";

export function SignUpFormModal() {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    return (
        <>
            <a className="block cursor-pointer text-blue-500 active:text-purple-500 " onClick={() => {
                setIsModalOpen(true)
            }}>Dont have an account?</a>
            <Modal show={isModalOpen} onClose={() => {
                setIsModalOpen(false)
            }}>
                <ModalHeader>
                    <h2 className="text-3xl font-bold">Create an account.</h2>
                </ModalHeader>
                <ModalBody>

                    <div className="space-y-4">
                        <SignUpForm />
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}