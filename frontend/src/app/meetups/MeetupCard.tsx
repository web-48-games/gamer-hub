import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Meetup} from "@/utils/models/meetups/meetup.model";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";
import {Game} from "@/utils/models/game/game.model";
import {Profile} from "@/utils/models/profile/profile.model";
import {fetchMeetupsByGame} from "@/utils/models/meetups/meetup.action";
import {fetchGameByGameId} from "@/utils/models/game/game.action";

export type MeetupCardProps = {
    meetup: Meetup
    // host: Profile
    // id: string;
    // hostName: string;
    // hostAvatar: string;
    // gameName: string;
    // date: string;
    // time: string;
}

export async function MeetupCard(props: MeetupCardProps) {
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
        <div className="flex my-4 rounded-lg overflow-hidden bg-cyan-50 shadow-md">
            <div className="w-24 h-24 bg-cosa-300 flex items-center justify-center">
                {hostProfile? (
                    <Image
                        src={hostProfile.profileAvatarUrl}
                        alt={`${hostProfile.profileName}'s avatar`}
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                )}
            </div>
            <div className="flex-1 p-4 bg-code-a">
                <div className="text-lg font-medium">Host: {hostProfile.profileName}</div>
                <div>Game: {game?.gameName}</div>
                {/*format date and time*/}
                <div>Join us on {meetup.meetupStartTime.getMonth() + "/" + meetup.meetupStartTime.getDate() + "/" + meetup.meetupStartTime.getFullYear()} @ {timeString}</div>
                <div className="text-right">
                    <Link href={`/meetups/${meetup.meetupId}`} className="text-lg font-medium text-cosa-600">
                        View Meetup
                    </Link>
                </div>
            </div>
        </div>
    );
}