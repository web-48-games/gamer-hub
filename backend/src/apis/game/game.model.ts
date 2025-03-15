import {GameSchema} from "./game.validator";
import {z} from "zod";
import {sql} from "../../utils/database.utils";


export type Game = z.infer<typeof GameSchema>


export async function selectGameByGameId(gameId: string): Promise<Game | null> {
    const rowList = <Game[]>await sql`SELECT * FROM game WHERE game_id=${gameId}`

    const result = GameSchema.array().max(1).parse(rowList)

    return result.length === 1 ? result[0] : null
}

export async function selectGamesByGenre(gameGenre: string): Promise<Game[]> {
    const rowList = <Game[]>await sql`SELECT game_id, game_description, game_genre, game_image_url, game_max_players, game_name, game_year_published FROM game WHERE game_genre=${gameGenre}`

    return GameSchema.array().parse(rowList)
}

// come back for carousel selection
export async function selectFeaturedGames(cap: number): Promise<(Game & { favoriteCount: number})[]> {
    return <Game[]>await sql`SELECT game_id, game_description, game_genre, game_image_url, game_max_players, game_name, game_year_published,
                                     (SELECT COUNT(*) FROM favorite WHERE favorite_game_id = game_id) as favoriteCount
                                     FROM game
                                     ORDER BY "favoriteCount" DESC, game_name ASC
                                     LIMIT ${cap}`
}


export async function selectGameByGameName(gameName: string): Promise<Game | null> {
    const rowList = <Game[]>await sql`SELECT * FROM game WHERE game_name=${gameName}`

    const result = GameSchema.array().max(1).parse(rowList)

    return result.length === 1 ? result[0] : null
}

export async function selectGamesByGameYearPublished(gameYearPublished: number): Promise<Game[]> {
    const rowList = <Game[]>await sql`SELECT game_id, game_description, game_genre, game_image_url, game_max_players, game_name, game_year_published FROM game WHERE game_year_published=${gameYearPublished}`

    return GameSchema.array().parse(rowList)
}