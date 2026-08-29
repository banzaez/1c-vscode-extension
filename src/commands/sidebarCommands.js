const vscode = require('vscode');

function registerSidebarCommands(context, projectFormsProvider, treeView) {
  const refreshSidebarDisposable = vscode.commands.registerCommand(
    '1c-form-viewer.refreshProjectForms',
    () => projectFormsProvider.refresh()
  );

  const filterProjectFormsDisposable = vscode.commands.registerCommand(
    '1c-form-viewer.filterProjectForms',
    async () => {
      const val = await vscode.window.showInputBox({
        prompt: 'Введите имя формы или макета для фильтрации...',
        value: projectFormsProvider.filterText,
        placeHolder: 'Например: ВыборИнтервалаДат'
      });
      if (val !== undefined) {
        projectFormsProvider.filterText = val.trim();
        treeView.description = projectFormsProvider.filterText ? `Фильтр: "${projectFormsProvider.filterText}"` : '';
        projectFormsProvider._tree = null;
        projectFormsProvider._onDidChangeTreeData.fire();
      }
    }
  );

  const clearProjectFormsFilterDisposable = vscode.commands.registerCommand(
    '1c-form-viewer.clearProjectFormsFilter',
    () => {
      if (projectFormsProvider.filterText) {
        projectFormsProvider.filterText = '';
        treeView.description = '';
        projectFormsProvider._tree = null;
        projectFormsProvider._onDidChangeTreeData.fire();
      }
    }
  );

  context.subscriptions.push(
    refreshSidebarDisposable,
    filterProjectFormsDisposable,
    clearProjectFormsFilterDisposable
  );
}

module.exports = {
  registerSidebarCommands
};
