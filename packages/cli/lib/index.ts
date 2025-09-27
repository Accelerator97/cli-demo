import { program } from "commander";

import { commandPluginDeploy } from "./commands/deploy";
import { commandPluginInit } from "./commands/init";
import { registerCommand } from "./registerCommand";

// const commands_descriptions_zh = {
//   init: "初始化项目",
//   deploy: "部署项目",
// };
// const commands_descriptions_en = {
//   init: "init a project",
//   deploy: "deploy a project",
// };
// const commands_descriptions = {
//   zh: commands_descriptions_zh,
//   en: commands_descriptions_en,
// };
// const lang = "zh";

export function runCLI() {
  program
    .option("--first")
    .option("-s, --separator <char>")
    .argument("<string>");

  // 定义 init 命令
  registerCommand(commandPluginInit);

  // 定义 deploy 命令
  registerCommand(commandPluginDeploy);

  // commander 内置的插件化处理
  const commandPluginInfo = program
    .createCommand("info")
    .description("info")
    .action(() => {
      console.log("info");
    });
  program.addCommand(commandPluginInfo);
  program.parse(process.argv);
}
