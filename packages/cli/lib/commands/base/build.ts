import type { Command } from 'commander'

export function build(program: Command) {
    const buildCommand = program
        .createCommand('build')
        .description('build a project')
        .action(() => {
            console.log('build')
        })
    return buildCommand
}
