import axios from "axios"
import {Game, insertGame} from "../../apis/game/game.model";
import {v7 as uuidv7} from "uuid";
import {GameSchema} from "../../apis/game/game.validator";
import {zodErrorResponse} from "../response.utils";
import {response, Response} from 'express';

const { XMLParser, XMLValidator } = require("fast-xml-parser")

function dataDownloader() : Promise<any> {
    return main()
    async function main() {
        try {
            await downloadPosts()
            return
        } catch (e) {
            console.log(e)
        }
    }

    function range(start: number, end: number) {
        const result = []
        for (let i=start; i<=end; i++) {
            result.push(i)
        }
        return result
    }

    async function downloadPosts() {
        try {
            for (let i = 1; i < 1000; i++) {
            const {data} = await axios.get(`https://boardgamegeek.com/xmlapi/boardgame/${range(20*(i-1)+1, i*20).join(',')}`)
                if(XMLValidator.validate(data)){
                    const parser = new XMLParser();
                    let jsonObj = parser.parse(data);

                    for (let currentGame of jsonObj.boardgames.boardgame) {
                        let game: Game = {
                            gameId: uuidv7(),
                            gameDescription: currentGame.description,
                            gameGenre: Array.isArray(currentGame.boardgamecategory) ? currentGame.boardgamecategory : [currentGame.boardgamecategory],
                            gameImageUrl: currentGame.image,
                            gameMaxPlayers: currentGame.maxplayers,
                            gameName: Array.isArray(currentGame.name) ? currentGame.name[0] : currentGame.name,
                            gameYearPublished: currentGame.yearpublished
                        }
                        // console.log(game)
                        const validateGame = GameSchema.safeParse(game)

                        if (validateGame.success) {
                            console.log(game.gameName, i)
                            await insertGame(game)
                        }
                    }
                }
            }
            console.log('finished.')

        } catch (error) {
            console.error(error)
        }
        return
    }
}

dataDownloader().catch(error => console.error(error))