const vscode = require('vscode');
const path = require('path');
const {
  _utf8Decoder,
  readHead,
  contentIsOrdinaryFormDescriptor,
  contentIsMxlTemplateDescriptor
} = require('../utils');

async function resolveOrdinaryFormDescriptor(xmlUri) {
  const xmlPath = xmlUri.fsPath;
  const dir = path.dirname(xmlPath);
  const baseName = path.basename(xmlPath, '.xml');
  const formData = vscode.Uri.file(path.join(dir, baseName, 'Ext', 'form.data'));
  try {
    const fStat = await vscode.workspace.fs.stat(formData);
    if (fStat.type === vscode.FileType.File) {
      return formData;
    }
  } catch (e) {
    // Файл не найден — это ожидаемое поведение (форма ещё не развёрнута), логировать не нужно
  }
  return null;
}

async function resolveMxlTemplateDescriptor(xmlUri) {
  const xmlPath = xmlUri.fsPath;
  const dir = path.dirname(xmlPath);
  const baseName = path.basename(xmlPath, '.xml');
  const templateXml = vscode.Uri.file(path.join(dir, baseName, 'Ext', 'Template.xml'));
  try {
    const stat = await vscode.workspace.fs.stat(templateXml);
    if (stat.type === vscode.FileType.File) {
      return templateXml;
    }
  } catch (e) {
    // Файл не найден — ожидаемое поведение, логировать не нужно
  }
  return null;
}

async function resolveMetadataDescriptor(uri) {
  try {
    const buf = await readHead(uri);
    const head = _utf8Decoder.decode(buf);
    if (contentIsOrdinaryFormDescriptor(head)) {
      return resolveOrdinaryFormDescriptor(uri);
    }
    if (contentIsMxlTemplateDescriptor(head)) {
      return resolveMxlTemplateDescriptor(uri);
    }
  } catch (e) {
    console.error('[1c-form-viewer] Ошибка при чтении дескриптора метаданных:', uri.fsPath, e.message);
  }
  return null;
}

async function findSupportedFileInDirectory(dirUri) {
  const entries = await vscode.workspace.fs.readDirectory(dirUri);

  for (const [name, type] of entries) {
    if (type === vscode.FileType.File) {
      const lowerName = name.toLowerCase();
      if (lowerName === 'form.data') return vscode.Uri.joinPath(dirUri, name);
      if (lowerName === 'template.xml' || lowerName === 'form.xml') return vscode.Uri.joinPath(dirUri, name);
    }
  }

  for (const [name, type] of entries) {
    if (type === vscode.FileType.Directory && name !== 'node_modules' && name !== '.git') {
      const subdir = vscode.Uri.joinPath(dirUri, name);
      const found = await findSupportedFileInDirectory(subdir);
      if (found) return found;
    } else if (type === vscode.FileType.File && name.toLowerCase().endsWith('.xml')) {
      const fileUri = vscode.Uri.joinPath(dirUri, name);
      try {
        const buf = await readHead(fileUri);
        const content = _utf8Decoder.decode(buf);
        if (content.includes('<Form') || content.includes('<document') ||
            contentIsOrdinaryFormDescriptor(content) || contentIsMxlTemplateDescriptor(content)) {
          return fileUri;
        }
      } catch (e) {
        console.error('[1c-form-viewer] Ошибка при сканировании директории:', fileUri.fsPath, e.message);
      }
    }
  }
  return null;
}

module.exports = {
  resolveOrdinaryFormDescriptor,
  resolveMxlTemplateDescriptor,
  resolveMetadataDescriptor,
  findSupportedFileInDirectory
};
