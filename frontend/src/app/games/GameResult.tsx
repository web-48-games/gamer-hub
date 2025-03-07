
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
            <div className={"flex flex-col items-center sm:flex-row p-4 my-4 h-auto bg-green-200 rounded-lg"}>
                <img className={"w-40 h-40 object-cover p-2"} src={gameImageUrl} alt= {`depicting ${gameName}`}/>
                <section className={"flex-grow p-4"}>
                    <h2 className={"font-bold text-2xl mb-4"}>{gameName}</h2>
                    <p>Genre: {gameGenre}</p>
                    <p>Released on: {gameReleased}</p>
                </section>

                <div className="flex items-center p-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap">
                        Find Sessions
                    </button>
                </div>
            </div>
        </>
    )
}