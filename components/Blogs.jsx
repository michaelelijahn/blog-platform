import React from 'react'

const Blogs = () => {
  return (
    <div className='flex flex-col items-center sm:items-start'>
        <span className='w-fit text-center sm:text-start'>
            <input type="text" className='w-[70vw] max-w-[700px] md:w-[45vw] lg:w-[40vw] lg:max-w-[1200px] pl-3 border border-solid border-gray-300 py-1 rounded-full' placeholder={`I'm looking for...`}/>
        </span>
        <div>
            Blogs
        </div>
    </div>
  )
}

export default Blogs