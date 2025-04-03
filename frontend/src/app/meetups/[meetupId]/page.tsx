'use server'

// app/meetups/[meetupId]/page.tsx
import React from 'react';
import { MeetupSlot } from '../MeetupSlot';
import { Message } from '../Message';
import {fetchMeetupByMeetupId} from "@/utils/models/meetups/meetup.action";
import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {fetchProfileByProfileId, fetchProfilesByRsvpMeetupId} from "@/utils/models/profile/profile.action";
import {GameCard} from "@/app/components/GameCard";
import {PlayerMeetupCard} from "@/app/meetups/PlayerMeetupCard";
import { getSession } from '@/utils/auth.utils';
import {postRsvp} from "@/utils/models/rsvp/rsvp.action";
import {MeetupJoinButton} from "@/app/meetups/MeetupJoinButton";


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
                        {spotsAvailable && sessionProfile && <MeetupJoinButton rsvp = {{
                            rsvpProfileId: sessionProfile?.profileId ?? null,
                            rsvpMeetupId: meetup.meetupId,
                            rsvpAt: null
                        }} />
                           }
                        {new Array(spotsAvailable-1).fill(5).map((element, i) => <button className={"w-full h-12 bg-gray-100 font-semibold text-md text-center"} key={i}>OPEN SLOT</button>)}
                        {/*{emptySlots.map((_, index) => (*/}
                        {/*    <MeetupSlot*/}
                        {/*        key={index}*/}
                        {/*        isFilled={false}*/}
                        {/*        onJoin={() => console.log('Join clicked. Replace later with feature to actually have player occupy the slot')}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </div>
                </div>

                <div>
                    {game && <GameCard gameCardInfo={game}/>}
                </div>

                <div className="mt-8">
                    {/*button functionality not added yet*/}
                    <button
                        className="mx-auto block px-6 py-2 bg-yellow-200 rounded-lg font-medium hover:bg-yellow-300 transition mb-4">
                        Chat with meetup members
                    </button>

                    <div className="bg-pink-50 p-4 rounded-lg">


                        <div className="flex mt-4">
                            <input
                                type="text"
                                className="flex-1 p-2 border rounded-l-lg"
                                placeholder="Type your message..."
                            />
                            <button className="bg-lightRed text-redBrown px-4 py-2 rounded-r-lg">
                                SEND
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}