// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import {signIn , signOut , useSession, getProviders} from 'next-auth/react';

// const Navbar = () => {

//     const {data : session} = useSession ();
 
//     const [providers, setProviders] = useState(null);

//     useEffect(()=>{
//         const setUpProviders = async()=>{
//             const response = await getProviders();
//             setProviders(response);
//         }
//         setUpProviders();
//     },[])

//     const handlesignIn = (adproviderId) => {
//         signIn(adproviderId).then(() => {
//             if (adproviderId === 'adprovidergoogle') {
//               router.push('/adProvider-post');
//             }
//           });
//     }

//     return (
//         <nav className='flex justify-between items-center pt-[30px] p-[5%] pb-0 '>
//             <Link href="/">
//                 <div className='flex justify-between items-center gap-4'>
//                     <Image
//                         src="/assets/images/sailor.svg"
//                         width={50}
//                         height={50}
//                         alt='Web Sailor Logo'
//                     />
//                     <p className='max-sm:hidden gradient-text text-4xl font-bold'>WebSailor</p>
//                 </div>
//             </Link>
//             <ul className='font-medium white text-xl'>
//                 {/* <li className='inline-block pt-0 pl-[20px] pr-[20px]'>
//                     <Link href="/posts">Sail</Link>
//                 </li> */}
//                 {/* <li className='inline-block pt-0 pl-[20px] pr-[20px]'>
//                     <Link href="#">Dummy</Link>
//                 </li> */}
//                 {/* <li className='inline-block pt-0 pl-[20px] pr-[20px]'>
//                     <Link href="#">Dummy</Link>
//                 </li> */}

//                 <div className="dropdown dropdown-bottom dropdown-end mr-4">
//                   <div tabIndex={0} role="button" className=" m-1">Sail</div>
//                   <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64  p-2 shadow">
//                     <li><Link href='/domains/blockchain'>Blockchain</Link></li>
//                     <li><Link href='/domains/ai'>Artificial Intelligence</Link></li>
//                   </ul>
//                 </div>
//                 {session?.user ?(
//                     <>
//                         <Link href='/create-post'>
//                             Create Post
//                         </Link>
//                         <button 
//                             onClick={signOut}
//                             className='ml-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2' 
//                         >
//                             SignOut
//                         </button>
//                         <Link href='/profile'>
//                             <Image
//                                 src={session?.user.image}
//                                 width={45}
//                                 height={30}
//                                 alt='profile-image'
//                                 className='inline-block rounded-badge border-solid ml-1' 
                            
//                             />
//                         </Link>
//                     </>

//                 ):(
//                     <>
//                     {
//                     providers && Object.values(providers).map((provider) => (
//                         <li key={provider.name} className='inline-block pt-0 pl-[20px] pr-[20px]'>
//                             <button
//                                 type='button'
//                                 onClick={() => signIn(provider.id)}
//                                 className='text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'
//                             >
//                                 Sign In
//                             </button>

//                             <button
//                                 type='button'
//                                 onClick={() => handlesignIn(provider.id)}
//                                 className='text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'
//                             >
//                                 AdProvider-Login
//                             </button>
//                         </li>
//                     ))
//                     }
//                     </>
//                 )}
//             </ul>
//         </nav>
//     )
// }

// export default Navbar





// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// const Navbar = () => {
//     const { data: session } = useSession();
//     const [providers, setProviders] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const setUpProviders = async () => {
//             const response = await getProviders();
//             setProviders(response);
//         }
//         setUpProviders();
//     }, []);

//     const handleSignIn = (providerId) => {
//         signIn(providerId, { callbackUrl: '/' });
//     }

//     return (
//         <nav className='flex justify-between items-center pt-[30px] p-[5%] pb-0 '>
//             <Link href="/">
//                 <div className='flex justify-between items-center gap-4'>
//                     <Image
//                         src="/assets/images/sailor.svg"
//                         width={50}
//                         height={50}
//                         alt='Web Sailor Logo'
//                     />
//                     <p className='max-sm:hidden gradient-text text-4xl font-bold'>WebSailor</p>
//                 </div>
//             </Link>
//             <ul className='font-medium white text-xl'>
//                 <div className="dropdown dropdown-bottom dropdown-end mr-4">
//                     <div tabIndex={0} role="button" className=" m-1">Sail</div>
//                     <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
//                         <li><Link href='/domains/blockchain'>Blockchain</Link></li>
//                         <li><Link href='/domains/ai'>Artificial Intelligence</Link></li>
//                     </ul>
//                 </div>
//                 {session?.user ? (
//                     <>
//                         <Link href='/create-post'>
//                             Create Post
//                         </Link>
//                         <button
//                             onClick={signOut}
//                             className='ml-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2'
//                         >
//                             SignOut
//                         </button>
//                         <Link href='/profile'>
//                             <Image
//                                 src={session?.user.image}
//                                 width={45}
//                                 height={30}
//                                 alt='profile-image'
//                                 className='inline-block rounded-badge border-solid ml-1'
//                             />
//                         </Link>
//                     </>
//                 ) : (
//                     <>
//                         {providers && Object.values(providers).map((provider) => (
//                             <li key={provider.name} className='inline-block pt-0 pl-[20px] pr-[20px]'>
//                                 <button
//                                     type='button'
//                                     onClick={() => handleSignIn(provider.id)}
//                                     className='text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'
//                                 >
//                                     Sign In
//                                 </button>
//                                 <button
//                                     type='button'
//                                     onClick={() => handleSignIn(provider.id, 'adProvider')}
//                                     className='text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'
//                                 >
//                                     AdProvider-Login
//                                 </button>
//                             </li>
//                         ))}
//                     </>
//                 )}
//             </ul>
//         </nav>
//     )
// }

// export default Navbar;


//the above is giving collection


























'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);

    const handleSignIn = () => {
         router.push('/adProLogPage')
    }

    return (
        <nav className='flex justify-between items-center pt-[30px] p-[5%] pb-0 '>
            <Link href="/">
                <div className='flex justify-between items-center gap-4'>
                    <Image
                        src="/assets/images/sailor.svg"
                        width={50}
                        height={50}
                        alt='Web Sailor Logo'
                    />
                    <p className='max-sm:hidden gradient-text text-4xl font-bold'>WebSailor</p>
                </div>
            </Link>
            <ul className='font-medium white text-xl'>
                <div className="dropdown dropdown-bottom dropdown-end mr-4">
                    <div tabIndex={0} role="button" className=" m-1">Sail</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
                        <li><Link href='/domains/blockchain'>Blockchain</Link></li>
                        <li><Link href='/domains/ai'>Artificial Intelligence</Link></li>
                    </ul>
                </div>
                {session?.user ? (
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
                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={45}
                                height={30}
                                alt='profile-image'
                                className='inline-block rounded-badge border-solid ml-1'
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <li key={provider.name} className='inline-block pt-0 pl-[20px] pr-[20px]'>
                                <button
                                    type='button'
                                    onClick={() => handleSignIn(provider.id)}
                                    className='text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'
                                >
                                    Sign In
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleSignIn()}
                                    className='text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'
                                >
                                    AdProvider-Login
                                </button>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;



