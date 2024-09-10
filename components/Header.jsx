"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

const Header = () => {

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const isUserLoggedIn = true;

  return (
    <nav className='w-full pt-3 sm:mb-16 font-semibold'>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex justify-between items-center relative px-4 mb-2 text-2xl'>
        <Link href="/" className=''>
            {/* <Image src={assets.logo} alt="Blog Logo" width={95} height={95}/> */}
            BlogLogo
        </Link>
        <div>
          <button className='light-btn' onClick={() => setToggleDropdown((prev) => (!prev))}>Menu</button>
          {toggleDropdown && (
            <ul className='dropdown'>
              <li className='dropdown-link'><Link href="/" className='' onClick={() => setToggleDropdown(false)}>Home</Link></li>
              <li className='dropdown-link'><Link href="/about-us" className='' onClick={() => setToggleDropdown(false)}>About Us</Link></li>
              <li className='dropdown-link'><Link href="/advantages" className='' onClick={() => setToggleDropdown(false)}>Advantages</Link></li>
              <li className='dropdown-link'><Link href="/blog" className='' onClick={() => setToggleDropdown(false)}>Blog</Link></li>
              <button className='light-btn w-full' onClick={() => setToggleDropdown(false)}><Link href="/sign-in">Sign In</Link></button>
              <button className='colored-btn w-full' onClick={() => setToggleDropdown(false)}><Link href="/register">Get Started</Link></button>
            </ul>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}

      <div className='sm:flex sm:justify-between sm:items-center hidden mb-2.5'>
        <div className='flex items-center md:justify-between space-x-4 lg:space-x-9'>
          <Link href="/" className=''>
            {/* <Image src={assets.logo} alt="Blog Logo" width={100} height={100}/> */}
            BlogLogo
          </Link>

          <Link href="/" className='flex flex-col justify-center items-center group mb-1'>
            Overview
            <span className=' w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100'></span>
          </Link>

          <Link href="/about-us" className='flex flex-col justify-center items-center group mb-1'>
            About Us
            <span className=' w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100'></span>
          </Link>

          <Link href="/advantages" className='flex flex-col justify-center items-center group mb-1'>
            Advantages
            <span className=' w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100'></span>
          </Link>

          <Link href="/blog" className='flex flex-col justify-center items-center group mb-1'>
            Blog
            <span className='w-full h-0.5 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100'></span>
          </Link>
        </div>

        <div className='flex gap-2'>
          {/* <Image/> */}
          <button className='light-btn'><Link href="/sign-in">Sign In</Link></button>
          <button className='colored-btn'><Link href="/register">Get Started</Link></button>
        </div>
      </div>
      <div class="h-px bg-gray-300 mb-4"></div>
    </nav>
  )
}

export default Header