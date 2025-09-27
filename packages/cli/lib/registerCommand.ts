import { Command, program } from "commander";

export const registerCommand = (command: Command) => {
  // 注册命令
  // 定义 init 命令
  program.addCommand(command);
};
