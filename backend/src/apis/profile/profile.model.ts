import {PrivateProfileSchema} from "./profile.validator";
import {z} from 'zod'
import {sql} from "../../utils/database.utils";

export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

export async function insertProfile(profile: PrivateProfile): Promise<string> {
    const {profileId, profileName, profileEmail, profileHash, profileAboutMe, profileAvatarUrl, profileCreationDate, profileActivationToken} = profile
    await sql`INSERT INTO profile (profile_id, profile_about_me, profile_activation_token, profile_avatar_url, profile_creation_date, profile_email, profile_hash, profile_name) VALUES (${profileId}, ${profileAboutMe}, ${profileActivationToken}, ${profileAvatarUrl}, ${profileCreationDate}, ${profileEmail}, ${profileHash}, ${profileName})`
    return 'profile successfully created'
}

export async function selectPrivateProfileByProfileActivationToken(profileActivationToken: string): Promise<PrivateProfile | null> {
const rowlist = await sql`SELECT profile_id, profile_about_me, profile_activation_token, profile_avatar_url, profile_creation_date, profile_email, profile_hash, profile_name FROM profile WHERE profile_activation_token = ${profileActivationToken};`
    const result = PrivateProfileSchema.array().max(1).parse(rowlist)
    return result.length === 1 ? result[0] : null
}
export async function updateProfile(profile: PrivateProfile): Promise<string> {
    const {profileId, profileAboutMe, profileActivationToken, profileAvatarUrl, profileCreationDate, profileEmail, profileHash, profileName} = profile
    await sql`UPDATE profile SET profile_about_me=${profileAboutMe}, profile_activation_token=${profileActivationToken}, profile_avatar_url=${profileAvatarUrl}, profile_creation_date=${profileCreationDate}, profile_email=${profileEmail}, profile_hash=${profileHash}, profile_name=${profileName} WHERE profile_id = ${profileId}`
    return 'Profile updated successfully'
}

export async function selectPrivateProfileByProfileEmail()