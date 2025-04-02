import { Meetup } from "@/utils/models/meetups/meetup.model"
import { Profile } from "@/utils/models/profile/profile.model"


type PlayerMeetupCardProps = {
    meetup: Meetup
    profile: Profile
    isHost: boolean
    loggedInProfile: Profile
}

export async function PlayerMeetupCard(props:PlayerMeetupCardProps){
    const {meetup, profile, isHost, loggedInProfile} =props

    return (
        <div>
            <p>

                {profile.profileName}
            </p>
            {profile.profileAvatarUrl &&
                <img src={profile.profileAvatarUrl}
            alt={`${profile.profileName}'s avatar`}/>}
        </div>
    )
}
