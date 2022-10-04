import Model from './Model.js';

export default class LeagueStats extends Model {
    /**
     *
     * @param {Object} values
     * @param {number} values.currentDay
     * @param {boolean} [init = false]
     * @returns {this}
     */
    update(values, init = false) {
        super.update(values, init);

        this.currentDay    = this.values.currentDay;

        return this;
    }
}
