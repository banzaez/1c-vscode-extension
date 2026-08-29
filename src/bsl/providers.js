const vscode = require('vscode');
const {
  BSL_WORD_PATTERN,
  bslWordRegex,
  isBslWritePosition,
  buildBslSemanticTokens
} = require('./helpers');

const bslSymbolProvider = {
  provideDocumentSymbols(document, token) {
    const symbols = [];
    const text = document.getText();
    const regex = /^\s*(?:&[^\r\n]+\s+)?(?:\b(процедура|функция|procedure|function)\b)\s+([a-zA-Zа-яА-Я0-9_]+)/gim;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const keyword = match[1].toLowerCase();
      const name = match[2];
      const kind = (keyword === 'процедура' || keyword === 'procedure') 
        ? vscode.SymbolKind.Method 
        : vscode.SymbolKind.Function;
      
      const lineNum = document.positionAt(match.index).line;
      const line = document.lineAt(lineNum);
      
      symbols.push(new vscode.DocumentSymbol(
        name,
        match[0].trim(),
        kind,
        line.range,
        line.range
      ));
    }
    return symbols;
  }
};

const bslHighlightProvider = {
  provideDocumentHighlights(document, position) {
    const wordRange = document.getWordRangeAtPosition(position, BSL_WORD_PATTERN);
    if (!wordRange) return [];
    const word = document.getText(wordRange);
    if (word.length < 2) return [];

    const text = document.getText();
    const regex = bslWordRegex(word);
    const highlights = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      const start = document.positionAt(match.index);
      const range = new vscode.Range(start, start.translate(0, word.length));
      const lineText = document.lineAt(start.line).text;
      const isWrite = isBslWritePosition(lineText, start.character, word.length);
      highlights.push(new vscode.DocumentHighlight(
        range,
        isWrite ? vscode.DocumentHighlightKind.Write : vscode.DocumentHighlightKind.Read
      ));
    }
    return highlights;
  }
};

const bslReferenceProvider = {
  provideReferences(document, position) {
    const wordRange = document.getWordRangeAtPosition(position, BSL_WORD_PATTERN);
    if (!wordRange) return [];
    const word = document.getText(wordRange);
    if (word.length < 2) return [];

    const text = document.getText();
    const regex = bslWordRegex(word);
    const locations = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      const start = document.positionAt(match.index);
      locations.push(new vscode.Location(document.uri, new vscode.Range(start, start.translate(0, word.length))));
    }
    return locations;
  }
};

const bslRenameProvider = {
  prepareRename(document, position) {
    const wordRange = document.getWordRangeAtPosition(position, BSL_WORD_PATTERN);
    if (!wordRange) {
      throw new Error('Нельзя переименовать этот символ');
    }
    const word = document.getText(wordRange);
    if (word.length < 2) {
      throw new Error('Нельзя переименовать этот символ');
    }
    return { range: wordRange, placeholder: word };
  },
  provideRenameEdits(document, position, newName) {
    const wordRange = document.getWordRangeAtPosition(position, BSL_WORD_PATTERN);
    if (!wordRange) return null;
    const word = document.getText(wordRange);
    if (word.length < 2) return null;

    const text = document.getText();
    const regex = bslWordRegex(word);
    const edit = new vscode.WorkspaceEdit();
    let match;
    while ((match = regex.exec(text)) !== null) {
      const start = document.positionAt(match.index);
      edit.replace(document.uri, new vscode.Range(start, start.translate(0, word.length)), newName);
    }
    return edit;
  }
};

const bslSemanticTokensProvider = {
  provideDocumentSemanticTokens(document) {
    try {
      return buildBslSemanticTokens(document);
    } catch (e) {
      return null;
    }
  }
};

module.exports = {
  bslSymbolProvider,
  bslHighlightProvider,
  bslReferenceProvider,
  bslRenameProvider,
  bslSemanticTokensProvider
};
