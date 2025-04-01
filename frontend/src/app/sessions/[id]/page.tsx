// app/sessions/[id]/page.tsx
"use client"
import React from 'react';
import { SessionSlot } from '../SessionSlot';
import { Message } from '../Message';

// Mock data for testing
const mockSessionInfo = {
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
            content: "Thanks for the host! I heard about this game from friends and trying it out for first time. In fact, a few of them might join for this session!",
            timestamp: '13:24:56 MST',
        }
    ]
};

export default function SessionInfoPage({ params }: { params: { id: string } }) {
    // extracting id from the url of the page
    const sessionId = params.id;
    // when backend is implemented, fetch the session data based on the ID
    const session = mockSessionInfo;

    // calculate empty slots
    const emptySlots = Array(session.capacity - session.joined.length).fill(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                #{sessionId} For {session.gameName}
            </h1>

            <div className="max-w-md mx-auto">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">JOINED</h2>
                        {session.joined.map((player, index) => (
                            <SessionSlot
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
                        {emptySlots.map((_, index) => (
                            <SessionSlot
                                key={index}
                                isFilled={false}
                                onJoin={() => console.log('Join clicked. Replace later with feature to actually have player occupy the slot')}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    {/*button functionality not added yet*/}
                    <button className="mx-auto block px-6 py-2 bg-yellow-200 rounded-lg font-medium hover:bg-yellow-300 transition mb-4">
                        Chat with session members
                    </button>

                    <div className="bg-pink-50 p-4 rounded-lg">
                        {session.messages.map((message, index) => (
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
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                                SEND
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}