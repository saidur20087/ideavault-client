'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({ children, ...props }) => {
   return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}


export default ThemeProvider;
