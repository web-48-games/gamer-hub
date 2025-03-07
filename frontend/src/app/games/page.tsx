import {Categories} from "@/app/games/categories";
import {Carousel} from "@/app/games/carousel";
import React from "react";
import {FilterMenu} from "@/app/components/FilterMenu";

export default function () {
    return (
        <>
            <section className="container mx-auto p-20">
                {/*<div className={"flex justify-center items-center"}>*/}
                {/*    <Categories />*/}
                {/*</div>*/}
                <Carousel slides={[{
                    title: "HELLO WORLD",
                    button: "CLICK ME",
                    src: "/dice.svg"
                },
                    {
                        title: "I AM A GAME",
                        button: "No Touchie",
                        src: "/globe.svg"
                    },
                    {
                        title: "Goodbye Cruel World!",
                        button: "HI",
                        src: "/vercel.svg"
                    }]}/>
            </section>
            <section className="container flex">
                <FilterMenu />
            </section>
        </>
    )
}