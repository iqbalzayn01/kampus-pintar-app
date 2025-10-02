import { Search, Bell, User, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth';
import Link from 'next/link';

export async function Header() {
  const session = await auth();

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-foreground">
              Kampus<span className="text-primary">Pintar</span>
            </h1>

            <div className="hidden md:flex items-center relative w-96">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search discussions..."
                className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Bell className="size-5" />
            </Button>

            {session?.user && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/myprofile">
                  <User className="size-5" />
                </Link>
              </Button>
            )}

            <Button className="cursor-pointer">
              <PenSquare className="size-5" />
              <span className="hidden sm:inline">New Topic</span>
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discussions..."
              className="pl-10 bg-secondary border-0"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
