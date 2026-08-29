const vscode = require('vscode');
const path = require('path');
const { TRANSLATION_MAP, FORM_KIND_META } = require('../constants');
const { getFolderIcon, getFileIcon } = require('./icons');

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

module.exports = {
  EmptyItem,
  FolderItem,
  FileItem
};
