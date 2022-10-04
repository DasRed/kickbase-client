import Model from './Model.js';
import PlayerPointStats from './PlayerPointStats.js';

export default class PlayerPoint extends Model {
    /**
     *
     * @param {Object} values
     * @param {string} values.t
     * @param {number} values.p
     * @param {number} values.mp
     * @param {number} values.ms
     * @param {Object[]} values.m
     * @param {boolean} [init = false]
     * @returns {this}
     */
    update(values, init = false) {
        super.update(values, init);

        this.season  = values.t;
        this.points  = values.p;
        this.playing = values.mp;
        this.starts  = values.ms;

        /** @type {PlayerPointStats[]} */
        this.stats = values.m.map((dayStats) => new PlayerPointStats(this.client, dayStats));

        return this;
    }
}
