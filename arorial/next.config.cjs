const crypto = require("crypto-browserify");
const stream = require("stream-browserify");
const assert = require("assert");
const streamHttp = require("stream-http");
const httpsBrowserify = require("https-browserify");
const osBrowserify = require("os-browserify/browser");
const url = require("url");

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Enable WebAssembly support
        config.experiments = {
            asyncWebAssembly: true,
            syncWebAssembly: true,
            layers: true,
        };

        // Modify resolve to handle node: scheme
        config.resolve = {
            ...config.resolve,
            fullySpecified: false,
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            alias: {
                crypto: crypto,
                stream: stream,
                assert: assert,
                http: streamHttp,
                https: httpsBrowserify,
                os: osBrowserify,
                url: url,
            },
            fallback: {
                crypto: crypto,
            },
            preferRelative: true,
        };

        config.module.rules.push({
            test: /\.wasm$/,
            type: "webassembly/async",
        });

        return config;
    },
};

module.exports = nextConfig;
