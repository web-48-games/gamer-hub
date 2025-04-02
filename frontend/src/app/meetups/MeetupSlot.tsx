"use client"

import React from 'react';
import Image from 'next/image';
import {fetchRsvpByRsvpMeetupId} from "@/utils/models/rsvp/rsvp.action";

type MeetupSlotProps = {
    isFilled: boolean;
    profileId: string;
    meetupId: string;
    rsvpAt: Date;

}

export function MeetupSlot({ isFilled, profileId, meetupId, rsvpAt  }: MeetupSlotProps) {
    return (
        <div className="flex my-2 rounded-lg overflow-hidden bg-cyan-50 shadow-sm">
            <div className="w-16 h-16 bg-cyan-100 flex items-center justify-center">
                {isFilled && profileAvatar ? (
                    <Image
                        src={playerAvatar}
                        alt={`${playerName}'s avatar`}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                )}
            </div>
            <div className="flex-1 p-2 bg-green-100">
                {isFilled ? (
                    <>
                        <div className="font-medium">{playerName}</div>
                        <div className="text-sm">{playerAbout}</div>
                    </>
                ) : (
                    <button
                        /*define function*/
                        onClick={async () => {
                            const rsvp = await fetchRsvpByRsvpMeetupId(meetupId)
                        }}
                        className="w-full h-full flex items-center justify-center font-medium"
                    >
                        JOIN
                    </button>
                )}
            </div>
        </div>
    );
}