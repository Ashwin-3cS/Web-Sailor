'use client'

import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className='flex flex-row items-center justify-center h-screen ' >
        <div>
          <h1 className='gradient-text font-semibold text-6xl'>Welcome to WebSailor!</h1> <br />
          <p className='white text-3xl'> WebSailor is your platform to share and discover favorite <br />websites and web apps across various tech domains.</p>
          
        </div>
        <div className='ml-36'>
          <Image
              src="/assets/images/hero.png"
              width={750}
              height={750}
              alt="hero image"
          />
        </div>
    </section>
  )
}

export default Hero