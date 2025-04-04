'use client'

import { useRouter } from "next/navigation";
import {Profile} from "@/utils/models/profile/profile.model";
import {Message, MessageSchema} from "@/utils/models/message/message.model";
import React, { useState } from "react";
import { postMessage } from "@/utils/models/message/message.action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Status } from "@/utils/interfaces/Status";
import {v7 as uuid} from "uuid"
import {DisplayStatus} from "@/app/components/display-status";

type MessageFormProps = {
    loggedInProfile: Profile
    meetupId: string
}


export function MessageForm(props: MessageFormProps) {
    const router = useRouter();
    const {loggedInProfile, meetupId} = props
    const formSchema = MessageSchema.omit({
        messageId: true
    })
    type FormSchema = z.infer<typeof formSchema>

    const [status, setStatus] = useState<Status | null>(null)

    const defaultValues : FormSchema = {
        messageProfileId: loggedInProfile.profileId,
        messageMeetupId: meetupId,
        messageContent: '',
        messageTimestamp: null
    }

    const {register, handleSubmit, reset, formState:{errors}} = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: 'onBlur'
    })

    if (!loggedInProfile) return <></>

    async function fireServerAction(data: FormSchema) {
        try {
            const message = {...data, messageId: uuid()}
            const response = await postMessage(message)
            console.log(response)
            if (response.status === 200) {
                reset()
                router.refresh()
            }
            // removed setting Status
        } catch(error) {
            setStatus({
                status: 500,
                message: 'Message cannot be posted, try again',
                data: undefined
            })
        }
    }

    return (
        <div className="flex mt-4">
            <form onSubmit={handleSubmit(fireServerAction)}>
                <input
                    id={"messageContent"} {...register("messageContent")}
                    type="text"
                    className="flex-1 p-2 border rounded-l-lg"
                    placeholder="Type your message..."
                />
                <button type={"submit"} className="bg-lightRed text-redBrown px-4 py-2 rounded-r-lg">
                    Join the Conversation
                </button>
                <DisplayStatus status={status}></DisplayStatus>

            </form>
        </div>
    )
}