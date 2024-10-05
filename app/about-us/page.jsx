import React from 'react'
import Header from '@/components/Header'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* <h1 className="text-4xl font-bold text-center mb-8">About Blog</h1> */}
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At Blog, we're passionate about empowering voices and connecting people through the power of video blogging. Our platform is designed to be a vibrant community where creators can share their stories, insights, and experiences, while viewers can discover diverse perspectives from around the world.
          </p>
        </section>

        <section className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
            <Image
              src={assets.blog_pic_6}
              alt="Person creating a vlog"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Create and Inspire</h2>
            <p className="text-lg">
              Whether you're a seasoned vlogger or just starting out, Blog provides you with the tools and platform to create compelling content. Share your passions, document your journey, or teach others – the possibilities are endless.
            </p>
          </div>
        </section>

        <section className="mb-12 flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 mb-4 md:mb-0 md:pl-4">
            <Image
              src={assets.blog_pic_12}
              alt="Person watching vlogs"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Discover and Connect</h2>
            <p className="text-lg">
              Dive into a world of diverse content. From travel and lifestyle to tech reviews and cooking tutorials, there's always something new to discover. Engage with creators, leave comments, and be part of a global conversation.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Blog?</h2>
          <ul className="list-disc list-inside text-lg">
            <li>User-friendly vlog creation and editing tools</li>
            <li>Robust content discovery algorithm</li>
            <li>Engaged community of creators and viewers</li>
            <li>Monetization opportunities for popular content</li>
            <li>Cross-platform accessibility</li>
          </ul>
        </section>

      </main>
    </div>
  )
}

export default AboutUsPage