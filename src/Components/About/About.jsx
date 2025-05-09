import React from 'react'

export default function About() {
  return (
    <div className='container flex justify-center items-center flex-wrap w-full h-[calc(100dvh-90px)]'>
      <div className='w-[100%] h-[50%] md:w-[50%] md:h-[50%] p-5'>
        <div className='bg-blue-100 w-full h-full rounded-xl hover:shadow-xl transition-all duration-500 flex flex-col justify-center gap-10'>
          <h3 className='text-center text-[#D95B96] font-medium px-2 text-5xl'>Who are we</h3>
          <p className='text-center px-5 text-xl text-gray-500'>We are a team passionate about books, striving to provide an easy and enjoyable shopping experience for reading lovers around the world.</p>
        </div>
      </div>
      <div className='w-[100%] h-[50%] md:w-[50%] md:h-[50%] p-5'>
        <div className='bg-blue-100 w-full h-full rounded-xl hover:shadow-xl transition-all duration-500 flex flex-col justify-center gap-10'>
          <h3 className='text-center text-[#D95B96] font-medium px-2 text-5xl'>What we offer</h3>
          <p className='text-center px-5 text-xl text-gray-500'>We offer a selection of paper and e-books in various fields with reliable and fast delivery service.</p>
        </div>
      </div>
      <div className='w-[100%] h-[50%] md:w-[50%] md:h-[50%] p-5'>
        <div className='bg-blue-100 w-full h-full rounded-xl hover:shadow-xl transition-all duration-500 flex flex-col justify-center gap-10'>
          <h3 className='text-center text-[#D95B96] font-medium px-2 text-5xl'>Why us</h3>
          <p className='text-center px-5 text-xl text-gray-500'>We don't just sell books, we build a knowledge community that seeks to spread culture in a simple and practical way.</p>
        </div>
      </div>
      <div className='w-[100%] h-[50%] md:w-[50%] md:h-[50%] p-5'>
        <div className='bg-blue-100 w-full h-full rounded-xl hover:shadow-xl transition-all duration-500 flex flex-col justify-center gap-10'>
          <h3 className='text-center text-[#D95B96] font-medium px-2 text-5xl'>Our vision</h3>
          <p className='text-center px-5 text-xl text-gray-500'>Our vision is to be the first destination for book lovers in the Arab world.</p>
        </div>
      </div>
    </div>
  )
}
