const esm = !!process.env.ESM

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: esm ? false : undefined}],
  ],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    ['@babel/plugin-transform-runtime', {useESModules: esm}],
  ],
}
