type Player = {
    name: string,
    gamesPlayed: number,
    favoriteGame: string,
    createdAt: string
}

export default function (props: Player) {
    let players: Player[] = [
        {
            name: 'Sven Hralfingr',
            gamesPlayed: 100,
            favoriteGame: 'Monopoly',
            createdAt: '5/23/2021'
        },
        {
            name: 'Joey Wheeler',
            gamesPlayed: 321,
            favoriteGame: 'Settlers of Catan',
            createdAt: '2/16/2008'
        },
        {
            name: 'Zagreus Haas',
            gamesPlayed: 442,
            favoriteGame: 'Ticket to Ride',
            createdAt: '5/23/2021'
        }
    ]
    return (
        <h1 className={"text-3xl font-bold underline"}>This is the Player Profile Page.</h1>

    )
}