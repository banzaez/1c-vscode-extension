const vscode = require('vscode');
const path = require('path');
const { TRANSLATION_MAP, FORM_KIND_META } = require('../constants');
const { getFolderIcon, getFileIcon } = require('./icons');
const {
  _utf8Decoder,
  readHead,
  contentIsManagedForm,
  contentIsMxlTemplate,
  contentIsOrdinaryFormDescriptor,
  contentIsMxlTemplateDescriptor
} = require('../utils');

class EmptyItem extends vscode.TreeItem {
  constructor(message) {
    super(message, vscode.TreeItemCollapsibleState.None);
    this.contextValue = 'empty';
    this.iconPath = new vscode.ThemeIcon('info');
  }
}

class FolderItem extends vscode.TreeItem {
  constructor(folderUri, label, context, parentCategory = null, level = 0) {
    const cleanLabel = label || path.basename(folderUri.fsPath);
    const translation = TRANSLATION_MAP[cleanLabel.toLowerCase()];
    // Отображаем только русское имя метаданных 1С (если есть перевод), иначе оригинальное имя папки
    const displayLabel = translation?.ru || cleanLabel;

    super(displayLabel, vscode.TreeItemCollapsibleState.Collapsed);

    this.resourceUri = folderUri;
    this.tooltip = folderUri.fsPath;
    this.contextValue = 'folder';
    this.rawName = cleanLabel;
    this.level = level;
    this.category = parentCategory || (TRANSLATION_MAP[cleanLabel.toLowerCase()] ? cleanLabel.toLowerCase() : null);
    this.iconPath = getFolderIcon(cleanLabel, context, parentCategory, level);
  }
}

class FileItem extends vscode.TreeItem {
  constructor(fileUri, kind, context) {
    const fileName = path.basename(fileUri.fsPath);
    super(fileName, vscode.TreeItemCollapsibleState.None);

    this.resourceUri = fileUri;
    this.tooltip = fileUri.fsPath;
    this.kind = kind;
    this.rawName = fileName;

    if (kind === 'managed' || kind === 'ordinary' || kind === 'mxl') {
      const meta = FORM_KIND_META[kind] || FORM_KIND_META.managed;
      this.contextValue = meta.contextValue;
      this.description = meta.description;
      this.iconPath = getFileIcon(fileName, kind, context);
      this.command = {
        command: '1c-form-viewer.openPreview',
        title: 'Открыть форму / макет',
        arguments: [fileUri]
      };
    } else {
      this.contextValue = 'regularFile';
      this.iconPath = getFileIcon(fileName, 'regular', context);
      this.command = {
        command: 'vscode.open',
        title: 'Открыть файл',
        arguments: [fileUri]
      };
    }
  }
}

/**
 * Быстрое определение типа файла 1С (managed, ordinary, mxl или null)
 */
async function detectFileKind(fileUri) {
  const fileName = path.basename(fileUri.fsPath).toLowerCase();

  if (fileName === 'form.data') return 'ordinary';
  if (fileName.endsWith('.mxl')) return 'mxl';

  if (fileName.endsWith('.xml')) {
    if (fileName === 'form.xml') return 'managed';
    if (fileName === 'template.xml') return 'mxl';

    try {
      const buf = await readHead(fileUri);
      if (!buf.length) return null;
      const content = _utf8Decoder.decode(buf);
      if (contentIsManagedForm(content)) return 'managed';
      if (contentIsMxlTemplate(content)) return 'mxl';
      if (contentIsOrdinaryFormDescriptor(content)) return 'ordinary';
      if (contentIsMxlTemplateDescriptor(content)) return 'mxl';
    } catch (e) {
      return null;
    }
  }

  return null;
}

module.exports = {
  EmptyItem,
  FolderItem,
  FileItem,
  detectFileKind
};
