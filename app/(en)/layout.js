import "../globals.css";

export const metadata = {
  title: "Antonio S. C. Neto | Optimization and AI",
  description: "Personal page of Antonio S. C. Neto, final-year Computer Science undergraduate at PUC Minas, Brazil: publications, research interests and CV.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
