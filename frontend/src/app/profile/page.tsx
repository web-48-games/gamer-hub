import {PlayerCard} from "@/app/Components/PlayerCard";
import {Player} from "@/app/Components/PlayerCard"


export default function () {
    let playerInfo : Player = {
        name: 'Rock Howard',
        avatarUrl: '/window.svg',
        gamesPlayed: 27,
        createdAt: '4/21/2018',
        gamesLiked: 15

    }

    return (
        <>
            <div className="container flex justify-center">
                <PlayerCard player = {playerInfo}/>
            </div>
        </>
    )
}