import {MeetUpSchema} from "./meet-up.validator";
import {string, z} from "zod";
import {sql} from "../../utils/database.utils";



export type Meetup = z.infer<typeof MeetUpSchema>

export async function insertMeetup(meetup: Meetup): Promise<string> {

    const {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCapacity, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLong, meetupName, meetupStartTime} = meetup
    console.log(meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCapacity, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLong, meetupName, meetupStartTime)
    await sql`INSERT INTO meetup (meetup_id, meetup_game_id, meetup_host_profile_id, meetup_address, meetup_capacity, meetup_created_at, meetup_description, meetup_duration, meetup_lat, meetup_long, meetup_name, meetup_start_time) VALUES (${meetupId}, ${meetupGameId}, ${meetupHostProfileId}, ${meetupAddress}, ${meetupCapacity}, NOW(), ${meetupDescription}, ${meetupDuration}, ${meetupLat}, ${meetupLong}, ${meetupName}, ${meetupStartTime})`
    console.log(meetup)
    return 'meetup successfully posted'
}

export async function selectMeetupByMeetupId(meetupId: string): Promise<Meetup | null> {
    const rowList = <Meetup[]>await sql`
        SELECT
            meetup_id, meetup_game_id, meetup_host_profile_id, meetup_address, meetup_capacity, meetup_created_at, meetup_description, meetup_duration, meetup_lat, meetup_long, meetup_name, meetup_start_time
        FROM meetup 
        WHERE meetup_id = ${meetupId}`

    const result = MeetUpSchema.array().max(1).parse(rowList)
    return result.length === 0 ? null : result[0]
}

export async function deleteMeetupByMeetupId(meetupId: string): Promise<string> {
    await sql`DELETE
              FROM meetup
              WHERE meetup_id = ${meetupId}`

    return 'Meetup successfully deleted'
}

export async function selectMeetupsByRsvpProfileId(rsvpProfileId: string) : Promise<Meetup[]> {
    const rowList = <Meetup[]>await sql`
        SELECT
            meetup_id, meetup_game_id, meetup_host_profile_id, meetup_address, meetup_capacity, meetup_created_at, meetup_description, meetup_duration, meetup_lat, meetup_long, meetup_name, meetup_start_time
        FROM meetup
        INNER JOIN 
        rsvp
        ON meetup_id = rsvp_meetup_id
        WHERE rsvp_profile_id = ${rsvpProfileId} OR rsvp_profile_id = meetup_host_profile_id`

    return MeetUpSchema.array().parse(rowList)
}

export async function selectCurrentMeetups() : Promise<Meetup[]> {
    const rowList = <Meetup[]>await sql`
        SELECT
            meetup_id, meetup_game_id, meetup_host_profile_id, meetup_address, meetup_capacity, meetup_created_at, meetup_description, meetup_duration, meetup_lat, meetup_long, meetup_name, meetup_start_time
        FROM meetup
        WHERE DATE(meetup_start_time) >= CURRENT_DATE
        `
    const current_timestamp = await sql`SELECT CURRENT_TIMESTAMP`
    const current_date = await sql`SELECT CURRENT_DATE`

    console.log(current_timestamp)
    console.log(current_date)

    return MeetUpSchema.array().parse(rowList)
}

export async function selectMeetupsByGame(meetupGameId: string) : Promise<Meetup[]> {
    const rowList = <Meetup[]>await sql`
        SELECT
            meetup_id, meetup_game_id, meetup_host_profile_id, meetup_address, meetup_capacity, meetup_created_at, meetup_description, meetup_duration, meetup_lat, meetup_long, meetup_name, meetup_start_time
        FROM meetup
        INNER JOIN
        game
        ON meetup_game_id = game.game_id
        WHERE meetup_game_id = ${meetupGameId}`

    return MeetUpSchema.array().parse(rowList)
}
