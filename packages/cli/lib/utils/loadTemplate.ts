import { copy, exists, readJson, remove, writeJson } from 'fs-extra'
// import { downloadTemplate } from 'giget'
import path from 'node:path'
import ora from 'ora'
import prompts from 'prompts'
export type loadLocalTemplateOptions = {
    projectName: string
    template: string
}

export type loadRemoteTemplateOptions = {
    projectName: string
}

export type loadTemplateOptions = {
    remote?: boolean
} & loadLocalTemplateOptions &
    loadRemoteTemplateOptions

export const generatePackageJson = async (projectName: string) => {
    const targetPath = `${process.cwd()}/${projectName}`
    const pkgPath = path.join(targetPath, 'package.json')
    const originalPkg = await readJson(pkgPath)

    await writeJson(
        pkgPath,
        {
            ...originalPkg,
            name: projectName,
            version: '1.0.0'
        },
        {
            spaces: 4
        }
    )
}

export async function loadTemplate(options: loadTemplateOptions) {
    const { remote, template, projectName } = options

    if (remote) {
        await loadRemoteTemplate({ projectName })
    } else {
        await loadLocalTemplate({ projectName, template })
    }
}

export async function loadLocalTemplate(options: loadLocalTemplateOptions) {
    const spinner = ora({
        text: '检查目标目录...',
        color: 'blue'
    }).start()

    const templatePath = path.join(__dirname, `../templates/template-${options.template}`)
    const targetPath = `${process.cwd()}/${options.projectName}`

    // 检查目标路径是否存在
    const isExists = await exists(targetPath)

    if (isExists) {
        spinner.stop() // 停止spinner以便显示提示

        const response = await prompts({
            type: 'select',
            name: 'action',
            message: `目录 "${options.projectName}" 已存在，请选择操作：`,
            choices: [
                { title: '覆盖', value: 'override', description: '删除现有目录并重新创建' },
                { title: '取消', value: 'cancel', description: '终止操作' },
                { title: '重命名', value: 'rename', description: '使用新名称创建项目' }
            ],
            initial: 0
        })

        if (response.action === 'cancel') {
            console.log('❌ 操作已取消')
            return
        }

        if (response.action === 'override') {
            spinner.start('删除现有目录...')
            try {
                await remove(targetPath)
                spinner.succeed('现有目录已删除')
            } catch (error) {
                spinner.fail('删除目录失败')
                console.error('删除错误:', error)
                return
            }
        }

        if (response.action === 'rename') {
            const newNameResponse = await prompts({
                type: 'text',
                name: 'newProjectName',
                message: '请输入新的项目名称：',
                validate: value => {
                    if (!value.trim()) return '项目名称不能为空'
                    if (value === options.projectName) return '新名称不能与原名称相同'
                    return true
                }
            })

            if (!newNameResponse.newProjectName) {
                console.log('❌ 重命名操作已取消')
                return
            }

            // 递归调用，使用新名称
            return await loadLocalTemplate({
                ...options,
                projectName: newNameResponse.newProjectName
            })
        }
    }

    // 开始复制模板
    spinner.start('模板复制中...')

    try {
        console.log('🚀 ~ loadLocalTemplate ~ templatePath:', templatePath)
        console.log('🚀 ~ loadLocalTemplate ~ targetPath:', targetPath)

        await copy(templatePath, targetPath)
        await generatePackageJson(options.projectName)

        spinner.succeed('模板复制成功')
        console.log(`✅ 项目已成功创建在: ${targetPath}`)
    } catch (error) {
        spinner.fail('模板复制失败')
        console.error('复制错误:', error)
        throw error
    }
}

export async function loadRemoteTemplate(options: loadRemoteTemplateOptions) {
    console.log(`output->options remote`, options)
    // const { dir } = await downloadTemplate('https://codeload.github.com/design-sparx/antd-multipurpose-dashboard/tar.gz/refs/heads/main', {
    //     dir: `${process.cwd()}/.miaomatemp`
    // })
    // 本地模板拉取一致
}
