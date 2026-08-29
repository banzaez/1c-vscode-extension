const vscode = require('vscode');
const path = require('path');
const { EmptyItem, FolderItem, FileItem } = require('./treeItems');
const { buildFormTree, getWorkspacePath } = require('./treeBuilder');
const { get1cOrder, TRANSLATION_MAP } = require('../constants');
const { detectFileKind } = require('../utils');

const IGNORED_NAMES = new Set(['.git', 'node_modules', '.DS_Store', '.vscode']);
const collator = new Intl.Collator('ru', { sensitivity: 'base', numeric: true });

function compare1cNodes(nameA, nameB) {
  const orderA = get1cOrder(nameA);
  const orderB = get1cOrder(nameB);

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  const labelA = TRANSLATION_MAP[nameA.toLowerCase()]?.ru || nameA;
  const labelB = TRANSLATION_MAP[nameB.toLowerCase()]?.ru || nameB;
  return collator.compare(labelA, labelB);
}

class ProjectFormsProvider {
  constructor(context) {
    this.context = context;
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.filterText = '';
    this._filteredTree = null;
  }

  refresh() {
    this._filteredTree = null;
    this._onDidChangeTreeData.fire();
  }

  /**
   * Устанавливает фильтр и сбрасывает дерево. Используйте этот метод вместо
   * прямого изменения полей filterText/_filteredTree/_onDidChangeTreeData.
   * @param {string} text - текст фильтра (пустая строка — сброс фильтра)
   */
  setFilter(text) {
    this.filterText = text.trim();
    this._filteredTree = null;
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element) {
    return element;
  }

  async getChildren(element) {
    // ─── Режим фильтрации ───────────────────────────────────────────────────
    if (this.filterText) {
      return this._getFilteredChildren(element);
    }

    // ─── Обычный режим: реальная файловая структура на лету ───────────────────
    if (!element) {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        return [new EmptyItem('Нет открытых папок в рабочей области')];
      }

      if (workspaceFolders.length === 1) {
        return this._getDirectoryChildren(workspaceFolders[0].uri, null, 0);
      }

      return workspaceFolders.map(wf => new FolderItem(wf.uri, wf.name, this.context, null, 0));
    }

    if (element instanceof FolderItem) {
      return this._getDirectoryChildren(element.resourceUri, element.category, element.level + 1);
    }

    return [];
  }

  /**
   * Получение детей директории с каноническим порядком 1С
   */
  async _getDirectoryChildren(dirUri, parentCategory, level) {
    try {
      const entries = await vscode.workspace.fs.readDirectory(dirUri);
      if (!entries || entries.length === 0) {
        return [];
      }

      const dirs = [];
      const files = [];

      for (const [name, type] of entries) {
        if (IGNORED_NAMES.has(name)) continue;

        const itemUri = vscode.Uri.joinPath(dirUri, name);

        if (type === vscode.FileType.Directory) {
          dirs.push({ name, uri: itemUri });
        } else if (type === vscode.FileType.File || type === vscode.FileType.SymbolicLink) {
          files.push({ name, uri: itemUri });
        }
      }

      // Сортировка папок по порядку Конфигуратора 1С, затем по алфавиту через быстрый Intl.Collator
      dirs.sort((a, b) => compare1cNodes(a.name, b.name));

      // Сортировка файлов по алфавиту
      files.sort((a, b) => collator.compare(a.name, b.name));

      // Создаем элементы папок
      const folderItems = dirs.map(d => new FolderItem(d.uri, d.name, this.context, parentCategory, level));

      // Создаем элементы файлов с параллельным определением типов 1С
      const fileItems = await Promise.all(
        files.map(async f => {
          const kind = await detectFileKind(f.uri);
          return new FileItem(f.uri, kind, this.context);
        })
      );

      return [...folderItems, ...fileItems];
    } catch (e) {
      console.error('Ошибка чтения каталога:', dirUri.fsPath, e);
      return [];
    }
  }

  /**
   * Построение и навигация по отфильтрованному дереву
   */
  async _getFilteredChildren(element) {
    if (!this._filteredTree) {
      const query = this.filterText.toLowerCase();
      const allFiles = await vscode.workspace.findFiles('**/*', '{**/node_modules/**,**/.git/**}');
      const matchingFiles = allFiles.filter(uri => {
        const base = path.basename(uri.fsPath).toLowerCase();
        return base.includes(query);
      });

      if (matchingFiles.length === 0) {
        return [new EmptyItem(`Ничего не найдено по запросу "${this.filterText}"`)];
      }

      const entries = await Promise.all(
        matchingFiles.map(async uri => {
          const kind = await detectFileKind(uri);
          return { uri, kind };
        })
      );

      const wsPath = getWorkspacePath(this.context);
      this._filteredTree = buildFormTree(entries, wsPath);
    }

    const node = element ? element._treeNode : this._filteredTree;
    if (!node || !node.children) return [];

    const result = [];
    const sortedChildren = Array.from(node.children.values()).sort((a, b) =>
      compare1cNodes(a.label, b.label)
    );

    for (const child of sortedChildren) {
      const isLeaf = !!child.associatedUri;
      if (isLeaf) {
        result.push(new FileItem(child.associatedUri, child.kind, this.context));
      } else {
        const folder = new FolderItem(vscode.Uri.file(child.label), child.label, this.context, child.category, child.level);
        folder._treeNode = child;
        result.push(folder);
      }
    }

    return result;
  }
}

module.exports = {
  ProjectFormsProvider,
  compare1cNodes
};
