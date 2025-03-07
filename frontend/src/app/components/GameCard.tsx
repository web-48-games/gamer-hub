import React from 'react'
import {gameData} from "@/app/games/GameResult";

export type GameCardProps = {
    gameCardInfo: gameData;
}

export function GameCard(props: GameCardProps) {
    let {gameCardInfo:{gameName, gameImageUrl, gameGenre, gameReleased, gameMaxPlayers, gameDescription, gameRanking}} = props;

    return (
        <>
            <div className={"bg-mint p-6 rounded-lg"}>
                <div>
                  <h1 className={"text-charcoal text-[1.5rem]"}>{gameName}</h1>
                    <p>{gameDescription}</p>
                </div>
                <div>
                    <p>{gameGenre}</p>
                    <p>{gameMaxPlayers}</p>

                </div>
            </div>
        </>
    )
}