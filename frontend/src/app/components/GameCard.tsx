import React from 'react'
import {gameData} from "@/app/games/GameResult";

export type GameCardProps = {
    gameCardInfo: gameData;
}

export function GameCard(props: GameCardProps) {
    let {gameCardInfo:{gameName, gameImageUrl, gameGenre, gameReleased, gameMaxPlayers, gameDescription, gameRanking}} = props;

    return (
        <>
            <div className={"bg-mint border-2 border-charcoal p-6 rounded-lg"}>
                <div>
                    <div className="bg-gameListBlue p-4">
                        <div>
                            {gameImageUrl}
                        </div>
                        <h1 className={"text-[1.5rem]"}>{gameName}</h1>
                        <p>Game Description</p>
                        <p>{gameDescription}</p>
                        <p>Max Players</p>
                        <p>{gameMaxPlayers}</p>
                        <p>{}</p>
                     </div>
                 </div>
            </div>
        </>
    )
}