'use client'

import {Profile, ProfileSchema} from "@/utils/models/profile/profile.model";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {z} from "zod";
import React from "react";
import {Status} from "@/utils/interfaces/Status";
import {zodResolver} from "@hookform/resolvers/zod";
import {putProfile} from "@/utils/models/profile/profile.action";
import {useRouter} from "next/navigation";
import {postImage} from "@/utils/models/image/image.action";
import { ImageUploadDropZone } from "./ImageUploadDropZone";
import {InputField} from "@/app/components/login-signup/InputField";
import {DisplayStatus} from "@/app/components/display-status";


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

    type ProfileSchema = z.infer<typeof profileSchema>

    const router = useRouter();
    let {profile} = props
    const [status, setStatus] = React.useState<Status | null>(null)

    const defaultValues = profile

    const {register, handleSubmit, reset, control, setError, clearErrors, formState: {errors}} = useForm<ProfileSchema>({
        defaultValues,
        mode: 'onBlur',
        resolver: zodResolver (profileSchema),
    })

    const [selectedImage, setSelectedImage] = React.useState<string | null> (null)

    //fireServerAction rewrite to accommodate image upload
    const fireServerAction = async(data: ProfileSchema) => {
        try {
            //checking for valid image type
            if(errors?.profileAvatarUrl) {
                setStatus({status:500, message: 'Select a new image', data: undefined})
                return
            }
            let profileAvatarUrl = null
            if(data.profileAvatarUrl) {
                //backend, to cloudinary
                const response = await postImage(data.profileAvatarUrl)
                if (response.status === 200) {
                    profileAvatarUrl = response.message
                } else {
                    setStatus({status: 500, message: 'Image failed to upload', data: undefined})
                    return
                }
            }

            const finalResponse = await putProfile({...data, profileAvatarUrl})
            setStatus(finalResponse)
            if (finalResponse.status === 200 ) {
                setSelectedImage(null)
                reset ()
            }

            // const response = await putProfile(profile)
            // if (response.status === 200) {
            //     router.push(`/profile`)
            // }
            // setStatus(response)
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

                className="m-20 w-full md:max-w-xl bg-wasa-200 border-b-2 shadow-lg shadow-wasa-500 rounded-lg dark:text-white  dark:border-gray-500 p-8">
                <div className="flex flex-cols-1 p-4 pt-4 bg-cosa-100 shadow-sm rounded-lg w-full">
                    <form onSubmit={handleSubmit(fireServerAction)}>

                        {/*Dropzone for image upload*/}
                        <ImageUploadDropZone control={control}
                                             fieldValue={'profileAvatarUrl'}
                                             setSelectedImage={setSelectedImage}
                                             setError={setError}
                                             clearErrors={clearErrors}/>

                        {/*send image back to frontend */}
                        {selectedImage ? <img src={selectedImage} alt={'profile picture'}/> : <></>}


                        {/*<div className="flex flex-col items-center pb-10">*/}

                        {/*    <InputField inputProps={{*/}
                        {/*        name: "profileName",*/}
                        {/*        type: "text",*/}
                        {/*        id: "profile-name",*/}
                        {/*        labelText: "Name",*/}
                        {/*        register: register*/}
                        {/*    }}/>*/}
                        {/*</div>*/}
                        <div>
                            <label htmlFor={"profileName"}
                                   className="block text-[1rem] md:text-[1.5rem] xl:text-[2rem]  font-bold text-gh-teal-500 mb-1">
                                Name
                            </label>
                            <input
                                // name={"profileAboutMe"}
                                      id={"profileName"} {...register("profileName")}

                                      className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cosa-500"}
                            />
                        </div>

                        <div>
                            <label htmlFor={"profileAboutMe"}
                                   className="block text-[1rem] md:text-[1.5rem] xl:text-[2rem] font-bold text-gh-teal-500 mb-1">
                                About Me
                            </label>
                            <textarea rows={3}
                                // name={"profileAboutMe"}
                                      id={"profileAboutMe"} {...register("profileAboutMe")}

                                      className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cosa-500"}
                            />
                        </div>
                        <button type="submit"
                                className="p-2 text-[1rem] md:text-[1.25rem] xl:text-[1.5rem] hover:shadow-cosa-500 bg-wasa-300 hover:bg-wasa-400 rounded-lg hover:text-white">
                            Submit
                        </button>
                        <DisplayStatus status={status}></DisplayStatus>
                    </form>
                </div>
            </div>

        </>
    )
}