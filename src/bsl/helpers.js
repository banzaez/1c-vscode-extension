const vscode = require('vscode');

const BSL_WORD_PATTERN = /[a-zA-Zа-яА-ЯёЁ_][a-zA-Zа-яА-ЯёЁ0-9_]*/;

const bslSemanticLegend = new vscode.SemanticTokensLegend(
  ['variable', 'parameter'],  // индексы: variable=0, parameter=1
  ['declaration']             // модификаторы: declaration=0
);

// Кэш строк паттернов для RegExp (не сами объекты RegExp — они не переиспользуются
// из-за флага `g` и сброса lastIndex между async вызовами VSCode)
const _patternCache = new Map();

/**
 * Строит RegExp для точного поиска слова с учётом кириллицы.
 * Каждый вызов возвращает новый RegExp с флагом `g` — безопасно для параллельных callbacks.
 */
function bslWordRegex(word) {
  let pattern = _patternCache.get(word);
  if (!pattern) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    pattern = `(?<![a-zA-Zа-яА-ЯёЁ_0-9])${escaped}(?![a-zA-Zа-яА-ЯёЁ_0-9])`;
    if (_patternCache.size > 200) _patternCache.clear();
    _patternCache.set(word, pattern);
  }
  return new RegExp(pattern, 'g');
}

/**
 * Определяет, является ли данная позиция в строке местом записи переменной.
 * Запись: идентификатор сразу за ним идёт = (но не <, >, !, =)
 */
function isBslWritePosition(lineText, charIndex, wordLen) {
  const after = lineText.slice(charIndex + wordLen).trimStart();
  return /^=(?![=])/.test(after) && !/(?:Если|If|Пока|While|Тогда|Then)\b/i.test(lineText);
}

/**
 * Построение семантических токенов для переменных и параметров в BSL
 */
function buildBslSemanticTokens(document) {
  const text = document.getText();
  const builder = new vscode.SemanticTokensBuilder(bslSemanticLegend);

  // --- 1. Собираем параметры всех функций/процедур ---
  const paramNames = new Set();
  const funcParamRx = /(?:Процедура|Функция|Procedure|Function)\s+[a-zA-Zа-яА-ЯёЁ_][a-zA-Zа-яА-ЯёЁ0-9_]*\s*\(([^)]*)\)/gi;
  let m;
  while ((m = funcParamRx.exec(text)) !== null) {
    for (const part of m[1].split(',')) {
      const name = part.trim().replace(/^\s*(?:Знач|Val)\s+/i, '').trim();
      if (/^[a-zA-Zа-яА-ЯёЁ_][a-zA-Zа-яА-ЯёЁ0-9_]*$/.test(name) && name.length > 1) {
        paramNames.add(name);
      }
    }
  }

  // --- 2. Собираем имена Перем-переменных ---
  const varNames = new Set();
  const peremRx = /(?:Перем|Var)\b([^;\n]+)/gi;
  while ((m = peremRx.exec(text)) !== null) {
    for (const part of m[1].split(',')) {
      const name = part.trim().replace(/\s+(?:Экспорт|Export)$/i, '').trim();
      if (/^[a-zA-Zа-яА-ЯёЁ_][a-zA-Zа-яА-ЯёЁ0-9_]*$/.test(name) && name.length > 1) {
        varNames.add(name);
      }
    }
  }

  if (paramNames.size === 0 && varNames.size === 0) return builder.build();

  // --- 3. Проходим по всем идентификаторам в документе ---
  // Пропускаем содержимое строк и комментариев
  const identRx = /(?:\/\/[^\n]*)|(?:"[^"]*")|([a-zA-Zа-яА-ЯёЁ_][a-zA-Zа-яА-ЯёЁ0-9_]*)/g;
  while ((m = identRx.exec(text)) !== null) {
    if (!m[1]) continue;

    const name = m[1];
    const pos = document.positionAt(m.index);

    if (paramNames.has(name)) {
      builder.push(pos.line, pos.character, name.length, 1, 0);
    } else if (varNames.has(name)) {
      builder.push(pos.line, pos.character, name.length, 0, 0);
    }
  }

  return builder.build();
}

module.exports = {
  BSL_WORD_PATTERN,
  bslSemanticLegend,
  bslWordRegex,
  isBslWritePosition,
  buildBslSemanticTokens
};
