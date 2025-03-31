import {GameSchema} from "./game.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";


export type Game = z.infer<typeof GameSchema>

// might not be in practical use b/c game will be external data but useful for testing
export async function insertGame(game : Game): Promise<string> {
    const {gameId, gameDescription, gameGenre, gameImageUrl, gameMaxPlayers, gameName, gameYearPublished} = game

    await sql`INSERT INTO game (game_id, game_description, game_genre, game_image_url, game_max_players, game_name, game_year_published) VALUES(${gameId}, ${gameDescription}, ${gameGenre}, ${gameImageUrl}, ${gameMaxPlayers}, ${gameName}, ${gameYearPublished})`

    return 'Game successfully posted'
}

export async function selectGameByGameId(gameId: string): Promise<Game | null> {
    const rowList = <Game[]>await sql`SELECT * FROM game WHERE game_id=${gameId}`

    const result = GameSchema.array().max(1).parse(rowList)

    return result.length === 1 ? result[0] : null
}

export async function selectGamesByGenre(gameGenre: string): Promise<Game[]> {
    const rowList = <Game[]>await sql`SELECT game_id, game_description, game_genre, game_image_url, game_max_players, game_name, game_year_published FROM game WHERE ${gameGenre}= ANY(game_genre)`

    return GameSchema.array().parse(rowList)
}

export async function selectGamesByGenres(gameGenres: string[]): Promise<Game[]> {

    // @> operator checks if array on left contains all elements from the array on the right
    let rowList = <Game[]>await sql`
    SELECT game_id, game_description, game_genre, game_image_url, game_max_players, game_name, game_year_published 
    FROM game 
    WHERE game_genre @> ${gameGenres}`


    return GameSchema.array().parse(rowList)
}

// come back for carousel selection
export async function selectFeaturedGames(cap: number): Promise<Game[]> {
    return <Game[]>await sql`
        SELECT 
            game_id, 
            game_description, 
            game_genre, 
            game_image_url, 
            game_max_players, 
            game_name, 
            game_year_published,
            (SELECT COUNT(*) FROM favorite WHERE favorite_game_id = game_id) as favorite_count
        FROM game
        ORDER BY favorite_count DESC, game_name ASC
        LIMIT ${cap}`
}


export async function selectGameByGameName(gameName: string): Promise<Game | null> {
    const rowList = <Game[]>await sql`SELECT * FROM game WHERE game_name=${gameName}`

    const result = GameSchema.array().max(1).parse(rowList)

    return result.length === 1 ? result[0] : null
}

export async function selectGamesByGameYearPublished(year: number): Promise<Game[]> {
    const rowList = <Game[]>await sql`SELECT game_id, game_description, game_genre, game_image_url, game_max_players, game_name, game_year_published FROM game WHERE EXTRACT(YEAR FROM game_year_published)=${year}`

    return GameSchema.array().parse(rowList)
}

export async function selectFavoriteGames(favoriteProfileId: string) : Promise<Game[]> {
    const rowList = <Game[]>await sql`SELECT game_id,
                                             game_description,
                                             game_genre,
                                             game_image_url,
                                             game_max_players,
                                             game_name,
                                             game_year_published
                                      FROM game
                                               INNER JOIN
                                           (SELECT favorite_profile_id, favorite_game_id
                                            FROM favorite
                                            WHERE favorite_profile_id = ${favoriteProfileId})
                                           ON game_id = favorite_game_id`
    return GameSchema.array().parse(rowList)
}

export async function selectAllGenres() : Promise<[]> {
    return <[]>await sql`SELECT DISTINCT (unnest(game.game_genre)) FROM game`
}
