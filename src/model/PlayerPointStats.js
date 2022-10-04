import Model from './Model.js';

export default class PlayerPointStats extends Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {Object} values
     */
    constructor(client, values) {
        super(client, values);

        this.day    = values.d;
        this.points = values.p;
    }
}
