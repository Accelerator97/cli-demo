import type { Command } from 'commander'

export function preview(program: Command) {
    const previewCommand = program
        .createCommand('preview')
        .description('preview a project')
        .action(() => {
            console.log('preview')
        })
    return previewCommand
}
