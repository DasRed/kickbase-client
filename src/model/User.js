import Model from './Model.js';

export default class User extends Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {string} email
     * @param {string} cover
     * @param {number} flags
     * @param {string} vemail
     * @param {boolean} enableBeta
     * @param {*[]} perms
     * @param {string} id
     * @param {string} name
     * @param {string} profile
     * @param {Object} values
     */
    constructor(client, {email, cover, flags, vemail, enableBeta, perms, id, name, profile, ...values}) {
        super(client, values);

        this.email       = email;
        this.cover       = cover;
        this.flags       = flags;
        this.vemail      = vemail;
        this.enableBeta = enableBeta;
        this.perms       = perms;
        this.id          = id;
        this.name        = name;
        this.profile     = profile;
    }
}
