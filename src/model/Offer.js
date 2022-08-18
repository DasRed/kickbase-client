import moment from 'moment';
import Model from './Model.js';

export default class Offer extends Model {
    /**
     *
     * @param {Client} client
     * @param {string} id
     * @param {number} price
     * @param {string|moment} date
     * @param {string|moment} validUntilDate
     */
    constructor(client, {id, price, date, validUntilDate}) {
        super(client);

        this.id             = id;
        this.price          = price;
        this.date           = moment(date);
        this.validUntilDate = moment(validUntilDate);
    }
}
