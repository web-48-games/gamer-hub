'use server'

import {CreateMeetup} from "@/app/create-meetup/[gameId]/CreateMeetup";
import {PageProps} from "@/utils/interfaces/NextComponent";
import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {getSession} from "@/utils/auth.utils";
import {redirect} from "next/navigation";


export default async function (props: PageProps<{gameId: string}>) {

    const {gameId} = props.params
    const session = await getSession()

    const game = await fetchGameByGameId(gameId)

    if(!session) {
        return <>
        Unable to create meetup, you are not signed in
        </>
    }

    if(game === null) {
        return <>
        Game does not exist
        </>
    }

    return (
        <>
            <CreateMeetup gameId={gameId} profileId={session.profile.profileId} />
        </>
    )
}