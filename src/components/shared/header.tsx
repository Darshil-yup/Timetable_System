
'use client';

import Link from 'next/link';
import { LogOut, Users, BookCopy, MoreVertical, LayoutDashboard, DoorOpen, FlaskConical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LECTURERS } from '@/lib/mock-data';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link
          href="/admin"
          className="flex items-center gap-3 font-bold text-2xl text-foreground mr-auto"
        >
          <BookCopy className="h-10 w-10 text-primary" />
          <span className="hidden sm:inline-block">TimeTableSync</span>
        </Link>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full"
              >
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
               <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isAdminRoute && (
                 <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <LayoutDashboard />
                    Admin Views
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                            <LayoutDashboard />
                            Master Timetable
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="/admin/classrooms">
                            <DoorOpen />
                            Classrooms
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/labs">
                            <FlaskConical />
                            Labs
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Users />
                  Members
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuLabel>Lecturers</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {LECTURERS.map((lecturer) => (
                      <DropdownMenuItem key={lecturer.id}>
                        {lecturer.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <ThemeToggle />
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
