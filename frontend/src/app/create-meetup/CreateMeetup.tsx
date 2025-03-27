import {CreateTitle} from "@/app/create-meetup/CreateTitle";
import {InputField} from "@/app/Components/login-signup/InputField";
import React, {useState} from "react";
import {ActionButton} from "@/app/Components/login-signup/ActionButton";
import {postMeetup} from "@/utils/models/meetups/meetup.action";
import {Meetup, MeetUpSchema} from "@/utils/models/meetups/meetup.model";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { DisplayStatus } from "@/app/components/display-status";
import {DisplayError} from "@/app/components/display-error";
import { Status } from "@/utils/interfaces/Status";

export function CreateMeetup() {
//write date/time object?

    const [status, setStatus] = useState<Status | null>(null)

    const defaultValues : Meetup = {
        meetupId: '',
        meetupGameId: '',
        meetupHostProfileId: '',
        meetupAddress: '',
        meetupCreatedAt: Date(),
        meetupDescription: '',
        meetupDuration: '',
        meetupLat: '',
        meetupLong: '',
        meetupStartTime: ''
    }

    const {register, handleSubmit, reset} = useForm<Meetup>({
        resolver: zodResolver(MeetUpSchema),
        defaultValues,
        mode: 'onBlur'
    })

    const fireServerAction = async(data: Meetup) => {
        try {

            const response = await postMeetup(data)
            if (response.status === 200) {
                reset()
            }
            setStatus(response)
        } catch (error) {
            setStatus({
                status: 500,
                message: 'Meetup cannot be posted, try again',
                data: undefined
            })

        }
    }

    return (
        <>
            <div className="container mx-auto w-full md:w-1/2 p-4 m-4 bg-orange-300 flex flex-col text-center">
                <CreateTitle/>
                <form className="space-y-4 mt-4" onSubmit={handleSubmit(fireServerAction)}>
                    <InputField inputProps={{
                        name: "host-username",
                        type: "text",
                        id: "host-username",
                        labelText: "Host Username:"
                    }}/>
                    <DisplayError error={errors?.meetupHostProfileId?.message} />

                    <InputField inputProps={{
                        name: "game-name",
                        type: "text",
                        id: "game-name",
                        labelText: "Game Name:"
                    }}/>
                    <DisplayError error={errors?.meetupGameId?.message} />

                    <InputField inputProps={{
                        name: "genre",
                        type: "text",
                        id: "genre",
                        labelText: "Genre:"
                    }}/>
                    <DisplayError error={errors?.gameGenre?.message} />

                    <InputField inputProps={{
                        name: "meetup-address",
                        type: "text",
                        id: "meetup-address",
                        labelText: "Meetup Address:"
                    }}/>
                    <DisplayError error={errors?.meetupAddress?.message} />

                    <InputField inputProps={{
                        name: "meetup-start-time",
                        type: "time",
                        id: "meetup-start-time",
                        labelText: "Meetup Start Time"
                    }}/>
                    {/*extract time*/}
                    <DisplayError error={errors?.meetupStartTime?.message} />

                    {/*extract date*/}
                    {/*<InputField inputProps={{*/}
                    {/*    name: "meetup-start-date",*/}
                    {/*    type: "date",*/}
                    {/*    id: "meetup-start-date",*/}
                    {/*    labelText: "Meetup Start Date:"*/}
                    {/*}}/>*/}


                    <ActionButton buttonText={"Create Meetup"}/>
                </form>
            </div>
        </>
    )
}