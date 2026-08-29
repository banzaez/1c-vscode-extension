const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function findSiblingFile(targetUri) {
  const fsPath = targetUri.fsPath;
  const dirname = path.dirname(fsPath);
  const basename = path.basename(fsPath).toLowerCase();

  if (basename === 'form.xml') {
    const possiblePaths = [
      path.join(dirname, 'Ext', 'Form', 'Module.bsl'),
      path.join(dirname, 'Ext', 'form', 'Module.bsl'),
      path.join(dirname, 'Form', 'Module.bsl'),
      path.join(dirname, 'form', 'Module.bsl'),
      path.join(dirname, 'Module.bsl')
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        return vscode.Uri.file(p);
      }
    }
  } else if (basename === 'module.bsl') {
    const possiblePaths = [
      path.join(dirname, '..', '..', 'Form.xml'),
      path.join(dirname, '..', '..', 'form.xml'),
      path.join(dirname, '..', 'Form.xml'),
      path.join(dirname, '..', 'form.xml'),
      path.join(dirname, 'Form.xml'),
      path.join(dirname, 'form.xml')
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        return vscode.Uri.file(p);
      }
    }
  }

  return null;
}

async function handleToggleCodeForm(uri) {
  let targetUri = uri;
  if (!targetUri) {
    const editor = vscode.window.activeTextEditor;
    if (editor) targetUri = editor.document.uri;
  }
  if (!targetUri) return;

  const siblingUri = findSiblingFile(targetUri);
  if (siblingUri) {
    const doc = await vscode.workspace.openTextDocument(siblingUri);
    await vscode.window.showTextDocument(doc);
  } else {
    vscode.window.showInformationMessage('Не найден парный файл кода или описания формы.');
  }
}

function registerToggleCodeFormCommand(context) {
  const toggleCodeFormDisposable = vscode.commands.registerCommand('1c-form-viewer.toggleCodeForm', async (uri) => {
    await handleToggleCodeForm(uri);
  });
  context.subscriptions.push(toggleCodeFormDisposable);
}

module.exports = {
  findSiblingFile,
  handleToggleCodeForm,
  registerToggleCodeFormCommand
};
