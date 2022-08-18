//noinspection ES6UnusedImports
import Client from '../Client.js';
import Model from './Model.js';

export default class LeagueUser extends Model {
    /**
     *
     * @param {Client} client
     * @param {number} budget
     * @param {number} teamValue
     * @param {Object} values
     */
    constructor(client, {budget, teamValue, ...values}) {
        super(client, values);

        this.budget    = budget;
        this.teamValue = teamValue;
    }
}
