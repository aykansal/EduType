import './globals.css';
// import Script from 'next/script';
// import dynamic from 'next/dynamic';
import { ThirdwebClientProvider } from "@/components/Thirdwebclientprovider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from '@/components/AuthProvider';

// Dynamically import AuthProvider without SSR
// const AuthProvider = dynamic(() => import('@/components/AuthProvider'), {
//   ssr: false, // Disable SSR for this component, so it runs only on the client
// });

export const metadata = {
  title: "EduType",
  description: "Typing on Chain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <Script async src="https://cdn.splitbee.io/sb.js" strategy="afterInteractive" /> */}
      </head>
      <body>
        <ThirdwebClientProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThirdwebClientProvider>
      </body>
    </html>
  );
}
