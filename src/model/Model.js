//noinspection ES6UnusedImports
import Client from '../Client.js';

export default class Model {
    /**
     *
     * @param {Client} client
     * @param {Object} [values = undefined]
     */
    constructor(client, values = undefined) {
        this.client = client;
        this.values  = values;
    }
}
