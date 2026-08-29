const path = require('path');
const { readXmlSnippet } = require('./fs');

function contentIsManagedForm(text) {
  // Обычные формы в MetaDataObject тоже содержат «logform» в xmlns:lf — проверяем корневой namespace.
  return /<Form\b[^>]*\sxmlns="http:\/\/v8\.1c\.ru\/8\.3\/xcf\/logform"/.test(text);
}

function contentIsMxlTemplate(text) {
  return text.includes('<document') && (text.includes('spreadsheet') || text.includes('http://v8.1c.ru/8.2/data/spreadsheet'));
}

/** MetaDataObject-описатель обычной формы (Forms/ИмяФормы.xml). */
function contentIsOrdinaryFormDescriptor(text) {
  return /<FormType>\s*Ordinary\s*<\/FormType>/.test(text);
}

/** MetaDataObject-описатель макета MXL (Templates/ИмяМакета.xml). */
function contentIsMxlTemplateDescriptor(text) {
  return /<TemplateType>\s*SpreadsheetDocument\s*<\/TemplateType>/.test(text);
}

function isSupportedFile(document) {
  if (!document) return false;
  const fileName = path.basename(document.fileName);
  if (fileName === 'form.data') return true;
  if (fileName.toLowerCase().endsWith('.mxl')) return true;
  if (fileName.endsWith('.xml')) {
    const text = readXmlSnippet(document);
    if (contentIsManagedForm(text) || contentIsMxlTemplate(text) ||
        contentIsOrdinaryFormDescriptor(text) || contentIsMxlTemplateDescriptor(text)) {
      return true;
    }
  }
  return false;
}

function getFileType(document) {
  if (!document) return 'unknown';
  const fileName = path.basename(document.fileName);
  if (fileName === 'form.data') return 'ordinary';
  if (fileName.toLowerCase().endsWith('.mxl')) return 'mxl';
  if (fileName.endsWith('.xml')) {
    const text = readXmlSnippet(document);
    if (contentIsOrdinaryFormDescriptor(text) || contentIsMxlTemplateDescriptor(text)) {
      return 'metadata-descriptor';
    }
    if (contentIsManagedForm(text)) return 'managed';
    if (contentIsMxlTemplate(text)) return 'mxl';
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
  isSupportedFile,
  getFileType,
  canonicalOrdinaryKey,
  canonicalMxlKey
};
