export default class Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {Object} [values = {}]
     */
    constructor(client, values = {}) {
        this.client = client;
        this.values = values;
    }

    /** @returns {Object} */
    toJSON() {
        return this.values;
    }
}
