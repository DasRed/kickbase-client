export default class Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {Object} [values = {}]
     */
    constructor(client, values = {}) {
        this.client = client;

        this.update(values);
    }

    /** @returns {Object} */
    toJSON() {
        return this.values;
    }

    /**
     *
     * @param {Object} [values = {}]
     * @returns {this}
     */
    update(values) {
        this.values = values;

        return this;
    }
}
