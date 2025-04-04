import React from 'react';
import Link from 'next/link';
import { MeetupCard } from './MeetupCard';
import {Searchbar} from "@/app/components/Searchbar";
import {fetchCurrentMeetups} from "@/utils/models/meetups/meetup.action";

// meetups page.tsx
type MeetupsPageProps = {

}

export default async function MeetupsPage() {
    const currentMeetups = await fetchCurrentMeetups()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">All Current/Upcoming Meetups</h1>

            <div className="max-w-md mx-auto">
                {currentMeetups.map(meetup => (
                    <MeetupCard meetup={meetup}/>
                ))}
            </div>

            <div className="flex justify-center gap-4 mb-8">

                {/* try to make this functional? */}
                <Searchbar/>

            </div>
        </div>
    );
}
