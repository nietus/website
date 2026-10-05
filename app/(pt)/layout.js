import "../globals.css";

export const metadata = {
  title: "Antonio S. C. Neto | Otimização e IA",
  description: "Página pessoal de Antonio S. C. Neto, estudante de Ciência da Computação na PUC Minas: publicações, interesses de pesquisa e currículo.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
