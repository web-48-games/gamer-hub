import {PlayerCard} from "@/app/components/PlayerCard";
import {Player} from "@/app/components/PlayerCard"


export default function () {
    let playerinfo : Player = {
        name: 'Rock Howard',
        avatarUrl: '/window.svg',
        gamesPlayed: 27,
        createdAt: '4/21/2018',
        gamesLiked: 15

    }

    return (
        <>
            <div className="container flex justify-center">
            <PlayerCard name={playerinfo.name} avatarUrl={playerinfo.avatarUrl} gamesPlayed={playerinfo.gamesPlayed} gamesLiked={playerinfo.gamesLiked} createdAt={playerinfo.createdAt}/>
            </div>
        </>
    )
}