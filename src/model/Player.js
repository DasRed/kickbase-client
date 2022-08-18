import Model from './Model.js';
import PlayerStats from './PlayerStats.js';

export default class Player extends Model {
    /** @type {PlayerStats} */
    #stats;
    static DAY_STATUS         = {
        NOT_LINE_UP: 0,
        LINE_UP:     1,
    };
    static MARKET_VALUR_TREND = {
        NONE: 0,
        UP:   1,
        DOWN: 2,
    };
    static STATUS             = {
        FIT:               0,
        INJURED:           1, // verletzt
        STRUCK:            2, // angeschlagen
        UNKNOWN_3:         3, // ???
        ADVANCED_TRAINING: 4, // Aufbautraining
    };

    /**
     *
     * @param {Client} client
     * @param {League} league
     * @param {string} id
     * @param {string} teamId
     * @param {string} teamName
     * @param {string} userId
     * @param {string} username
     * @param {string} firstName
     * @param {string} lastName
     * @param {number} status
     * @param {number} position
     * @param {number} number
     * @param {number} averagePoints
     * @param {number} totalPoints
     * @param {number} marketValue
     * @param {number} marketValueTrend
     * @param {number} dayStatus
     * @param {number} [price = undefined]
     * @param {Object} values
     */
    constructor(client, league, {id, teamId, teamName, userId, username, firstName, lastName, status, position, number, averagePoints, totalPoints, marketValue, marketValueTrend, dayStatus, price = undefined, ...values}) {
        super(client, values);

        this.league = league;

        this.id               = id;
        this.teamId           = teamId;
        this.teamName         = teamName;
        this.userId           = userId;
        this.username         = username;
        this.firstName        = firstName;
        this.lastName         = lastName;
        this.status           = status;
        this.position         = position;
        this.number           = number;
        this.averagePoints    = averagePoints;
        this.totalPoints      = totalPoints;
        this.marketValue      = marketValue;
        this.marketValueTrend = marketValueTrend;
        this.dayStatus        = dayStatus;
        this.price            = price;

        this.isInSell = this.price !== undefined;
        this.isLineUp = this.dayStatus === Player.DAY_STATUS.LINE_UP;
    }

    /** @returns {Promise<{}>} */
    async getStats() {
        if (this.#stats === undefined) {
            const data  = await this.client.get(`/leagues/${this.league.id}/players/${this.id}/stats`);
            this.#stats = new PlayerStats(this.client, this, data);
        }

        return this.#stats;
    }
}
