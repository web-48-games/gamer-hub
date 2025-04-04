import React from 'react';
import Image from 'next/image';
import {Profile} from "@/utils/models/profile/profile.model";
import {Message} from "@/utils/models/message/message.model";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";


type MessageProps = {
    message: Message
}

export async function MessageEach({ message }: MessageProps) {
    console.log("messageEach component")
    const profile = await fetchProfileByProfileId(message.messageProfileId)
    // let hourString: string = ''
    // if (message.messageTimestamp.getHours() < 10) {
    //     hourString = '0' + String(message.messageTimestamp.getHours())
    // } else if (message.messageTimestamp.getHours() > 12) {
    //     hourString = String(message.messageTimestamp.getHours() - 12)
    // } else {
    //     hourString = String(message.messageTimestamp.getHours())
    // }
    //
    // let minuteString: string = ''
    // if (message.messageTimestamp.getMinutes() < 10) {
    //     minuteString += '0' + message.messageTimestamp.getMinutes()
    // } else {
    //     minuteString = String(message.messageTimestamp.getMinutes())
    // }
    //
    // // am or pm
    // let addonString: string = ''
    // if (message.messageTimestamp.getHours() < 12) {
    //     addonString = 'AM'
    // } else {
    //     addonString = 'PM'
    // }
    //
    // const timeString:string = `${hourString}:${minuteString} ${addonString}`
    //
    // const DateString:string = message.messageTimestamp.getMonth() + "/" + message.messageTimestamp.getDate() + "/" + message.messageTimestamp.getFullYear()

    return (
        <div className="flex mb-4 w-full">
            <div className="flex-shrink-0 mr-3">
                <Image
                    src={profile.profileAvatarUrl || ''}
                    alt={`${profile.profileName}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </div>
            <div className="flex-grow">
                <div className="text-sm font-medium">{profile.profileName}</div>
                <div className="bg-pink-100 p-2 rounded-lg">{message.messageContent}</div>
                {/*<div className="text-xs text-right text-gray-500">{timeString}</div>*/}
                {/*<div className="text-xs text-right text-gray-500">{DateString}</div>*/}
            </div>
        </div>
    );
}