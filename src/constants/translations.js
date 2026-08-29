const { ITEM_META } = require('./metadata');

// Маппинг для декораций и меток дерева — производится из ITEM_META автоматически
const TRANSLATION_MAP = Object.fromEntries(
  Object.entries(ITEM_META)
    .filter(([, v]) => v.ru && v.badge)
    .map(([k, v]) => [k, { ru: v.ru, badge: v.badge }])
);

module.exports = {
  TRANSLATION_MAP
};
