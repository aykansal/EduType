import "./globals.css";
import { ThirdwebClientProvider } from "@/components/Thirdwebclientprovider";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "EduType",
  description: "Typing on Chain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
          <ThirdwebClientProvider>
            <AuthProvider>{children}</AuthProvider>
            <Toaster  />
          </ThirdwebClientProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
