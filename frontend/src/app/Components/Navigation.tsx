
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {Searchbar} from "@/app/Components/Searchbar";

export function Navigation() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="https://flowbite-react.com">
                <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">A Game Away</span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <Button>Login/Sign Up</Button>
                <NavbarToggle />
            </div>
            <Searchbar/>
            <NavbarCollapse>
                <NavbarLink href="#" active>
                    Home
                </NavbarLink>
                <NavbarLink href="#">Games</NavbarLink>
                <NavbarLink href="#">Sessions</NavbarLink>
                <NavbarLink href="#">Profile Page</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
