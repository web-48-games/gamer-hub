'use server'

// app/meetups/[meetupId]/page.tsx
import React from 'react';
import { MeetupSlot } from '../MeetupSlot';
import { Message } from '../Message';
import {fetchMeetupByMeetupId} from "@/utils/models/meetups/meetup.action";
import {fetchGameByGameId} from "@/utils/models/game/game.action";

// Mock data for testing
const mockMeetupInfo = {
    id: '12345',
    hostName: 'Host Name',
    hostAvatar: '/window.svg',
    gameName: 'Settlers of Catan',
    gameId: '123456',
    date: 'March 5, 2025',
    time: '7:00 PM',
    address: '123 Main St, Albuquerque, NM',
    capacity: 4,
    joined: [
        {
            playerName: 'Host Name',
            playerAvatar: '/window.svg',
            playerAbout: 'Game Host',
        }
    ],
    messages: [
        {
            senderName: 'Host Name',
            senderAvatar: '/window.svg',
            content: "Hey all! I'm so excited to host this game. Let me know if you got any questions.",
            timestamp: '11:42:28 MST',
        },
        {
            senderName: 'Player 2',
            senderAvatar: '/window.svg',
            content: "Thanks for the host! I heard about this game from friends and trying it out for first time. In fact, a few of them might join for this meetup!",
            timestamp: '13:24:56 MST',
        }
    ]
};

export default async function meetupInfoPage({ params }: { params: { meetupId: string } }) {
    // extracting id from the url of the page
    const meetupId = params.meetupId;

    const meetup = await fetchMeetupByMeetupId(meetupId)
    const game = await fetchGameByGameId(meetup.meetupGameId)
    // const rsvp = await fetchRsvpBy()

    console.log(game)

    // when backend is implemented, fetch the meetup data based on the ID
    const meetupDummyData = mockMeetupInfo;

    // calculate empty slots
    const emptySlots = Array(meetup.meetupCapacity - meetupDummyData.joined.length).fill(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                #{meetupId} For {game?.gameName}
            </h1>

            <div className="max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">JOINED</h2>
                        {meetupDummyData.joined.map((player, index) => (
                            <MeetupSlot
                                key={index}
                                isFilled={true}
                                playerName={player.playerName}
                                playerAvatar={player.playerAvatar}
                                playerAbout={player.playerAbout}
                            />
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">AVAILABLE</h2>
                        {/*{emptySlots.map((_, index) => (*/}
                        {/*    <MeetupSlot*/}
                        {/*        key={index}*/}
                        {/*        isFilled={false}*/}
                        {/*        onJoin={() => console.log('Join clicked. Replace later with feature to actually have player occupy the slot')}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </div>
                </div>

                <div className="mt-8">
                    {/*button functionality not added yet*/}
                    <button className="mx-auto block px-6 py-2 bg-yellow-200 rounded-lg font-medium hover:bg-yellow-300 transition mb-4">
                        Chat with meetup members
                    </button>

                    <div className="bg-pink-50 p-4 rounded-lg">
                        {meetupDummyData.messages.map((message, index) => (
                            <Message
                                key={index}
                                senderName={message.senderName}
                                senderAvatar={message.senderAvatar}
                                content={message.content}
                                timestamp={message.timestamp}
                            />
                        ))}

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