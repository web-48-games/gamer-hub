'use client'

import { Profile } from "@/utils/models/profile/profile.model"
import {Game} from "@/utils/models/game/game.model";
import {Favorite, FavoriteSchema} from "@/utils/models/favorite/favorite.model";
import {z} from "zod";
import {Status} from "@/utils/interfaces/Status";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {postFavorite} from "@/utils/models/favorite/favorite.action";

type Props = {
    profile?: Profile
    game?: Game
}

const formSchema = FavoriteSchema

type formValues = z.infer<typeof formSchema>

export function FavoriteForm(props: Props) {
    // define status state variable
    const [status, setStatus] = React.useState<Status | null>(null)

    // access profile and game object from props
    const profile = props?.profile
    const game = props?.game

    // if profile or game is undefined return an empty frag
    if (!profile || !game) {
        return <></>
    }

    // define default values
    const defaultValues= {
        favoriteGameId: '',
        favoriteProfileId: ''
    }

    // get access to return values from react hook form and provide validation
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues,
        mode: 'onBlur', // not sure if this right
        resolver: zodResolver(formSchema)
    })

    // register form fields with react hook form
    // create a place to display errors
    // create a place to display statu
    // define what happens onSubmit
    const fireServerAction = async (data: formValues) => {
        try {
            // build favorite object
            const favorite: Favorite = {
                favoriteGameId: game.gameId,
                favoriteProfileId: profile.profileId
            }

            // call to postFavorite server action
            const response = await postFavorite(favorite)
            if (response.status === 200) {
                // if status object returned from express is 200 resetForm
                reset()
            }
            // use setStatus to display status from express
            setStatus(response)
        } catch(error) {
            // if error occurs, let user know to try later
            setStatus({status: 500,
                message: 'favorite request failed to try again',
                data: undefined})
        }
    }

    return (
        <>
            <h1 className="text-3xl p-4 font-bold">`${profile.profileName}'s Favorites`</h1>
            <form onSubmit={handleSubmit(fireServerAction)}>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Post Favorite
                    </button>
                </div>
            </form>
        </>
)
}