const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure that all platforms are enabled
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

// Add asset extensions
config.resolver.assetExts.push('ttf', 'otf', 'woff', 'woff2');

module.exports = config;
