const vscode = require('vscode');
const path = require('path');
const { ITEM_META, LEVEL2_SINGULAR } = require('../constants');

const _iconCache = new Map();

function getSidebarIcon(label, isLeaf, kind, context, category = null, level = 0) {
  const iconDir = path.join(context.extensionPath, 'resources', 'icons', 'standart');

  if (isLeaf) {
    return vscode.Uri.file(path.join(iconDir, kind === 'mxl' ? 'SpreadsheetShowGrid.png' : 'Form.png'));
  }

  const cacheKey = `${label}:${level}:${category}`;
  if (_iconCache.has(cacheKey)) return _iconCache.get(cacheKey);

  const explorerDir = path.join(context.extensionPath, 'resources', 'explorer');
  let result;

  if (level === 2 && category) {
    const singKey = LEVEL2_SINGULAR[category];
    const singMeta = singKey && ITEM_META[singKey];
    if (singMeta?.icon) {
      result = vscode.Uri.file(path.join(iconDir, singMeta.icon));
      _iconCache.set(cacheKey, result);
      return result;
    }
  }

  const lower = label.toLowerCase();
  const meta = ITEM_META[lower];
  if (meta?.icon) {
    const dir = meta.icon.endsWith('.svg') ? explorerDir : iconDir;
    result = vscode.Uri.file(path.join(dir, meta.icon));
    _iconCache.set(cacheKey, result);
    return result;
  }

  result = new vscode.ThemeIcon('folder');
  _iconCache.set(cacheKey, result);
  return result;
}

module.exports = {
  getSidebarIcon,
  _iconCache
};
