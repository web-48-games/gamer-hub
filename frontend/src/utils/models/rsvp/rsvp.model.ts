import {z} from "zod";


export const RsvpSchema = z.object({
    rsvpProfileId: z.string({required_error: 'provide valid rsvpProfileId or null'}).uuid({message: 'please provide valid uuid for rsvpProfileId'}),
    rsvpMeetupId: z.string({required_error: 'please provide valid rsvpMeetupId or null'}).uuid({message: 'please provide valid uuid for MeetupId to rsvp'}),
    rsvpAt: z.coerce.date({required_error: 'please provide valid timestamp for rsvpAt'}).nullable(),
})

export type Rsvp = z.infer<typeof RsvpSchema>;