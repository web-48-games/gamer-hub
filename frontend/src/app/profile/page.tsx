'use server'

import {PlayerCard} from "@/app/components/PlayerCard";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";
import {getSession} from "@/utils/auth.utils";
import {PageProps} from "@/utils/interfaces/NextComponent";
import { Profile } from "@/utils/models/profile/profile.model";

export default async function (props: PageProps<{}>) {

    const session = await getSession()

    //can style return statement later
    if(!session) {
        return <>
            Must be signed in to view profile information
        </>
    }


    const profile: Profile = await fetchProfileByProfileId(session.profile.profileId)


    return (
        <>
            <div className="container flex flex-col items-center mx-auto ">
                {profile && <PlayerCard profile = {profile}/>}
            </div>
        </>
    )
}