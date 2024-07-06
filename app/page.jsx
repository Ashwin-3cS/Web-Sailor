'use client'

import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className='flex flex-row items-center justify-center  ' >
        <div>
          <p className='white text-3xl'>Sail through the ocean of Websites</p> <br />
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