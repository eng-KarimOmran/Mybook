import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <section className='h-[calc(100dvh-88px)] flex justify-center items-center flex-col gap-10'>
          <h2 className='text-center text-6xl text-[#D95B96] font-bold'>Change your life with a book</h2>
          <p className='text-center max-w-[400px] text-gray-700 text-xl px-3'>We provide you with an easy, fast, and secure book shopping experience, with a variety of paper and e-books to suit all your preferences.</p>
          <button className='bg-black/100 text-white text-xl w-[200px] h-[50px] rounded-3xl'>
              <Link to={'/books'}>Store</Link>
          </button>
      </section>
    </div>
  )
}
