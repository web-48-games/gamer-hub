import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type SessionCardProps = {
    id: string;
    hostName: string;
    hostAvatar: string;
    gameName: string;
    date: string;
    time: string;
}

export function MeetupCard({ id, hostName, hostAvatar, gameName, date, time }: SessionCardProps) {
    return (
        <div className="flex my-4 rounded-lg overflow-hidden bg-cyan-50 shadow-md">
            <div className="w-24 h-24 bg-paleRed flex items-center justify-center">
                {hostAvatar ? (
                    <Image
                        src={hostAvatar}
                        alt={`${hostName}'s avatar`}
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                )}
            </div>
            <div className="flex-1 p-4 bg-lightYellow">
                <div className="text-lg font-medium">Host: {hostName}</div>
                <div>Game: {gameName}</div>
                <div>Join us on {date} @ {time}</div>
                <div className="text-right">
                    <Link href={`/meetups/${id}`} className="text-lg font-medium text-redBrown">
                        View Session
                    </Link>
                </div>
            </div>
        </div>
    );
}