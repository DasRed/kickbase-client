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

    /**
     * @param {number} days
     * @param {number} [factor = 100000]
     * @returns {number}
     */
    calculateTrend(days, factor = 100_000) {
        // https://de.wikipedia.org/wiki/Lineare_Einfachregression#Einführendes_Beispiel
        const array = this.marketValues.map(({m: v}) => v / factor).slice(-days);
        const avg   = array.reduce((acc, v, i) => {
            acc.x += i + 1;
            acc.y += v;
            return acc;
        }, {x: 0, y: 0});

        avg.x = avg.x / days;
        avg.y = avg.y / days;

        const {numerator, denominator} = array.reduce((acc, v, i) => {
            acc.numerator += (i + 1 - avg.x) * (v - avg.y);
            acc.denominator += Math.pow(i + 1 - avg.x, 2);

            return acc;
        }, {numerator: 0, denominator: 0});

        return Math.atan(numerator / denominator) * 180 / Math.PI / 90;
    }
}
