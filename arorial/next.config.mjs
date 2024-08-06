/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Enable WebAssembly support
        config.experiments = {
            asyncWebAssembly: true,
            syncWebAssembly: true,
        };

        // If you're using the `file-loader` or `url-loader` for .wasm files, you can add a rule for it here
        config.module.rules.push({
            test: /\.wasm$/,
            type: "webassembly/async",
        });

        return config;
    },
};

export default nextConfig;
