import {PrivateProfileSchema} from "./profile.validator";
import {z} from 'zod'
import {sql} from "../../utils/database.utils";
export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

export async function insertProfile(profile: PrivateProfile): Promise<string> {
    const {profileId, profileName, profileEmail, profileHash, profileAboutMe, profileAvatarUrl, profileCreationDate, profileActivationToken} = profile
    await sql`INSERT INTO profile (profile_id, profile_about_me, profile_activation_token, profile_avatar_url, profile_creation_date, profile_email, profile_hash, profile_name) VALUES (${profileId}, ${profileAboutMe}, ${profileActivationToken}, ${profileAvatarUrl}, ${profileCreationDate}, ${profileEmail}, ${profileHash}, ${profileName})`
    return 'profile successfully created'
}