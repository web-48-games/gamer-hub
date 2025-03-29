import React from 'react';
import Link from 'next/link';
import { MeetupCard } from './MeetupCard';
import {Searchbar} from "@/app/components/Searchbar";

// meetups page.tsx
const mockMeetups = [
    {
        id: '12345',
        hostName: 'Emma Johnson',
        hostAvatar: '/window.svg', // Use placeholder for now
        gameName: 'Settlers of Catan',
        date: 'March 5, 2025',
        time: '7:00 PM',
    },
    {
        id: '67890',
        hostName: 'James Dixon',
        hostAvatar: '/window.svg',
        gameName: 'Ticket to Ride',
        date: 'March 7, 2025',
        time: '6:30 PM',
    },
    // can add more or edit as needed
];

export default function MeetupsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">All Meetups Near You</h1>

            <div className="flex justify-center gap-4 mb-8">
                <Link
                    href="/create-meetup" // Link this correctly later to create meetups page
                    className="px-6 py-3 text-redBrown bg-lightRed rounded-lg font-medium transition"
                >
                    Create Meetup
                </Link>
                <Searchbar />
                {/*<button*/}
                {/*    className="px-6 py-3 bg-cyan-400 rounded-lg font-medium hover:bg-cyan-500 transition"*/}
                {/*>*/}
                {/*    Find meetup*/}
                {/*</button>*/}
            </div>

            <div className="max-w-md mx-auto">
                {mockMeetups.map(meetup => (
                    <MeetupCard
                        key={meetup.id}
                        id={meetup.id}
                        hostName={meetup.hostName}
                        hostAvatar={meetup.hostAvatar}
                        gameName={meetup.gameName}
                        date={meetup.date}
                        time={meetup.time}
                    />
                ))}
            </div>
        </div>
    );
}
