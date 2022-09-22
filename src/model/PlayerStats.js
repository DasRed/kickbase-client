import moment from 'moment';
import Model from './Model.js';

export default class PlayerStats extends Model {
    #marketValueAtBuyDate;

    /** @returns {number} */
    get marketValueAtBuyDate() {
        if (this.#marketValueAtBuyDate === undefined) {
            this.#marketValueAtBuyDate = this.marketValues.find(({d: date}) => this.buyDate.isSame(date, 'day'))?.m;
        }

        return this.#marketValueAtBuyDate || this.buyPrice;
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

    /**
     *
     * @param {Object} values
     * @param {number} values.marketValue
     * @param {Object[]} values.marketValues
     * @param {string} values.marketValues.d
     * @param {number} values.marketValues.m
     * @param {Object} values.leaguePlayer
     * @param {string|moment} values.leaguePlayer.buyDate
     * @param {number} values.leaguePlayer.buyPrice
     * @returns {PlayerStats}
     */
    update(values) {
        super.update(values);

        this.marketValue  = this.values.marketValue;
        this.marketValues = this.values.marketValues;

        this.buyDate  = moment(this.values.leaguePlayer?.buyDate ?? 0);
        this.buyPrice = this.values.leaguePlayer?.buyPrice ?? 0;

        this.#marketValueAtBuyDate = undefined;

        return this;
    }
}
