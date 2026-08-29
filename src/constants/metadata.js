// Декларативный реестр типов метаданных 1С Предприятие 8 в порядке Конфигуратора
const METADATA_DEFINITIONS = [
  // ── Общие объекты ─────────────────────────────────────────────────────────
  { id: 'subsystems', ru: 'Подсистемы', ruSingular: 'Подсистема', badge: 'ПД', icon: 'folder-subsystems.svg' },
  { id: 'commonmodules', ru: 'Общие модули', ruSingular: 'Общий модуль', badge: 'ОМ', icon: 'DataProcessor.png' },
  { id: 'sessionparameters', ru: 'Параметры сеанса', ruSingular: 'Параметр сеанса', badge: 'ПМ', icon: 'folder-sessionparameters.svg' },
  { id: 'roles', ru: 'Роли', ruSingular: 'Роль', badge: 'РЛ', icon: 'UserWithAuthentication.png' },
  { id: 'commonattributes', ru: 'Общие реквизиты', ruSingular: 'Общий реквизит', badge: 'ОР', icon: 'Attribute.png' },
  { id: 'exchangeplans', ru: 'Планы обмена', ruSingular: 'План обмена', badge: 'ПО', icon: 'ExchangePlan.png', singularIcon: 'ExchangePlanObject.png' },
  { id: 'filtercriteria', ru: 'Критерии отбора', ruSingular: 'Критерий отбора', badge: 'КО', icon: 'FilterCriterion.png' },
  { id: 'eventsubscriptions', ru: 'Подписки на события', ruSingular: 'Подписка на событие', badge: 'ПБ', icon: 'EventLog.png' },
  { id: 'scheduledjobs', ru: 'Регламентные задания', ruSingular: 'Регламентное задание', badge: 'РЗ', icon: 'ScheduledJobs.png' },
  { id: 'bots', ru: 'Боты', ruSingular: 'Бот', badge: 'БТ', icon: 'UserWithAuthentication.png' },
  { id: 'functionaloptions', ru: 'Функциональные опции', ruSingular: 'Функциональная опция', badge: 'ФО', icon: 'DataCompositionOutputParameters.png' },
  { id: 'functionaloptionsparameters', ru: 'Параметры функциональных опций', badge: 'ПФ', icon: 'DataCompositionOutputParameters.png' },
  { id: 'definedtypes', ru: 'Определяемые типы', ruSingular: 'Определяемый тип', badge: 'ОТ', icon: 'FormattedString.png' },
  { id: 'commoncommands', ru: 'Общие команды', ruSingular: 'Общая команда', badge: 'ОК', icon: 'FunctionMenuCommand.svg' },
  { id: 'commandgroups', ru: 'Группы команд', ruSingular: 'Группа команд', badge: 'ГК', icon: 'CustomizeForm.png' },
  { id: 'interfaces', ru: 'Интерфейсы', ruSingular: 'Интерфейс', badge: 'ИТ', icon: 'CustomizeForm.png' },
  { id: 'commonforms', ru: 'Общие формы', ruSingular: 'Общая форма', badge: 'ОФ', icon: 'Form.png' },
  { id: 'commontemplates', ru: 'Общие макеты', ruSingular: 'Общий макет', badge: 'ОТ', icon: 'SpreadsheetShowGrid.png' },
  { id: 'commonpictures', ru: 'Общие картинки', ruSingular: 'Общая картинка', badge: 'ОК', icon: 'Picture.png' },
  { id: 'xdtopackages', ru: 'XDTO-пакеты', ruSingular: 'XDTO-пакет', badge: 'XD', icon: 'Dendrogram.png', aliases: ['xdto-пакеты'] },
  { id: 'webservices', ru: 'Web-сервисы', ruSingular: 'Web-сервис', badge: 'WS', icon: 'folder-webservices.svg', aliases: ['web-сервисы'] },
  { id: 'httpservices', ru: 'HTTP-сервисы', ruSingular: 'HTTP-сервис', badge: 'HT', icon: 'folder-httpservices.svg', aliases: ['http-сервисы', 'мдhtml'] },
  { id: 'wsreferences', ru: 'WS-ссылки', badge: 'WS', icon: 'folder-webservices.svg' },
  { id: 'styles', ru: 'Стили', ruSingular: 'Стиль', badge: 'СТ', icon: 'DataCompositionConditionalAppearance.png', aliases: ['мдбланки'] },
  { id: 'styleitems', ru: 'Элементы стиля', ruSingular: 'Элемент стиля', badge: 'СТ', icon: 'DataCompositionConditionalAppearance.png' },
  { id: 'languages', ru: 'Языки', ruSingular: 'Язык', badge: 'ЯЗ', icon: 'FormattedString.png' },

  // ── Прикладные объекты ─────────────────────────────────────────────────────
  { id: 'constants', ru: 'Константы', ruSingular: 'Константа', badge: 'КН', icon: 'Constant.png' },
  { id: 'catalogs', ru: 'Справочники', ruSingular: 'Справочник', badge: 'СП', icon: 'Catalog.png', singularIcon: 'CatalogObject.png' },
  { id: 'documents', ru: 'Документы', ruSingular: 'Документ', badge: 'ДК', icon: 'Document.png', singularIcon: 'DocumentObject.png' },
  { id: 'documentjournals', ru: 'Журналы документов', ruSingular: 'Журнал документов', badge: 'ЖД', icon: 'DocumentJournal.png' },
  { id: 'documentnumerators', ru: 'Нумераторы документов', ruSingular: 'Нумератор документов', badge: 'НМ', icon: 'FindByNumber.png' },
  { id: 'sequences', ru: 'Последовательности', ruSingular: 'Последовательность', badge: 'ПО', icon: 'AppearanceRightArrowYellow.png' },
  { id: 'reports', ru: 'Отчеты', ruSingular: 'Отчет', badge: 'ОТ', icon: 'Report.png', aliases: ['мдотчеты'] },
  { id: 'dataprocessors', ru: 'Обработки', ruSingular: 'Обработка', badge: 'ОБ', icon: 'DataProcessor.png' },
  { id: 'informationregisters', ru: 'Регистры сведений', ruSingular: 'Регистр сведений', badge: 'РС', icon: 'InformationRegister.png' },
  { id: 'accumulationregisters', ru: 'Регистры накопления', ruSingular: 'Регистр накопления', badge: 'РН', icon: 'AccumulationRegister.png' },
  { id: 'chartsofcharacteristictypes', ru: 'Планы видов характеристик', ruSingular: 'План видов характеристик', badge: 'ПХ', icon: 'ChartOfCharacteristicTypes.png', singularIcon: 'ChartOfCharacteristicTypesObject.png', aliases: ['chartsofcharacteristicstypes'] },
  { id: 'chartsofaccounts', ru: 'Планы счетов', ruSingular: 'План счетов', badge: 'ПС', icon: 'ChartOfAccounts.png', singularIcon: 'ChartOfAccountsObject.png' },
  { id: 'chartsofcalculationtypes', ru: 'Планы видов расчета', ruSingular: 'План видов расчета', badge: 'ВР', icon: 'ChartOfCalculationTypes.png', singularIcon: 'ChartOfCalculationTypesObject.png' },
  { id: 'accountingregisters', ru: 'Регистры бухгалтерии', ruSingular: 'Регистр бухгалтерии', badge: 'РБ', icon: 'AccountingRegister.png' },
  { id: 'calculationregisters', ru: 'Регистры расчета', ruSingular: 'Регистр расчета', badge: 'РР', icon: 'CalculationRegister.png' },
  { id: 'businessprocesses', ru: 'Бизнес-процессы', ruSingular: 'Бизнес-процесс', badge: 'БП', icon: 'BusinessProcess.png', singularIcon: 'BusinessProcessObject.png', aliases: ['бизнес-процессы'] },
  { id: 'tasks', ru: 'Задачи', ruSingular: 'Задача', badge: 'ЗД', icon: 'Task.png', singularIcon: 'TaskObject.png' },
  { id: 'externaldatasources', ru: 'Внешние источники данных', ruSingular: 'Внешний источник данных', badge: 'ВД', icon: 'ExternalDataSource.png' },
  { id: 'enums', ru: 'Перечисления', ruSingular: 'Перечисление', badge: 'ПР', icon: 'Enum.png' },

  // ── Секции внутри объектов 1С ──────────────────────────────────────────────
  { id: 'attributes', ru: 'Реквизиты', ruSingular: 'Реквизит', badge: 'РК', icon: 'Attribute.png' },
  { id: 'tabularsections', ru: 'Табличные части', ruSingular: 'Табличная часть', badge: 'ТЧ', icon: 'TabularSection.png' },
  { id: 'forms', ru: 'Формы', ruSingular: 'Форма', badge: 'ФМ', icon: 'Form.png' },
  { id: 'commands', ru: 'Команды', ruSingular: 'Команда', badge: 'КМ', icon: 'FunctionMenuCommand.svg' },
  { id: 'templates', ru: 'Макеты', ruSingular: 'Макет', badge: 'МК', icon: 'SpreadsheetShowGrid.png' },
  { id: 'dimensions', ru: 'Измерения', ruSingular: 'Измерение', badge: 'ИЗ', icon: 'Dimension.png' },
  { id: 'resources', ru: 'Ресурсы', ruSingular: 'Ресурс', badge: 'РЦ', icon: 'Resource.png' },
  { id: 'ext', ru: 'Внешние файлы', badge: 'EX', icon: 'OpenFile.png' }
];

