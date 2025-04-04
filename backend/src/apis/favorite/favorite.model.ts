import {sql} from "../../utils/database.utils";
import {Favorite, FavoriteSchema} from "./favorite.validator";

export async function insertFavorite(favorite: Favorite) : Promise<string> {
    const {favoriteProfileId, favoriteGameId} = favorite

    await sql`INSERT INTO favorite (favorite_game_id, favorite_profile_id) VALUES(${favoriteGameId}, ${favoriteProfileId})`

    return 'favorite successfully posted'
}

export async function selectFavoritesByFavoriteGameId(favoriteGameId: string) : Promise<Favorite[]> {
    const rowList = <Favorite[]>await sql`
                               SELECT favorite_game_id, favorite_profile_id
                               FROM "favorite"
                               WHERE favorite_game_id = ${favoriteGameId}`

    return FavoriteSchema.array().parse(rowList)
}

export async function selectFavoritesByFavoriteProfileId(favoriteProfileId: string) : Promise<Favorite[]> {
    const rowList = <Favorite[]>await sql`
                               SELECT favorite_game_id, favorite_profile_id
                               FROM "favorite"
                               WHERE favorite_profile_id = ${favoriteProfileId}`

    return FavoriteSchema.array().parse(rowList)
}

export async function deleteFavorite(favorite: Favorite) : Promise<string> {

    const {favoriteProfileId, favoriteGameId} = favorite

    await sql`DELETE
    FROM "favorite"
    WHERE favorite_profile_id = ${favoriteProfileId}
    AND favorite_game_id = ${favoriteGameId}`

    return 'favorite successfully deleted'
}

export async function selectFavoritesByFavoriteId(favorite: Favorite) : Promise<Favorite | null> {
    const {favoriteProfileId, favoriteGameId} = favorite

    // select favorite from its table by its primary key, the composite of two foreign keys
    const rowList = <Favorite[]>await sql`
                               SELECT favorite_game_id, favorite_profile_id
                               FROM "favorite"
                               WHERE favorite_profile_id = ${favoriteProfileId}
                               AND favorite_game_id = ${favoriteGameId}`

    // parse and store into a list
    const result = FavoriteSchema.array().max(1).parse(rowList)
    // return the favorite selected
    return result.length === 0 ? null : result[0]

}