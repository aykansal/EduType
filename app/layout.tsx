import type { Metadata } from "next";
import { ThirdwebClientProvider } from "../components/Thirdwebclientprovider";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduType",
  description: "Typing on Chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ThirdwebClientProvider>
        {children}
        </ThirdwebClientProvider>
      </body>
    </html>
  );
}
