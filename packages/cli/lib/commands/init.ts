import { program } from 'commander'

// commander 内置的插件化处理
export const commandPluginInit = program
    .createCommand('init')
    .description('init')
    .action(() => {
        console.log('init')
    })
