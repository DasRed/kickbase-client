export default class Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {Object} [values = undefined]
     */
    constructor(client, values = undefined) {
        this.client = client;
        this.values  = values;
    }
}
