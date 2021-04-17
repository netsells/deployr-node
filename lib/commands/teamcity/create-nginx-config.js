const template = require('lodash.template');
const { resolve } = require('path');
const fs = require('fs-extra');
const { nginxAvailablePath } = require('./utils');

/**
 * Create the nginx config files.
 *
 * @param {object} params
 * @param {string} params.name
 * @param {number} params.port
 *
 * @returns {Promise<void>}
 */
function createNginxConfig({ name, port }) {
    const filePath = nginxAvailablePath(name);

    this.info(`Creating nginx config at [${ filePath }]`);

    const nginxConfigTemplate = fs.readFileSync(resolve(__dirname, '../../stubs/nginx-config.stub'), 'utf-8');
    const nginxConfig = template(nginxConfigTemplate);
    const nginxConfigOutput = nginxConfig({
        name,
        port,
    });

    fs.writeFile(nginxAvailablePath(name), nginxConfigOutput, 'utf-8');

    this.success('Nginx config created');
}

module.exports = createNginxConfig;
