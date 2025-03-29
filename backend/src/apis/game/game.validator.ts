import {z} from "zod";

// define game schema
export const GameSchema = z.object({
    gameId: z.string({required_error: 'provide valid gameId or null'}).uuid({message: 'please provide valid uuid for gameId'}),
    gameDescription: z.string({message: 'please provide valid gameDescription max(512 chars)'}),
    gameGenre: z.string({message: 'please provide valid gameName'}).array(),
    gameImageUrl: z.string().max(512, {message: 'please provide valid gameImageUrl'}),
    gameMaxPlayers: z.number({message: 'please provide a valid number of gameMaxPlayers'}),
    gameName: z.string().max(64, {message: 'please provide valid gameGenre max(64 chars)'}),
    gameYearPublished: z.coerce.number({message: 'please provide valid number of gameYearPublished'})
})
