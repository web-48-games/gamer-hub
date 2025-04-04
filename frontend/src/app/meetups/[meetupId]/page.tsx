'use server'

// app/meetups/[meetupId]/page.tsx
import React from 'react';

import { MessageEach } from '../MessageEach';
import {fetchMeetupByMeetupId} from "@/utils/models/meetups/meetup.action";
import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {fetchProfileByProfileId, fetchProfilesByRsvpMeetupId} from "@/utils/models/profile/profile.action";
import {GameCard} from "@/app/components/GameCard";
import {PlayerMeetupCard} from "@/app/meetups/PlayerMeetupCard";
import { getSession } from '@/utils/auth.utils';
import {postRsvp} from "@/utils/models/rsvp/rsvp.action";
import {MeetupJoinButton} from "@/app/meetups/MeetupJoinButton";
import {fetchAllMessages, fetchMessagesByMessageMeetupId} from "@/utils/models/message/message.action";
import {MessageForm} from "@/app/meetups/MessageForm";


export default async function meetupInfoPage({ params }: { params: Promise<{ meetupId: string }> }) {
    // extracting id from the url of the page
    const {meetupId} = await params;
    console.log(meetupId);
    const meetup = await fetchMeetupByMeetupId(meetupId)
    const hostProfile = await fetchProfileByProfileId(meetup.meetupHostProfileId)
    const game = await fetchGameByGameId(meetup.meetupGameId)
    const session = await getSession()
    const sessionProfile = session?.profile
    const isHost = meetup.meetupHostProfileId === sessionProfile?.profileId
    const meetupProfiles = await fetchProfilesByRsvpMeetupId(meetupId)
    const spotsAvailable = meetup.meetupCapacity - (meetupProfiles.length)
    console.log(spotsAvailable)
    const messages = await fetchMessagesByMessageMeetupId(meetupId)
    console.log(messages)

    if (!sessionProfile) return <></>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                {meetup.meetupName}
            </h1>
            <p className={"font-medium text-center mb-14"}>Hosted by {hostProfile.profileName}</p>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-center border-b border-black pb-2">JOINED</h2>
                        <div className="space-y-2">
                            {meetupProfiles.map((profile, i) => <PlayerMeetupCard
                                key={i}
                                meetup={meetup}
                                profile={profile}
                                isHost={meetup.meetupHostProfileId === profile.profileId}
                                loggedInProfile={session?.profile}
                            />)}
                        </div>

                    </div>

                    <div className={"bg-gray-100 rounded-lg p-4 shadow-sm"}>
                        <h2 className="text-xl font-semibold mb-4 text-center border-b border-black pb-2">AVAILABLE</h2>
                        <MeetupJoinButton
                            isJoined={meetupProfiles.map(profile => profile.profileId).includes(sessionProfile.profileId)}
                            meetupId={meetupId}
                            spotsAvailable={spotsAvailable > 0}
                            sessionProfile={session} />

                           {/*this will always have 1 less open slot than intended when Join button is no longer available*/}
                        {new Array(meetupProfiles.map(profile => profile.profileId).includes(sessionProfile.profileId) ? spotsAvailable : spotsAvailable-1).fill(5).map((element, i) => <button className={"w-full h-12 bg-gh-desert-100 font-semibold text-md text-center my-3"} key={i}>OPEN SLOT</button>)}

                    </div>
                </div>

                <div>
                    {game && <GameCard gameCardInfo={game}/>}
                </div>

                <div className="bg-pale-yellow rounded-lg shadow-sm">

                    <div className="bg-gh-red-100 p-4 rounded-lg">

                        {/*insert chat component here*/}
                        <div className="space-y-2 max-h-80 mb-4 overflow-y-auto">
                            {messages.map((message, i) => <MessageEach message={message} key={i}/>)}
                        </div>

                        <MessageForm loggedInProfile={sessionProfile} meetupId={meetupId} />
                    </div>
                </div>

        </div>
    );
}