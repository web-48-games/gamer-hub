import {z} from "zod";

export const MeetUpSchema = z.object({
    meetupId: z.string({required_error: 'provide valid meetUpId or null'}).uuid({message: 'please provide valid uuid for meetUpId'}),
    meetupGameId: z.string({required_error: 'provide valid meetupGameId'}).uuid({message: 'please provide valid uuid meetupGameId' }),
    meetupHostProfileId: z.string({required_error: 'provide valid meetupHostProfileId'}).uuid({message: 'please provide valid uuid meetupHostProfileId' }),
    meetupAddress: z.string({required_error: 'please provide valid meetupAddress'}).max(128, {message: 'meetupAddress cannot exceed 128 characters'}),
    meetupCapacity: z.coerce.number({message: 'please provide valid meetupCapacity'}),
    meetupCreatedAt: z.coerce.date({message: 'please provide valid timestamp'}),
    meetupDescription: z.string({required_error: 'please provide valid Description'}).max(512, {message: 'meetupDescription cannot exceed 512 characters'}),
    meetupDuration: z.coerce.number({message: 'please provide valid time of meetup duration in hours'}),
    meetupLat: z.coerce.number({message: 'please provide valid meetup latitude coordinates for meetup location'}),
    meetupLong: z.coerce.number({message: 'please provide valid meetup longitude coordinates for meetup location'}),
    meetupName: z.string({message: 'please provide a name'}).min(1, {message: 'meetupName must contain at least 1 character'}).max(60, {message: 'meetupName cannot exceed 60 characters'}),
    meetupStartTime: z.coerce.date({message: 'please provide valid timestamp of meetup Start time'})
})