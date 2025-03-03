import React from 'react';
import Link from 'next/link';
import { SessionCard } from './SessionCard';
import {Searchbar} from "@/app/Components/Searchbar";

// sessions page.tsx
const mockSessions = [
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

export default function SessionsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">All Sessions Near You</h1>

            <div className="flex justify-center gap-4 mb-8">
                <Link
                    href="#" // Link this correctly later to create sessions page
                    className="px-6 py-3 bg-green-400 rounded-lg font-medium hover:bg-green-500 transition"
                >
                    Create Session
                </Link>
                <Searchbar />
                {/*<button*/}
                {/*    className="px-6 py-3 bg-cyan-400 rounded-lg font-medium hover:bg-cyan-500 transition"*/}
                {/*>*/}
                {/*    Find Session*/}
                {/*</button>*/}
            </div>

            <div className="max-w-md mx-auto">
                {mockSessions.map(session => (
                    <SessionCard
                        key={session.id}
                        id={session.id}
                        hostName={session.hostName}
                        hostAvatar={session.hostAvatar}
                        gameName={session.gameName}
                        date={session.date}
                        time={session.time}
                    />
                ))}
            </div>
        </div>
    );
}
