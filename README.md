# @netsells/deployr-node

CLI tool to bootstrap setting up new sites on our staging server.

## Installation

```sh
$ yarn global add @netsells/deployr-node
```

## Usage

Once installed the global `deploy` command will be available.

```
  USAGE

    ▸ deploy <command> [ARGUMENTS...] [OPTIONS...]


  COMMANDS — Type 'deploy help <command>' to get some help about a command

    teamcity                             Setup a site ready for deployment via teamcity

  GLOBAL OPTIONS

    -h, --help                           Display global help or command-related help.
    -V, --version                        Display version.
    --no-color                           Disable use of colors in output.
    -v, --verbose                        Verbose mode: will also output debug messages.
    --quiet                              Quiet mode - only displays warn and error messages.
    --silent                             Silent mode: does not output anything, giving no
                                         indication of success or failure other than the exit
                                         code.
```
