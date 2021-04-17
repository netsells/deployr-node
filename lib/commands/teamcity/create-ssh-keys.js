const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { resolve } = require('path');
const template = require('lodash.template');
const sshConfigEntryStub = fs.readFileSync(resolve(__dirname, '../../stubs/ssh-config-entry.stub'), 'utf8');
const authorizedKeysEntryStub = fs.readFileSync(resolve(__dirname, '../../stubs/authorized-keys-entry.stub'), 'utf8');
const sshConfigEntryTemplate = template(sshConfigEntryStub);
const authorizedKeysEntryTemplate = template(authorizedKeysEntryStub);

/**
 * Get the path to a file in the ssh directory.
 *
 * @param {string} path
 *
 * @returns {string}
 */
const sshPath = (path) => resolve(process.env.HOME, `./.ssh/${ path }`);

/**
 * Create ssh keys.
 *
 * @param {object} params
 * @param {string} params.name
 *
 * @returns {Promise<void>}
 */
async function createSshKeys({ name }) {
    this.info(`Generating ssh key at [${ sshPath(name) }]`);

    await exec(`yes | ssh-keygen -q -t rsa -f ${ sshPath(name) } -P ""`);

    const key = fs.readFileSync(sshPath(`${ name }.pub`), 'utf8');

    [
        ['config', sshConfigEntryTemplate],
        ['authorized_keys', authorizedKeysEntryTemplate],
    ].forEach(([file, fileTemplate]) => {
        fs.appendFileSync(
            sshPath(file),
            fileTemplate({
                name,
                key,
            }),
            'utf8',
        );
    });

    this.success('SSH keys successfully generated');
}

module.exports = createSshKeys;
