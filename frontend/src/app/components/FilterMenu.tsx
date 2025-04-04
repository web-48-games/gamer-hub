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
                {isOpen ? <IconX size={24} /> : <IconFilter size={24} />}
            </button>

            {/* Slides in on mobile, sticky on desktop*/}
            <section className={`rounded-lg fixed p-4 md:sticky left-0 top-0 md:top-24 md:m-6 h-screen md:h-auto transition-all duration-300 z-10 bg-cosa-400
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            w-64 md:w-auto overflow-y-auto`}>
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
                    {/*<h3 className={"text-lg font-semibold p-1"}>Players</h3>*/}
                    {/*<Checkbox labelText={"1-2"}/>*/}
                    {/*<Checkbox labelText={"3-4"}/>*/}
                    {/*<Checkbox labelText={"5+"}/>*/}
                    {/*<h3 className={"text-lg font-semibold p-1"}>Game Duration</h3>*/}
                    {/*<Checkbox labelText={"< 30min."}/>*/}
                    {/*<Checkbox labelText={"1-3 hrs."}/>*/}
                    {/*<Checkbox labelText={"4+ hrs."}/>*/}
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