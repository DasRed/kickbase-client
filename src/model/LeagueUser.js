import Model from './Model.js';

export default class LeagueUser extends Model {
    /**
     *
     * @param {Object} values
     * @param {number} values.budget
     * @param {number} values.teamValue
     * @returns {LeagueUser}
     */
    update(values) {
        super.update(values);

        this.budget    = this.values.budget;
        this.teamValue = this.values.teamValue;

        return this;
    }
}
