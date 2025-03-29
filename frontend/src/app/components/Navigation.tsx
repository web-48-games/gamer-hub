"use client"

import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import React, { useRef } from 'react'
import { AuthModalContainer } from "@/app/components/login-signup/AuthModalContainer";

export function Navigation() {
    const authModalRef = useRef<any>(null)

    const handleAuthButtonClick = () => {
        if (authModalRef.current) {
            authModalRef.current.openSignupModal()
        }
    }


    return (
        <Navbar fluid rounded className="bg-redBrown p-4">
            <NavbarBrand href="/" className={"order-1"}>
                <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-[2rem] font-light text-white">A Game Away</span>
            </NavbarBrand>
            <div className="flex order-2 md:order-3 ml-4 ">
                <Button onClick={handleAuthButtonClick} className="p-2 bg-lightRed text-redBrown">Login/Sign Up</Button>
                <NavbarToggle />
            </div>

            <NavbarCollapse className={"order-4 md:order-2 mx-auto"}>

                <NavbarLink className={"text-[1.75rem] font-light text-white"} href="/">Home</NavbarLink>
                <NavbarLink className={"text-[1.75rem] font-light text-white"} href="/games">Games</NavbarLink>
                <NavbarLink className={"text-[1.75rem] font-light text-white"} href="/meetups">Meetups</NavbarLink>
                <NavbarLink className={"text-[1.75rem] font-light text-white"} href="/profile">Profile Page</NavbarLink>

            </NavbarCollapse>



            <AuthModalContainer ref={authModalRef} />
        </Navbar>
    );
}
