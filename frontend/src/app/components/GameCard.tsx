import React from 'react'
import {Game} from "@/utils/models/game/game.model";

export type GameCardProps = {
    gameCardInfo: Game;
}

export function GameCard(props: GameCardProps) {
    let {gameCardInfo:{gameId, gameDescription, gameGenre, gameImageUrl, gameMaxPlayers, gameName, gameYearPublished}} = props;

    return (
        <>
            <div className={"m-10 sm:m-20 md:max-w-lg p-6 rounded-lg shadow-lg shadow-wasa-500 bg-cosa-400"}>
                <div className={"flex flex-col flex-wrap items-center p-4"}>
                    <div>
                        <img className={"w-full p-4"} src={gameImageUrl} alt="image from game database"/>
                    </div>
                    <div className={"p-4 rounded-lg shadow-lg bg-code-100 shadow-gh-teal-500"}>
                        <h1 className={"text-[1rem] md:text-[1.5rem] xl:text-[2rem] font-semibold"}>{gameName}</h1>
                        <p className={"text-[1rem] md:text-[1.25rem] xl:text-[1.75rem] font-semibold"}>Game Description</p>
                        <p dangerouslySetInnerHTML={{__html: gameDescription}} />
                        <p className={"text-[1rem] md:text-[1.25rem] xl:text-[1.75rem] font-semibold"}>Genre</p>
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