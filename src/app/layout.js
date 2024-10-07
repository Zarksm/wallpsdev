import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wallps For You",
  description: "Free 4k wallpapers for your desktop or phone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
