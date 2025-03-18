import {MeetUpSchema} from "./meet-up.validator";
import {string, z} from "zod";
import {sql} from "../../utils/database.utils";



export type Meetup = z.infer<typeof MeetUpSchema>

export async function insertMeetup(meetup: Meetup): Promise<string> {

    const {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLong, meetupStartTime} = meetup
    await sql`INSERT INTO meetup (meetup_id, meetup_game_id, meetup_host_profile_id, meetup_address, meetup_created_at, meetup_description, meetup_duration, meetup_lat, meetup_long, meetup_start_time) VALUES (${meetupId}, ${meetupGameId}, ${meetupHostProfileId}, ${meetupAddress}, ${meetupCreatedAt}, ${meetupDescription}, ${meetupDuration}, ${meetupLat}, ${meetupLong}, ${meetupStartTime})`

    return 'meetup successfully posted'
}

export async function selectMeetupByMeetupId(meetupId: string): Promise<Meetup | null> {
    const rowList = <Meetup[]>await sql`
        SELECT 
            meetup_id as "meetupId", 
            meetup_game_id as "meetupGameId", 
            meetup_host_profile_id as "meetupHostProfileId", 
            meetup_address as "meetupAddress", 
            meetup_created_at as "meetupCreatedAt", 
            meetup_description as "meetupDescription", 
            meetup_duration as "meetupDuration", 
            meetup_lat as "meetupLat", 
            meetup_long as "meetupLong", 
            meetup_start_time as "meetupStartTime"
        FROM meetup 
        WHERE meetup_id = ${meetupId}`

    const result = MeetUpSchema.array().max(1).parse(rowList)
    console.log(result)
    return result.length === 0 ? null : result[0]
}

export async function deleteMeetupByMeetupId(meetupId: string): Promise<string> {
    await sql`DELETE
              FROM meetup
              WHERE meetup_id = ${meetupId}`

    return 'Meetup successfully deleted'
}