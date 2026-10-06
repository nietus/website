import "../globals.css";

export const metadata = {
  title: "Antonio | Otimização e IA",
  description: "Página pessoal de Antonio Neto, estudante de Ciência da Computação na PUC Minas: publicações, interesses de pesquisa e currículo.",
  icons: { icon: "/taskfirst-favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
