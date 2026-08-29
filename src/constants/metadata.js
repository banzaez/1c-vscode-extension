// Единая таблица метаданных типов объектов 1С.
// Содержит: ru-название, badge для декораций, имя иконки (png → standart/, svg → explorer/).
const ITEM_META = {
  // ── Общие ──────────────────────────────────────────────────────────────────
  'subsystems':                  { ru: 'Подсистемы',                   badge: 'ПД', icon: 'folder-subsystems.svg' },
  'подсистемы':                  { icon: 'folder-subsystems.svg' },
  'subsystem':                   { ru: 'Подсистема',                   badge: 'ПД' },

  'commonmodules':               { ru: 'Общие модули',                 badge: 'ОМ', icon: 'DataProcessor.png' },
  'общиемодули':                 { icon: 'DataProcessor.png' },
  'commonmodule':                { ru: 'Общий модуль',                 badge: 'ОМ', icon: 'DataProcessor.png' },

  'sessionparameters':           { ru: 'Параметры сеанса',             badge: 'ПМ', icon: 'folder-sessionparameters.svg' },
  'параметрысеанса':             { icon: 'folder-sessionparameters.svg' },
  'sessionparameter':            { ru: 'Параметр сеанса',              badge: 'ПМ', icon: 'folder-sessionparameters.svg' },

  'roles':                       { ru: 'Роли',                         badge: 'РЛ', icon: 'UserWithAuthentication.png' },
  'роли':                        { icon: 'UserWithAuthentication.png' },
  'role':                        { ru: 'Роль',                         badge: 'РЛ', icon: 'UserWithAuthentication.png' },

  'commonattributes':            { ru: 'Общие реквизиты',              badge: 'ОР', icon: 'Attribute.png' },
  'общиереквизиты':              { icon: 'Attribute.png' },
  'commonattribute':             { ru: 'Общий реквизит',               badge: 'ОР', icon: 'Attribute.png' },

  'exchangeplans':               { ru: 'Планы обмена',                 badge: 'ПО', icon: 'ExchangePlan.png' },
  'планыобмена':                 { icon: 'ExchangePlan.png' },
  'exchangeplan':                { ru: 'План обмена',                  badge: 'ПО', icon: 'ExchangePlanObject.png' },

  'filtercriteria':              { ru: 'Критерии отбора',              badge: 'КО', icon: 'FilterCriterion.png' },
  'критерииотбора':              { icon: 'FilterCriterion.png' },
  'filtercriterion':             { ru: 'Критерий отбора',              badge: 'КО', icon: 'FilterCriterion.png' },

  'eventsubscriptions':          { ru: 'Подписки на события',          badge: 'ПБ', icon: 'EventLog.png' },
  'подпискинасобытия':           { icon: 'EventLog.png' },
  'eventsubscription':           { ru: 'Подписка на событие',          badge: 'ПБ', icon: 'EventLog.png' },

  'scheduledjobs':               { ru: 'Регламентные задания',         badge: 'РЗ', icon: 'ScheduledJobs.png' },
  'регламентныезадания':         { icon: 'ScheduledJobs.png' },
  'scheduledjob':                { ru: 'Регламентное задание',         badge: 'РЗ', icon: 'ScheduledJobs.png' },

  'bots':                        { ru: 'Боты',                         badge: 'БТ', icon: 'UserWithAuthentication.png' },
  'боты':                        { icon: 'UserWithAuthentication.png' },

  'functionaloptions':           { ru: 'Функциональные опции',         badge: 'ФО', icon: 'DataCompositionOutputParameters.png' },
  'функциональныеопции':         { icon: 'DataCompositionOutputParameters.png' },
  'functionaloption':            { ru: 'Функциональная опция',         badge: 'ФО', icon: 'DataCompositionOutputParameters.png' },

  'functionaloptionsparameters': { ru: 'Параметры функциональных опций', badge: 'ПФ', icon: 'DataCompositionOutputParameters.png' },
  'definedtypes':                { ru: 'Определяемые типы',            badge: 'ОТ', icon: 'FormattedString.png' },
  'определяемыетипы':            { icon: 'FormattedString.png' },

  'commoncommands':              { ru: 'Общие команды',                badge: 'ОК', icon: 'FunctionMenuCommand.svg' },
  'общиекоманды':                { icon: 'FunctionMenuCommand.svg' },
  'commoncommand':               { ru: 'Общая команда',                badge: 'ОК', icon: 'FunctionMenuCommand.svg' },

  'commandgroups':               { ru: 'Группы команд',                badge: 'ГК', icon: 'CustomizeForm.png' },
  'группыкоманд':                { icon: 'CustomizeForm.png' },
  'commandgroup':                { ru: 'Группа команд',                badge: 'ГК', icon: 'CustomizeForm.png' },

  'interfaces':                  { ru: 'Интерфейсы',                   badge: 'ИТ', icon: 'CustomizeForm.png' },
  'интерфейсы':                  { icon: 'CustomizeForm.png' },
  'interface':                   { ru: 'Интерфейс',                    badge: 'ИТ', icon: 'CustomizeForm.png' },

  'commonforms':                 { ru: 'Общие формы',                  badge: 'ОФ', icon: 'Form.png' },
  'общиеформы':                  { icon: 'Form.png' },
  'commonform':                  { ru: 'Общая форма',                  badge: 'ОФ', icon: 'Form.png' },

  'commontemplates':             { ru: 'Общие макеты',                 badge: 'ОМ', icon: 'SpreadsheetShowGrid.png' },
  'общиемакеты':                 { icon: 'SpreadsheetShowGrid.png' },
  'commontemplate':              { ru: 'Общий макет',                  badge: 'ОМ', icon: 'SpreadsheetShowGrid.png' },

  'commonpictures':              { ru: 'Общие картинки',               badge: 'ОК', icon: 'Picture.png' },
  'общиекартинки':               { icon: 'Picture.png' },
  'commonpicture':               { ru: 'Общая картинка',               badge: 'ОК', icon: 'Picture.png' },

  'xdtopackages':                { ru: 'XDTO-пакеты',                  badge: 'XD', icon: 'Dendrogram.png' },
  'xdto-пакеты':                 { icon: 'Dendrogram.png' },
  'xdtopackage':                 { ru: 'XDTO-пакет',                   badge: 'XD', icon: 'Dendrogram.png' },

  'webservices':                 { ru: 'Web-сервисы',                  badge: 'WS', icon: 'folder-webservices.svg' },
  'web-сервисы':                 { icon: 'folder-webservices.svg' },
  'webservice':                  { ru: 'Web-сервис',                   badge: 'WS', icon: 'folder-webservices.svg' },

  'httpservices':                { ru: 'HTTP-сервисы',                 badge: 'HT', icon: 'folder-httpservices.svg' },
  'http-сервисы':                { icon: 'folder-httpservices.svg' },
  'httpservice':                 { ru: 'HTTP-сервис',                  badge: 'HT', icon: 'folder-httpservices.svg' },
  'мдhtml':                      { icon: 'folder-httpservices.svg' },

  'wsreferences':                { ru: 'WS-ссылки',                    badge: 'WS', icon: 'folder-webservices.svg' },

  'styleitems':                  { ru: 'Элементы стиля',               badge: 'СТ', icon: 'DataCompositionConditionalAppearance.png' },
  'элементыстиля':               { icon: 'DataCompositionConditionalAppearance.png' },
  'styleitem':                   { ru: 'Элемент стиля',                badge: 'СТ', icon: 'DataCompositionConditionalAppearance.png' },
  'styles':                      { ru: 'Стили',                        badge: 'СТ', icon: 'DataCompositionConditionalAppearance.png' },
  'стили':                       { icon: 'DataCompositionConditionalAppearance.png' },
  'style':                       { ru: 'Стиль',                        badge: 'СТ', icon: 'DataCompositionConditionalAppearance.png' },
  'мдбланки':                    { icon: 'DataCompositionConditionalAppearance.png' },

  'languages':                   { ru: 'Языки',                        badge: 'ЯЗ', icon: 'FormattedString.png' },
  'языки':                       { icon: 'FormattedString.png' },
  'language':                    { ru: 'Язык',                         badge: 'ЯЗ', icon: 'FormattedString.png' },

  // ── Прикладные объекты ─────────────────────────────────────────────────────
  'constants':                   { ru: 'Константы',                    badge: 'КН', icon: 'Constant.png' },
  'константы':                   { icon: 'Constant.png' },
  'constant':                    { ru: 'Константа',                    badge: 'КН', icon: 'Constant.png' },

  'catalogs':                    { ru: 'Справочники',                  badge: 'СП', icon: 'Catalog.png' },
  'справочники':                 { icon: 'Catalog.png' },
  'catalog':                     { ru: 'Справочник',                   badge: 'СП', icon: 'CatalogObject.png' },
  'справочник':                  { icon: 'CatalogObject.png' },

  'documents':                   { ru: 'Документы',                    badge: 'ДК', icon: 'Document.png' },
  'документы':                   { icon: 'Document.png' },
  'document':                    { ru: 'Документ',                     badge: 'ДК', icon: 'DocumentObject.png' },
  'документ':                    { icon: 'DocumentObject.png' },

  'documentjournals':            { ru: 'Журналы документов',           badge: 'ЖД', icon: 'DocumentJournal.png' },
  'журналыдокументов':           { icon: 'DocumentJournal.png' },
  'documentjournal':             { ru: 'Журнал документов',            badge: 'ЖД', icon: 'DocumentJournal.png' },

  'documentnumerators':          { ru: 'Нумераторы документов',        badge: 'НМ', icon: 'FindByNumber.png' },
  'нумераторыдокументов':        { icon: 'FindByNumber.png' },
  'documentnumerator':           { ru: 'Нумератор документов',         badge: 'НМ', icon: 'FindByNumber.png' },

  'sequences':                   { ru: 'Последовательности',           badge: 'ПО', icon: 'AppearanceRightArrowYellow.png' },
  'последовательности':          { icon: 'AppearanceRightArrowYellow.png' },
  'sequence':                    { ru: 'Последовательность',           badge: 'ПО', icon: 'AppearanceRightArrowYellow.png' },

  'reports':                     { ru: 'Отчеты',                       badge: 'ОТ', icon: 'Report.png' },
  'отчеты':                      { icon: 'Report.png' },
  'report':                      { ru: 'Отчет',                        badge: 'ОТ', icon: 'Report.png' },
  'отчет':                       { icon: 'Report.png' },
  'мдотчеты':                    { icon: 'Report.png' },

  'dataprocessors':              { ru: 'Обработки',                    badge: 'ОБ', icon: 'DataProcessor.png' },
  'обработки':                   { icon: 'DataProcessor.png' },
  'dataprocessor':               { ru: 'Обработка',                    badge: 'ОБ', icon: 'DataProcessor.png' },
  'обработка':                   { icon: 'DataProcessor.png' },

  'informationregisters':        { ru: 'Регистры сведений',            badge: 'РС', icon: 'InformationRegister.png' },
  'регистрысведений':            { icon: 'InformationRegister.png' },
  'informationregister':         { ru: 'Регистр сведений',             badge: 'РС', icon: 'InformationRegister.png' },

  'accumulationregisters':       { ru: 'Регистры накопления',          badge: 'РН', icon: 'AccumulationRegister.png' },
  'регистрынакопления':          { icon: 'AccumulationRegister.png' },
  'accumulationregister':        { ru: 'Регистр накопления',           badge: 'РН', icon: 'AccumulationRegister.png' },

  'chartsofcharacteristicstypes':{ ru: 'Планы видов характеристик',    badge: 'ПХ', icon: 'ChartOfCharacteristicTypes.png' },
  'chartsofcharacteristictypes': { ru: 'Планы видов характеристик',    badge: 'ПХ', icon: 'ChartOfCharacteristicTypes.png' },
  'планывидовхарактеристик':     { icon: 'ChartOfCharacteristicTypes.png' },
  'chartofcharacteristictypes':  { ru: 'План видов характеристик',     badge: 'ПХ', icon: 'ChartOfCharacteristicTypesObject.png' },

  'chartsofaccounts':            { ru: 'Планы счетов',                 badge: 'ПС', icon: 'ChartOfAccounts.png' },
  'планысчетов':                 { icon: 'ChartOfAccounts.png' },
  'chartofaccounts':             { ru: 'План счетов',                  badge: 'ПС', icon: 'ChartOfAccountsObject.png' },

  'chartsofcalculationtypes':    { ru: 'Планы видов расчета',          badge: 'ВР', icon: 'ChartOfCalculationTypes.png' },
  'планывидоврасчета':           { icon: 'ChartOfCalculationTypes.png' },
  'chartofcalculationtypes':     { ru: 'План видов расчета',           badge: 'ВР', icon: 'ChartOfCalculationTypesObject.png' },

  'accountingregisters':         { ru: 'Регистры бухгалтерии',         badge: 'РБ', icon: 'AccountingRegister.png' },
  'регистрыбухгалтерии':         { icon: 'AccountingRegister.png' },
  'accountingregister':          { ru: 'Регистр бухгалтерии',          badge: 'РБ', icon: 'AccountingRegister.png' },

  'calculationregisters':        { ru: 'Регистры расчета',             badge: 'РР', icon: 'CalculationRegister.png' },
  'регистрырасчета':             { icon: 'CalculationRegister.png' },
  'calculationregister':         { ru: 'Регистр расчета',              badge: 'РР', icon: 'CalculationRegister.png' },

  'businessprocesses':           { ru: 'Бизнес-процессы',              badge: 'БП', icon: 'BusinessProcess.png' },
  'бизнес-процессы':             { icon: 'BusinessProcess.png' },
  'бизнеспроцессы':              { icon: 'BusinessProcess.png' },
  'businessprocess':             { ru: 'Бизнес-процесс',               badge: 'БП', icon: 'BusinessProcessObject.png' },

  'tasks':                       { ru: 'Задачи',                       badge: 'ЗД', icon: 'Task.png' },
  'задачи':                      { icon: 'Task.png' },
  'task':                        { ru: 'Задача',                       badge: 'ЗД', icon: 'TaskObject.png' },

  'externaldatasources':         { ru: 'Внешние источники данных',     badge: 'ВД', icon: 'ExternalDataSource.png' },
  'внешниеисточникиданных':      { icon: 'ExternalDataSource.png' },
  'externaldatasource':          { ru: 'Внешний источник данных',      badge: 'ВД', icon: 'ExternalDataSource.png' },

  'enums':                       { ru: 'Перечисления',                 badge: 'ПР', icon: 'Enum.png' },
  'перечисления':                { icon: 'Enum.png' },
  'enum':                        { ru: 'Перечисление',                 badge: 'ПР', icon: 'Enum.png' },
  'перечисление':                { icon: 'Enum.png' },

  // ── Внутренние папки объектов ──────────────────────────────────────────────
  'attributes':                  { ru: 'Реквизиты',                    badge: 'РК', icon: 'Attribute.png' },
  'реквизиты':                   { icon: 'Attribute.png' },
  'attribute':                   { ru: 'Реквизит',                     badge: 'РК', icon: 'Attribute.png' },

  'tabularsections':             { ru: 'Табличные части',              badge: 'ТЧ', icon: 'TabularSection.png' },
  'табличныечасти':              { icon: 'TabularSection.png' },

  'forms':                       { ru: 'Формы',                        badge: 'ФМ', icon: 'Form.png' },
  'формы':                       { icon: 'Form.png' },
  'form':                        { ru: 'Форма',                        badge: 'ФМ', icon: 'Form.png' },
  'форма':                       { icon: 'Form.png' },

  'commands':                    { ru: 'Команды',                      badge: 'КМ', icon: 'FunctionMenuCommand.svg' },
  'команды':                     { icon: 'FunctionMenuCommand.svg' },
  'command':                     { ru: 'Команда',                      badge: 'КМ', icon: 'FunctionMenuCommand.svg' },

  'templates':                   { ru: 'Макеты',                       badge: 'МК', icon: 'SpreadsheetShowGrid.png' },
  'макеты':                      { icon: 'SpreadsheetShowGrid.png' },
  'template':                    { ru: 'Макет',                        badge: 'МК', icon: 'SpreadsheetShowGrid.png' },

  'dimensions':                  { ru: 'Измерения',                    badge: 'ИЗ', icon: 'Dimension.png' },
  'измерения':                   { icon: 'Dimension.png' },
  'dimension':                   { ru: 'Измерение',                    badge: 'ИЗ', icon: 'Dimension.png' },

  'resources':                   { ru: 'Ресурсы',                      badge: 'РЦ', icon: 'Resource.png' },
  'ресурсы':                     { icon: 'Resource.png' },
  'resource':                    { ru: 'Ресурс',                       badge: 'РЦ', icon: 'Resource.png' },

  'ext':                         { ru: 'Внешние файлы',                badge: 'EX', icon: 'OpenFile.png' },
};

