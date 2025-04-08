import React from "react";
import {GameCard} from "@/app/components/GameCard";
import {Game} from "@/utils/models/game/game.model";



type gameResultProps = {
    gameData: Game
}

/**
 * Component to display a single game result.
 *
 * @param {gameResultProps} props - The props for the component.
 * @param {Game} props.gameData - The game data to display.
 * @returns {JSX.Element} A JSX element representing the game result.
 */
export function GameResult(props: gameResultProps) {
    let {gameData} = props
    let {gameId, gameDescription, gameGenre, gameImageUrl, gameMaxPlayers, gameName, gameYearPublished} = gameData

    return (
        <>
            <a href={`/games/${gameId}`}>
                <div
                    className={"flex flex-col items-center sm:flex-row p-4 my-4 mx-3 md:mx-auto rounded-lg relative group max-w-full shadow-md shadow-wasa-500 bg-code-a"}>
                    <img className={"w-60 md:w-40 h-40 object-cover p-2"} src={gameImageUrl} alt={`depicting ${gameName}`}/>
                    <section className={"flex-grow p-4"}>
                        <h2 className={"font-bold text-2xl mb-4 text-cosa-600 text-center"}>{gameName}</h2>
                        <p>Genre: {gameGenre.map(genre => genre === gameGenre[gameGenre.length - 1] ? genre : genre + ", ")}</p>
                        <p>Released on: {gameYearPublished}</p>
                    </section>

                </div>
            </a>

        </>
    )
}