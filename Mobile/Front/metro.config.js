const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for `.cjs` files
config.resolver.sourceExts.push("cjs");

// Optionally specify folders to watch
config.watchFolders = [];

// Blacklist specific modules (e.g., lightningcss)
config.resolver.blacklistRE = /lightningcss/;

module.exports = config;
