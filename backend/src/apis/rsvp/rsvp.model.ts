import { z } from "zod";
import { RsvpSchema } from "./rsvp.validator";
import {sql} from "../../utils/database.utils";



export type Rsvp = z.infer<typeof RsvpSchema>

export async function insertRsvp(rsvp: Rsvp):Promise<string> {
    const {rsvpProfileId, rsvpMeetupId, rsvpAt} = rsvp

    await sql`INSERT INTO rsvp (rsvp_profile_id, rsvp_meetup_id, rsvp_at) VALUES (${rsvpProfileId}, ${rsvpMeetupId}, ${rsvpAt})`

    return 'Rsvp inserted'
}

export async function selectRsvpsByRsvpProfileId(rsvpProfileId: string):Promise<Rsvp[]> {
    const rowList = <Rsvp[]>await sql` SELECT rsvp_profile_id, rsvp_meetup_id, rsvp_at FROM rsvp WHERE rsvp_profile_id = ${rsvpProfileId}`


    return RsvpSchema.array().parse(rowList)
}

export async function selectRsvpsByRsvpMeetupId(rsvpMeetupId: string):Promise<Rsvp[]> {
    const rowList = <Rsvp[]>await sql`SELECT rsvp_profile_id, rsvp_meetup_id, rsvp_at FROM rsvp WHERE rsvp_meetup_id =  ${rsvpMeetupId}`

    return RsvpSchema.array().parse(rowList)
}