/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/paper/dpdp", destination: "/papers/neto-2026-sbpo-dpdp-attention.pdf", permanent: true },
      { source: "/paper/ga", destination: "/papers/neto-2026-sbpo-bulk-carrier-ga.pdf", permanent: true },
      { source: "/paper/drone", destination: "/papers/neto-2026-simpep-drone-routing.pdf", permanent: true },
      { source: "/paper/deepfactory", destination: "/papers/macedo-neto-2026-sbpo-deepfactory.pdf", permanent: true },
      { source: "/paper/llm", destination: "/papers/neto-2025-sbai-llm-multi-agent.pdf", permanent: true },
    ];
  },
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
