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
        projectFormsProvider.setFilter(val);
        treeView.description = projectFormsProvider.filterText
          ? `Фильтр: "${projectFormsProvider.filterText}"`
          : '';
      }
    }
  );

  const clearProjectFormsFilterDisposable = vscode.commands.registerCommand(
    '1c-form-viewer.clearProjectFormsFilter',
    () => {
      if (projectFormsProvider.filterText) {
        projectFormsProvider.setFilter('');
        treeView.description = '';
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
