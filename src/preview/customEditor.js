const vscode = require('vscode');
const path = require('path');
const { getFileType } = require('../utils');
const { openPanels, updateWebviewContent } = require('./panelManager');

class FormPreviewEditorProvider {
  static register(context) {
    const provider = new FormPreviewEditorProvider(context);
    return vscode.window.registerCustomEditorProvider(FormPreviewEditorProvider.viewType, provider);
  }

  static viewType = '1c-form-viewer.previewEditor';

  constructor(context) {
    this.context = context;
  }

  async resolveCustomTextEditor(document, webviewPanel, token) {
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(this.context.extensionPath, 'webview')),
        vscode.Uri.file(path.join(this.context.extensionPath, 'resources', 'icons', 'standart'))
      ]
    };

    const fileType = getFileType(document);
    const info = {
      panel: webviewPanel,
      lastUri: document.uri,
      lastContent: null
    };

    openPanels.set(document.uri.toString(), info);

    webviewPanel.onDidDispose(() => {
      openPanels.delete(document.uri.toString());
    });

    updateWebviewContent(info, document, this.context.extensionPath, fileType);
  }
}

module.exports = {
  FormPreviewEditorProvider
};
