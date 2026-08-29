const vscode = require('vscode');
const path = require('path');
const { findProjectFiles } = require('./scanner');
const { getWorkspacePath, buildFormTree } = require('./treeBuilder');
const { EmptyItem, FolderItem, treeNodeToFolderItems } = require('./treeItems');

class ProjectFormsProvider {
  constructor(context) {
    this.context = context;
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.cachedFiles = null;
    this.filterText = '';
  }

  refresh() {
    this.cachedFiles = null;
    this._tree = null;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element) {
    return element;
  }

  _ensureTree() {
    if (this._tree) return;
    const workspacePath = getWorkspacePath(this.context);
    let entries = [
      ...this.cachedFiles.managedForms.map(uri => ({ uri, kind: 'managed' })),
      ...this.cachedFiles.ordinaryForms.map(uri => ({ uri, kind: 'ordinary' })),
      ...this.cachedFiles.mxlTemplates.map(uri => ({ uri, kind: 'mxl' })),
    ];

    if (this.filterText) {
      const query = this.filterText.toLowerCase();
      entries = entries.filter(entry => {
        const basename = path.basename(entry.uri.fsPath).toLowerCase();
        return basename.includes(query);
      });
    }

    this._tree = buildFormTree(entries, workspacePath);
  }

  async getChildren(element) {
    if (!this.cachedFiles) {
      this.cachedFiles = await findProjectFiles();
      this._tree = null;
    }

    const hasItems = this.cachedFiles.managedForms.length > 0 ||
                     this.cachedFiles.ordinaryForms.length > 0 ||
                     this.cachedFiles.mxlTemplates.length > 0;

    if (!hasItems) {
      return [new EmptyItem('Формы и макеты не найдены в проекте')];
    }

    this._ensureTree();

    if (!element) {
      return treeNodeToFolderItems(this._tree, 'all', this.context);
    }

    if (element instanceof FolderItem && element._treeNode) {
      return treeNodeToFolderItems(element._treeNode, element.type, this.context);
    }

    return [];
  }
}

module.exports = {
  ProjectFormsProvider
};
