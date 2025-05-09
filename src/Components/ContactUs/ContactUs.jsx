import React, { useState } from 'react'

export default function ContactUs() {
  const [email , setEmail] = useState('')
  const [message , setMessage] = useState('')
  function sendMessage(email , message){
    const data = {
      email:email,
      message:message
    }

    console.log(data)
  }
  return (
    <div className='container'>
      <h2 className='text-center text-4xl font-bold text-[#D95B96] pt-10'>Contact Us</h2>
      <form onSubmit={(e)=>{
        e.preventDefault()
        sendMessage(email , message)
        }} className='h-[calc(100dvh-220px)] flex flex-col justify-around items-center'>
        <input required type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email:' name="email" id="email" className='border-[1px] rounded-lg border-[#F2CB35] py-2 w-full px-4 outline-none bg-[#F8FEFF]' />
        <textarea required name="Message" value={message}  onChange={(e)=>{setMessage(e.target.value)}} id="Message" placeholder='Message:' className='border-[1px] rounded-lg border-[#F2CB35] py-2 w-full px-4 outline-none bg-[#F8FEFF] min-h-[250px]'></textarea>
        <button className='mx-auto my-3 bg-[#F2CB35] px-10 text-2xl py-2 rounded-xl text-white' type='submit'>Send</button>
      </form>
    </div>
  )
}
