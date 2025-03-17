import {MessageSchema} from "./message.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";

export type Message = z.infer<typeof MessageSchema>

export async function insertMessage(message: Message): Promise<string> {
    const { messageId, messageProfileId, messageMeetupId, messageContent, messageTimestamp } = message

    await sql`INSERT INTO newMessage ( message_id, message_profile_id, message_meetup_id, message_content, message_timestamp ) VALUES ( ${messageId}, ${messageProfileId}, ${messageMeetupId}, ${messageContent}, ${messageTimestamp} )`

    return 'Message successfully posted'
}