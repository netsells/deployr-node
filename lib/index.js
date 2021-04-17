#!/usr/bin/env node

const { program } = require('@caporal/core');

require('./commands/teamcity');

program.run();
