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
        <div className="flex mt-4 w-full">
            <form onSubmit={handleSubmit(fireServerAction)} className="w-full flex flex-col sm:flex-row gap-2">
                <div className="w-full flex flex-col sm:flex-row gap-2">
                    <input
                        id={"messageContent"} {...register("messageContent")}
                        type="text"
                        className="flex-grow p-3 border rounded-lg sm:rounded-r-none"
                        placeholder="Type your message..."
                    />
                    <button type={"submit"}
                            className="sm:w-auto bg-lightRed text-redBrown px-4 py-3 rounded-r-lg whitespace-nowrap">
                        Join the Conversation
                    </button>
                </div>
                <DisplayStatus status={status}></DisplayStatus>

            </form>
        </div>
    )
}