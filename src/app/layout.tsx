import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../components/UI/ScrollToTopButton";
import Telegram from "../lib/tg-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Test BeregTv Base",
  description: "developing...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <ScrollToTopButton />
        <Telegram>{children}</Telegram>
        <Analytics />
      </body>
    </html>
  );
}
