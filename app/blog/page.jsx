import React from 'react'
import Header from '@/components/Header'
import Blogs from '@/components/Blogs'

const page = () => {
  return (
    <>
      <Header />
      <Blogs title={'Saved Blogs'} />
    </>
  )
}

export default page