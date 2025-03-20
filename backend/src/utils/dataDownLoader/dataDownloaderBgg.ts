import axios from "axios"
import {XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import {Game, insertGame} from "../../apis/game/game.model";
import {v7 as uuidv7} from "uuid";

interface Post {
    postId: string | null,
    postUserId: number,
    postContent: string,
    postTitle: string
}

function dataDownloader() : Promise<any> {
    return main()
    async function main() {
        try {
            await downloadPosts()

        } catch (e) {
            console.log(e)
        }
    }

    async function downloadPosts() {
        try {
            for (let i = 1; i < 4; i++) {


            const {data} = await axios.get(`https://boardgamegeek.com/xmlapi/boardgame/${i}`)
                if(XMLValidator.validate(data)){
                    const parser = new XMLParser();
                    let jsonObj = parser.parse(data);

                    // console.log('Description:', jsonObj.boardgames.boardgame.description); // game_description
                    // console.log('Genres:', jsonObj.boardgames.boardgame.boardgamecategory) // game_genre
                    // console.log('Image:', jsonObj.boardgames.boardgame.image) // game_image_url
                    // console.log('max players:', jsonObj.boardgames.boardgame.maxplayers) // game_max_players
                    // Array.isArray(jsonObj.boardgames.boardgame.name) ? console.log('name(s):', jsonObj.boardgames.boardgame.name[0]) : console.log('name(s):', jsonObj.boardgames.boardgame.name) // game_name (it's possible to have multiple language names)
                    // console.log('year published:', jsonObj.boardgames.boardgame.yearpublished); // game_year_published

                    let game: Game = {
                        gameId: uuidv7(),
                        gameDescription: jsonObj.boardgames.boardgame.description,
                        gameGenre: jsonObj.boardgames.boardgame.boardgamecategory,
                        gameImageUrl: jsonObj.boardgames.boardgame.image,
                        gameMaxPlayers: jsonObj.boardgames.boardgame.maxplayers,
                        gameName: Array.isArray(jsonObj.boardgames.boardgame.name) ? jsonObj.boardgames.boardgame.name[0] : jsonObj.boardgames.boardgame.name,
                        gameYearPublished: jsonObj.boardgames.boardgame.yearpublished
                    }
                    await insertGame(game)
                }
            }

        } catch (error) {
            console.error(error)
        }
    }
}

dataDownloader().catch(error => console.error(error))