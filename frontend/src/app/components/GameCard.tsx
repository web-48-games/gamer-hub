import React from 'react'
import {Game} from "@/utils/models/game/game.model";

export type GameCardProps = {
    gameCardInfo: Game;
}

export function GameCard(props: GameCardProps) {
    let {gameCardInfo:{gameId, gameDescription, gameGenre, gameImageUrl, gameMaxPlayers, gameName, gameYearPublished}} = props;

    return (
        <>
            <div className={"m-10 sm:m-20 md:max-w-lg p-6 border-2 rounded-lg bg-redBrown"}>
                <div className={"flex flex-col flex-wrap items-center sm:flex-row p-4 bg-sandyYellow"}>
                    <div>
                        <img className={"w-36"} src={gameImageUrl} alt="image from game database"/>
                    </div>
                    <div className={"p-2 bg-white"}>
                        <h1 className={"text-[1.5rem] font-semibold"}>{gameName}</h1>
                        <p className={"font-semibold"}>Game Description</p>
                        <p>{gameDescription}</p>
                        <p className={"font-semibold"}>Genre</p>
                        <p>{gameGenre.map((genre, i) => i === gameGenre.length-1 ? genre : genre + ", ")}</p>
                        <p className={"font-semibold"}>Max Players</p>
                        <p>{gameMaxPlayers}</p>
                        <p className={"font-semibold"}>Published</p>
                        <p>{gameYearPublished}</p>
                        {/*<p className="font-semibold">Game Ranking</p>*/}
                        {/*<p>{gameRanking}</p>*/}
                    </div>
                </div>
            </div>
        </>
    )
}