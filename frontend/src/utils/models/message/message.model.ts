import {z} from "zod"


export const MessageSchema = z.object({
    messageId: z.string({required_error: 'Please provide a valid messageId or null'}).uuid({message: 'Please provide a valid uuid for messageId'}),
    messageProfileId: z.string({required_error: 'Please provide a valid messageProfileId'}).uuid({message: 'Please provide a valid uuid for messageProfileId'}),
    messageMeetupId: z.string({required_error: 'Please provide a valid messageMeetupId'}).uuid({message: 'Please provide a valid uuid for messageProfileId'}),
    messageContent: z.string({required_error: 'Please provide a valid messageContent'}).max(256, {message: 'MessageEach cannot exceed 256 characters'}),
    messageTimestamp: z.coerce.date({required_error: 'Please provide a valid timestamp'})
})

export type Message = z.infer<typeof MessageSchema>