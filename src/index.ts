import { defineExtension } from "reactive-vscode";
import { workspace } from "vscode";
import { addAlias } from "./command";
import { useFileAlias } from "./file-alias";

const { activate, deactivate } = defineExtension(async (context) => {
  if (!workspace.workspaceFolders) {
    return;
  }

  for (let index = 0; index < workspace.workspaceFolders.length; index++) {
    const ws = workspace.workspaceFolders[index];
    const fileAlias = useFileAlias(ws.uri, context);
    addAlias(ws, fileAlias);
  }
});

export { activate, deactivate };
