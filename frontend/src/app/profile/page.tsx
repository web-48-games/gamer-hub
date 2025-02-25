import {kMaxLength} from "node:buffer";

export type Player = {
    name: string
    gamesPlayed: number
    favoriteGame: string
    createdAt: string
}

export default function () {
    let player: Player =
        {
            name: 'Sven Hralfingr',
            gamesPlayed: 100,
            favoriteGame: 'Monopoly',
            createdAt: '5/23/2021'
        }
    return (
        <>
            <p className="bold">Replace this with navbar</p>
            <section className="container">
                <h1 className={"text-3xl font-bold"}>page for {player.name}</h1>

                <h3 className={"text-xl font-bold"}>This will be replaced with player profile card that includes player name, username, their avatar image, and some user stats.</h3>
            </section>

            <p className="bold">Replace this with footer</p>
        </>
    )
}