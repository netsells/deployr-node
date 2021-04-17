const chalk = require('chalk');
const { log } = console;

/**
 * Log a styles success message.
 *
 * @param {string} text
 */
function success(text) {
    log(`${ chalk.green('✔') } ${ text }\n`);
}

/**
 * Generate a blank link in the console.
 */
function blankLine() {
    log('');
}

module.exports = {
    success,
    blankLine,
};
