import {z} from "zod";

export const FavoriteSchema = z.object({
    favoriteGameId: z.string({required_error: 'please provide valid favorite gameId or null'}).uuid({message: 'please provide valid favorite gameId'}),
    favoriteProfileId: z.string({required_error: 'please provide valid favorite profileId or null'}).uuid({message: 'please provide valid favorite profileId'}),
})

export type Favorite = z.infer<typeof FavoriteSchema>