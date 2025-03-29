import React from "react";
import {GameCard} from "@/app/components/GameCard";

export type gameData = {
    gameName: string
    gameImageUrl: string
    gameGenre: string
    gameReleased: string
    gameMaxPlayers: number
    gameDescription: string
    gameRanking: number
}

type gameResultProps = {
    gameData: gameData
}

export function GameResult(props: gameResultProps) {
    let {gameData} = props
    let {gameName, gameImageUrl, gameGenre, gameReleased, gameMaxPlayers, gameDescription, gameRanking} = gameData

    return (
        <>
            <div className={"flex flex-col items-center sm:flex-row p-4 my-4 h-auto bg-lightYellow border-2 border-redBrown rounded-lg relative group max-w-full"}>
                <img className={"w-40 h-40 object-cover p-2"} src={gameImageUrl} alt= {`depicting ${gameName}`}/>
                <section className={"flex-grow p-4"}>
                    <h2 className={"font-bold text-2xl mb-4"}>{gameName}</h2>
                    <p>Genre: {gameGenre}</p>
                    <p>Released on: {gameReleased}</p>
                </section>

                <div className="flex items-center p-4">
                    <button className="bg-turquoise text-black px-4 py-2 rounded border-1 border-redBrown hover:bg-green-600 whitespace-nowrap">
                        Find Sessions
                    </button>
                </div>

                {/*Popup GameCard - uses absolute positioning and group for hover effect with GameResult as its parent*/}
                <div className={"absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-10"}>
                    <GameCard gameCardInfo={gameData} />
                </div>
            </div>
        </>
    )
}