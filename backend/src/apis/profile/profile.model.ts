import {PrivateProfileSchema, PublicProfileSchema} from "./profile.validator";
import {z} from 'zod'
import {sql} from "../../utils/database.utils";

/**
 * The shape of the private profile that is only used by express. it must never be returned to the controller.
 * @property profileId {string} the primary key
 * @property profileAboutMe {string} the profile's about me section
 * @property profileActivationToken {string|null} the profile's activation token
 * @property profileCreationDate {date|null} time profile was created
 * @property profileAvatarUrl {string|null} the profile's image url
 * @property profileEmail {string} the profile's email
 * @property profileHash {string} the profile's hash
 * @property profileName {string} the profile's name
 **/
export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

/**
 * The shape of the public profile that can shared with Next.js
 * @property profileId {string} the primary key
 * @property profileAboutMe {string} the profile's about me section
 * @property profileCreationDate {date|null} time profile was created
 * @property profileAvatarUrl {string|null} the profile's image url
 * @property profileName {string} the profile's name
 **/
export type PublicProfile = z.infer<typeof PublicProfileSchema>

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

export async function selectPrivateProfileByProfileEmail(profileEmail: string): Promise<PrivateProfile | null> {
    // create a sql statement that selects the profile by profileEmail and execute the statement
    const rowList = await sql`SELECT profile_id, profile_about_me, profile_activation_token, profile_avatar_url, profile_creation_date, profile_email, profile_hash, profile_name FROM profile WHERE profile_email=${profileEmail}`

    // make sure result is an array made of 1 profile or null
    const result = PrivateProfileSchema.array().max(1).parse(rowList)

    // return profile or null for no matching profile found
    return result?.length === 1 ? result[0] : null
}