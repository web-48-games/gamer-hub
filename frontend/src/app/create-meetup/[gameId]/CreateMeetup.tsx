'use client'

import {CreateTitle} from "@/app/create-meetup/[gameId]/CreateTitle";
import {InputField} from "@/app/components/login-signup/InputField";
import React, {useState} from "react";
import {ActionButton} from "@/app/components/login-signup/ActionButton";
import {postMeetup} from "@/utils/models/meetups/meetup.action";
import {Meetup, MeetUpSchema} from "@/utils/models/meetups/meetup.model";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { DisplayStatus } from "@/app/components/display-status";
import {DisplayError} from "@/app/components/display-error";
import { Status } from "@/utils/interfaces/Status";
import {z} from "zod";
import {v7 as uuid} from "uuid";
import { useRouter } from "next/navigation";

export function CreateMeetup(props : {gameId: string, profileId: string}) {
//write date/time object?
    const router = useRouter();

    const {gameId, profileId} = props;
    const formSchema = MeetUpSchema
        .omit({meetupStartTime: true,meetupCreatedAt: true, meetupLat: true, meetupLong: true, meetupId: true})
        .extend({
            meetupStartTime: z.string({required_error: 'Start time is required'}).regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid time format') // HH:mm format
                .refine((time) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
                }, 'Time must be within 00:00 to 23:59'), meetupDate: z.string({required_error: 'Date is required'}).date(), meetupDuration: z.string({required_error: 'Duration is required'})})

    type FormSchema = z.infer<typeof formSchema>;

    const [status, setStatus] = useState<Status | null>(null)

    const defaultValues : FormSchema = {
        meetupGameId: gameId,
        meetupHostProfileId: profileId,
        meetupAddress: '',
        meetupCapacity: 0,
        meetupDescription: '',
        meetupDuration: '',
        meetupName: '',
        meetupDate: '',
        meetupStartTime: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: 'onBlur'
    })
    console.log(errors)

    const fireServerAction = async(data: FormSchema) => {
        try {
            //convert form data into a meetup object
            const meetupStartTime = `${data.meetupDate} ${data.meetupStartTime}:00 +00:00`
            const meetup = {...data, meetupStartTime, meetupId: uuid(), meetupCreatedAt: null, meetupLong: null, meetupLat: null}
            const response = await postMeetup(meetup)
            console.log(response)
            if (response.status === 200) {
                router.push(`/meetups/${meetup.meetupId}`)
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
            <div className="container mx-auto w-full md:w-1/2 p-4 m-4 bg-lightYellow flex flex-col text-center">
                <CreateTitle/>
                <form className="space-y-4 mt-4" onSubmit={handleSubmit(fireServerAction)}>

                    <InputField inputProps={{
                        name: "meetupName",
                        type: "text",
                        id: "meetup-name",
                        labelText: "Meetup Name:",
                        register: register
                    }}/>
                    <DisplayError error={errors?.meetupName?.message} />

                    <InputField inputProps={{
                        name: "meetupCapacity",
                        type: "number",
                        id: "meetup-capacity",
                        labelText: "Meetup Capacity:",
                        register: register
                    }}/>
                    <DisplayError error={errors?.meetupCapacity?.message} />

                    <InputField inputProps={{
                        name: "meetupAddress",
                        type: "text",
                        id: "meetup-address",
                        labelText: "Meetup Address:",
                        register: register
                    }}/>
                    <DisplayError error={errors?.meetupAddress?.message} />

                    <InputField inputProps={{
                        name: "meetupStartTime",
                        type: "time",
                        id: "meetup-start-time",
                        labelText: "Meetup Start Time",
                        register: register
                    }}/>
                    {/*extract time*/}
                    <DisplayError error={errors?.meetupStartTime?.message} />

                    {/*extract date*/}
                    <InputField inputProps={{
                        name: "meetupDate",
                        type: "date",
                        id: "meetup-start-date",
                        labelText: "Meetup Start Date:",
                        register: register
                    }}/>
                    <DisplayError error={errors?.meetupDate?.message} />

                    <InputField inputProps={{
                        name: "meetupDuration",
                        type: "decimal",
                        id: "meetup-duration",
                        labelText: "Meetup Duration:",
                        register: register
                    }}/>
                    <DisplayError error={errors?.meetupDuration?.message} />

                    <InputField inputProps={{
                        name: "meetupDescription",
                        type: "text",
                        id: "meetup-description",
                        labelText: "Meetup Description:",
                        register: register
                    }}/>
                    <DisplayError error={errors?.meetupDescription?.message} />

                    <ActionButton buttonText={"Create Meetup"}/>

                    <DisplayStatus status={status} />

                </form>
            </div>
        </>
    )
}