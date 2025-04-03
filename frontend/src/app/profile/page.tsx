'use server'

import {PlayerCard} from "@/app/components/PlayerCard";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";
import {getSession} from "@/utils/auth.utils";
import {PageProps} from "@/utils/interfaces/NextComponent";
import { Profile } from "@/utils/models/profile/profile.model";
import {Meetup} from "@/utils/models/meetups/meetup.model";
import {fetchMeetupsByRsvpProfileId} from "@/utils/models/meetups/meetup.action";
import {MeetupCard} from "@/app/meetups/MeetupCard";

export default async function (props: PageProps<{}>) {

    const session = await getSession()

    //can style return statement later
    if(!session) {
        return <>
            <p className="text-4xl m-4 text-center text-gh-red-400">Must be signed in to view profile information</p>
        </>
    }


    const profile: Profile = await fetchProfileByProfileId(session.profile.profileId)
    console.log(profile, 'Is there a profile?')

    const meetups: Meetup[] = await fetchMeetupsByRsvpProfileId(session.profile.profileId)
    console.log(meetups, 'meetup?')
    //get games and filter || get games in meetup card
    return (
        <>
            <div>
                {profile && meetups.map((meetup, i) => <MeetupCard meetup={meetup} key={i}/>
                )}
            </div>
            <div className="container flex flex-col items-center mx-auto ">
                {profile && <PlayerCard profile={profile}/>}
            </div>
        </>
    )
}