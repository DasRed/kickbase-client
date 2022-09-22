import Model from './Model.js';

export default class User extends Model {
    /**
     *
     * @param {Object} values
     * @param {string} values.email
     * @param {string} values.cover
     * @param {number} values.flags
     * @param {string} values.vemail
     * @param {boolean} values.enableBeta
     * @param {*[]} values.perms
     * @param {string} values.id
     * @param {string} values.name
     * @param {string} values.profile
     * @returns {this}
     */
    update(values) {
        super.update(values);

        this.email      = this.values.email;
        this.cover      = this.values.cover;
        this.flags      = this.values.flags;
        this.vemail     = this.values.vemail;
        this.enableBeta = this.values.enableBeta;
        this.perms      = this.values.perms;
        this.id         = this.values.id;
        this.name       = this.values.name;
        this.profile    = this.values.profile;

        return this;
    }
}
