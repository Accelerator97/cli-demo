import type { Command } from 'commander'

export function serve(program: Command) {
    const serveCommand = program
        .createCommand('serve')
        .description('serve a project')
        .action(() => {
            console.log('serve')
        })
    return serveCommand
}
