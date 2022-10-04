import Feed from './Feed.js';
import LeagueStats from './LeagueStats.js';
import LeagueUser from './LeagueUser.js';
import MarketPlayer from './MarketPlayer.js';
import Model from './Model.js';
import Player from './Player.js';
import TeamPlayer from './TeamPlayer.js';

export default class League extends Model {
    static FEED_SIZE = 30;

    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {User} user
     * @param {object} values
     */
    constructor(client, user, values) {
        super(client, values);

        this.user = user;
    }

    /**
     *
     * @returns {Promise<Feed[]>}
     */
    async getFeeds() {
        const promises = [];

        for (let i = 0; i <= 300; i += 30) {
            promises.push(this.client.get(`/leagues/${this.id}/feed?start=${i}`));
        }

        const responses = await Promise.all(promises);
        return responses.reduce(
            (result, {items: feeds}) => result.concat(
                feeds.map((feed) => new Feed(this.client, feed))
            ),
            []
        );
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

    /**
     *
     * @param {string} id
     * @returns {Promise<Player>}
     */
    async getPlayer(id) {
        const data = await this.client.get(`/leagues/${this.id}/players/${id}`);

        return new Player(this.client, this, data);
    }

    /**
     *
     * @returns {Promise<LeagueStats>}
     */
    async getStats() {
        return new LeagueStats(this.client, await this.client.get(`/leagues/${this.id}/stats`));
    }

    /** @returns {Promise<TeamPlayer[]>} */
    async getTeamPlayers() {
        const data = await this.client.get(`/leagues/${this.id}/users/${this.user.id}/players`);

        return data.players.map((player) => new TeamPlayer(this.client, this, player));
    }

    /**
     *
     * @param {Object} values
     * @param {string} values.id
     * @param {string} values.cpi
     * @param {string} values.name
     * @param {string} values.creator
     * @param {string} values.creatorId
     * @param {string} values.creation
     * @param {boolean} [init = false]
     * @returns {League}
     */
    update(values, init = false) {
        super.update(values, init);

        this.id        = this.values.id;
        this.cpi       = this.values.cpi;
        this.name      = this.values.name;
        this.creator   = this.values.creator;
        this.creatorId = this.values.creatorId;
        this.creation  = this.values.creation;

        return this;
    }
}
