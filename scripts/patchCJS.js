const fs = require('fs');
const path = require('path');

[
  path.resolve(__dirname, '../lib/index.js'),
  path.resolve(__dirname, '../lib/zip.js'),
].forEach(patchCJS);

function patchCJS(filepath) {
  const code = fs.readFileSync(filepath).toString();

  fs.writeFileSync(
    filepath,
    code
      .replace(
        /\nexports\.default(.*)\n/,
        '\nexports$1\nexports["default"]$1\n',
      )
      .replace(/\nexports(\W)/g, '\nmodule.exports$1'),
  );
}
