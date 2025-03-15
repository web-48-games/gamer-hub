import {z} from "zod";

export const MeetUpSchema = z.object({
    meetupId: z.string({required_error: 'provide valid meetUpId or null'}).uuid({message: 'please provide valid uuid for meetUpId'}),
    meetupGameId: z.string({required_error: 'provide valid meetupGameId'}).uuid({message: 'please provide valid uuid meetupGameId' }),
    meetupHostProfileId: z.string({required_error: 'provide valid meetupHostProfileId'}).uuid({message: 'please provide valid uuid meetupHostProfileId' }),
    meetupAddress: z.string().max(128, {message: 'meetupAddress cannot exceed 128 characters'}),
    gameMaxPlayers: z.number({message: 'please provide a valid number of gameMaxPlayers'}),
    gameName: z.string().max(32, {message: 'please provide valid gameName'}),
    gameYearPublished: z.coerce.date({message: 'please provide valid gameYearPublished'})
})