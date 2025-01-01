import "./globals.css";
import { ThirdwebClientProvider } from "@/components/Thirdwebclientprovider";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "EduType",
  description: "Typing on Chain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThirdwebClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThirdwebClientProvider>
      </body>
    </html>
  );
}
