import "../globals.css";

export const metadata = {
  title: "Antonio Neto | Optimization and AI",
  description: "Personal page of Antonio Neto, final-year Computer Science undergraduate at PUC Minas, Brazil: publications, research interests and CV.",
  icons: { icon: "/taskfirst-favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
