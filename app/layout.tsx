import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generator & Editor Modul Ajar — Kurikulum Merdeka",
  description:
    "Aplikasi web untuk menyusun, mengedit, dan mencetak Modul Ajar Kurikulum Merdeka secara terstruktur, lengkap dengan integrasi Google Sheets & Google Drive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
