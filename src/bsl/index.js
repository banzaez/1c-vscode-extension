const vscode = require('vscode');
const { bslSemanticLegend, BSL_WORD_PATTERN, bslWordRegex, isBslWritePosition, buildBslSemanticTokens } = require('./helpers');
const {
  bslSymbolProvider,
  bslHighlightProvider,
  bslReferenceProvider,
  bslRenameProvider,
  bslSemanticTokensProvider
} = require('./providers');

/**
 * Регистрация всех языковых провайдеров для языка BSL
 */
function registerBslProviders(context) {
  const languageSelector = { language: 'bsl' };

  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider(languageSelector, bslSymbolProvider),
    vscode.languages.registerDocumentHighlightProvider(languageSelector, bslHighlightProvider),
    vscode.languages.registerReferenceProvider(languageSelector, bslReferenceProvider),
    vscode.languages.registerRenameProvider(languageSelector, bslRenameProvider),
    vscode.languages.registerDocumentSemanticTokensProvider(
      languageSelector,
      bslSemanticTokensProvider,
      bslSemanticLegend
    )
  );
}

module.exports = {
  registerBslProviders,
  bslSymbolProvider,
  bslHighlightProvider,
  bslReferenceProvider,
  bslRenameProvider,
  bslSemanticTokensProvider,
  bslSemanticLegend,
  BSL_WORD_PATTERN,
  bslWordRegex,
  isBslWritePosition,
  buildBslSemanticTokens
};
