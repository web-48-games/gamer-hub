export type Player = {
    name: string
    avatarUrl: string
    gamesPlayed: number
    createdAt: string
    gamesLiked: number
}

export function PlayerCard(props:Player) {
    let {name, avatarUrl, gamesPlayed, createdAt, gamesLiked} = props
    return(
        <>
            <h1 className="text-3xl text-center bold">{name}</h1>
            <img src={avatarUrl} alt="avatar image"/>
            <p className={"p-2 text-md"}>A Game Away Player since {createdAt}</p>
            <p className={"p-2 text-md"}>Played {gamesPlayed} games on A Game Away</p>
            <p className={"p-2 text-md"}>Liked {gamesLiked} games</p>
        </>
    )
}