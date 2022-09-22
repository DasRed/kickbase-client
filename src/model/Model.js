export default class Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {Object} [values = {}]
     */
    constructor(client, values = {}) {
        this.client = client;

        this.update(values, true);
    }

    /** @returns {Object} */
    toJSON() {
        return this.values;
    }

    /**
     *
     * @param {Object} values
     * @param {boolean} [init = false]
     * @returns {this}
     */
    update(values, init = false) {
        this.values = values;

        return this;
    }
}
