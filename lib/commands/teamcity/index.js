const { program } = require('@caporal/core');
const inquirer = require('inquirer');
const getPort = require('get-port');
const createNginxConfig = require('./create-nginx-config');
const enableNginxConfig = require('./enable-nginx-config');
const enableHttps = require('./enable-https');
const createSshKeys = require('./create-ssh-keys');
const { success, blankLine } = require('../../utils');
const { siteDomain } = require('./utils');
const { isNameValid, isPortValid } = require('./validators');
const chalk = require('chalk');

const handler = async (context) => {
    context.success = success;
    context.info = context.logger.info.bind(context.logger);

    const { args } = context;

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name of site to be deployed',
            default: args.name,
            //eslint-disable-next-line require-jsdoc-except/require-jsdoc
            validate(value) {
                try {
                    return isNameValid(value);
                } catch (e) {
                    return e.message;
                }
            },
        },
        {
            type: 'input',
            name: 'port',
            message: 'Select port',
            default: await getPort(),
            //eslint-disable-next-line require-jsdoc-except/require-jsdoc
            async validate(value) {
                try {
                    return isPortValid(value);
                } catch (e) {
                    return e.message;
                }
            },
            filter: Number,
        },
        {
            type: 'confirm',
            name: 'https',
            message: 'Enable https?',
            default: true,
        },
    ]);

    const { name, port, https } = answers;

    blankLine();

    await createSshKeys.call(context, answers);
    await createNginxConfig.call(context, answers);
    await enableNginxConfig.call(context, answers);

    if (https) {
        await enableHttps.call(context, answers);
    }

    context.info([
        `Run the following command on your ${ chalk.yellow.bold('local machine') } to download the generated SSH key:`,
        `➜ ${ chalk.yellow(`scp netsells@node.ns-client.xyz:~/.ssh/${ name } ~/Downloads/${ name }`) }`,
    ].join('\n  '));

    blankLine();

    await inquirer.prompt({
        type: 'confirm',
        message: 'Press enter when done...',
        name: 'confirm',
    });

    blankLine();
    context.success([
        'Site setup successfully',
        '',
        `➜ Domain: ${ chalk.yellow(siteDomain(name, https)) }`,
        `➜ Port: ${ chalk.yellow(port) }`,
        '',
        'Continue to TeamCity using the following link to create a project for this site:',
        chalk.blue.underline.bold('https://teamcity.netsells.tools/admin/createObjectMenu.html?projectId=_Root&showMode=createProjectMenu#github'),
    ].join('\n  '));
};

program
    .command('teamcity', 'Setup a site ready for deployment via teamcity')
    .argument('name', 'Name of site to be deployed', {
        validator: (val) => isNameValid(val) && val,
    })
    .action(handler);
