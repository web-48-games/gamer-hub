import {fetchGameByGameId} from "@/utils/models/game/game.action";
import {fetchMeetupsByGame} from "@/utils/models/meetups/meetup.action";
import {GameCard} from "@/app/components/GameCard";


export default async function({ params }: { params: Promise<{ gameId: string }> }) {
    const {gameId} = await params;
    console.log(gameId);
    const game = await fetchGameByGameId(gameId)
    const meetups = await fetchMeetupsByGame(gameId)
    console.log(game)
    console.log(meetups)

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
            {meetups && meetups.map(meetup => <MeetupCard props={meetup}/>)}
            <div className="flex flex-col items center p-4">
                <button
                    className="bg-gh-teal-200 text-redBrown text-[1.5rem] font-medium px-4 my-2 py-2 rounded border-2 border-redBrown whitespace-nowrap">
                    Add to Favorites
                </button>
            </div>
        </MeetupCard>
    )
}