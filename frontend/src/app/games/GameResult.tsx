import {Button} from "flowbite-react";
import {ActionButton} from "@/app/components/login-signup/ActionButton";

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
            <div className={"flex p-4 my-4 h-auto bg-green-200 rounded-lg"}>
                <img className={"max-w-40"} src={gameImageUrl} alt= "depicting {gameImageUrl}"/>
                <section className={"max-w-80 p-2 m-2"}>
                    <h2 className={"font-bold text-2xl mb-4"}>{gameName}</h2>
                    <p>Genre: {gameGenre}</p>
                    <p>Released on: {gameReleased}</p>
                </section>
                <ActionButton buttonText={"Find Sessions"}/>
            </div>
        </>
    )
}