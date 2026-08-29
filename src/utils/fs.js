const vscode = require('vscode');
const fsPromises = require('fs').promises;

// Переиспользуемый декодер — создаём один раз, используем везде
const _utf8Decoder = new TextDecoder('utf-8');
const XML_HEAD_LINES = 20;

/**
 * Быстрое чтение первых байт файла (по умолчанию 2048) без вычитки всего файла
 */
async function readHead(uri, bytes = 2048) {
  if (uri.scheme === 'file') {
    let fileHandle;
    try {
      fileHandle = await fsPromises.open(uri.fsPath, 'r');
      const buffer = Buffer.alloc(bytes);
      const { bytesRead } = await fileHandle.read(buffer, 0, bytes, 0);
      return buffer.slice(0, bytesRead);
    } catch (e) {
      // Игнорируем ошибку и делаем fallback на vscode.workspace.fs
    } finally {
      if (fileHandle) await fileHandle.close();
    }
  }
  const fullBuf = await vscode.workspace.fs.readFile(uri);
  return fullBuf.slice(0, bytes);
}

/**
 * Чтение первых строк XML документа
 */
function readXmlSnippet(documentOrText) {
  if (typeof documentOrText === 'string') return documentOrText;
  return documentOrText.getText(new vscode.Range(0, 0, XML_HEAD_LINES, 0));
}

/**
 * Удаляет сегменты 'ext' с конца массива частей пути (мутирует массив, возвращает его).
 */
function stripTrailingExt(parts) {
  while (parts.length > 0 && parts[parts.length - 1].toLowerCase() === 'ext') {
    parts.pop();
  }
  return parts;
}

module.exports = {
  _utf8Decoder,
  readHead,
  readXmlSnippet,
  stripTrailingExt
};
