import { z } from "zod";
import {ProfileSchema} from "@/utils/models/profile/profile.model";

export const SignUpSchema = ProfileSchema
    .omit({profileId: true,  profileAboutMe: true, profileAvatarUrl: true, profileCreationDate: true})
    .extend({
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