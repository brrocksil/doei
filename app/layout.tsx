"use client";

import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/theme-provider";
import Header from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthProviderWrapper } from '@/components/AuthProviderWrapper';
import { DonationPopup } from '@/components/donation-popup';
import './globals.css';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/cadastro' || pathname === '/forgot-password';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {!isAuthPage && <Header />}
            <main className={`flex-grow ${isAuthPage ? '' : 'pt-16'}`}>
              {children}
            </main>
            <DonationPopup />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {!isAuthPage && <Footer />}
          </ThemeProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
