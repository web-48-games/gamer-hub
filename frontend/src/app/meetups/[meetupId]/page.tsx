'use server'

// app/meetups/[meetupId]/page.tsx
import React from 'react';
import { MeetupSlot } from '../MeetupSlot';
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
    const messages = await fetchMessagesByMessageMeetupId(meetupId)
    console.log(messages)

    if (!sessionProfile) return <></>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                {meetup.meetupName} hosted by {hostProfile.profileName}
            </h1>

            <div className="max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">JOINED</h2>
                        {meetupProfiles.map((profile, i) => <PlayerMeetupCard
                            key={i}
                            meetup={meetup}
                            profile={profile}
                            isHost={meetup.meetupHostProfileId === profile.profileId}
                            loggedInProfile={session?.profile}
                        />)}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">AVAILABLE</h2>
                        <MeetupJoinButton
                            isJoined={meetupProfiles.map(profile => profile.profileId).includes(sessionProfile.profileId)}
                            meetupId={meetupId}
                            spotsAvailable={spotsAvailable > 0}
                            sessionProfile={session} />

                           {/*this will always have 1 less open slot than intended when Join button is no longer available*/}
                        {new Array(meetupProfiles.map(profile => profile.profileId).includes(sessionProfile.profileId) ? spotsAvailable : spotsAvailable-1).fill(5).map((element, i) => <button className={"w-full h-12 bg-gray-100 font-semibold text-md text-center"} key={i}>OPEN SLOT</button>)}

                    </div>
                </div>

                <div>
                    {game && <GameCard gameCardInfo={game}/>}
                </div>

                <div className="mt-8">

                    <div className="bg-pink-50 p-4 rounded-lg">

                        {/*insert chat component here*/}
                        {messages.map((message, i) => <MessageEach message={message} key={i}/>)}

                        <MessageForm loggedInProfile={sessionProfile} meetupId={meetupId} />
                    </div>
                </div>
            </div>
        </div>
    );
}