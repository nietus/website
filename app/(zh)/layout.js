import "../globals.css";

export const metadata = {
  title: "Antonio | 组合优化与人工智能",
  description: "巴西米纳斯吉拉斯天主教大学计算机科学专业本科生 Antonio Neto 的个人主页：论文、研究兴趣与简历。",
  icons: { icon: "/taskfirst-favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
