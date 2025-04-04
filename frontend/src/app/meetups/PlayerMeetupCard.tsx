import { Meetup } from "@/utils/models/meetups/meetup.model"
import { Profile } from "@/utils/models/profile/profile.model"
import Image from "next/image";
import {fetchRsvpByRsvpMeetupId} from "@/utils/models/rsvp/rsvp.action";
import React from "react";
import {MeetupLeaveButton} from "@/app/meetups/MeetupLeaveButton";


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
        <div className="flex items-center my-2 rounded-lg bg-code-200 shadow-sm shadow-wasa-500">
            <div className="flex-shrink-0 mr-4">
                {profileAvatarUrl ? (
                    <Image
                        src={profileAvatarUrl}
                        alt={`${profileName}'s avatar`}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                ) : ""}
            </div>

                <div className="flex-grow">
                    <div className="flex items-center">
                        {/* Username with medium font weight */}
                        <span className="ml-4 font-semibold">{profileName}</span>

                        {/* Host badge - only shown if isHost is true */}
                        {isHost && (
                            <span className="ml-2 px-2 py-0.5 bg-code-200 text-blue-800 font-medium rounded-full">
                            [Host]
                        </span>
                        )}
                    </div>
                </div>
                {loggedInProfile?.profileId === profileId && !isHost && (
                    <div className={"ml-auto"}>
                        <MeetupLeaveButton meetupId={meetup.meetupId} sessionProfile={loggedInProfile}/>
                    </div>
                    )}

            </div>
    )
}
