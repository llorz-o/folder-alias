import type { UseFileAliasReturn } from "../file-alias";
import { useCommand } from "reactive-vscode";
import * as vscode from "vscode";

function addAlias(workspace: vscode.WorkspaceFolder, fileAlias: UseFileAliasReturn) {
  const { publicConfig, configFile, savePublic, changeEmitter } = fileAlias;

  useCommand("folder-alias.addAlias", (uri: vscode.Uri) => {
    const relativelyPath = uri.path.substring(workspace.uri.path.length + 1);
    const inputConfig: vscode.InputBoxOptions = {
      title: "Input Your Alias",
      value: configFile.value[relativelyPath]
        ? configFile.value[relativelyPath].description
        : "folder-alias",
    };
    vscode.window.showInputBox(inputConfig).then(async (alias) => {
      if (alias) {
        publicConfig.value[relativelyPath] = {
          ...publicConfig.value[relativelyPath],
          description: alias,
        };
        await savePublic();
        changeEmitter(uri);
      }
    });
  });
}

export { addAlias };
