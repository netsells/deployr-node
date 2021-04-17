const template = require('lodash.template');
const { resolve } = require('path');
const fs = require('fs-extra');
const { nginxAvailablePath } = require('./utils');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Create the nginx config files.
 *
 * @param {object} params
 * @param {string} params.name
 * @param {number} params.port
 *
 * @returns {Promise<void>}
 */
async function createNginxConfig({ name, port }) {
    const filePath = nginxAvailablePath(name);

    this.info(`Creating nginx config at [${ filePath }]`);

    const nginxConfigTemplate = fs.readFileSync(resolve(__dirname, '../../stubs/nginx-config.stub'), 'utf-8');
    const nginxConfig = template(nginxConfigTemplate);
    const nginxConfigOutput = nginxConfig({
        name,
        port,
    });

    await exec(`sudo touch ${ nginxAvailablePath(name) }`);
    await exec(`sudo echo -e "${ nginxConfigOutput }" >> ${ nginxAvailablePath(name) }`);

    this.success('Nginx config created');
}

module.exports = createNginxConfig;
