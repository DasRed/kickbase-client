import Model from './Model.js';
import PlayerPointStats from './PlayerPointStats.js';

export default class PlayerPoint extends Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {Object} values
     */
    constructor(client, values) {
        super(client, values);

        this.season = values.t;
        this.points = values.p;
        this.playing = values.mp;
        this.starts = values.ms;

        /** @type {PlayerPointStats[]} */
        this.stats = values.m.map((dayStats) => new PlayerPointStats(client, dayStats));
    }
}
