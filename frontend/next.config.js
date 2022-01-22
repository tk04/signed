module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `https://signed-be.herokuapp.com/:path*/`,
        },
      ],
    };
  },
  images: {
    domains: [`signed-be.herokuapp.com`],
  },
  reactStrictMode: true,
};
