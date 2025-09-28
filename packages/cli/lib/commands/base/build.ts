import type { Command } from 'commander'
import { spawn } from 'node:child_process'

import { hasPnpm } from '../../utils/env'

export const build = (program: Command) => {
    // 插件化的方式
    const buildCommand = program
        .createCommand('build')
        .description('build a project')
        .action(() => {
            const _hasPnpm = hasPnpm()

            const command = _hasPnpm ? 'pnpm' : 'npm'

            const params = _hasPnpm ? ['build'] : ['run', 'build']

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

    return buildCommand
}
