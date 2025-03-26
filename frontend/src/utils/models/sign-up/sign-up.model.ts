import { z } from "zod";

export const SignUpSchema = PrivateProfileSchema
    .omit({profileHash: true, profileActivationToken: true, profileCreationDate: true, profileAboutMe: true, profileAvatarUrl: true})
    .extend({
        profilePassword: z.string({invalid_type_error: 'profile password must be a string', required_error: 'profile password is required'})
            .min(8,{message: 'password must be at least 8 characters'})
            .max(32,{message: 'password cannot be more than 32 characters'}),
        profilePasswordConfirm: z.string({invalid_type_error: 'profile password confirm must be a string', required_error: 'profile password confirm is required'})
            .min(8,{message: 'password confirm must be at least 8 characters'})
            .max(32,{message: 'password confirm cannot be more than 32 characters'}),
    })
    .refine(data => data.profilePassword === data.profilePasswordConfirm, {message: 'passwords do not match'})