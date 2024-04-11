module.exports = {
  banner:
    '/*!\n' +
    ` * cmd-ops ${require('./package.json').version}\n` +
    ` * (c) 2024-${new Date().getFullYear()}\n` +
    ' */\n',

  aliasConfig: {
    '@': 'src',
  },

  outputDir: 'lib',

  typesOutputDir: 'types',

  node: true,
};
