import React from 'react'
import { MdError } from "react-icons/md";

export default function Error({message}) {
  return (
    <div className='px-3 my-3'>
      <div className='w-full py-3 bg-red-100 gap-2 flex items-center text-lg text-red-800 container rounded-lg'>
        <MdError />
        <span>{message}</span>
      </div>
    </div>
  )
}
