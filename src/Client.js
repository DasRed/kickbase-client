import EventEmitter from 'eventemitter0';
import moment from 'moment';
import fetch from 'node-fetch';
import League from './model/League.js';
import User from './model/User.js';

/**
 * @alias KickbaseManagerClient
 */
export default class Client extends EventEmitter {
    /** @type {League[]} */
    #leagues = [];
    /** @type {string} */
    #token;
    /** @type {moment} */
    #tokenExp;
    /** @type {User} */
    #user;

    /** @type {boolean} */
    get isAuthenticated() {
        return this.#token !== undefined && this.#tokenExp?.isAfter(new Date()) === true;
    }

    /**
     *
     * @param {string} email
     * @param {string} password
     * @param {string} [defaultLeagueId]
     * @param {string} [host = https://api.kickbase.com]
     */
    constructor({email, password, defaultLeagueId = undefined, host = 'https://api.kickbase.com'}) {
        super({});
        this.host            = host.endsWith('/') ? host.slice(0, -1) : host;
        this.email           = email;
        this.password        = password;
        this.defaultLeagueId = String(defaultLeagueId);
    }

    /**
     *
     * @returns {Promise<Client>}
     */
    async authenticate() {
        if (this.isAuthenticated === true) {
            return this;
        }

        try {
            const response = await this.post(`/user/login`, {
                email:    this.email,
                password: this.password,
            });

            this.#token    = response.token;
            this.#tokenExp = moment(response.tokenExp);
            this.#user     = new User(this, response.user);
            this.#leagues  = response.leagues.map((league) => new League(this, this.#user, league));

        }
        catch (error) {
            console.error(error);
        }

        return this;
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<Object>}
     */
    delete(url) {
        return this.fetch(url, 'DELETE');
    }

    /**
     *
     * @param {string} url
     * @param {string} [method = GET]
     * @param {object} [data = undefined]
     * @returns {Promise<Object>}
     */
    async fetch(url, method = 'GET', data = undefined) {
        const options = {
            method,
            headers: {
                Accept: 'application/json',
                Cookie: `kkstrauth=${this.#token}`,
            }
        };

        if (data !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body                    = JSON.stringify(data);
        }

        const fetchParams = {
            url: this.host + (url.startsWith('/') ? url : `/${url}`),
            options,
        };

        await this.emit('fetch.before', fetchParams);
        const response = await fetch(fetchParams.url, fetchParams.options);
        await this.emit('fetch.after', fetchParams, response);

        return await response.json();
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<Object>}
     */
    get(url) {
        return this.fetch(url, 'GET');
    }

    /** @returns {League} */
    getDefaultLeague() {
        return this.getLeagues().find((league) => league.id === this.defaultLeagueId) ?? this.#leagues[0];
    }

    /** @returns {League[]} */
    getLeagues() {
        return this.#leagues;
    }

    /** @returns {User} */
    getUser() {
        return this.#user;
    }

    /**
     *
     * @param {string} url
     * @param {object} [data]
     * @returns {Promise<Object>}
     */
    post(url, data) {
        return this.fetch(url, 'POST', data);
    }

    /**
     *
     * @param {string} url
     * @param {object} data
     * @returns {Promise<Object>}
     */
    put(url, data) {
        return this.fetch(url, 'PUT', data);
    }
}
