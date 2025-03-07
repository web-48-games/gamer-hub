"use client"

import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {Searchbar} from "@/app/components/Searchbar";
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
        <Navbar fluid rounded className="bg-sandyBrown border-b-2 border-b-charcoal">
            <NavbarBrand href="https://flowbite-react.com" className={"order-1"}>
                <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-brownAccent dark:text-white">A Game Away</span>
            </NavbarBrand>
            <div className="flex order-2 md:order-3 ml-4 ">
                <Button onClick={handleAuthButtonClick} className="bg-mint text-charcoal hover:!text-floralWhite">Login/Sign Up</Button>
                <NavbarToggle />
            </div>

            <NavbarCollapse className={"order-4 md:order-2 mx-auto"}>

                <NavbarLink className={"mt-3 text-[1rem] text-brownAccent hover:!text-floralWhite"} href="/">Home</NavbarLink>
                <NavbarLink className={"mt-3 text-[1rem] text-brownAccent hover:!text-floralWhite"} href="/games">Games</NavbarLink>
                <NavbarLink className={"mt-3 text-[1rem] text-brownAccent hover:!text-floralWhite"} href="/sessions">Sessions</NavbarLink>
                <NavbarLink className={"mt-3 text-[1rem] text-brownAccent hover:!text-floralWhite"} href="/profile">Profile Page</NavbarLink>
                <Searchbar/>

            </NavbarCollapse>



            <AuthModalContainer ref={authModalRef} />
        </Navbar>
    );
}
