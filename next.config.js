//require = require("esm")(module/*, options*/)
const path = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');


module.exports = withPWA({
  httpAgentOptions: {
    keepAlive: false,
  },
  generateEtags: false,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    });

    return config;
  },
  images: {
    domains: ['yuser.imgix.net', 'yuser-assets.imgix.net', 'mux.com', 'stream.mux.com', 'media1.giphy.com'],
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    urlImports: ['https://swiperurlgoeshere']
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
});
