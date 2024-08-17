import { AuthProvider } from "@/features/auth/context/AuthContext";
import { Lexend } from '@next/font/google';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={lexend.className}>
        <Component {...pageProps} />
      </main>
      <Toaster position="top-center" richColors closeButton />
    </AuthProvider>
  );
}
