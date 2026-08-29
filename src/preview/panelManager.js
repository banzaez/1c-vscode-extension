const vscode = require('vscode');
const path = require('path');
const { getFileType } = require('../utils');
const { loadWebviewHtml } = require('./htmlLoader');

// Map: uriStr → PanelInfo (каждая панель со своим состоянием)
const openPanels = new Map();

// Отправка обновления в конкретную панель
function postUpdate(info, document) {
  if (!info.panel || !document) return;
  const uriStr = document.uri.toString();
  if (info.lastPostedUri === uriStr && info.lastPostedVersion === document.version) return;
  info.lastPostedUri = uriStr;
  info.lastPostedVersion = document.version;
  info.panel.webview.postMessage({
    command: 'update',
    text: document.getText(),
    fileName: path.basename(document.fileName)
  });
}

function queueWebviewUpdate(info, document) {
  if (!info.panel || !document) return;
  info.pendingDocument = document;
  if (info.webviewReady) {
    postUpdate(info, document);
  }
}

function updateWebviewContent(info, document, extensionPath, precomputedFileType) {
  if (!info.panel || !document) return;
  const fileType = precomputedFileType || getFileType(document);
  if (info.currentFileType !== fileType) {
    info.currentFileType = fileType;
    info.webviewReady = false;
    info.lastPostedUri = null;
    info.lastPostedVersion = null;
    // loadWebviewHtml теперь принимает тип файла напрямую
    info.panel.webview.html = loadWebviewHtml(fileType, info.panel.webview, extensionPath);
  }
  queueWebviewUpdate(info, document);
}

function scheduleWebviewUpdate(info, document, extensionPath) {
  if (info.updateDebounceTimer) clearTimeout(info.updateDebounceTimer);
  info.updateDebounceTimer = setTimeout(() => {
    info.updateDebounceTimer = null;
    updateWebviewContent(info, document, extensionPath);
  }, 250);
}

/**
 * Открывает панель превью для документа
 */
function openPanelForDocument(document, context) {
  const uriStr = document.uri.toString();
  const fileName = path.basename(document.fileName);

  if (openPanels.has(uriStr)) {
    const info = openPanels.get(uriStr);
    if (!info.panel.visible) {
      info.panel.reveal(vscode.ViewColumn.Two, true);
    }
    info.panel.title = `Форма: ${fileName}`;
    updateWebviewContent(info, document, context.extensionPath);
    return info;
  }

  const panel = vscode.window.createWebviewPanel(
    '1cFormViewer',
    `Форма: ${fileName}`,
    vscode.ViewColumn.Two,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.file(context.extensionPath),
        vscode.Uri.file(path.join(context.extensionPath, 'webview')),
        vscode.Uri.file(path.join(context.extensionPath, 'resources', 'icons', 'standart'))
      ]
    }
  );

  const info = {
    panel,
    uriStr,
    currentFileType: null,
    webviewReady: false,
    pendingDocument: document,
    updateDebounceTimer: null,
    lastPostedUri: null,
    lastPostedVersion: null,
  };

  openPanels.set(uriStr, info);

  panel.webview.onDidReceiveMessage(message => {
    if (message && message.command === 'ready') {
      info.webviewReady = true;
      if (info.pendingDocument) postUpdate(info, info.pendingDocument);
    }
  }, undefined, context.subscriptions);

  panel.onDidDispose(() => {
    openPanels.delete(uriStr);
    if (info.updateDebounceTimer) clearTimeout(info.updateDebounceTimer);
  }, null, context.subscriptions);

  updateWebviewContent(info, document, context.extensionPath);
  return info;
}

module.exports = {
  openPanels,
  postUpdate,
  queueWebviewUpdate,
  updateWebviewContent,
  scheduleWebviewUpdate,
  openPanelForDocument
};
