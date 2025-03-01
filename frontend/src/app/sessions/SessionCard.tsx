import React from "react";
import {PlayerCard} from "@/app/Components/PlayerCard";
import {Player} from "@/app/Components/PlayerCard";


type SessionCardProps = {
    player: Player
}

export function SessionCard(props: SessionCardProps) {
    let playerDetails : Player = {
        name: 'Rock Howard',
        avatarUrl: '/window.svg',
        gamesPlayed: 27,
        createdAt: '4/21/2018',
        gamesLiked: 15

    }
    return (
        <>
            <div className="container">
                <PlayerCard player={playerDetails}/>
            </div>
        </>
    )
}