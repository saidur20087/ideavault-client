import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';
import ThemeProvider from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';



const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IdeaVault',
  description: 'Validate and share your startup ideas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
     
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}