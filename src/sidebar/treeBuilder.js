const vscode = require('vscode');
const path = require('path');
const { stripTrailingExt } = require('../utils');

const collator = new Intl.Collator('ru', { sensitivity: 'base', numeric: true });

function getWorkspacePath(context) {
  const wsf = vscode.workspace.workspaceFolders;
  return wsf && wsf.length > 0 ? wsf[0].uri.fsPath : context.extensionPath;
}

function getFormPathSegments(fsPath, workspacePath, kind) {
  const rel = path.relative(workspacePath, fsPath);
  const parts = rel.split(path.sep);
  const fileName = parts[parts.length - 1];

  if (kind === 'ordinary' || fileName === 'form.data') {
    if (fileName.toLowerCase().endsWith('.xml') && fileName !== 'form.data') {
      const baseName = fileName.replace(/\.xml$/i, '');
      return parts.slice(0, -1).concat([baseName]);
    }
    return stripTrailingExt(parts.slice(0, -1));
  }

  if (kind === 'managed') {
    const baseName = fileName.replace(/\.xml$/i, '');
    return stripTrailingExt(parts.slice(0, -1)).concat([baseName]);
  }

  if (kind === 'mxl') {
    if (fileName.toLowerCase() !== 'template.xml' && fileName.toLowerCase().endsWith('.xml')) {
      const baseName = fileName.replace(/\.xml$/i, '');
      return parts.slice(0, -1).concat([baseName]);
    }
    const dirParts = stripTrailingExt(parts.slice(0, -1));
    return dirParts.length > 0 ? dirParts : [path.basename(path.dirname(fsPath)) || 'Макет'];
  }

  return parts;
}

function buildFormTree(entries, workspacePath) {
  const root = { children: new Map(), level: 0 };

  for (const entry of entries) {
    const segments = getFormPathSegments(entry.uri.fsPath, workspacePath, entry.kind);
    let node = root;

    for (let i = 0; i < segments.length; i++) {
      const part = segments[i];
      const isLeaf = i === segments.length - 1;

      if (!node.children.has(part)) {
        node.children.set(part, {
          label: part,
          children: new Map(),
          associatedUri: isLeaf ? entry.uri : null,
          kind: isLeaf ? entry.kind : null,
          category: node.category || part.toLowerCase(),
          level: node.level + 1
        });
      } else if (isLeaf) {
        const child = node.children.get(part);
        child.associatedUri = entry.uri;
        child.kind = entry.kind;
      }

      node = node.children.get(part);
    }
  }

  return root;
}

function sortTreeNodes(nodes) {
  return nodes.sort((a, b) => collator.compare(a.label, b.label));
}

module.exports = {
  getWorkspacePath,
  getFormPathSegments,
  buildFormTree,
  sortTreeNodes
};
