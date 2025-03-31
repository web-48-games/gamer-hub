import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Meetup} from "@/utils/models/meetups/meetup.model";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";
import {Game} from "@/utils/models/game/game.model";

export type MeetupCardProps = {
    meetup: Meetup
    game: Game
    // id: string;
    // hostName: string;
    // hostAvatar: string;
    // gameName: string;
    // date: string;
    // time: string;
}

export async function MeetupCard(props: MeetupCardProps) {
    const {meetup, game} = props
    const hostProfile = await fetchProfileByProfileId(meetup.meetupHostProfileId)

    return (
        <div className="flex my-4 rounded-lg overflow-hidden bg-cyan-50 shadow-md">
            <div className="w-24 h-24 bg-paleRed flex items-center justify-center">
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
            <div className="flex-1 p-4 bg-lightYellow">
                <div className="text-lg font-medium">Host: {hostProfile.profileName}</div>
                <div>Game: {game.gameName}</div>
                {/*format date and time*/}
                <div>Join us on {meetup.meetupStartTime.getDate()} @ {meetup.meetupStartTime.getTime()}</div>
                <div className="text-right">
                    <Link href={`/meetups/${meetup.meetupId}`} className="text-lg font-medium text-redBrown">
                        View Session
                    </Link>
                </div>
            </div>
        </div>
    );
}