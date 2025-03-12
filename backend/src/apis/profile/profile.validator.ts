import { z } from 'zod'

export const PrivateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide valid profileId',
    })
        .uuid({ message: 'please provide a valid profileId' }),
        profileAboutMe: z.string({
            required_error: 'profile about me is a required field.',
            invalid_type_error: 'please provide a valid profile about me'
        })
        .max(512, { message: 'profile about length is to long' })
        .nullable(),
    profileActivationToken: z.string({
        required_error: 'profileActivationToken is required',
        invalid_type_error: 'please provide a valid profileActivationToken'
    })
        .length(32, { message: 'profileActivationToken is too long'})
        .nullable(),
    profileEmail: z.string({
        required_error: 'profileEmail is required',
        invalid_type_error: 'please provide a valid profileEmail'
    })
        .email({ message: 'please provide valid email'})
        .max(128, { message: 'profileEmail is too long' }),
    profileHash: z.string({
        required_error: 'profileHash is required',
        invalid_type_error: 'please provide a valid profileHash'
    })
        .length(97, { message: 'profile hash must be 97 characters'}),
    profileAvatarUrl: z.string({
        required_error: 'profileImage is required',
        invalid_type_error: 'please provide a valid profileImageUrl'
    })
        .trim()
        .url({ message: 'please provide valid image url'})
        .max(255, { message: 'profile avatar url is too long' })
        .nullable(),
    profileName: z.string({
        required_error: 'profileName is required',
        invalid_type_error: 'please provide a valid profileName'
    })
        .trim()
        .min(1, { message: 'please provide valid profileName (min 1 characters)'})
        .max(32, { message: 'please provide valid profileName (max 32 characters)'}),
    profileCreationDate: z.coerce.date({
        required_error: 'profileCreationDate is required',
        invalid_type_error: 'please provide a valid profileCreationDate'

    })
        .nullable()
    })
    export const PublicProfileSchema = PrivateProfileSchema.omit({profileHash: true, profileActivationToken: true, profileEmail: true})

