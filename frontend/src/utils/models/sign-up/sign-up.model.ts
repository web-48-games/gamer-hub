import { z } from "zod";


export const SignUpSchema = z.object({
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
    profileName: z.string({

        required_error: 'profileName is required',
        invalid_type_error: 'Please provide a valid profileName',
    })
        .trim()
        .min(1, { message: 'please provide a valid profileName (min 1 characters)' })
        .max(32, { message: 'please provide a valid profileName (max 32 characters)' }),
    profileEmail: z.string({required_error: 'profileEmail is required',
        invalid_type_error: 'please provide a valid profileEmail'}),
    profilePassword: z.string({invalid_type_error: 'profile password must be a string', required_error: 'profile password is required'})
        .min(8,{message: 'password must be at least 8 characters'})
        .max(32,{message: 'password cannot be more than 32 characters'}),
    profilePasswordConfirm: z.string({invalid_type_error: 'profile password confirm must be a string', required_error: 'profile password confirm is required'})
            .min(8,{message: 'password confirm must be at least 8 characters'})
            .max(32,{message: 'password confirm cannot be more than 32 characters'}),
    })
    .refine(data => data.profilePassword === data.profilePasswordConfirm, {message: 'passwords do not match'})

export type SignUp = z.infer<typeof SignUpSchema>;