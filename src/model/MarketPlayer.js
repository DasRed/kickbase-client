import moment from 'moment';
import Offer from './Offer.js';
import Player from './Player.js';

export default class MarketPlayer extends Player {
    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {League} league
     * @param {number} price
     * @param {string|moment} date
     * @param {number} expiry
     * @param {Object[]} offers
     * @param {Object} values
     */
    constructor(client, league, {price, date, expiry, offers, ...values}) {
        super(client, league, values);

        this.price  = price;
        this.date   = moment(date);
        this.expiry = expiry;
        this.offers = offers?.map((offer) => new Offer(this.client, this, offer)) ?? [];
    }

    /** @returns {Offer} */
    getHighestOffer() {
        return this.offers.reduce((acc, offer) => acc === undefined || acc.price < offer.price ? offer : acc, undefined);
    }

    /** @returns {Offer} */
    getMyOffer() {
        return this.offers.find((offer) => offer.userId === this.client.getUser().id);
    }

    /**
     * @param {number} price
     * @returns {Promise<boolean>}
     */
    async placeOffer(price) {
        try {
            await this.client.post(`/leagues/${this.league.id}/market/${this.id}/offers`, {price});
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
