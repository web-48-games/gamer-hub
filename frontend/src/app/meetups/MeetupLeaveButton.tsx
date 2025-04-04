'use client'
import { useRouter } from "next/navigation";
import {Session} from "@/utils/auth.utils";
import {deleteRsvp} from "@/utils/models/rsvp/rsvp.action";
import React from "react";
import {Profile} from "@/utils/models/profile/profile.model";


type MeetupLeaveButtonProps = {
    meetupId: string
    sessionProfile?: Profile
}

export function MeetupLeaveButton(props: MeetupLeaveButtonProps) {
    const router = useRouter()
    const {meetupId, sessionProfile} = props

    if (!meetupId) {
        return <></>
    }

    if (!sessionProfile) {
        return <></>
    }

    const rsvp = {
        rsvpMeetupId: meetupId,
        rsvpProfileId: sessionProfile.profileId,
        rsvpAt: null
    }

    async function fireServerAction() {
        try {
            const response = await deleteRsvp(rsvp.rsvpMeetupId)
            if (response.status === 200) {
                router.refresh()
            }
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <>
            <button className={"px-3 py-2 mr-2 bg-pink-100 hover:bg-pink-200 text-pink-800 text-sm font-medium rounded-md transition-colors"}
                    onClick={fireServerAction}>
                Leave
            </button>
        </>
    )
}
