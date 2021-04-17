const fs = require('fs-extra');
const { nginxAvailablePath } = require('./utils');

/**
 * Check if the name is valid.
 *
 * @param {string} name
 *
 * @throws {Error}
 *
 * @returns {boolean}
 */
const isNameValid = (name) => {
    if (!name) {
        throw new Error('Site name required');
    }

    if (!name.toString().match(/^[0-9A-z-]+$/)) {
        throw new Error('Site name can only contain alphanumeric characters and hyphens');
    }

    if (fs.pathExistsSync(nginxAvailablePath(name))) {
        throw new Error('Site already exists with this name');
    }

    return true;
};

/**
 * Check if the port is valid.
 *
 * @param {number|string} port
 *
 * @throws {Error}
 *
 * @returns {string|boolean}
 */
const isPortValid = (port) => {
    if (isNaN(parseFloat(port))) {
        throw new Error('Please enter a number');
    }

    return true;
};

module.exports = {
    isNameValid,
    isPortValid,
};
