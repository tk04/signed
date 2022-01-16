module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "http://localhost:4000/:path*/",
        },
      ],
    };
  },
  images: {
    domains: ["localhost"],
  },
  reactStrictMode: true,
};
