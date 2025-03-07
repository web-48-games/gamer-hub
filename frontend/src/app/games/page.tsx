// import {Categories} from "@/app/games/categories";
import {Carousel} from "@/app/games/carousel";
import React from "react";
import {GameResult, gameData} from "@/app/games/GameResult";
import {FilterMenu} from "@/app/components/FilterMenu";


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
            <section className="mx-auto container">
                <div className={"flex flex-col md:flex-row"}>
                    <div className="md:w-1/4 lg:w-1/5">
                        <FilterMenu/>
                    </div>
                    <div className={"w-full md:w-3/4 lg:w-4/5"}>
                        <GameResult gameData={gameInfo}/>
                        <GameResult gameData={gameInfo}/>
                        <GameResult gameData={gameInfo}/>
                        <GameResult gameData={gameInfo}/>
                    </div>
                </div>

            </section>
        </>
    )
}