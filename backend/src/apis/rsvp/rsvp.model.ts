import { z } from "zod";
import { RsvpSchema } from "./rsvp.validator";
import {sql} from "../../utils/database.utils";



export type Rsvp = z.infer<typeof RsvpSchema>

export async function insertRsvp(rsvp: Rsvp):Promise<string> {
    const {rsvpProfileId, rsvpMeetupId, rsvpAt} = rsvp

    await sql`INSERT INTO rsvp (rsvp_profile_id, rsvp_meetup_id, rsvp_at) VALUES (${rsvpProfileId}, ${rsvpMeetupId}, Now())`

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

export async function selectRsvpByRsvpId(rsvp: Rsvp) : Promise<Rsvp | null> {
    const rowList = <Rsvp[]>await sql`SELECT rsvp_profile_id, rsvp_meetup_id, rsvp_at FROM rsvp WHERE rsvp_meetup_id = ${rsvp.rsvpMeetupId} AND rsvp_profile_id = ${rsvp.rsvpProfileId}`

    const result = RsvpSchema.array().max(1).parse(rowList)
    return result?.length === 1 ? result[0] : null
}

export async function deleteRsvp(rsvp: Rsvp): Promise<string> {
    await sql`DELETE
        FROM rsvp
        WHERE rsvp_meetup_id = ${rsvp.rsvpMeetupId} AND rsvp_profile_id = ${rsvp.rsvpProfileId}`

    return 'Rsvp successfully deleted'
}