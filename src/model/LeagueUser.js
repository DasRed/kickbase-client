import Model from './Model.js';

export default class LeagueUser extends Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {number} budget
     * @param {number} teamValue
     * @param {Object} values
     */
    constructor(client, {budget, teamValue, ...values}) {
        super(client, {budget, teamValue, ...values});

        this.budget    = budget;
        this.teamValue = teamValue;
    }
}
