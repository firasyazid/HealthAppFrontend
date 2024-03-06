const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  // Customize the defaultConfig here if needed
  return defaultConfig;
})();
