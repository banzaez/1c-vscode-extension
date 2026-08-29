const { registerAllCommands } = require('./src/commands');
const { registerSidebar } = require('./src/sidebar');
const { registerPreviewListeners } = require('./src/preview');
const { registerBslProviders } = require('./src/bsl');
const { registerDecorationProvider } = require('./src/decorations');

function activate(context) {
  // ─── Боковая панель ─────────────────────────────────────────────────────────
  const sidebar = registerSidebar(context);

  // ─── Регистрация команд ─────────────────────────────────────────────────────
  registerAllCommands(context, sidebar);

  // ─── Превью и слушатели документов ──────────────────────────────────────────
  registerPreviewListeners(context);

  // ─── Языковые провайдеры BSL ────────────────────────────────────────────────
  registerBslProviders(context);

  // ─── Декорации файлов ───────────────────────────────────────────────────────
  registerDecorationProvider(context);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
