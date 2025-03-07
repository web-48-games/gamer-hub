// import {Categories} from "@/app/games/categories";
import {Carousel} from "@/app/games/carousel";
import React from "react";
import {GameResult, GameData} from "@/app/games/GameResult";
import {FilterMenu} from "@/app/components/FilterMenu";


export default function () {
    let gameInfo: GameData = {
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
            <section className="container flex">
                <FilterMenu/>
                <div>
                    <GameResult gameData={gameInfo}/>
                    <GameResult gameData={gameInfo}/>
                    <GameResult gameData={gameInfo}/>
                    <GameResult gameData={gameInfo}/>
                </div>
            </section>
        </>
    )
}