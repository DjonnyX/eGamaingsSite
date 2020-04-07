import {IGameModel} from '../src/app/models/IGameModel';

const TBL_GAMES: Array<IGameModel> = [];

/**
 * БД
 */
const db = {
    "games": TBL_GAMES,
}
export default db;