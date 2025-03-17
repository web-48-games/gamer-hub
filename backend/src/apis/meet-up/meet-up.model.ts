import {MeetUpSchema} from "./meet-up.validator";
import {string, z} from "zod";
import {sql} from "../../utils/database.utils";



export type Meetup = z.infer<typeof MeetUpSchema>

export async function insertMeetup(meetup: Meetup): Promise<string> {

    const {meetupId, meetupGameId, meetupHostProfileId, meetupAddress, meetupCreatedAt, meetupDescription, meetupDuration, meetupLat, meetupLng, meetupStartTime} = meetup
    await sql`INSERT INTO MEETUP (meetup_id, meetup_game_id, meetup_host_profile_id, meetup_address, meetup_created_at, meetup_description, meetup_duration, meetup_lat, meetup_long, meetup_start_time) VALUES (${meetupId}, ${meetupGameId}, ${meetupHostProfileId}, ${meetupAddress}, ${meetupCreatedAt}, ${meetupDescription}, ${meetupDuration}, ${meetupLat}, ${meetupLng}, ${meetupStartTime})`

    return 'meetup successfully posted'
}