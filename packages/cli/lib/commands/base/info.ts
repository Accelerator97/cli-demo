import type { Command } from 'commander'
import pc from 'picocolors'

import pkg from '../../../package.json'
import { logger } from '../../utils/logger'

export function info(program: Command) {
    return program
        .createCommand('info')
        .description('Display info about the miaoma CLI')
        .action(() => {
            logger.log(pc.green(`Product: miaoma CLI v${pkg.version}`))
            logger.log(pc.green('Author: Ben'))
            logger.log(pc.underline('Website: https://www.bilibili.com'))
        })
}
