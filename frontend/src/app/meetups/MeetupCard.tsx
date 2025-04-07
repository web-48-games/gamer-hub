import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Meetup} from "@/utils/models/meetups/meetup.model";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";
import {Game} from "@/utils/models/game/game.model";
import {Profile} from "@/utils/models/profile/profile.model";
import {fetchMeetupsByGame} from "@/utils/models/meetups/meetup.action";
import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {unstable_noStore} from "next/cache";

export type MeetupCardProps = {
    meetup: Meetup
}

export async function MeetupCard(props: MeetupCardProps) {
    unstable_noStore()
    const {meetup} = props
    const hostProfile = await fetchProfileByProfileId(meetup.meetupHostProfileId)
    const game = await fetchGameByGameId(meetup.meetupGameId)

    let hourString: string = ''
    if (meetup.meetupStartTime.getHours() < 10) {
        hourString = '0' + String(meetup.meetupStartTime.getHours())
    } else if (meetup.meetupStartTime.getHours() > 12) {
        hourString = String(meetup.meetupStartTime.getHours() - 12)
    } else {
        hourString = String(meetup.meetupStartTime.getHours())
    }

    let minuteString: string = ''
    if (meetup.meetupStartTime.getMinutes() < 10) {
        minuteString += '0' + meetup.meetupStartTime.getMinutes()
    } else {
        minuteString = String(meetup.meetupStartTime.getMinutes())
    }

    // am or pm
    let addonString: string = ''
    if (meetup.meetupStartTime.getHours() < 12) {
        addonString = 'AM'
    } else {
        addonString = 'PM'
    }

    const timeString = `${hourString}:${minuteString} ${addonString}`


    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 my-6">

            <Link href={`/meetups/${meetup.meetupId}`}>
                <div className="flex my-4 bg-cyan-50 shadow-md rounded-lg shadow-wasa-500 ">
                    <div className="w-24 h-24 bg-cosa-300 flex items-center justify-center">
                        {hostProfile ? (
                            <Image
                                src={hostProfile.profileAvatarUrl || ''}
                                alt={`${hostProfile.profileName}'s avatar`}
                                width={80}
                                height={80}
                            />
                        ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        )}
                    </div>
                    <div className="flex-1 p-4 bg-code-a rounded-lg hover:bg-code-500">
                        <div className="text-lg font-medium">Host: {hostProfile.profileName}</div>
                        <div>Game: {game?.gameName}</div>
                        {/*format date and time*/}
                        <div>Join us
                            on {meetup.meetupStartTime.getMonth() + "/" + meetup.meetupStartTime.getDate() + "/" + meetup.meetupStartTime.getFullYear()} @ {timeString}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}