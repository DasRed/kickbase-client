import moment from 'moment';
//noinspection ES6UnusedImports
import Client from '../Client.js';
import Offer from './Offer.js';
import Player from './Player.js';

export default class MarketPlayer extends Player {
    /**
     *
     * @param {Client} client
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
        this.offers = offers?.map((offer) => new Offer(this.client, offer)) ?? [];
    }

    /** @returns {Offer} */
    getHighestOffer() {
        return this.offers.reduce((acc, offer) => acc === undefined || acc.price < offer.price ? offer : acc, undefined);
    }

    /** @returns {Offer} */
    getMyOffer() {
        return this.offers.find((offer) => offer.userId === this.client.getUser().id);
    }
}
