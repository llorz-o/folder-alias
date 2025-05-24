import type { ExtensionContext } from "vscode";
import type { RecordConfig } from "../typings/common.typing";
import { destr } from "destr";

function readConfig(configPath: string, context: ExtensionContext): RecordConfig {
  const r: RecordConfig = destr(context.globalState.get<string>(configPath)?.toString() ?? "{}");
  console.warn(r);
  return r;
}

async function writeConfig(configPath: string, config: RecordConfig, context: ExtensionContext) {
  await context.globalState.update(configPath, JSON.stringify(config));
}

export { readConfig, writeConfig };
