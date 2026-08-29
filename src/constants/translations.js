const { METADATA_DEFINITIONS } = require('./metadata');

// Маппинг для бейджей и русских наименований
const TRANSLATION_MAP = {};

for (const def of METADATA_DEFINITIONS) {
  if (def.ru && def.badge) {
    TRANSLATION_MAP[def.id.toLowerCase()] = { ru: def.ru, badge: def.badge };
  }
}

module.exports = {
  TRANSLATION_MAP
};