// Для иконок узлов уровня 2 (папка конкретного объекта): plural → singular ключ в ITEM_META
const LEVEL2_SINGULAR = {
  'catalogs': 'catalog',
  'documents': 'document',
  'dataprocessors': 'dataprocessor',
  'reports': 'report',
  'enums': 'enum',
  'informationregisters': 'informationregister',
  'accumulationregisters': 'accumulationregister',
  'calculationregisters': 'calculationregister',
  'accountingregisters': 'accountingregister',
  'chartsofaccounts': 'chartofaccounts',
  'chartsofcharacteristictypes': 'chartofcharacteristictypes',
  'chartsofcalculationtypes': 'chartofcalculationtypes',
  'businessprocesses': 'businessprocess',
  'tasks': 'task',
  'exchangeplans': 'exchangeplan',
};

const FORM_KIND_META = {
  managed: { icon: 'layout', contextValue: 'managedForm', description: 'управляемая' },
  ordinary: { icon: 'window', contextValue: 'ordinaryForm', description: 'обычная' },
  mxl: { icon: 'table', contextValue: 'mxlTemplate', description: 'макет' },
};

// Канонический порядок категорий метаданных в дереве конфигуратора 1С
const CONFIGURATOR_ORDER = [
  // Общие
  'subsystems',
  'commonmodules',
  'sessionparameters',
  'roles',
  'commonattributes',
  'exchangeplans',
  'filtercriteria',
  'eventsubscriptions',
  'scheduledjobs',
  'bots',
  'functionaloptions',
  'functionaloptionsparameters',
  'definedtypes',
  'commoncommands',
  'commandgroups',
  'interfaces',
  'commonforms',
  'commontemplates',
  'commonpictures',
  'xdtopackages',
  'webservices',
  'httpservices',
  'wsreferences',
  'styles',
  'styleitems',
  'languages',

  // Прикладные объекты
  'constants',
  'catalogs',
  'documents',
  'documentjournals',
  'documentnumerators',
  'sequences',
  'reports',
  'dataprocessors',
  'informationregisters',
  'accumulationregisters',
  'chartsofcharacteristictypes',
  'chartsofaccounts',
  'chartsofcalculationtypes',
  'accountingregisters',
  'calculationregisters',
  'businessprocesses',
  'tasks',
  'externaldatasources',
  'enums',

  // Внутренние секции объекта 1С
  'attributes',
  'tabularsections',
  'forms',
  'commands',
  'templates',
  'dimensions',
  'resources',
  'ext'
];

const CONFIGURATOR_ORDER_MAP = new Map(CONFIGURATOR_ORDER.map((key, idx) => [key.toLowerCase(), idx]));

/**
 * Получить порядковый номер категории в Конфигураторе 1С
 */
function get1cOrder(name) {
  const lower = (name || '').toLowerCase();
  if (CONFIGURATOR_ORDER_MAP.has(lower)) {
    return CONFIGURATOR_ORDER_MAP.get(lower);
  }
  return 9999;
}

module.exports = {
  ITEM_META,
  LEVEL2_SINGULAR,
  FORM_KIND_META,
  CONFIGURATOR_ORDER,
  CONFIGURATOR_ORDER_MAP,
  get1cOrder
};
