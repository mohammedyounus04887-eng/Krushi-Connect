const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
const React = require('react');
const { renderToString } = require('react-dom/server');

// Load this project's TypeScript modules without generating build output.
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
    });
    module._compile(outputText, filename);
  };
}
const { getInitialState, saveState } = require('../src/lib/store.ts');
const { AppProvider, useApp } = require('../src/lib/context.tsx');

function RoleLabel() { return React.createElement('span', null, useApp().currentUser.role); }

test('saved role is restored after an identical initial render, without overwriting saved data', () => {
  const originalWindow = global.window;
  const originalStorage = global.localStorage;
  try {
    delete global.window;
    const initial = getInitialState();
    const serverMarkup = renderToString(React.createElement(AppProvider, null, React.createElement(RoleLabel)));
    const saved = { ...initial, currentUser: initial.users.find(user => user.role === 'admin') };
    let storageValue = JSON.stringify(saved);
    let writes = 0;
    global.window = {};
    global.localStorage = {
      getItem: () => storageValue,
      setItem: (_, value) => { storageValue = value; writes += 1; },
    };
    assert.equal(getInitialState(false).currentUser.role, initial.currentUser.role);
    assert.equal(getInitialState().currentUser.role, 'admin');
    assert.equal(renderToString(React.createElement(AppProvider, null, React.createElement(RoleLabel))), serverMarkup);
    assert.equal(writes, 0);
    saveState(saved);
    assert.equal(writes, 1);
    assert.equal(JSON.parse(storageValue).currentUser.role, 'admin');
  } finally {
    if (originalWindow === undefined) delete global.window; else global.window = originalWindow;
    if (originalStorage === undefined) delete global.localStorage; else global.localStorage = originalStorage;
  }
});
