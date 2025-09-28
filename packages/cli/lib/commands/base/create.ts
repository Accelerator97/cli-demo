import type { Command } from 'commander'

export function create(program: Command) {
    const createCommand = program
        .createCommand('create')
        .description('create a project')
        .action(() => {
            console.log('create')
        })
    return createCommand
}
