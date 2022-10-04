import Model from './Model.js';
import PlayerPoint from './PlayerPoint.js';
import PlayerStats from './PlayerStats.js';

export const DAY_STATUS = {
    NOT_LINE_UP: 0,
    LINE_UP:     1,
};

export const MARKET_VALUR_TREND = {
    NONE: 0,
    UP:   1,
    DOWN: 2,
};

export const STATUS = {
    FIT:               0,
    INJURED:           1, // verletzt
    STRUCK:            2, // angeschlagen
    UNKNOWN_3:         3, // ???
    ADVANCED_TRAINING: 4, // Aufbautraining
};

export const POSITION = {
    GOALKEEPER: 1,
    DEFENSE:    2,
    MIDFIELD:   3,
    ATTACK:     4,
};

export default class Player extends Model {
    /** @type {PlayerPoint[]} */
    #points;
    /** @type {PlayerStats} */
    #stats;

    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {League} league
     * @param {Object} values
     */
    constructor(client, league, values) {
        super(client, values);

        this.league = league;
    }

    /**
     *
     * @returns {Promise<PlayerPoint[]>}
     */
    async getPoints() {
        if (this.#points === undefined) {
            const data   = await this.client.get(`/players/${this.id}/points`);
            this.#points = data.s.map((entry) => new PlayerPoint(this.client, entry));
        }

        return this.#points;
    }

    /**
     *
     * @returns {Promise<PlayerPoint>}
     */
    async getPointsForCurrentSeason() {
        const points = await this.getPoints();
        const year   = (new Date()).getFullYear();

        return points.find((point) => point.season === `${year}/${year + 1}`)
    }

    /** @returns {Promise<PlayerStats>} */
    async getStats() {
        if (this.#stats === undefined) {
            const data  = await this.client.get(`/leagues/${this.league.id}/players/${this.id}/stats`);
            this.#stats = new PlayerStats(this.client, data);
        }

        return this.#stats;
    }

    /**
     *
     * @param {Object} values
     * @param {string} values.id
     * @param {string} values.teamId
     * @param {string} values.teamName
     * @param {string} values.userId
     * @param {string} values.username
     * @param {string} values.firstName
     * @param {string} values.lastName
     * @param {number} values.status
     * @param {number} values.position
     * @param {number} values.number
     * @param {number} values.averagePoints
     * @param {number} values.totalPoints
     * @param {number} values.marketValue
     * @param {number} values.marketValueTrend
     * @param {number} values.dayStatus
     * @param {number} [values.price = undefined]
     * @param {boolean} [init = false]
     * @returns {Player}
     */
    update(values, init = false) {
        super.update(values, init);

        this.id               = this.values.id;
        this.teamId           = this.values.teamId;
        this.teamName         = this.values.teamName;
        this.userId           = this.values.userId;
        this.username         = this.values.username;
        this.firstName        = this.values.firstName;
        this.lastName         = this.values.lastName;
        this.status           = this.values.status;
        this.position         = this.values.position;
        this.number           = this.values.number;
        this.averagePoints    = this.values.averagePoints;
        this.totalPoints      = this.values.totalPoints;
        this.marketValue      = this.values.marketValue;
        this.marketValueTrend = this.values.marketValueTrend;
        this.dayStatus        = this.values.dayStatus;
        this.price            = this.values.price;

        if (init === false) {
            this.#stats = undefined;
        }

        return this;
    }
}
