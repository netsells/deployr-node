const util = require('util');
const { siteDomain } = require('./utils');
const exec = util.promisify(require('child_process').exec);

/**
 * Enable https via certbot.
 *
 * @param {object} params
 * @param {string} params.name
 * @param {boolean} params.https
 *
 * @returns {Promise<void>}
 */
async function enableHttps({ name, https }) {
    this.info(`Enabling https via certbot for [${ siteDomain(name, https) }]`);

    await exec(`sudo certbot -d '${ name }.node.ns-client.xyz'`);

    this.success('Https certificate generated');
}

module.exports = enableHttps;
