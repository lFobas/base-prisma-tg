import { Inter } from "next/font/google";
import "./globals.css";
import Telegram from "@/lib/tg-provider";
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test BeregTv Base",
  description: "developing...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Telegram>
          {children}
        </Telegram>
        <Analytics />
      </body>
    </html>
  );
}
