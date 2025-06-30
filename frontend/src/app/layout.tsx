import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Header from "@/components/header/header";
import QueryProvider from '@/providers/QueryProvider'; 



const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  variable: '--font-montserrat',
  display: 'swap',
});


export const metadata = {
  title: 'Goold Booking',
  description: 'Sistema inteligente de agendamento e reuniões',
  icons: {
    icon: '/assets/Logo.svg',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E293B" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <QueryProvider>
        <Header />
        {children}
        <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            fontFamily: 'Montserrat',
          },
          success: {
            icon: '✅',
          },
          error: {
            icon: '❌',
          },
        }} />
        </QueryProvider>
      </body>
    </html>
  );
}
