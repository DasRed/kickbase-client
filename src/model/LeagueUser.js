import Model from './Model.js';

export default class LeagueUser extends Model {
    /**
     *
     * @param {Object} values
     * @param {number} values.budget
     * @param {number} values.teamValue
     * @param {boolean} [init = false]
     * @returns {LeagueUser}
     */
    update(values, init = false) {
        super.update(values, init);

        this.budget    = this.values.budget;
        this.teamValue = this.values.teamValue;

        return this;
    }
}
