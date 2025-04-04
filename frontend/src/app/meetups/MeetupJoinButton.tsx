'use client'

import React from "react";
import {postRsvp} from "@/utils/models/rsvp/rsvp.action";
import { useRouter } from "next/navigation";
import {Rsvp} from "@/utils/models/rsvp/rsvp.model";
import {Session} from "@/utils/auth.utils";


type MeetupJoinButtonProps = {
    isJoined: boolean
    meetupId: string
    spotsAvailable: boolean
    sessionProfile?: Session
}

export function MeetupJoinButton(props: MeetupJoinButtonProps) {
    const router = useRouter();
    const {isJoined, meetupId, spotsAvailable, sessionProfile} = props;

    if (isJoined) {
        return <></>
    }
    if (!spotsAvailable) {
        return <></>
    }
    if (!sessionProfile) {
        return <></>
    }

    const rsvp = {rsvpMeetupId: meetupId, rsvpProfileId: sessionProfile.profile.profileId, rsvpAt: null}
    async function fireServerAction() {
        try {
            const response = await postRsvp(rsvp)
            if (response.status === 200) {
                router.refresh()
            }
            // setStatus(response)
        } catch (error) {
            // setStatus({
            //     status: 500,
            //     message: 'Meetup cannot be posted, try again',
            //     data: undefined
            // })
            console.log(error)
        }
    }
    return (
        <>
            <button className={"w-full h-12 bg-gh-teal-200 font-semibold text-md text-center my-2 rounded-lg border-2 border-gh-teal-300 hover:border-gh-teal-400 hover:bg-gh-teal-100 hover:shadow-md transition-all duration-200 shadow-sm"} onClick={fireServerAction}>
                JOIN
            </button>
        </>
    )
}