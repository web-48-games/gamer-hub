'use server'

import { Message, MessageSchema } from '@/utils/models/message/message.model'

export async function fetchMessageByMessageId(messageId: string) : Promise<Message> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/messages/${messageId}`,
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }) .then(response => {
            if( !response.ok) {
                throw new Error('request failed')
            }
            return response.json()
    })
    return MessageSchema.parse(data)
}