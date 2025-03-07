import React from 'react'

export type Game = {
    name: string,
    description: string,
    genre: string,
    maxPlayers: number,
    imageURL: string,
    yearPublished: number,
}

type GameCardProps = {
    game: Game
}

export function GameCard(props: GameCardProps) {
    let {game:{name, description, genre, maxPlayers, imageURL, yearPublished}} = props;

    return (
        <>
            <div className={"bg-mint p-6 rounded-lg"}>
                <div>
                  <h1 className={"text-charcoal"}>{name}</h1>
                </div>
            </div>
        </>
    )
}