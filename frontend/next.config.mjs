const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.mp3$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash][ext][query]",
        },
      });
    }

    return config;
  },
};

export default nextConfig;
