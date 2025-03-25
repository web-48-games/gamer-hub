import {z} from 'zod'
export const ProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide a valid profileId'
    })
        .uuid({ message: 'please provide a valid profileId' }),
    profileAboutMe: z.string({
        required_error: 'profile about me is a required field.',
        invalid_type_error: 'please provide a valid profile about me'
    })
        .max(512, { message: 'profile about length is to long' })
        .nullable(),
    profileAvatarUrl: z.string({
        required_error: 'profileImage is required',
        invalid_type_error: 'please provide a valid profileImageUrl'
    })
        .trim()
        .url({ message: 'please provide a valid image url' })
        .max(255, { message: 'profile avtar url is to long' })
        .nullable(),
    profileName: z.string({
        required_error: 'profileName is required',
        invalid_type_error: 'please provide a valid profileName'
    })
        .trim()
        .min(1, { message: 'please provide a valid profileName (min 1 characters)' })
        .max(32, { message: 'please provide a valid profileName (max 32 characters)' }),
    profileCreationDate: z.coerce.date({
        required_error: 'profileCreationDate is required',
        invalid_type_error: 'please provide a valid profileCreationDate'

    })
        .nullable()
})

export type Profile = z.infer<typeof ProfileSchema>