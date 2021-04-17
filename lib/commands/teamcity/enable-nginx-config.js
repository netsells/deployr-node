const fs = require('fs-extra');
const { nginxAvailablePath, nginxEnabledPath } = require('./utils');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Enable the site in the nginx config.
 *
 * @param {object} params
 * @param {string} params.name
 *
 * @returns {Promise<void>}
 */
async function enableNginxConfig({ name }) {
    this.info(`Generating config symlink for [${ nginxEnabledPath(name) }]`);

    await exec(`ln -s ${ nginxAvailablePath(name) } ${ nginxEnabledPath(name) }`);

    this.success('Config symlinked');

    this.info('Reloading nginx...');

    await exec('sudo service nginx reload');

    this.success('Nginx reloaded');
}

module.exports = enableNginxConfig;
