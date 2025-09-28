import type { Command } from 'commander'
import prompts from 'prompts'

import { loadTemplate } from '../../utils/loadTemplate'
// vite 创建逻辑作为参照
type CreateCommandOptions = {
    /**
     * 选择项目类型 vue react vanilla
     */
    framework?: string
    /**
     * 选择项目模板 vue-ts vue-js react-ts react-js vanilla-ts vanilla-js
     */
    template?: string
    remote?: string
}
export function create(program: Command) {
    const createCommand = program
        .createCommand('create')
        .arguments('<projectName>')
        .option('-f, --framework <framework>', '选择项目类型')
        .option('-t, --template <template>', '选择项目模板')
        .option('-r, --remote <remote>', '远程模板')
        .description('create a project')
        .action(async (projectName: string, options: CreateCommandOptions) => {
            // eslint-disable-next-line prefer-const
            let { framework = 'vue', template = 'vue-ts', remote = false } = options

            if (remote) {
                // 远程模板
                loadTemplate({
                    projectName,
                    template,
                    remote: true
                })
                return
            }

            if (!framework) {
                // 选择项目类型
                const response = await prompts({
                    type: 'select',
                    choices: [
                        { title: 'Vue', value: 'vue' },
                        { title: 'React', value: 'react' },
                        { title: 'Vanilla', value: 'vanilla' }
                    ],
                    name: 'framework',
                    message: '请选择项目类型'
                })

                framework = response.framework
            }

            // 如果用户没有预先给定项目模板参数，则需要询问
            if (!template) {
                // 选择项目模板
                const response = await prompts({
                    type: 'select',
                    choices: [
                        { title: 'Vue-ts', value: 'vue-ts' },
                        { title: 'Vue-js', value: 'vue-js' },
                        { title: 'React-ts', value: 'react-ts' },
                        { title: 'React-js', value: 'react-js' },
                        { title: 'Vanilla-ts', value: 'vanilla-ts' }
                    ],
                    name: 'template',
                    message: '请选择项目模板'
                })

                template = response.template
            }

            loadTemplate({ projectName, template })
        })
    return createCommand
}