// Автоматическая генерация таблицы соответствий
const ITEM_META = {};
const LEVEL2_SINGULAR = {};
const CONFIGURATOR_ORDER_MAP = new Map();

METADATA_DEFINITIONS.forEach((def, index) => {
  const pluralKey = def.id.toLowerCase();
  CONFIGURATOR_ORDER_MAP.set(pluralKey, index);

  // Множественное число EN / RU
  ITEM_META[pluralKey] = { ru: def.ru, badge: def.badge, icon: def.icon };
  ITEM_META[def.ru.toLowerCase().replace(/[\s-]/g, '')] = { icon: def.icon };
  ITEM_META[def.ru.toLowerCase()] = { icon: def.icon };

  // Единственное число EN
  const singularKey = pluralKey.replace(/s$/, '');
  const singularIcon = def.singularIcon || def.icon;
  LEVEL2_SINGULAR[pluralKey] = singularKey;

  ITEM_META[singularKey] = { ru: def.ruSingular || def.ru, badge: def.badge, icon: singularIcon };

  // Единственное число RU
  if (def.ruSingular) {
    ITEM_META[def.ruSingular.toLowerCase().replace(/[\s-]/g, '')] = { icon: singularIcon };
    ITEM_META[def.ruSingular.toLowerCase()] = { icon: singularIcon };
  }

  // Алиасы
  if (def.aliases) {
    for (const alias of def.aliases) {
      const aliasLower = alias.toLowerCase();
      CONFIGURATOR_ORDER_MAP.set(aliasLower, index);
      ITEM_META[aliasLower] = { icon: def.icon };
    }
  }
});

const FORM_KIND_META = {
  managed: { icon: 'layout', contextValue: 'managedForm', description: 'управляемая' },
  ordinary: { icon: 'window', contextValue: 'ordinaryForm', description: 'обычная' },
  mxl: { icon: 'table', contextValue: 'mxlTemplate', description: 'макет' },
};

function get1cOrder(name) {
  const lower = (name || '').toLowerCase().replace(/[\s-]/g, '');
  if (CONFIGURATOR_ORDER_MAP.has(lower)) {
    return CONFIGURATOR_ORDER_MAP.get(lower);
  }
  return 9999;
}

module.exports = {
  METADATA_DEFINITIONS,
  ITEM_META,
  LEVEL2_SINGULAR,
  FORM_KIND_META,
  CONFIGURATOR_ORDER_MAP,
  get1cOrder
};
