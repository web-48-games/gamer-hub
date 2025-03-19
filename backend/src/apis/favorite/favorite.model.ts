import {sql} from "../../utils/database.utils";
import {Favorite} from "./favorite.validator";

export async function insertFavorite(favorite: Favorite) : Promise<string> {
    const {favoriteProfileId, favoriteGameId} = favorite

    await sql`INSERT INTO favorite (favorite_game_id, favorite_profile_id) VALUES(${favoriteGameId}, ${favoriteProfileId})`

    return 'favorite successfully posted'
}
