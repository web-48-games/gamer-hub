import {z} from "zod";

export const MeetUpSchema = z.object({
    meetupId: z.string({required_error: 'provide valid meetUpId or null'}).uuid({message: 'please provide valid uuid for meetUpId'}),
    meetupGameId: z.string({required_error: 'provide valid meetupGameId'}).uuid({message: 'please provide valid uuid meetupGameId' }),
    meetupHostProfileId: z.string({required_error: 'provide valid meetupHostProfileId'}).uuid({message: 'please provide valid uuid meetupHostProfileId' }),
    meetupAddress: z.string({required_error: 'please provide valid meetupAddress'}).max(128, {message: 'meetupAddress cannot exceed 128 characters'}),
    meetupCreatedAt: z.coerce.date({message: 'please provide valid timestamp'}),
    meetupDescription: z.string({required_error: 'please provide valid Description'}).max(512, {message: 'meetupDescription cannot exceed 512 characters'}),
    meetupDuration: z.number({message: 'please provide valid time of meetup duration in hours'}),
    meetupLat: z.number({message: 'please provide valid meetup latitude coordinates for meetup location'}),
    meetupLng: z.number({message: 'please provide valid meetup longitude coordinates for meetup location'}),
    meetupStartTime: z.coerce.date({message: 'please provide valid timestamp of meetup Start time'})

})