'use client'


import {fetchFavoritesByFavoriteGameId, toggleFavorite} from "@/utils/models/favorite/favorite.action";
import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {use} from "react";
import {Favorite} from "@/utils/models/favorite/favorite.model";
import { useRouter} from "next/navigation";

type FavoriteButtonProps = {
    gameId: string
    profileId?: string
    favorites: Favorite[]
}

export function FavoriteButton({ gameId, profileId, favorites }: FavoriteButtonProps) {
    const inFavorites = favorites.filter((favorite: Favorite) => favorite.favoriteProfileId === profileId)
    const router = useRouter()
    return (
        <>
            {/*need this count to move up or down by one depending on the toggle state - needs useState? */}
        <p>Total favorites: {favorites?.length}</p>

        {profileId ? <button onClick={async () => {
            const favorite = {favoriteGameId: gameId, favoriteProfileId: profileId}

            const toggle = await toggleFavorite(favorite)
            router.refresh()
            console.log(toggle)
        } }
            className="bg-gh-teal-200 text-redBrown text-[1.5rem] font-medium px-4 my-2 py-2 rounded border-2 border-redBrown whitespace-nowrap">
            {inFavorites.length === 0 ? 'Add to Favorites' : 'Remove from Favorites'}
        </button> : <>Please Login</>}
        </>
    )
}