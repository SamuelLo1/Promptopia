'use client';
import Link from 'next/link'; //react component to provide client side navigation between routes
import Image from 'next/image';
import {useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
//making a home logo which navigates to home page "/"
const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders ] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
    }
  })
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
      <div className ="sm:flex-hidden">
        {/* conditional where if user is logged in first set of parenthesis
        else, second parenthesis runs which is an empty div */}
        {isUserLoggedIn ?(
          <div className ="flex gap-3 md:gap-5">
            
            <Link href="/create-prompt"
            className="black_btn">
              Create Post
            </Link>

            {/*signOUt is a function from next-auth */}
            <button type="button" onClick={signOut} 
            className="outline_btn">
              Sign Out
            </button>

            {/* profile icon*/}
            <Link href="/profile">
              <Image
                src="/assets 2/images/logo.svg"
                width={37}
                height={37}
                className="rouded-full"
                alt="profile"
              />
            </Link>
            
          </div>
        ) : (
          <>

          </>
        )}
      </div>
    </nav>
  )
}

export default Nav