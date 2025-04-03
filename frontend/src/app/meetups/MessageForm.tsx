'use client'

import { useRouter } from "next/navigation";
import {Profile} from "@/utils/models/profile/profile.model";
import {Message, MessageSchema} from "@/utils/models/message/message.model";
import React from "react";
import { postMessage } from "@/utils/models/message/message.action";
import { z } from "zod";

type MessageFormProps = {
    loggedInProfile: Profile
    meetupId: string
}


export function MessageForm(props: MessageFormProps) {
    const router = useRouter();
    const {loggedInProfile, meetupId} = props
    const formSchema = MessageSchema
    type FormSchema = z.infer<typeof MessageSchema>

    const [status, setStatus] = useState<Status | null>(null)

    const defaultValues : FormSchema = {
        messageProfileId: loggedInProfile.profileId,
        messageMeetupId: meetupId,
        messageContent: '',
        messageTimestamp: ''
    }

    if (!loggedInProfile) return <></>

    async function fireServerAction() {
        try {
            const response = await postMessage(message)
            if (response.status === 200) {
                router.refresh()
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="flex mt-4">
            <input
                type="text"
                className="flex-1 p-2 border rounded-l-lg"
                placeholder="Type your message..."
            />
            {/*add functionality to this button*/}
            <button onClick={fireServerAction} className="bg-lightRed text-redBrown px-4 py-2 rounded-r-lg">
                SEND
            </button>
        </div>
    )
}