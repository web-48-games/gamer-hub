import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {fetchMeetupsByGame} from "@/utils/models/meetups/meetup.action";
import {GameCard} from "@/app/components/GameCard";
import {MeetupCard} from "@/app/meetups/MeetupCard";
import {fetchProfileByProfileId} from "@/utils/models/profile/profile.action";
import {FavoriteButton} from "@/app/games/[gameId]/FavoriteButton";
import {getSession} from "@/utils/auth.utils";
import {fetchFavoritesByFavoriteGameId} from "@/utils/models/favorite/favorite.action";


export default async function({ params }: { params: Promise<{ gameId: string }> }) {
    const {gameId} = await params;
    console.log(gameId);
    const game = await fetchGameByGameId(gameId)
    const meetups = await fetchMeetupsByGame(gameId)
    const session = await getSession()
    const favorites = await fetchFavoritesByFavoriteGameId(gameId)
    const profileId = session?.profile?.profileId
    // const host = await fetchProfileByProfileId()

    return (
        <>
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-8 mt-12">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cosa-600 text-center">
                    {game?.gameName}
                </h1>
            </div>

            {game && <GameCard gameCardInfo={game}/>}

            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 my-8">
                <a
                    href={`/create-meetup/${gameId}`}
                    className="block w-full bg-cosa-500 hover:bg-cosa-600 text-white text-center font-medium py-4 rounded-lg shadow-md transition-colors duration-300"
                >
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                        <span className="text-xl">Create a Meetup</span>
                    </div>
                </a>
            </div>
            {/*<div className="flex flex-col items center p-4">*/}
            {/*    <button*/}
            {/*        className="bg-gh-teal-200 text-redBrown text-[1.5rem] font-medium px-4 my-2 py-2 rounded border-2 border-redBrown whitespace-nowrap">*/}
            {/*        <a href={`/create-meetup/${gameId}`}>Create a Meetup</a>*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 my-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-cosa-600 mb-6">
                    Upcoming Meetups <span className="text-cosa-400 font-normal">({meetups.length})</span>
                </h2>
                <div className="space-y-4">
                    {meetups && meetups.map((meetup, i) => <MeetupCard key={i} meetup={meetup}/>)}
                </div>
            </div>

            <FavoriteButton favorites={favorites} gameId={gameId} profileId={profileId}/>
        </>
    )
}