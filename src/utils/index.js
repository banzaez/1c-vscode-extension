const {
  _utf8Decoder,
  readHead,
  readXmlSnippet,
  stripTrailingExt
} = require('./fs');

const {
  contentIsManagedForm,
  contentIsMxlTemplate,
  contentIsOrdinaryFormDescriptor,
  contentIsMxlTemplateDescriptor,
  getKindByFileName,
  getKindByContent,
  detectFileKind,
  isSupportedFile,
  getFileType,
  canonicalOrdinaryKey,
  canonicalMxlKey,
  _fileKindCache
} = require('./fileType');

module.exports = {
  _utf8Decoder,
  readHead,
  readXmlSnippet,
  stripTrailingExt,
  contentIsManagedForm,
  contentIsMxlTemplate,
  contentIsOrdinaryFormDescriptor,
  contentIsMxlTemplateDescriptor,
  getKindByFileName,
  getKindByContent,
  detectFileKind,
  isSupportedFile,
  getFileType,
  canonicalOrdinaryKey,
  canonicalMxlKey,
  _fileKindCache
};
