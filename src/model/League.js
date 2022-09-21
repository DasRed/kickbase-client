import Feed from './Feed.js';
import LeagueUser from './LeagueUser.js';
import MarketPlayer from './MarketPlayer.js';
import Model from './Model.js';
import TeamPlayer from './TeamPlayer.js';

export default class League extends Model {
    static FEED_SIZE = 30;

    /**
     *
     * @param {KickbaseManagerClient} client
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
                feeds.map((feed) => new Feed(this.client, this, feed))
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

    /** @returns {Promise<TeamPlayer[]>} */
    async getTeamPlayers() {
        const data = await this.client.get(`/leagues/${this.id}/users/${this.user.id}/players`);

        return data.players.map((player) => new TeamPlayer(this.client, this, player));
    }
}
