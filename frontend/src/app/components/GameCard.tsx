import React from 'react'
import {gameData} from "@/app/games/GameResult";

export type GameCardProps = {
    gameCardInfo: gameData;
}

export function GameCard(props: GameCardProps) {
    let {gameCardInfo:{gameName, gameImageUrl,gameMaxPlayers, gameDescription, gameRanking}} = props;

    return (
        <>
            <div className={"m-10 sm:m-20 md:max-w-lg bg-blue-100 border-2 border-charcoal p-6 rounded-lg"}>
                <div className={"flex flex-col flex-wrap items-center sm:flex-row p-4 bg-white"}>
                    <div>
                        <img className={"w-full"} src={gameImageUrl} alt="Wingspan Placeholder"/>
                    </div>
                    <div className={"p-2"}>
                        <h1 className={"text-[1.5rem] font-semibold"}>{gameName}</h1>
                        <p className={"font-semibold"}>Game Description</p>
                        <p>{gameDescription}</p>
                        <p className={"font-semibold"}>Max Players</p>
                        <p>{gameMaxPlayers}</p>
                        <p className="font-semibold">Game Ranking</p>
                        <p>{gameRanking}</p>
                    </div>
                </div>
            </div>
        </>
    )
}