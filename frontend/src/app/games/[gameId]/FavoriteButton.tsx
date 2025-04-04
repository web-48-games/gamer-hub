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
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 my-6">

                <p className={"text-lg font-medium"}>Total favorites: {favorites?.length}</p>

                {profileId ? <button onClick={async () => {
                    const favorite = {favoriteGameId: gameId, favoriteProfileId: profileId}

                    const toggle = await toggleFavorite(favorite)
                    router.refresh()
                    console.log(toggle)
                }}
                                     className="bg-gh-teal-200 text-redBrown text-[1.5rem] font-medium px-4 my-2 py-2 rounded border-2 border-redBrown whitespace-nowrap">
                    {inFavorites.length === 0 ? 'Add to Favorites' : 'Remove from Favorites'}
                </button> : <><span className={"text-xl font-bold text-gh-red-400"}>Please Login</span></>}
            </div>
        </>
    )
}