import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {fetchMeetupsByGame} from "@/utils/models/meetups/meetup.action";
import {GameCard} from "@/app/components/GameCard";
import {MeetupCard} from "@/app/meetups/MeetupCard";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";
import {FavoriteButton} from "@/app/games/[gameId]/FavoriteButton";
import {getSession} from "@/utils/auth.utils";


export default async function({ params }: { params: Promise<{ gameId: string }> }) {
    const {gameId} = await params;
    console.log(gameId);
    const game = await fetchGameByGameId(gameId)
    const meetups = await fetchMeetupsByGame(gameId)
    const session = await getSession()
    const profileId = session?.profile?.profileId
    // const host = await fetchProfileByProfileId()

    return (
        <>
            <h1>Game Page for {game?.gameName} and its {meetups?.length} meetups </h1>
            {game && <GameCard gameCardInfo={game}/>}
            <div className="flex flex-col items center p-4">
                <button
                    className="bg-gh-teal-200 text-redBrown text-[1.5rem] font-medium px-4 my-2 py-2 rounded border-2 border-redBrown whitespace-nowrap">
                    <a href={`/create-meetup/${gameId}`}>Create a Meetup</a>
                </button>
            </div>
            {meetups && meetups.map((meetup, i) => <MeetupCard key={i} meetup={meetup} game={game} />)}
            <div className="flex flex-col items center p-4">
                <FavoriteButton gameId={gameId} profileId={profileId} />
            </div>
        </>
    )
}