import React from 'react';
import Image from 'next/image';
import {Profile} from "@/utils/models/profile/profile.model";

type MessageProps = {
    loggedInProfile?: Profile
    message: Message
}

export function Message({ senderName, senderAvatar, content, timestamp }: MessageProps) {
    return (
        <div className="flex mb-4">
            <div className="mr-2">
                <Image
                    src={senderAvatar}
                    alt={`${senderName}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium">{senderName}</div>
                <div className="bg-pink-100 p-2 rounded-lg">{content}</div>
                <div className="text-xs text-right text-gray-500">{timestamp}</div>
            </div>
        </div>
    );
}