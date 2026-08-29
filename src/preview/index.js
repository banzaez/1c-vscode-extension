const vscode = require('vscode');
const path = require('path');
const { getFileType } = require('../utils');
const { loadWebviewHtml } = require('./htmlLoader');
const {
  resolveOrdinaryFormDescriptor,
  resolveMxlTemplateDescriptor,
  resolveMetadataDescriptor,
  findSupportedFileInDirectory
} = require('./fileResolver');
const {
  openPanels,
  postUpdate,
  queueWebviewUpdate,
  updateWebviewContent,
  scheduleWebviewUpdate,
  openPanelForDocument
} = require('./panelManager');
const { FormPreviewEditorProvider } = require('./customEditor');

/**
 * Регистрация слушателей документов для автообновления превью
 */
function registerPreviewListeners(context) {
  vscode.workspace.onDidChangeTextDocument(e => {
    const info = openPanels.get(e.document.uri.toString());
    if (info) scheduleWebviewUpdate(info, e.document, context.extensionPath);
  }, null, context.subscriptions);

  vscode.workspace.onDidSaveTextDocument(document => {
    const info = openPanels.get(document.uri.toString());
    if (info) updateWebviewContent(info, document, context.extensionPath);
  }, null, context.subscriptions);

  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (!editor) return;
    const fileType = getFileType(editor.document);
    if (fileType === 'unknown' || fileType === 'metadata-descriptor') return;
    const info = openPanels.get(editor.document.uri.toString());
    if (info) {
      info.panel.title = `Форма: ${path.basename(editor.document.fileName)}`;
      updateWebviewContent(info, editor.document, context.extensionPath, fileType);
    }
  }, null, context.subscriptions);

  context.subscriptions.push(FormPreviewEditorProvider.register(context));
}

module.exports = {
  registerPreviewListeners,
  loadWebviewHtml,
  resolveOrdinaryFormDescriptor,
  resolveMxlTemplateDescriptor,
  resolveMetadataDescriptor,
  findSupportedFileInDirectory,
  openPanels,
  postUpdate,
  queueWebviewUpdate,
  updateWebviewContent,
  scheduleWebviewUpdate,
  openPanelForDocument,
  FormPreviewEditorProvider
};
