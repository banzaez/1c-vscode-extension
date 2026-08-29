const vscode = require('vscode');
const {
  _utf8Decoder,
  readHead,
  contentIsManagedForm,
  contentIsMxlTemplate,
  contentIsOrdinaryFormDescriptor,
  contentIsMxlTemplateDescriptor,
  canonicalOrdinaryKey,
  canonicalMxlKey
} = require('../utils');

async function findProjectFiles() {
  const [xmlUris, dataUris] = await Promise.all([
    vscode.workspace.findFiles('**/*.xml', '**/node_modules/**'),
    vscode.workspace.findFiles('**/form.data', '**/node_modules/**')
  ]);

  const managedForms = [];
  const ordinaryMap = new Map();
  const mxlMap = new Map();

  for (const uri of dataUris) {
    ordinaryMap.set(canonicalOrdinaryKey(uri.fsPath), uri);
  }

  const BATCH = 20;
  for (let start = 0; start < xmlUris.length; start += BATCH) {
    const batch = xmlUris.slice(start, start + BATCH);
    const results = await Promise.all(batch.map(async (uri) => {
      try {
        const buf = await readHead(uri);
        if (!buf.length) return null;
        const content = _utf8Decoder.decode(buf);
        if (contentIsManagedForm(content)) {
          return { type: 'managed', uri };
        }
        if (contentIsMxlTemplate(content)) {
          return { type: 'mxl', uri, preferred: true };
        }
        if (contentIsMxlTemplateDescriptor(content)) {
          return { type: 'mxl', uri, preferred: false };
        }
        if (contentIsOrdinaryFormDescriptor(content)) {
          return { type: 'ordinary', uri, preferred: false };
        }
        return null;
      } catch (e) {
        console.error('Error detecting format for URI:', uri.fsPath, e);
        return null;
      }
    }));
    for (const result of results) {
      if (!result) continue;
      if (result.type === 'managed') {
        managedForms.push(result.uri);
      } else if (result.type === 'ordinary') {
        const key = canonicalOrdinaryKey(result.uri.fsPath);
        if (!ordinaryMap.has(key) || result.preferred) {
          ordinaryMap.set(key, result.uri);
        }
      } else if (result.type === 'mxl') {
        const key = canonicalMxlKey(result.uri.fsPath);
        if (!mxlMap.has(key) || result.preferred) {
          mxlMap.set(key, result.uri);
        }
      }
    }
  }

  return {
    managedForms,
    mxlTemplates: Array.from(mxlMap.values()),
    ordinaryForms: Array.from(ordinaryMap.values())
  };
}

module.exports = {
  findProjectFiles
};
