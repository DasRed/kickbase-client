import moment from 'moment';
import Model from './Model.js';

export const TYPE = {
    ON_MARKET: 3,
    SELL:      2,
    BUY:       12,
};

export default class Feed extends Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {League} league
     * @param {string} id
     * @param {string} date
     * @param {number} type
     * @param {object} meta
     * @param {string} [meta.sid] seller id. only with type SELL
     * @param {string} [meta.sn] seller name. only with type SELL
     * @param {string} [meta.bid] buyer id. only with type BUY
     * @param {string} [meta.bn] buyer name. only with type BUY
     * @param {string} meta.pid player id
     * @param {string} meta.pfn player first name
     * @param {string} meta.pln player last name
     * @param {number} [meta.p] buy or sell price. only with type SELL or BUY
     * @param {Object} values
     */
    constructor(client, league, {id, date, type, meta, ...values}) {
        super(client, {id, date, type, meta, ...values});

        this.league = league;
        this.id     = id;
        this.date   = moment(date);
        this.type   = type;

        this.userId   = meta.bid ?? meta.sid;
        this.userName = meta.bn ?? meta.sn;

        this.playerId        = meta.pid;
        this.playerFirstName = meta.pfn;
        this.playerLastName  = meta.pln;

        this.price = meta.p;
    }
}
