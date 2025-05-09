import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className='h-[calc(100dvh-90px)]'>
      <div className='flex justify-center items-center w-full h-full flex-col gap-10 text-[#D95B96]'>
        <div className='text-9xl'>404</div>
        <div className='text-5xl'>NotFound</div>
        <button className='bg-black/100 text-white text-xl w-[200px] h-[50px] rounded-3xl'>
              <Link to={'/'}>Go to Home</Link>
        </button>
      </div>
    </section>
  )
}
