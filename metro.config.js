const fs = require("fs");
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

function realpathSafe(filePath) {
  try {
    return fs.realpathSync.native(filePath);
  } catch {
    return filePath;
  }
}

function normalizePath(filePath) {
  return realpathSafe(filePath).replace(/\\/g, "/");
}

const reactNativeCssRoot = normalizePath(
  path.dirname(require.resolve("react-native-css/package.json")),
);

const nativewindConfig = withNativewind(config);
const nativewindResolve = nativewindConfig.resolver.resolveRequest;

nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  // react-native-css throws a setup error unless this sentinel is resolved
  // by withNativeWind / withReactNativeCSS — never bypass it.
  if (moduleName.includes("react-native-css-metro-override")) {
    return nativewindResolve(context, moduleName, platform);
  }

  const origin = normalizePath(context.originModulePath);

  // pnpm stores packages under .pnpm realpaths. NativeWind's polyfill compares
  // against the symlink path, so it remaps react-native-css's own
  // `require("react-native")` back to itself and Metro fails to resolve View.
  if (origin === reactNativeCssRoot || origin.startsWith(reactNativeCssRoot + "/")) {
    const parentResolver =
      config.resolver?.resolveRequest ?? context.resolveRequest;
    return parentResolver(context, moduleName, platform);
  }

  return nativewindResolve(context, moduleName, platform);
};

module.exports = nativewindConfig;
