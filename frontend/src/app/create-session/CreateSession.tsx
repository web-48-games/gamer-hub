import {CreateTitle} from "@/app/create-session/CreateTitle";
import {InputField} from "@/app/Components/login-signup/InputField";
import React from "react";
import {ActionButton} from "@/app/Components/login-signup/ActionButton";

export function CreateSession() {
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     // add more create session logic here if needed
    // }

    return (
        <>
            <div className="container mx-auto w-full md:w-1/2 p-4 m-4 bg-orange-300 flex flex-col text-center">
                <CreateTitle/>
                <form className="space-y-4 mt-4">
                    <InputField inputProps={{
                        name: "host-username",
                        type: "text",
                        id: "host-username",
                        labelText: "Host Username:"
                    }}/>

                    <InputField inputProps={{
                        name: "game-name",
                        type: "text",
                        id: "game-name",
                        labelText: "Game Name:"
                    }}/>

                    <InputField inputProps={{
                        name: "genre-tags",
                        type: "text",
                        id: "genre-tags",
                        labelText: "Genres/Tags:"
                    }}/>

                    <InputField inputProps={{
                        name: "session-address",
                        type: "text",
                        id: "session-address",
                        labelText: "Session Address:"
                    }}/>

                    <InputField inputProps={{
                        name: "session-time",
                        type: "time",
                        id: "session-time",
                        labelText: "Session Time"
                    }}/>

                    <InputField inputProps={{
                        name: "session-date",
                        type: "date",
                        id: "session-date",
                        labelText: "Session Date:"
                    }}/>

                    <ActionButton buttonText={"Create Session"}/>
                </form>
            </div>
        </>
    )
}