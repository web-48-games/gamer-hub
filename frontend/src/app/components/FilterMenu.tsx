"use client"

import {Checkbox} from "@/app/components/Checkbox";
import { useState } from "react";
import {IconChevronDown, IconChevronUp, IconFilter, IconX} from "@tabler/icons-react";

type FilterProps = {
    genres: string[]
}


export function FilterMenu(props: FilterProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [genresExpanded, setGenresExpanded] = useState<boolean>(true)
    const {genres} = props;

    // create a new sorted array using sort and localCompare for alphabetical ordering. map over this instead of just genres
    const sortedGenres = [...genres].sort((a,b) => a.localeCompare(b))

    const toggleGenres = () => {
        setGenresExpanded(!genresExpanded)
    }



    return (
        <>
            {/* Mobile Toggle Button - mobile view only */}
            <button
                className="fixed z-20 bottom-4 left-4 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IconFilter size={24} />
            </button>

            {/* Desktop menu is always visible on md and larger, hidden by default in mobile*/}
            <section className={"hidden md:block w-full mb-20"}>
                <div className="p-4 bg-code-200 shadow-lg shadow-cosa-500 rounded-lg">
                    <h2 className={"text-2xl font-bold p-1 my-1"}>Filter</h2>

                    {/*collapsible Genres*/}
                    <div className="flex items-center justify-between cursor-pointer p-1"
                         onClick={toggleGenres}>
                        <h3 className={"text-lg font-semibold p-1"}>Genres</h3>
                        {genresExpanded ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
                    </div>
                    <div className={`transition-all duration-300 ${genresExpanded ? 'h-full' : 'hidden'}`}>
                        {sortedGenres.map((genre, i) => <Checkbox key={i} value={genre} labelText={genre}/>)}
                    </div>
                </div>
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