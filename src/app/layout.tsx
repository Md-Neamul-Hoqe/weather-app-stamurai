import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import weatherBg from "@/assets/weather-bg.jpg";
import StoreProvider from "@/redux/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "weather app",
    template: "%s | weather app",
    absolute: "home",
  },
  description:
    "This an weather web app build by Md. Neamul Hoqe for Stamurai assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={inter.className}
          style={{
            backgroundImage: `url(${weatherBg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            objectFit: "cover",
            objectPosition: "center",
          }}>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
