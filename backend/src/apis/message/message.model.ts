import {MessageSchema} from "./message.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";

export type Message = z.infer<typeof MessageSchema>

//function to post new message in the message table in database
export async function insertMessage(message: Message): Promise<string> {
    const { messageId, messageProfileId, messageMeetupId, messageContent, messageTimestamp } = message

    await sql`INSERT INTO message ( message_id, message_profile_id, message_meetup_id, message_content, message_timestamp ) VALUES ( ${messageId}, ${messageProfileId}, ${messageMeetupId}, ${messageContent}, NOW() )`

    return 'Message successfully posted'
}

//Function to get all existing messages in a meetup message board and return to user
export async function selectAllMessages(): Promise<Message[]> {
    const rowList = <Message[]>await sql`SELECT  message_id, message_profile_id, message_meetup_id, message_content, message_timestamp FROM message ORDER BY NOW() DESC`

    return MessageSchema.array().parse(rowList)
}

//function to get message from message table in database by messageId and return it
export async function selectMessageByMessageId(messageId: string): Promise<Message | null> {
    const rowList = <Message[]>await sql`SELECT message_id, message_profile_id, message_meetup_id, message_content, message_timestamp FROM message WHERE message_id = ${messageId}`
    console.log(rowList)
    //parse message from database into a message object
    const result = MessageSchema.array().max(1).parse(rowList)
    console.log(result)
    //return the message or null if no message is found
    return result.length === 0 ? null : result[0]
}

//function to delete particular message from message table in database by messageId, returns message "Message successfully deleted"
export async function deleteMessageByMessageId(messageId: string):Promise<string> {

    await sql`DELETE FROM message WHERE message_id = ${messageId}`

    return `Message successfully deleted`
}