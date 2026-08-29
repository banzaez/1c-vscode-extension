const path = require('path');
const { readXmlSnippet, readHead, _utf8Decoder } = require('./fs');

const _fileKindCache = new Map();

function contentIsManagedForm(text) {
  return /<Form\b[^>]*\sxmlns="http:\/\/v8\.1c\.ru\/8\.3\/xcf\/logform"/.test(text);
}

function contentIsMxlTemplate(text) {
  return text.includes('<document') && (text.includes('spreadsheet') || text.includes('http://v8.1c.ru/8.2/data/spreadsheet'));
}

function contentIsOrdinaryFormDescriptor(text) {
  return /<FormType>\s*Ordinary\s*<\/FormType>/.test(text);
}

function contentIsMxlTemplateDescriptor(text) {
  return /<TemplateType>\s*SpreadsheetDocument\s*<\/TemplateType>/.test(text);
}

/**
 * Быстрое определение типа по имени файла (без чтения содержимого).
 * Возвращает 'managed' | 'ordinary' | 'mxl' | null.
 */
function getKindByFileName(fileName) {
  const lower = fileName.toLowerCase();
  if (lower === 'form.data') return 'ordinary';
  if (lower.endsWith('.mxl')) return 'mxl';
  if (lower === 'form.xml') return 'managed';
  if (lower === 'template.xml') return 'mxl';
  return null;
}

/**
 * Определение типа из содержимого XML.
 * Возвращает 'managed' | 'ordinary' | 'mxl' | null.
 */
function getKindByContent(content) {
  if (contentIsManagedForm(content)) return 'managed';
  if (contentIsMxlTemplate(content)) return 'mxl';
  if (contentIsOrdinaryFormDescriptor(content)) return 'ordinary';
  if (contentIsMxlTemplateDescriptor(content)) return 'mxl';
  return null;
}

/**
 * Быстрое определение типа файла 1С по URI (managed, ordinary, mxl или null) с кэшированием.
 */
async function detectFileKind(fileUri) {
  const fsPath = fileUri.fsPath;
  const fileName = path.basename(fsPath);

  const kindByName = getKindByFileName(fileName);
  if (kindByName !== null) return kindByName;

  if (!fileName.toLowerCase().endsWith('.xml')) return null;

  if (_fileKindCache.has(fsPath)) {
    return _fileKindCache.get(fsPath);
  }

  try {
    const buf = await readHead(fileUri);
    if (!buf.length) {
      _fileKindCache.set(fsPath, null);
      return null;
    }
    const kind = getKindByContent(_utf8Decoder.decode(buf));
    _fileKindCache.set(fsPath, kind);
    return kind;
  } catch (e) {
    return null;
  }
}

function isSupportedFile(document) {
  if (!document) return false;
  const fileName = path.basename(document.fileName);
  const kindByName = getKindByFileName(fileName);
  if (kindByName !== null) return true;
  if (fileName.toLowerCase().endsWith('.xml')) {
    const text = readXmlSnippet(document);
    return getKindByContent(text) !== null;
  }
  return false;
}

function getFileType(document) {
  if (!document) return 'unknown';
  const fileName = path.basename(document.fileName);
  const kindByName = getKindByFileName(fileName);
  if (kindByName !== null) return kindByName;
  if (fileName.toLowerCase().endsWith('.xml')) {
    const text = readXmlSnippet(document);
    // Дескрипторы форм/макетов — не сами данные, а ссылки на них
    if (contentIsOrdinaryFormDescriptor(text) || contentIsMxlTemplateDescriptor(text)) {
      return 'metadata-descriptor';
    }
    const kindByContent = getKindByContent(text);
    if (kindByContent !== null) return kindByContent;
  }
  return 'unknown';
}

function canonicalOrdinaryKey(fsPath) {
  const base = path.basename(fsPath);
  if (base === 'form.data') {
    const extDir = path.dirname(fsPath);
    if (path.basename(extDir).toLowerCase() === 'ext') {
      return path.dirname(extDir);
    }
  }
  if (base.toLowerCase().endsWith('.xml')) {
    return path.join(path.dirname(fsPath), path.basename(fsPath, '.xml'));
  }
  return fsPath;
}

function canonicalMxlKey(fsPath) {
  const base = path.basename(fsPath);
  if (base.toLowerCase() === 'template.xml') {
    const extDir = path.dirname(fsPath);
    if (path.basename(extDir).toLowerCase() === 'ext') {
      return path.dirname(extDir);
    }
  }
  if (base.toLowerCase().endsWith('.xml')) {
    return path.join(path.dirname(fsPath), path.basename(fsPath, '.xml'));
  }
  return fsPath;
}

module.exports = {
  contentIsManagedForm,
  contentIsMxlTemplate,
  contentIsOrdinaryFormDescriptor,
  contentIsMxlTemplateDescriptor,
  getKindByFileName,
  getKindByContent,
  detectFileKind,
  isSupportedFile,
  getFileType,
  canonicalOrdinaryKey,
  canonicalMxlKey,
  _fileKindCache
};
