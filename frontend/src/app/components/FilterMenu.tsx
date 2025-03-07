"use client"

import {Checkbox} from "@/app/components/Checkbox";
import { useState } from "react";
import { IconFilter, IconX } from "@tabler/icons-react";

export function FilterMenu() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            {/* Mobile Toggle Button - mobile view only */}
            <button
                className="fixed z-20 bottom-4 left-4 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <IconX size={24} /> : <IconFilter size={24} />}
            </button>

            {/*smooth transitions*/}
            <section className={`bg-amber-50 border-2 border-solid border-black rounded fixed p-4 md:sticky left-0 top-0 md:top-24 md:m-6 h-screen md:h-auto transition-all duration-300 z-10
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            w-64 md:w-auto overflow-y-auto`}>
                <h2 className={"text-2xl font-bold p-1 my-1"}>Filter</h2>
                <h3 className={"text-lg font-semibold p-1"}>Genres</h3>
                <Checkbox labelText={"Real-Time"}/>
                <Checkbox labelText={"Deck-Builder"}/>
                <Checkbox labelText={"Storytelling"}/>
                <h3 className={"text-lg font-semibold p-1"}>Players</h3>
                <Checkbox labelText={"1-2"}/>
                <Checkbox labelText={"3-4"}/>
                <Checkbox labelText={"5+"}/>
                <h3 className={"text-lg font-semibold p-1"}>Game Duration</h3>
                <Checkbox labelText={"< 30min."}/>
                <Checkbox labelText={"1-3 hrs."}/>
                <Checkbox labelText={"4+ hrs."}/>
            </section>

            {/* Backdrop for mobile - only appears when filter is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[5] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}