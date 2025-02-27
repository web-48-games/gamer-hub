export type Player = {
    name: string,
    avatarUrl: string,
    gamesPlayed: number,
    createdAt: string,
    gamesLiked: number,
}

export function PlayerCard(props: Player) {
    let {name, avatarUrl, gamesPlayed, createdAt, gamesLiked} = props
    return (
        <>
            <div
                className="w-full md:max-w-xl bg-blue-300 border border-slate-300 rounded-lg shadow-md dark:text-white dark:bg-gray-700 dark:border-gray-500 p-8">
                <div className="p-4 pt-4 bg-sky-50 border border-gray-400 shadow-sm rounded-lg w-full">
                    <div className="flex">
                        {/* Left side - Profile info */}
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                 src={avatarUrl} alt="Placeholder Image"/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Badges?</span>
                        </div>

                        {/* Right side - Stats (stacked vertically) */}
                        <div className="flex flex-col ml-6 justify-center">
                            <p className="mb-2">
                                Played {gamesPlayed} games
                            </p>
                            <p className="mb-2">
                                Liked {gamesLiked} games
                            </p>
                            <p>
                                A Game Away member since: {createdAt}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}