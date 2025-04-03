'use client'



import {Profile} from "@/utils/models/profile/profile.model";
import {Message} from "@/utils/models/message/message.model";

type MessageSendButtonProps = {
    loggedInProfile: Profile
    meetupId: string
    message: Message
}


export function MessageSendButton(props: MessageSendButtonProps) {
    const {loggedInProfile, meetupId, message} = props
    if (!loggedInProfile) return <></>

    async function fireServerAction() {
        try {
            const response = await postMessage(message)
            if (response.status) === 200) {
                router.refresh()
            }
        } catch(error) {
            console.error(error);
        }

    }

    return (
        <>
        </>
    )
}