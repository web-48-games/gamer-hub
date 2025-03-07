import {Checkbox} from "@/app/components/Checkbox";

export function FilterMenu() {
    return (
        <>
            <section className="border-3 border-solid border-gray-50 rounded fixed left-0 top-1/4 p-2 m-4">
                <h2>Filter</h2>
                <Checkbox labelText={"Hello World"}/>
                <h3>Genres</h3>
                <h3>Players</h3>
                <h3>Time</h3>
            </section>
        </>
    )
}