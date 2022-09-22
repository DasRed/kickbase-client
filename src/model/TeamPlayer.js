import Player, {DAY_STATUS} from './Player.js';

export default class TeamPlayer extends Player {
    /**
     * @param {number} price
     * @returns {Promise<boolean>}
     */
    async addToMarket(price) {
        try {
            await this.client.post(`/leagues/${this.league.id}/market`, {playerId: this.id, price});
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    /** @returns {Promise<boolean>} */
    async removeFromMarket() {
        try {
            await this.client.delete(`/leagues/${this.league.id}/market/${this.id}`);
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
     * @returns {TeamPlayer}
     */
    update(values) {
        super.update(values);

        this.isInSell = this.price !== undefined;
        this.isLineUp = this.dayStatus === DAY_STATUS.LINE_UP;

        return this;
    }
}
