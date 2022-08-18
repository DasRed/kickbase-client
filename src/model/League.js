//noinspection ES6UnusedImports
import Client from '../Client.js';
import LeagueUser from './LeagueUser.js';
import MarketPlayer from './MarketPlayer.js';
import Model from './Model.js';
import Player from './Player.js';

export default class League extends Model {
    /**
     *
     * @param {Client} client
     * @param {User} user
     * @param {string} id
     * @param {string} cpi
     * @param {string} name
     * @param {string} creator
     * @param {string} creatorId
     * @param {string} creation
     * @param {object} values
     */
    constructor(client, user, {id, cpi, name, creator, creatorId, creation, ...values}) {
        super(client, values);

        this.user = user;

        this.id        = id;
        this.cpi       = cpi;
        this.name      = name;
        this.creator   = creator;
        this.creatorId = creatorId;
        this.creation  = creation;
        this.values    = values;
    }

    /** @returns {Promise<MarketPlayer[]>} */
    async getMarketPlayers() {
        const data = await this.client.get(`/leagues/${this.id}/market`);

        return data.players.map((marketPlayer) => new MarketPlayer(this.client, this, marketPlayer));
    }

    /** @returns {Promise<LeagueUser>} */
    async getMe() {
        return new LeagueUser(this.client, await this.client.get(`/leagues/${this.id}/me`));
    }

    /** @returns {Promise<Player[]>} */
    async getMyPlayers() {
        const data = await this.client.get(`/leagues/${this.id}/users/${this.user.id}/players`);

        return data.players.map((player) => new Player(this.client, this, player));
    }
}
