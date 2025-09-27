
import { program } from "commander";

export const commandPluginDeploy = program
  .createCommand("deploy")
  .description("deploy")
  .action(() => {
    console.log("deploy");
  });
