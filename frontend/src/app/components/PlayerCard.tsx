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

export function PlayerCard(props: PlayerCardProps) {

    const formSchema = ProfileSchema

    type FormValues = z.infer<typeof formSchema>

    //added image url to schema
    const profileSchema = ProfileSchema.extend(
        {
            profileAvatarUrl: z.preprocess((val) => (val === "" ? null : val), z.any().optional())
        }
    )

    const router = useRouter();
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
                        </div>
                        <div>

                        </div>

                        <div>
                            <label htmlFor={"profileAboutMe"}
                                   className="block text-sm font-bold text-blue-800 mb-1">
                                    About Me
                            </label>
                            <textarea rows={3}
                                      // name={"profileAboutMe"}
                                      id={"profileAboutMe"} {...register("profileAboutMe")}

                                   className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}
                            />
                        </div>
                        <button type="submit" className="p-2 border-2 border-redBrown bg-paleRed">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}