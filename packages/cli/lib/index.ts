import { program } from 'commander'

import './commands'

export function runCLI() {
    program.option('--first').option('-s, --separator <char>').argument('<string>')

    program.parse(process.argv)
}
