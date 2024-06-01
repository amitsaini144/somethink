'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button, buttonVariants } from './ui/button';
import { User } from 'next-auth';
import { ThemeToggler } from './ThemeToggler';
import { Icons } from './icons';
import { ButtonMoving } from "@/components/ui/moving-border";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="fixed top-0 z-50 border-b w-full backdrop-blur px-3 py-2 bg-background/50">
      <div className="container mx-auto flex flex-row justify-between items-center px-0">
        <Link href="/" className="text-xl font-bold">
          SomeThink
        </Link>
        {user && (<span className='text-sm md:text-base'>
          {user.username || user.email}
        </span>)}
        <div className='flex gap-1'>
          <Link href={'https://github.com/amitsaini144/somethink'}
            target="_blank"
            rel="noreferrer">
            <div
              className={` ${buttonVariants({ variant: "ghost" })}`}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link href={'https://twitter.com/amitsaini_144'}
            target="_blank"
            rel="noreferrer">
            <div
              className={` ${buttonVariants({ variant: "ghost" })}`}
            >
              <Icons.twitter className="h-3 w-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>

          <ThemeToggler />
          {session ? (
            <Button onClick={() => signOut({ callbackUrl: '/' })} className="w-auto" variant='ghost'>
              Logout
            </Button>
          ) : (
            <Link href="/sign-in">
              <ButtonMoving borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800" variant={'ghost'}>Login</ButtonMoving>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;