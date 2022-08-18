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
     * @param {string|undefined} userId
     * @param {string|undefined} userName
     * @param {Object} values
     */
    constructor(client, {id, price, date, validUntilDate, userId, userName, ...values}) {
        super(client, values);

        this.id             = id;
        this.price          = price;
        this.userId          = userId;
        this.userName          = userName;
        this.date           = moment(date);
        this.validUntilDate = moment(validUntilDate);
    }
}
