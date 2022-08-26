import moment from 'moment';
import Model from './Model.js';

export default class PlayerStats extends Model {
    /** @returns {number} */
    get marketValueAtBuyDate() {
        if (this._marketValueAtBuyDate === undefined) {
            this._marketValueAtBuyDate = this.marketValues.find(({d: date}) => this.buyDate.isSame(date, 'day'))?.m;
        }

        return this._marketValueAtBuyDate || this.buyPrice;
    }

    /**
     *
     * @param {KickbaseManagerClient} client
     * @param {Player} player
     * @param {number} marketValue
     * @param {Object[]} marketValues
     * @param {string} marketValues.d
     * @param {number} marketValues.m
     * @param {Object} leaguePlayer
     * @param {string|moment} leaguePlayer.buyDate
     * @param {number} leaguePlayer.buyPrice
     * @param {Object} values
     */
    constructor(client, player, {marketValue, marketValues, leaguePlayer, ...values}) {
        super(client, values);

        this.marketValue  = marketValue;
        this.marketValues = marketValues;

        this.buyDate  = moment(leaguePlayer.buyDate ?? 0);
        this.buyPrice = leaguePlayer.buyPrice ?? 0;
    }
}
