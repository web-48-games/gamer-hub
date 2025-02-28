import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {Login} from '@/app/Components/login-signup/Login'
import {Signup} from '@/app/Components/login-signup/Signup'

export const AuthModalContainer = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('signup');

    const openSignupModal = () => {
        setIsOpen(true);
        setModalType('signup');
    }

    const openLoginModal = () => {
        setIsOpen(true);
        setModalType('login');
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const toggleModalType = () => {
        setModalType(modalType === 'signup' ? 'login' : 'signup')
    }

    // expose methods to parent components using ref
    useImperativeHandle(ref, () => ({
       openSignupModal,
       openLoginModal,
       closeModal
    }))

    return (
        <>
            {isOpen && (
                modalType === 'signup'
                    ? <Signup toggleFunction={toggleModalType} closeModal={closeModal}/>
                    : <Login toggleFunction={toggleModalType} closeModal={closeModal}/>
            )}
        </>
    )
})