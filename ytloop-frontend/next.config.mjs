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

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3333/:path*",
      },
    ];
  },
};

export default nextConfig;
