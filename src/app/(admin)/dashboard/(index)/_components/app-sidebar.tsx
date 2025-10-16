'use client';

import * as React from 'react';
import { Command } from 'lucide-react';

import { NavUser } from '@/app/(admin)/dashboard/(index)/_components/nav-user';
import { Label } from '@/components/ui/label';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { SessionProvider } from 'next-auth/react';
import { ThreadsType, SessionType } from '@/types';
import { navLinks } from '@/data/navlinks';
import { formatTimeAgo } from '@/lib/utils';
import Link from 'next/link';

type AppSidebarProps = {
  threads: ThreadsType[];
  session: SessionType;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ threads, session, ...props }: AppSidebarProps) {
  const [activeItem, setActiveItem] = React.useState(navLinks.navMain[0]);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navLinks.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SessionProvider>
            <NavUser session={session} />
          </SessionProvider>
        </SidebarFooter>
      </Sidebar>

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {threads && threads.length > 0 ? (
                threads.map((thread) => (
                  <Link
                    href={`/threads/${thread.id}`}
                    key={thread.id}
                    className="hover:bg-accent hover:text-accent-foreground flex flex-col items-start gap-1 border-b p-4 text-sm leading-tight"
                  >
                    <div className="flex w-full items-center gap-2">
                      <span className="font-semibold truncate">
                        {thread.title}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimeAgo(new Date(thread.createdAt))}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      oleh {thread.author.name}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="p-4 text-sm text-muted-foreground">
                  Tidak ada diskusi.
                </p>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
