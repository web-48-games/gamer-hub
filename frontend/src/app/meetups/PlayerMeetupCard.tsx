import { Meetup } from "@/utils/models/meetups/meetup.model"
import { Profile } from "@/utils/models/profile/profile.model"
import Image from "next/image";
import {fetchRsvpByRsvpMeetupId} from "@/utils/models/rsvp/rsvp.action";
import React from "react";


type PlayerMeetupCardProps = {
    meetup: Meetup
    profile: Profile
    isHost: boolean
    loggedInProfile?: Profile
}

export async function PlayerMeetupCard(props:PlayerMeetupCardProps){
    const {meetup, profile: {profileAvatarUrl, profileName, profileId}, isHost, loggedInProfile} =props
    console.log(isHost)

    function LeaveMeetup(){
        return
    }

    return (
        <div className="flex my-2 rounded-lg bg-cyan-50 shadow-sm">
            <div className="w-16 h-16 bg-cyan-100 flex">
                {profileAvatarUrl ? (
                    <Image
                        src={profileAvatarUrl}
                        alt={`${profileName}'s avatar`}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                ) : ""}
                <div className="">{profileName} </div>
                {isHost && <div> Host</div>}
                {loggedInProfile?.profileId === profileId && !isHost &&
                <button>
                    Leave Meetup
                </button>}
                {/*button above needs to have functionality - should this be client component and use onClick event handler?*/}
            </div>

        </div>
    )
}
