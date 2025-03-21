import { z } from "zod";
import { RsvpSchema } from "./rsvp.validator";
import {sql} from "../../utils/database.utils";



export type Rsvp = z.infer<typeof RsvpSchema>

export async function insertRsvp(rsvp: Rsvp):Promise<string> {
    const {rsvpProfileId, rsvpMeetupId, rsvpAt} = rsvp

    await sql`INSERT INTO rsvp (rsvp_profile_id, rsvp_meetup_id, rsvp_at) VALUES (${rsvpProfileId}, ${rsvpMeetupId}, ${rsvpAt})`

    return 'Rsvp inserted'
}

export async function selectRsvpsByRsvpProfileId(rsvpProfileId: string):Promise<Rsvp | null {
    const rowlist = <Rsvp[]>await sql` SELECT rsvp_profile_id, rsvp_meetup_id, rsvp_at FROM rsvp WHERE rsvp_profile_id = ${rsvpProfileId}`


    const result = RsvpSchema.array().max(1).parse(rowlist)
    return result.length ===0 ? null :result [0]
}

export async function selectRsvpsByRsvpMeetupId(rsvpMeetupId: string):Promise<Rsvp | null {
    const rowlist = <Rsvp[]>await sql`SELECT rsvp_profile_id, rsvp_meetup_id, rsvp_at FROM rsvp WHERE rsvp_meetup_id =  ${rsvpMeetupId}`

    const result = RsvpSchema.array().max(1).parse(rowlist)
    return result.length ===0 ? null :result [0]
}