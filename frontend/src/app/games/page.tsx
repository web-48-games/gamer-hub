
// import {Categories} from "@/app/games/categories";
import {Carousel} from "@/app/games/carousel";
import {GameResult} from "@/app/games/GameResult";
import {FilterMenu} from "@/app/components/FilterMenu";
import {GameCard} from "@/app/components/GameCard";
import {fetchAllGenres, fetchGamesByGenre} from "@/utils/models/game/game.action";
import {Game} from "@/utils/models/game/game.model";

export default async function () {

    let games: Game[] = await fetchGamesByGenre("Nautical")
    const genres: [] = await fetchAllGenres()
    const gameSlice = games.slice(0, 8)

    // let gameInfo: gameData = {
    //     gameName: "Wingspan",
    //     gameImageUrl: "/wingspan_sample.webp",
    //     gameGenre: "Strategy",
    //     gameReleased: "2019",
    //     gameMaxPlayers: 4,
    //     gameDescription: "Friendly but competitive game about interesting and beautiful winged creatures in the great outdoors.",
    //     gameRanking: 34
    // }

    return (
        <>
            <section className="container mx-auto p-20">
                {/*<div className={"flex justify-center items-center"}>*/}
                {/*    <Categories />*/}
                {/*</div>*/}

                {/*<Carousel slides={[{*/}
                {/*    title: "HELLO WORLD",*/}
                {/*    button: "CLICK ME",*/}
                {/*    src: "/dice.svg"*/}
                {/*},*/}
                {/*    {*/}
                {/*        title: "I AM A GAME",*/}
                {/*        button: "ThisDoesntWork",*/}
                {/*        src: "/globe.svg"*/}
                {/*    },*/}
                {/*    {*/}
                {/*        title: "Goodbye Cruel World!",*/}
                {/*        button: "Dontmindme",*/}
                {/*        src: "/vercel.svg"*/}
                {/*    }]}/>*/}
            </section>
            <hr className="border-b border-gray-300 border-2"/>
            <section className="mx-auto mt-6 container relative">
                <div className={"flex"}>
                    <div className="w-64 shrink-0 hidden md:block">

                        <FilterMenu genres={genres}/>
                    </div>
                    <div className={"w-full md:ml-4"}>
                        {gameSlice.map(game => <GameResult gameData={game}/>)}
                    </div>
                </div>
                {/* Mobile filter is rendered outside the flex container
       so it can be positioned fixed without interference */}
                <div className="md:hidden">
                    {/*<FilterMenu />*/}
                </div>
            </section>
        </>
    )
}