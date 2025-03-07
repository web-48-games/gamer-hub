// import {Categories} from "@/app/games/categories";
import {Carousel} from "@/app/games/carousel";
import React from "react";
import {GameResult, gameData} from "@/app/games/GameResult";
import {FilterMenu} from "@/app/components/FilterMenu";
import {GameCard} from "@/app/components/GameCard";

export default function () {
    let gameInfo: gameData = {
        gameName: "Wingspan",
        gameImageUrl: "/wingspan_sample.webp",
        gameGenre: "Strategy",
        gameReleased: "2019",
        gameMaxPlayers: 4,
        gameDescription: "Friendly but competitive game about interesting and beautiful winged creatures in the great outdoors.",
        gameRanking: 34
    }
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
                        button: "ThisDoesntWork",
                        src: "/globe.svg"
                    },
                    {
                        title: "Goodbye Cruel World!",
                        button: "Dontmindme",
                        src: "/vercel.svg"
                    }]}/>
            </section>
            <hr className="border-b border-gray-300 border-2"/>
            <section className="mx-auto container relative">
                <div className={"flex"}>
                    <div className="w-64 shrink-0 hidden md:block">
                        <FilterMenu/>
                    </div>
                    <div className={"w-full md:ml-4"}>
                        <GameResult gameData={gameInfo}/>
                        <GameResult gameData={gameInfo}/>
                        <GameResult gameData={gameInfo}/>
                        <GameResult gameData={gameInfo}/>
                    </div>
                </div>
                {/* Mobile filter is rendered outside the flex container
       so it can be positioned fixed without interference */}
                <div className="md:hidden">
                    <FilterMenu />
                </div>
                <section>
                <GameCard gameCardInfo={gameInfo}/>
                </section>
            </section>
        </>
    )
}