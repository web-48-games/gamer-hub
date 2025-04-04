
// import {Categories} from "@/app/games/categories";
import {Carousel} from "@/app/games/carousel";
import {GameResult} from "@/app/games/GameResult";
import {FilterMenu} from "@/app/components/FilterMenu";
import {GameCard} from "@/app/components/GameCard";
import {
    fetchAllGenres, fetchFeaturedGames,
    fetchGamesByFavoriteProfileId,
    fetchGamesByGenre,
    fetchGamesByGenres
} from "@/utils/models/game/game.action";
import {Game} from "@/utils/models/game/game.model";
import {PageProps} from "@/utils/interfaces/NextComponent";

export default async function (props: PageProps<any>) {
    let params = await props.searchParams
    let genreParams: any[] = Object.values(params)
    console.log(genreParams)
    let games: Game[] = await fetchFeaturedGames()
    if (genreParams.length) {
        games = await fetchGamesByGenres(genreParams)
    }
    const genres: [] = await fetchAllGenres()
    const gameSlice = games.slice(0, 8)

    return (
        <>
            {/*<section className="container mx-auto p-20">*/}
            {/*    */}
            {/*</section>*/}
            {/*<hr className="border-b border-gray-300 border-2"/>*/}
            <section className="mx-auto mt-6 container relative">
                <div className={"flex"}>
                    {/*Desktop Filter*/}
                    <div className="w-64 shrink-0 hidden md:block">
                        <FilterMenu genres={genres}/>
                    </div>
                    <div className={"w-full md:ml-4"}>
                        {gameSlice.map((game, i) => <GameResult key={i} gameData={game}/>)}
                    </div>
                </div>
                {/* Mobile filter is rendered outside the flex container
       so it can be positioned fixed without interference */}
                <div className="md:hidden">
                    <FilterMenu genres={genres}/>
                </div>
            </section>
        </>
    )
}