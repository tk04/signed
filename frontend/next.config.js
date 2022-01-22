module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${process.env.server}/:path*/`,
        },
      ],
    };
  },
  images: {
    domains: [`${process.env.imgDomain}`],
  },
  reactStrictMode: true,
};
