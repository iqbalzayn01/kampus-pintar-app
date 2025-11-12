import Link from 'next/link';

import { Search, Bell, User, PenSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex items-center w-full h-(--header-height) px-5 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-8">
            <SidebarTrigger />

            <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <svg
                width="36"
                height="24"
                viewBox="0 0 36 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_110_456)">
                  <path
                    d="M33.75 0.75C33.75 1.16422 34.0858 1.5 34.5 1.5H35.25C35.6642 1.5 36 1.16422 36 0.75C36 0.335789 35.6642 2.09815e-06 35.25 2.09815e-06H34.5C34.0858 2.09815e-06 33.75 0.335789 33.75 0.75Z"
                    fill="black"
                  />
                  <path
                    d="M12 24H15.6434L14.5827 22.9393C14.3014 22.658 13.9199 22.5 13.5221 22.5H12C6.201 22.5 1.5 17.799 1.5 12C1.5 6.201 6.201 1.50001 12 1.5H24C29.799 1.5 34.5 6.201 34.5 12C34.5 17.799 29.799 22.5 24 22.5H19.511C18.9143 22.5 18.342 22.2629 17.92 21.841L16.6774 20.5984C15.9742 19.8951 15.0203 19.5 14.0257 19.5H12C7.85784 19.5 4.5 16.1422 4.5 12C4.5 7.85784 7.85784 4.5 12 4.5H24C28.1422 4.5 31.5 7.85784 31.5 12C31.5 16.1422 28.1422 19.5 24 19.5H21.1177C20.5209 19.5 19.9486 19.2629 19.5266 18.841L18.284 17.5984C17.5807 16.8951 16.6269 16.5 15.6323 16.5H12C9.51474 16.5 7.5 14.4853 7.5 12C7.5 9.51474 9.51474 7.5 12 7.5H24C26.4853 7.5 28.5 9.51474 28.5 12C28.5 14.455 26.5341 16.4508 24.0907 16.4991L24.0902 16.5H22.9927C22.3959 16.5 21.8236 16.2629 21.4016 15.841L20.159 14.5984C19.582 14.0213 18.8362 13.6517 18.0377 13.5377L18 13.5H12C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5H24C24.8284 10.5 25.5 11.1716 25.5 12C25.5 12.8284 24.8284 13.5 24 13.5H21L22.0607 14.5607C22.342 14.842 22.7235 15 23.1213 15H24C25.6568 15 27 13.6568 27 12C27 10.3432 25.6568 9 24 9H12C10.3432 9 9 10.3432 9 12C9 13.6568 10.3432 15 12 15H17.5073C18.1041 15 18.6764 15.2371 19.0984 15.659L20.341 16.9016C21.0443 17.6049 21.9981 18 22.9927 18H24.375V17.9885C27.514 17.7949 30 15.1877 30 12C30 8.68632 27.3137 6 24 6H12C8.68632 6 6 8.68632 6 12C6 15.3137 8.68632 18 12 18H15.6323C16.2291 18 16.8014 18.2371 17.2234 18.659L18.466 19.9016C19.1693 20.6049 20.1231 21 21.1177 21H24C28.9706 21 33 16.9706 33 12C33 7.02942 28.9706 3 24 3H12C7.02942 3 3 7.02942 3 12C3 16.9706 7.02942 21 12 21H14.0257C14.6225 21 15.1948 21.2371 15.6167 21.659L16.8594 22.9016C17.5627 23.6049 18.5165 24 19.511 24H24C30.6274 24 36 18.6274 36 12C36 5.37258 30.6274 -5.79387e-07 24 0L12 2.47958e-06C5.37258 3.05897e-06 -5.79387e-07 5.37259 0 12C5.79387e-07 18.6274 5.37259 24 12 24Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_110_456">
                    <rect width="36" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Kampus<span className="text-sky-400">Pintar</span>
            </div>

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

            {session?.user ? (
              <div className="flex gap-4 items-center flex-col sm:flex-row">
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
              </div>
            ) : (
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            <Button className="bg-sky-400 hover:bg-sky-600" asChild>
              <Link href={session?.user ? '/threads/create' : '/login'}>
                <PenSquare className="size-5" />
                <span className="hidden sm:inline">Ask Question</span>
              </Link>
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
    </header>
  );
}
