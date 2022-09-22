import moment from 'moment';
import Model from './Model.js';

export default class Offer extends Model {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {MarketPlayer} marketPlayer
     * @param {Object} values
     */
    constructor(client, marketPlayer, values) {
        super(client, values);

        this.marketPlayer = marketPlayer;
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

    /**
     *
     * @param {Object} values
     * @param {string} values.id
     * @param {number} values.price
     * @param {string|moment} values.date
     * @param {string|moment} values.validUntilDate
     * @param {string|undefined} values.userId
     * @param {string|undefined} values.userName
     * @returns {Offer}
     */
    update(values) {
        super.update(values);

        this.id             = this.values.id;
        this.price          = this.values.price;
        this.userId         = this.values.userId;
        this.userName       = this.values.userName;
        this.date           = moment(this.values.date);
        this.validUntilDate = moment(this.values.validUntilDate);

        return this;
    }
}
