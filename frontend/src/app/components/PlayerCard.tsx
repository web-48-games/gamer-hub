export type Player = {
    name: string
    avatarUrl: string
    gamesPlayed: number
    createdAt: string
    gamesLiked: number
    email: string
    aboutMe: string
}

export type PlayerCardProps = {
    player: Player
}

export function PlayerCard(props: PlayerCardProps) {
    let {player:{name, avatarUrl, gamesPlayed, createdAt, gamesLiked, email, aboutMe}} = props
    return (
        <>
            <div
                className="m-20 w-full md:max-w-xl bg-lightYellow border-b-2 border-redBrown shadow-lg shadow-redBrown rounded-lg shadow-md dark:text-white dark:bg-redBrown dark:border-gray-500 p-8">
                <div className="p-4 pt-4 bg-white border border-redBrown shadow-sm rounded-lg w-full">
                    <div className="flex">
                        {/* Left side - Profile info */}
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                 src={avatarUrl} alt="Placeholder Image"/>
                            <h3 className="mb-1 text-xl font-medium text-redBrown dark:text-white">{name}</h3>
                            <span className="text-sm text-redBrown dark:text-gray-400">Created: {createdAt}</span>
                        </div>

                        {/* Right side - Stats (stacked vertically) */}
                        <div className="flex flex-col ml-6 justify-center">
                            <ul>
                                <li className={"p-2 mb-1 list-none text-[1.25rem]"}>Participated in {gamesPlayed} game
                                    sessions
                                </li>
                                <li className={"p-2 mb-1 list-none text-[1.25rem]"}>Liked {gamesLiked} games</li>
                                <li className={"p-2 mb-1 list-none text-[1.25rem]"}>Contact me at: {email}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container mx-auto"}>
                <h3 className={"text-center text-4xl font-semibold p-2"}>About Me:</h3>
                <p className={"p-4 mt-2 mb-8 text-xl"}> {aboutMe}</p>
            </div>
        </>
    )
}