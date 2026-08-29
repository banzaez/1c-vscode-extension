const vscode = require('vscode');
const { findProjectFiles } = require('./scanner');
const { getWorkspacePath, getFormPathSegments, buildFormTree, sortTreeNodes } = require('./treeBuilder');
const { getSidebarIcon, _iconCache } = require('./icons');
const { EmptyItem, FolderItem, treeNodeToFolderItems } = require('./treeItems');
const { ProjectFormsProvider } = require('./provider');

/**
 * Инициализация TreeView боковой панели и файлового наблюдателя
 */
function registerSidebar(context) {
  const projectFormsProvider = new ProjectFormsProvider(context);
  const treeView = vscode.window.createTreeView('1c-form-viewer-project-forms', {
    treeDataProvider: projectFormsProvider
  });

  let sidebarRefreshTimer = null;
  function scheduleSidebarRefresh() {
    if (sidebarRefreshTimer) clearTimeout(sidebarRefreshTimer);
    sidebarRefreshTimer = setTimeout(() => {
      sidebarRefreshTimer = null;
      projectFormsProvider.refresh();
    }, 500);
  }

  const workspaceWatcher = vscode.workspace.createFileSystemWatcher('**/{*.xml,form.data}');
  workspaceWatcher.onDidCreate(() => scheduleSidebarRefresh());
  workspaceWatcher.onDidChange(() => scheduleSidebarRefresh());
  workspaceWatcher.onDidDelete(() => scheduleSidebarRefresh());
  context.subscriptions.push(workspaceWatcher);

  return {
    projectFormsProvider,
    treeView
  };
}

module.exports = {
  registerSidebar,
  ProjectFormsProvider,
  findProjectFiles,
  getWorkspacePath,
  getFormPathSegments,
  buildFormTree,
  sortTreeNodes,
  getSidebarIcon,
  _iconCache,
  EmptyItem,
  FolderItem,
  treeNodeToFolderItems
};
