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
     * @param {Object} values
     * @param {string} values.id
     * @param {string} values.date
     * @param {number} values.type
     * @param {object} values.meta
     * @param {string} [values.meta.sid] seller id. only with type SELL
     * @param {string} [values.meta.sn] seller name. only with type SELL
     * @param {string} [values.meta.bid] buyer id. only with type BUY
     * @param {string} [values.meta.bn] buyer name. only with type BUY
     * @param {string} values.meta.pid player id
     * @param {string} values.meta.pfn player first name
     * @param {string} values.meta.pln player last name
     * @param {number} [values.meta.p] buy or sell price. only with type SELL or BUY
     * @param {boolean} [init = false]
     * @returns {Feed}
     */
    update(values, init = false) {
        super.update(values, init);

        this.league = this.values.league;
        this.id     = this.values.id;
        this.date   = moment(this.values.date);
        this.type   = this.values.type;

        this.userId   = this.values.meta.bid ?? this.values.meta.sid;
        this.userName = this.values.meta.bn ?? this.values.meta.sn;

        this.playerId        = this.values.meta.pid;
        this.playerFirstName = this.values.meta.pfn;
        this.playerLastName  = this.values.meta.pln;

        this.price = this.values.meta.p;

        return this;
    }
}
