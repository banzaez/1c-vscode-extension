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
  isSupportedFile,
  getFileType,
  canonicalOrdinaryKey,
  canonicalMxlKey
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
  isSupportedFile,
  getFileType,
  canonicalOrdinaryKey,
  canonicalMxlKey
};
