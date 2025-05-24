import type { ComputedRef, Ref } from "reactive-vscode";
import type { ExtensionContext } from "vscode";
import type { RecordConfig } from "../typings/common.typing";
import { merge } from "lodash-es";
import { join } from "pathe";
import { computed, ref } from "reactive-vscode";
import { readConfig, writeConfig } from "../utils/file.util";

export interface UseConfigReturn {
  publicConfig: Ref<RecordConfig, RecordConfig>;
  configFile: ComputedRef<RecordConfig>;
  savePublic: () => Promise<void>;
}

export function useConfig(fileDir: string, context: ExtensionContext): UseConfigReturn {
  const configPath = join(fileDir, "folder-alias.json");
  const publicConfig = ref(readConfig(configPath, context));
  const configFile = computed<RecordConfig>(() => merge(publicConfig.value));

  async function savePublic() {
    await writeConfig(configPath, publicConfig.value, context);
  }

  return {
    publicConfig,
    configFile,
    savePublic,
  };
}
