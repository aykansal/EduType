import type { Metadata } from "next";
// import { ThirdwebClientProvider } from "../components/Thirdwebclientprovider";
import { ThirdwebProvider } from "thirdweb/react";
import { defineChain,createThirdwebClient } from "thirdweb";

const chain = defineChain(656476)
const client = createThirdwebClient({
    clientId: "4f4d7aad88cd12953957137f0f7c0081",
    // chains: [chain], // Ensure the custom chain is recognized by the client
});

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
        <ThirdwebProvider>
        {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
