import {GameSchema} from "./game.validator";
import {z} from "zod";


export type Game = z.infer<typeof GameSchema>


export async function selectGameByGameId(gameId): Promise<Game | null> {
    const rowList = <Game[]>await sql`SELECT * FROM game WHERE gameId=${gameId}`

    const result = GameSchema.array().max(1).parse(rowList)

    return result.length === 1 ? result[0] : null
}