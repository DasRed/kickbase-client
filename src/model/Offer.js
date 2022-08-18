import moment from 'moment';
//noinspection ES6UnusedImports
import MarketPlayer from './MarketPlayer.js';
import Model from './Model.js';

export default class Offer extends Model {
    /**
     *
     * @param {Client} client
     * @param {MarketPlayer} marketPlayer
     * @param {string} id
     * @param {number} price
     * @param {string|moment} date
     * @param {string|moment} validUntilDate
     * @param {string|undefined} userId
     * @param {string|undefined} userName
     * @param {Object} values
     */
    constructor(client, marketPlayer, {id, price, date, validUntilDate, userId, userName, ...values}) {
        super(client, values);

        this.marketPlayer = marketPlayer;

        this.id             = id;
        this.price          = price;
        this.userId         = userId;
        this.userName       = userName;
        this.date           = moment(date);
        this.validUntilDate = moment(validUntilDate);
    }

    /** @returns {Promise<boolean>} */
    async accept() {
        try {
            await this.client.post(`/leagues/${this.marketPlayer.league.id}/market/${this.marketPlayer.id}/offers/${this.id}/accept`);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

}
