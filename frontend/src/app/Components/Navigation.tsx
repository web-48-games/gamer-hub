
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import {Searchbar} from "@/app/Components/Searchbar";

export function Navigation() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="https://flowbite-react.com" className={"order-1"}>
                <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">A Game Away</span>
            </NavbarBrand>
            <div className="flex order-2 md:order-3 ml-4">
                <Button>Login/Sign Up</Button>
                <NavbarToggle />
            </div>
            <NavbarCollapse className={"order-4 md:order-2 mx-auto"}>
                <Searchbar/>
                <NavbarLink className={"mt-3"} href="#">Home</NavbarLink>
                <NavbarLink className={"mt-3"} href="#">Games</NavbarLink>
                <NavbarLink className={"mt-3"} href="#">Sessions</NavbarLink>
                <NavbarLink className={"mt-3"} href="#">Profile Page</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
