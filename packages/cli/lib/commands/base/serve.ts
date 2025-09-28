import type { Command } from 'commander'
import { spawn } from 'node:child_process'

import { hasPnpm } from '../../utils/env'

export const serve = (program: Command) => {
    // 插件化的方式
    const serveCommand = program
        .createCommand('serve')
        .description('serve a project')
        .action(() => {
            const _hasPnpm = hasPnpm()

            const command = _hasPnpm ? 'pnpm' : 'npm'

            const params = _hasPnpm ? ['dev'] : ['run', 'dev']

            // 启动子进程
            // exec 和 spawn 区别
            const child = spawn(command, params, {
                cwd: process.cwd(),
                stdio: 'inherit'
            })

            child.on('close', code => {
                process.exit(code)
            })
        })

    return serveCommand
}
