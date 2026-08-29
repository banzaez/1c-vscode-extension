const vscode = require('vscode');
const { TRANSLATION_MAP, FORM_KIND_META } = require('../constants');
const { getSidebarIcon } = require('./icons');
const { sortTreeNodes } = require('./treeBuilder');

class EmptyItem extends vscode.TreeItem {
  constructor(message) {
    super(message, vscode.TreeItemCollapsibleState.None);
    this.contextValue = 'empty';
    this.iconPath = new vscode.ThemeIcon('info');
  }
}

class FolderItem extends vscode.TreeItem {
  constructor(label, categoryType, context, treeNode = null) {
    const isLeaf = !!(treeNode && treeNode.associatedUri);
    const translation = TRANSLATION_MAP[label.toLowerCase()];
    const displayLabel = (!isLeaf && translation) ? `${label} (${translation.ru})` : label;
    super(displayLabel, isLeaf ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed);
    this.type = categoryType;
    this._treeNode = isLeaf ? null : treeNode;
    this.contextValue = 'formFolder';
    this.iconPath = getSidebarIcon(label, isLeaf, isLeaf ? treeNode.kind : null, context, treeNode ? treeNode.category : null, treeNode ? treeNode.level : 0);

    if (isLeaf) {
      const meta = FORM_KIND_META[treeNode.kind] || FORM_KIND_META.managed;
      this.contextValue = meta.contextValue;
      this.description = meta.description;
      this.resourceUri = treeNode.associatedUri;
      this.tooltip = treeNode.associatedUri.fsPath;
      this.command = {
        command: '1c-form-viewer.openFormFromSidebar',
        title: 'Открыть',
        arguments: [treeNode.associatedUri],
      };
    }
  }
}

function treeNodeToFolderItems(treeNode, categoryType, context) {
  return sortTreeNodes(
    Array.from(treeNode.children.values()).map(child => new FolderItem(child.label, categoryType, context, child))
  );
}

module.exports = {
  EmptyItem,
  FolderItem,
  treeNodeToFolderItems
};
