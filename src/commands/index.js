const { registerPreviewCommands, handleOpenPreview } = require('./previewCommands');
const { registerToggleCodeFormCommand, handleToggleCodeForm, findSiblingFile } = require('./toggleCodeForm');
const { registerSidebarCommands } = require('./sidebarCommands');

/**
 * Регистрация всех команд расширения
 */
function registerAllCommands(context, { projectFormsProvider, treeView }) {
  registerPreviewCommands(context);
  registerToggleCodeFormCommand(context);
  registerSidebarCommands(context, projectFormsProvider, treeView);
}

module.exports = {
  registerAllCommands,
  registerPreviewCommands,
  handleOpenPreview,
  registerToggleCodeFormCommand,
  handleToggleCodeForm,
  findSiblingFile,
  registerSidebarCommands
};
