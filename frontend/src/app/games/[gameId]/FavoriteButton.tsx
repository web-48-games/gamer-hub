'use client'


import {fetchFavoritesByFavoriteGameId, toggleFavorite} from "@/utils/models/favorite/favorite.action";
import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {use} from "react";

type FavoriteButtonProps = {
    gameId: string
    profileId?: string
}

export function FavoriteButton({ gameId, profileId }: FavoriteButtonProps) {

    // const favorites = use(fetchFavoritesByFavoriteGameId(gameId));
    // console.log(favorites);


    return (
        <>
        <p>Total favorites: {}</p>

        {profileId ? <button onClick={async () => {
            const favorite = {favoriteGameId: gameId, favoriteProfileId: profileId}

            const toggle = await toggleFavorite(favorite)
            console.log(toggle)
        } }
            className="bg-gh-teal-200 text-redBrown text-[1.5rem] font-medium px-4 my-2 py-2 rounded border-2 border-redBrown whitespace-nowrap">
            Add to Favorites
        </button> : <>Please Login</>}
        </>
    )
}