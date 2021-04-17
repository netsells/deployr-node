/**
 * Return the path to the sites-available file.
 *
 * @param {string} name
 *
 * @returns {string}
 */
const nginxAvailablePath = (name) => `/etc/nginx/sites-available/${ name }`;

/**
 * Return the path to the sites-enabled file.
 *
 * @param {string} name
 *
 * @returns {string}
 */
const nginxEnabledPath = (name) => `/etc/nginx/sites-enabled/${ name }`;

/**
 * Generate the domain.
 *
 * @param {string} name
 * @param {boolean?} https
 *
 * @returns {string}
 */
const siteDomain = (name, https = false) => {
    const protocol = https ? 'https' : 'http';

    return `${ protocol }://${ name }.node.ns-client.xyz`;
};

module.exports = {
    nginxAvailablePath,
    nginxEnabledPath,
    siteDomain,
};
