import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from './_components/app-sidebar';
import { Header } from './_components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-sans [--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <main className="flex flex-1">
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
          <Toaster position="top-center" richColors />
        </main>
      </SidebarProvider>
    </div>
  );
}
