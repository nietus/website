/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Show the PDFs in the browser instead of downloading them.
        source: "/:path*.pdf",
        headers: [{ key: "Content-Disposition", value: "inline" }],
      },
    ];
  },
};

export default nextConfig;
