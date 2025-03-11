import { z } from 'zod'

export const PrivateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide valid profileId',
    })
        .uuid({message: 'Please provide valid profileId'}),
    profileAboutMe: z.string({
        required_error: 'profile about is a required field.'
    })
})
