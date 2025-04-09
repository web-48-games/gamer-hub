import React from 'react';
import Link from 'next/link';
import { MeetupCard } from './MeetupCard';
import {Searchbar} from "@/app/components/Searchbar";
import {fetchCurrentMeetups} from "@/utils/models/meetups/meetup.action";
import {unstable_noStore} from "next/cache";

// meetups page.tsx
type MeetupsPageProps = {

}

/**
 * MeetupsPage Component
 *
 * This component fetches and displays all current/upcoming meetups.
 * It uses the `unstable_noStore` function to disable caching and fetches
 * the meetups data dynamically using `fetchCurrentMeetups`.
 *
 * @returns JSX.Element A container with a list of meetup cards.
 */
export default async function MeetupsPage() {
    unstable_noStore()
    const currentMeetups = await fetchCurrentMeetups()

    // Additional client-side filter to ensure absolute accuracy
    const now = new Date()
    console.log("Current time:", now)

    const upcomingMeetups = currentMeetups.filter(meetup => {
        const meetupTime = new Date(meetup.meetupStartTime)
        const isUpcoming = meetupTime >= now
        console.log(`Meetup: ${meetup.meetupName}, Time: ${meetupTime}, Is upcoming: ${isUpcoming}`)
        return isUpcoming
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">All Current/Upcoming Meetups</h1>

            <div className="max-w-md mx-auto">
                {upcomingMeetups.map((meetup, i) => (
                    <MeetupCard meetup={meetup} key={i}/>
                ))}
            </div>

            {/*<div className="flex justify-center gap-4 mb-8">*/}

            {/*    /!* try to make this functional? *!/*/}
            {/*    <Searchbar/>*/}

            {/*</div>*/}
        </div>
    );
}
