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
                className="w-full max-w-sm bg-sky-100 border border-slate-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 pt-4">
                    <div className="flex">
                        {/* Left side - Profile info */}
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                 src={avatarUrl} alt="Placeholder Image"/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Player Role</span>
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