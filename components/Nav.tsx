'use client';
import Link from 'next/link'; //react component to provide client side navigation between routes
import Image from 'next/image';
import {useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
//making a home logo which navigates to home page "/"
const Nav = () => {
  const {data : session } = useSession();
  const isUserloggedIn = true; 
  //providers is a state initialized to null
  //setProviders is a function which can alter the state of providers
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  //if providers are gotten, providers is set to the providers
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])
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
        
        
        <div className ="sm:flex-hidden">
          {/* conditional where if user is logged in first set of parenthesis
          else, second parenthesis runs which is an empty div */}
          {/*checks if user is logged in before rendering TSX elements*/}
          {session?.user ?(
            <div className ="flex gap-3 md:gap-5">
              
              <Link href="/create-prompt"
              className="black_btn">
                Create Post
              </Link>

              {/*signOUt is a function from next-auth */}
              <button type="button" onClick={()=>signOut()} 
              className="outline_btn">
                Sign Out
              </button>

              {/* profile icon*/}
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rouded-full"
                  alt="profile"
                />
              </Link>
              
            </div>
          ) : (
            <>
             
                  <button
                    type="button"
                    onClick={()=> signIn('google')}
                    className='mt-5 w-full black_btn'
                  >
                    Sign In
                  </button>
            </>
          )}
        </div>

        {/* mobile navigation */}

        <div className="sm:hidden flex relative">
          
          {session?.user ?(
            <div className="flex">
              {/* this image has on onClick to change states with each click */}
            <Image
                  src="/assets 2/images/logo.svg"
                  width={37}
                  height={37}
                  className="rouded-full"
                  alt="profile"
                  onClick={() => setToggleDropDown((prev) => !prev)}
                />

                {toggleDropDown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={()=> setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href='/create-prompt'
                      className="dropdown_link"
                      onClick={()=> setToggleDropDown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      onClick={()=>{
                        setToggleDropDown(false);
                        signOut();
                      }}
                      className="mt-5 w-full black_btn"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={()=> signIn(provider.id)}
                    className='black_btn'


                  >
                    Sign In
                  </button>
                ))} 
            </>
          )}

        </div>
    </nav>
  )
}

export default Nav