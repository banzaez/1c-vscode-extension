const vscode = require('vscode');
const {
  _utf8Decoder,
  readHead,
  contentIsOrdinaryFormDescriptor,
  contentIsMxlTemplateDescriptor,
  isSupportedFile
} = require('../utils');
const {
  resolveMetadataDescriptor,
  findSupportedFileInDirectory,
  openPanelForDocument
} = require('../preview');

async function handleOpenPreview(uri, context) {
  let targetUri = uri;

  if (!targetUri) {
    const editor = vscode.window.activeTextEditor;
    if (editor) targetUri = editor.document.uri;
  }

  if (!targetUri) {
    vscode.window.showInformationMessage('Выделите файл или папку для просмотра');
    return;
  }

  try {
    if (targetUri.path.endsWith('.xml')) {
      const resolved = await resolveMetadataDescriptor(targetUri);
      if (resolved) {
        targetUri = resolved;
      } else {
        const buf = await readHead(targetUri);
        const head = _utf8Decoder.decode(buf);
        if (contentIsOrdinaryFormDescriptor(head)) {
          vscode.window.showErrorMessage('Не найден Ext/form.data для обычной формы');
          return;
        }
        if (contentIsMxlTemplateDescriptor(head)) {
          vscode.window.showErrorMessage('Не найден Ext/Template.xml для макета');
          return;
        }
      }
    }

    const stat = await vscode.workspace.fs.stat(targetUri);

    if (stat.type === vscode.FileType.Directory) {
      const foundUri = await findSupportedFileInDirectory(targetUri);
      if (foundUri) {
        targetUri = foundUri;
      } else {
        vscode.window.showInformationMessage('В выбранной папке не найдено поддерживаемых форм 1С или макетов');
        return;
      }
    }

    const doc = await vscode.workspace.openTextDocument(targetUri);
    if (!isSupportedFile(doc)) {
      vscode.window.showInformationMessage('Этот файл не поддерживается (ожидается Управляемая форма, Обычная форма или Макет MXL)');
      return;
    }

    await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.One,
      preserveFocus: true
    });
    openPanelForDocument(doc, context);
  } catch (err) {
    vscode.window.showErrorMessage(`Не удалось открыть: ${err.message}`);
  }
}

function registerPreviewCommands(context) {
  const openPreviewDisposable = vscode.commands.registerCommand('1c-form-viewer.openPreview', async (uri) => {
    await handleOpenPreview(uri, context);
  });

  const openFormPreviewDisposable = vscode.commands.registerCommand('1c-form-viewer.openFormPreview', (uri) => {
    return vscode.commands.executeCommand('1c-form-viewer.openPreview', uri);
  });

  const openFromSidebarDisposable = vscode.commands.registerCommand('1c-form-viewer.openFormFromSidebar', async (uri) => {
    await vscode.commands.executeCommand('1c-form-viewer.openPreview', uri);
  });

  context.subscriptions.push(
    openPreviewDisposable,
    openFormPreviewDisposable,
    openFromSidebarDisposable
  );
}

module.exports = {
  handleOpenPreview,
  registerPreviewCommands
};
