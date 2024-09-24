import React from 'react'
import LoadingIcons from 'react-loading-icons'

const Loading = () => {
  return (
    <div className="flex justify-center w-full text-blue-700 mt-16">
        <LoadingIcons.Bars fill="#1d4ed8" />
    </div>
  )
}

export default Loading