'use client'

import {Profile, ProfileSchema} from "@/utils/models/profile/profile.model";
import {useForm} from "react-hook-form";
import {z} from "zod";
import React from "react";
import {Status} from "@/utils/interfaces/Status";
import {zodResolver} from "@hookform/resolvers/zod";
import {InputField} from "@/app/components/login-signup/InputField";
import {putProfile} from "@/utils/models/profile/profile.action";
import {useRouter} from "next/navigation";


export type PlayerCardProps = {
    profile: Profile
}

const formSchema = ProfileSchema

type FormValues = z.infer<typeof formSchema>

export function PlayerCard(props: PlayerCardProps) {

    const router = useRouter();
    let {profile:{profileId, profileAboutMe, profileAvatarUrl, profileName, profileCreationDate}} = props
    let {profile} = props
    const [status, setStatus] = React.useState<Status | null>(null)

    const defaultValues = profile

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver (formSchema),
    })

    const fireServerAction = async(profile: FormValues) => {
        try {
            const response = await putProfile(profile)
            if (response.status === 200) {
                router.push(`/profiles/${profile.profileId}`)
            }
            setStatus(response)
        } catch (error) {
            setStatus({
                status: 500,
                message: 'Profile cannot be found',
                data: undefined
            })
        }
    }


    return (
        <>
            {/*Name, Avatar, About, Favorites*/}


            <div
                className="m-20 w-full md:max-w-xl bg-lightYellow border-b-2 border-redBrown shadow-lg shadow-redBrown rounded-lg shadow-md dark:text-white dark:bg-redBrown dark:border-gray-500 p-8">
                <div className="p-4 pt-4 bg-white border border-redBrown shadow-sm rounded-lg w-full">
                    <form onSubmit={handleSubmit(fireServerAction)}>
                            <div className="flex flex-col items-center pb-10">

                                <InputField inputProps={{
                                    name: "profileName",
                                    type: "text",
                                    id: "profile-name",
                                    labelText: "Name",
                                    register: register
                                }}/>
                                <InputField inputProps={{
                                    name: "profileAboutMe",
                                    type: "text",
                                    id: "profile-about-me",
                                    labelText: "About Me",
                                    register: register
                                }}/>
                            </div>

                    </form>
                </div>
            </div>

        </>
    )
}