import {Checkbox} from "@/app/components/Checkbox";

export function FilterMenu() {
    return (
        <>
            <section className="bg-amber-50 border-2 border-solid border-black rounded fixed left-0 top-1/4 p-6 m-6">
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
        </>
    )
}