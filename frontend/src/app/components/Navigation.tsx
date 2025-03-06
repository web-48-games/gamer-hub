"use client"

import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {Searchbar} from "@/app/Components/Searchbar";
import React, { useRef } from 'react'
import { AuthModalContainer } from "@/app/Components/login-signup/AuthModalContainer";

export function Navigation() {
    const authModalRef = useRef<any>(null)

    const handleAuthButtonClick = () => {
        if (authModalRef.current) {
            authModalRef.current.openSignupModal()
        }
    }


    return (
        <Navbar fluid rounded className="bg-sandyBrown">
            <NavbarBrand href="https://flowbite-react.com" className={"order-1"}>
                <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">A Game Away</span>
            </NavbarBrand>
            <div className="flex order-2 md:order-3 ml-4 ">
                <Button onClick={handleAuthButtonClick} className="bg-mint text-charcoal">Login/Sign Up</Button>
                <NavbarToggle />
            </div>
            <NavbarCollapse className={"order-4 md:order-2 mx-auto"}>
                <Searchbar/>
                <NavbarLink className={"mt-3"} href="/">Home</NavbarLink>
                <NavbarLink className={"mt-3"} href="/games">Games</NavbarLink>
                <NavbarLink className={"mt-3"} href="/sessions">Sessions</NavbarLink>
                <NavbarLink className={"mt-3"} href="/profile">Profile Page</NavbarLink>
            </NavbarCollapse>

            <AuthModalContainer ref={authModalRef} />
        </Navbar>
    );
}
