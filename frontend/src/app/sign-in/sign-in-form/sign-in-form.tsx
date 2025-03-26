'use client'
import {Button, Label, TextInput} from "flowbite-react";
import {SignUpFormModal} from "@/app/sign-in/sign-in-form/sign-up-form-modal/sign-up-form-modal";
import { SignIn, SignInProfileSchema } from '@/utils/models/sign-in/sign-in.model'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";

import { useState } from 'react'
import { Status } from '@/utils/interfaces/Status'
import { postSignIn } from '@/utils/models/sign-in/sign-in.action'
import { DisplayError } from "@/app/components/display-error";
import { DisplayStatus } from "@/app/components/display-status";

export function SignInForm() {
    const [status, setStatus] = useState<Status|null>(null)

    // define my default values
    const defaultValues : SignIn = {
        profileEmail: '',
        profilePassword: ''
    }

    // get access to return vaules from react hook form and provide validation
    const {register, handleSubmit, reset, formState:{errors}} = useForm<SignIn>({
        resolver: zodResolver(SignInProfileSchema),
        defaultValues,
        mode:'onBlur'
    })

    // register form fields with react hook form
    // create a place to display errors
    // create a place to display status


    // define what happens onSubmit
    const fireServerAction = async (data: SignIn) => {
        try {
            // call to the postSignIn server action
            const response = await postSignIn(data)
            if (response.status === 200) {
                // if status object returned from express is 200 resetForm
                reset()
            }
            // use setStatus to display status from express
            setStatus(response)
        } catch (error) {
            // if an error occurs let user know to try later
            setStatus({status: 500, message: 'sign in request failed try again', data:undefined})
        }
    }




    // if an error occurs let user know to try later


    return(
        <>
            <form onSubmit={handleSubmit(fireServerAction)} className="flex  flex-col mx-auto gap-4">
                <h1 className="text-3xl font-bold">Welcome back.</h1>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email"/>
                    </div>
                    <TextInput
                        autoComplete='email'

                        {...register('profileEmail')}
                        id="email1"
                        type="email"
                        name="profileEmail"
                        aria-invalid={errors.profileEmail? 'true' : 'false'}
                    />
                    <DisplayError error={errors?.profileEmail?.message} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password"/>
                    </div>
                    <TextInput
                        autoComplete='current-password'
                        {...register('profilePassword')}
                        name="profilePassword"
                        id="password1"
                        type="password"
                        aria-invalid={errors.profilePassword ? 'true' : 'false'}
                    />
                    <DisplayError error={errors?.profilePassword?.message} />
                </div>
                <SignUpFormModal/>
                <div className="flex">
                    <Button className={'mr-1'} color={'info'} type="submit">Submit</Button>
                    <Button className='ml-1' color={'failure'} type={'reset'}>Reset</Button>

                </div>
            </form>
            <DisplayStatus  status={status} />
        </>
    )
}