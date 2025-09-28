import { execSync } from 'node:child_process'

export function hasPnpm() {
    return !!getPnpmVersion()
}

export function getPnpmVersion() {
    let _pnpmVersion
    try {
        // 我们安装一些二进制命令行工具的时候，pnpm -v
        _pnpmVersion = execSync('pnpm --version', {
            stdio: ['pipe', 'pipe', 'ignore']
        }).toString()
    } catch (e) {
        console.log(e)
        _pnpmVersion = undefined
    }

    return _pnpmVersion
}
