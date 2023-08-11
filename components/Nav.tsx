'use client';
import Link from 'next/link'; //react component to provide client side navigation between routes
import Image from 'next/image';
import {useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
//making a home logo which navigates to home page "/"
const Nav = () => {
  return (
    <nav className = "flex-between w-full mb-16 pt-3">
        <Link href='/' className='flex gap-2 flex-center'>
            <Image
            src='/assets 2/images/logo.svg'
            alt='logo'
            width={50}
            height={50}
            className='object-contain'
            />
            <p className="logo_text">Promptopia</p>
      </Link>

      {/* Mobile Navigation */}
    </nav>
  )
}

export default Nav