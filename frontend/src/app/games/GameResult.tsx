
export type GameData = {
    gameName: string
    gameImageUrl: string
    gameGenre: string
    gameReleased: string
    gameMaxPlayers: number
    gameDescription: string
    gameRanking: number
}

type GameResultProps = {
    gameData: GameData
}

export function GameResult(props: GameResultProps) {
    let {gameData} = props
    let {gameName, gameImageUrl, gameGenre, gameReleased, gameMaxPlayers, gameDescription, gameRanking} = gameData

    return (
        <>
            <div className={"flex p-4 my-4 w-full h-auto bg-green-200 rounded-lg"}>
                <img className={"w-1/3 max-w-40"} src={gameImageUrl} alt= "depicting {gameImageUrl}"/>
                <section className={"w-2/3 p-2 m-2"}>
                    <h2 className={"font-bold text-2xl mb-4"}>{gameName}</h2>
                    <p>Genre: {gameGenre}</p>
                    <p>Released on: {gameReleased}</p>
                </section>
            </div>
        </>
    )
}