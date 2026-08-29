const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function loadWebviewHtml(htmlFileName, webview, extensionPath) {
  const htmlPath = path.join(extensionPath, htmlFileName);
  let html = fs.readFileSync(htmlPath, 'utf8');

  if (htmlFileName === 'webview_mxl.html') {
    const mxlDir = path.join(extensionPath, 'webview', 'mxl');
    const appUri = webview.asWebviewUri(vscode.Uri.file(path.join(mxlDir, 'mxl-app.js')));
    const parserUri = webview.asWebviewUri(vscode.Uri.file(path.join(mxlDir, 'mxl-parser.js')));
    const renderUri = webview.asWebviewUri(vscode.Uri.file(path.join(mxlDir, 'mxl-render.js')));
    const cellInfoUri = webview.asWebviewUri(vscode.Uri.file(path.join(mxlDir, 'cell-info.js')));
    const drawingsUri = webview.asWebviewUri(vscode.Uri.file(path.join(mxlDir, 'drawings.js')));
    const preload = [
      '<link rel="modulepreload" href="' + parserUri + '">',
      '<link rel="modulepreload" href="' + renderUri + '">',
      '<link rel="modulepreload" href="' + cellInfoUri + '">',
      '<link rel="modulepreload" href="' + drawingsUri + '">'
    ].join('\n');
    const csp = [
      "default-src 'none'",
      "style-src " + webview.cspSource + " 'unsafe-inline'",
      "script-src " + webview.cspSource,
      "img-src data: blob: " + webview.cspSource
    ].join('; ');
    html = html.replace('<head>', '<head>\n<meta http-equiv="Content-Security-Policy" content="' + csp + '">\n' + preload);
    html = html.replace('__MXL_APP_SCRIPT__', appUri.toString());
  } else if (htmlFileName === 'webview_ordinary.html') {
    const ordDir = path.join(extensionPath, 'webview', 'ordinary');
    const appUri = webview.asWebviewUri(vscode.Uri.file(path.join(ordDir, 'ordinary-app.js')));
    const parserUri = webview.asWebviewUri(vscode.Uri.file(path.join(ordDir, 'ordinary-parser.js')));
    const toolbarUri = webview.asWebviewUri(vscode.Uri.file(path.join(ordDir, 'ordinary-toolbar.js')));
    const renderUri = webview.asWebviewUri(vscode.Uri.file(path.join(ordDir, 'ordinary-render.js')));
    const preload = [
      '<link rel="modulepreload" href="' + parserUri + '">',
      '<link rel="modulepreload" href="' + toolbarUri + '">',
      '<link rel="modulepreload" href="' + renderUri + '">'
    ].join('\n');
    const csp = [
      "default-src 'none'",
      "style-src " + webview.cspSource + " 'unsafe-inline'",
      "script-src " + webview.cspSource
    ].join('; ');
    html = html.replace('<head>', '<head>\n<meta http-equiv="Content-Security-Policy" content="' + csp + '">\n' + preload);
    html = html.replace('__ORDINARY_APP_SCRIPT__', appUri.toString());
  }

  return html;
}

module.exports = {
  loadWebviewHtml
};
