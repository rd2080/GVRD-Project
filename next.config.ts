import type { NextConfig } from "next";

// GitHub Pages builds are a static export under the repo path. Normal builds are unchanged.
const pagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(pagesBuild
    ? {
        output: "export",
        basePath: "/GVRD-Project",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
