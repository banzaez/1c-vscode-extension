const vscode = require('vscode');
const path = require('path');
const { TRANSLATION_MAP } = require('../constants');

function registerDecorationProvider(context) {
  const decorationProvider = vscode.window.registerFileDecorationProvider({
    provideFileDecoration(uri) {
      const basename = path.basename(uri.fsPath).toLowerCase();
      const translation = TRANSLATION_MAP[basename];
      if (translation) {
        return {
          badge: translation.badge,
          tooltip: translation.ru
        };
      }
      return null;
    }
  });

  context.subscriptions.push(decorationProvider);
  return decorationProvider;
}

module.exports = {
  registerDecorationProvider
};
