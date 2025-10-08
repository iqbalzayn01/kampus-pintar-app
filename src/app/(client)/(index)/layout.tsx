import { Toaster } from '@/components/ui/sonner';
import { Header } from './_components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative font-sans flex flex-col items-center justify-items-center gap-10">
      <Header />
      {children}
      <Toaster position="top-center" richColors />
    </main>
  );
}
