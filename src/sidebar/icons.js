const vscode = require('vscode');
const path = require('path');
const { ITEM_META, LEVEL2_SINGULAR } = require('../constants');

const _iconCache = new Map();

/**
 * Получение иконки для папки
 */
function getFolderIcon(label, context, parentCategory = null, level = 0) {
  const cacheKey = `dir:${label}:${level}:${parentCategory}`;
  if (_iconCache.has(cacheKey)) return _iconCache.get(cacheKey);

  const iconDir = path.join(context.extensionPath, 'resources', 'icons', 'standart');
  const explorerDir = path.join(context.extensionPath, 'resources', 'explorer');
  let result;

  // Если это объект 2-го уровня внутри категории (например Catalogs -> Номенклатура)
  if (level === 2 && parentCategory) {
    const singKey = LEVEL2_SINGULAR[parentCategory];
    const singMeta = singKey && ITEM_META[singKey];
    if (singMeta?.icon) {
      const dir = singMeta.icon.endsWith('.svg') ? explorerDir : iconDir;
      result = vscode.Uri.file(path.join(dir, singMeta.icon));
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

/**
 * Получение иконки для файла
 */
function getFileIcon(fileName, kind, context) {
  const iconDir = path.join(context.extensionPath, 'resources', 'icons', 'standart');

  if (kind === 'managed' || kind === 'ordinary') {
    return vscode.Uri.file(path.join(iconDir, 'Form.png'));
  }
  if (kind === 'mxl') {
    return vscode.Uri.file(path.join(iconDir, 'SpreadsheetShowGrid.png'));
  }

  const lower = fileName.toLowerCase();
  if (lower === 'module.bsl' || lower.endsWith('.bsl') || lower.endsWith('.os')) {
    return vscode.Uri.file(path.join(iconDir, 'DataProcessor.png'));
  }
  if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.svg')) {
    return vscode.Uri.file(path.join(iconDir, 'Picture.png'));
  }

  return vscode.ThemeIcon.File;
}

module.exports = {
  getFolderIcon,
  getFileIcon,
  _iconCache
};
