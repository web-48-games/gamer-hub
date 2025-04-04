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
                className="fixed z-30 bottom-4 right-4 block sm:block md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg border-4 border-gh-accent-purple"
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

            {/* Mobile Filter Panel */}
            <div className={`fixed inset-x-0 bottom-0 z-20 bg-gh-mesa-200 pb-20 rounded-t-xl shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
                ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>

                {/* Mobile Header with close button */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Filter Games</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-full p-1 hover:bg-gray-100"
                    >
                        <IconX size={24}/>
                    </button>
                </div>

                <div className="p-4 max-h-[70vh] overflow-y-auto">
                    {/* Collapsible Genres - same as in desktop but duplicated here, I know not ideal */}
                    <div className="flex items-center justify-between cursor-pointer p-1"
                         onClick={toggleGenres}>
                        <h3 className="text-lg font-semibold p-1">Genres</h3>
                        {genresExpanded ? <IconChevronUp size={24}/> : <IconChevronDown size={24}/>}
                    </div>
                    <div className={`transition-all duration-300 ${genresExpanded ? 'h-full' : 'hidden'}`}>
                        {sortedGenres.map((genre, i) => <Checkbox key={i} value={genre} labelText={genre}/>)}
                    </div>
                </div>

            </div>
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