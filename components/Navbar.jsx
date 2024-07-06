'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {signIn , signOut , useSession, getProviders} from 'next-auth/react';

const Navbar = () => {

    const {data : session} = useSession ();
 
    const [providers, setProviders] = useState(null);

    useEffect(()=>{
        const setUpProviders = async()=>{
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    },[])

    return (
        <nav className='flex justify-between items-center pt-[30px] p-[5%]'>
            <Link href="/">
                <div className='flex justify-between items-center gap-4'>
                    <Image
                        src="assets/images/sailor.svg"
                        width={50}
                        height={50}
                        alt='Web Sailor Logo'
                    />
                    <p className='max-sm:hidden white text-4xl font-medium'>Web Sailor</p>
                </div>
            </Link>
            <ul className='font-medium white text-xl'>
                <li className='inline-block pt-0 pl-[20px] pr-[20px]'>
                    <Link href="/posts">Sail</Link>
                </li>
                {/* <li className='inline-block pt-0 pl-[20px] pr-[20px]'>
                    <Link href="#">Dummy</Link>
                </li> */}
                {/* <li className='inline-block pt-0 pl-[20px] pr-[20px]'>
                    <Link href="#">Dummy</Link>
                </li> */}
                {session?.user ?(
                    <>
                        <Link href='/create-post'>
                            Create Post
                        </Link>
                        <button 
                            onClick={signOut}
                            className='ml-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2' 
                        >
                            SignOut
                        </button>
                    </>

                ):(
                    <>
                    {
                    providers && Object.values(providers).map((provider) => (
                        <li key={provider.name} className='inline-block pt-0 pl-[20px] pr-[20px]'>
                            <button
                                type='button'
                                onClick={() => signIn(provider.id)}
                                className='text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'
                            >
                                Sign In
                            </button>
                        </li>
                    ))
                    }
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
