import moment from 'moment';
import Offer from './Offer.js';
import Player from './Player.js';

export default class MarketPlayer extends Player {
    /** @returns {Offer} */
    getMyOffer() {
        return this.offers.find((offer) => offer.userId === this.client.getUser().id);
    }

    /** @returns {Offer} */
    getOfferFromKickbase() {
        return this.offers.find((offer) => offer.userId === undefined);
    }

    /** @returns {Offer[]} */
    getOffersFromUser() {
        return this.offers.filter((offer) => offer.userId !== undefined && offer.userId === this.client.getUser().id);
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

    /**
     *
     * @param {Object} values
     * @param {League} values.league
     * @param {number} values.price
     * @param {string|moment} values.date
     * @param {number} values.expiry
     * @param {Object[]} values.offers
     * @param {boolean} [init = false]
     * @returns {MarketPlayer}
     */
    update(values, init = false) {
        super.update(values, init);

        this.price  = this.values.price;
        this.date   = moment(this.values.date);
        this.expiry = this.values.expiry;

        /** @type {Offer[]} */
        this.offers = this.values.offers?.map((offer) => new Offer(this.client, this, offer)) ?? [];

        return this;
    }
}
