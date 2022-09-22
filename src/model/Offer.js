import moment from 'moment';
import Model from './Model.js';

export default class Offer extends Model {
    /**
     *
     * @param {KickbaseManagerClient} client
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
        super(client, {id, price, date, validUntilDate, userId, userName, ...values});

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

    /** @returns {Promise<boolean>} */
    async remove() {
        try {
            await this.client.delete(`/leagues/${this.marketPlayer.league.id}/market/${this.marketPlayer.id}/offers/${this.id}`);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
