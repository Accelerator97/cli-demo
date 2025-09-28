import { build } from './base/build'
import { create } from './base/create'
import { info } from './base/info'
import { preview } from './base/preview'
import { serve } from './base/serve'
import { registerCommand } from './registerCommand'

// 注册命令
// 1. info 命令
registerCommand(info)

// 2. create 命令
registerCommand(create)

// 3. build 命令
registerCommand(build)

// 4. preview 命令
registerCommand(preview)

// 5. serve 命令
registerCommand(serve)
