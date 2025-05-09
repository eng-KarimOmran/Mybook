import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Error from '../Error/Error'
import { UserContext } from '../Context/UserContext'

export default function Register() {
  const navigate = useNavigate();
  const dataUser = useContext(UserContext)
  const [data , setData] = useState(null)
  const userRegister = async (values)=>{
    setData(null)
    const res = await axios.post('https://www.my-book.wuaze.com/MyBook/register.php',JSON.stringify(values))
    if(res.data.status === "success"){
      localStorage.setItem("user",JSON.stringify(res.data.user))
      dataUser.UserUpdate()
      navigate('/')
    }
    setData(res.data)
  }

  const formik = useFormik(
    {
      initialValues:{
        name:"",
        email:"",
        password:"",
        role:"user"

      },
      onSubmit:(values)=>{userRegister(values)}
    }
  )

  return (
    <>
    {
      data?.status === "error" ? <Error message={data.message} /> : null
    }
    <div className='h-[calc(100dvh-95px)] flex justify-center items-center'>
      <div className='shadow-xl h-full w-[90%] max-w-[1000px] max-h-[500px] lg:max-h-[400px] flex flex-col items-center'>
        <h2 className='text-center text-4xl font-bold text-[#D95B96]'>Register</h2>
        <form className='max-w-[800px] w-full flex flex-col items-center lg:flex-row flex-wrap grow' onSubmit={formik.handleSubmit}>
          <div className='w-full lg:w-[50%] p-3 py-5'>
            <input required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" placeholder='Name:' name="name" id="name" className='border-[1px] rounded-lg border-[#F2CB35] py-2 w-full px-4 outline-none bg-[#F8FEFF]' />
          </div>
          <div className='w-full lg:w-[50%] p-3 py-5'>
            <input required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder='Email:' name="email" id="email" className='border-[1px] rounded-lg border-[#F2CB35] py-2 w-full px-4 outline-none bg-[#F8FEFF]' />
          </div>        
          <div className='w-full p-3 py-5'>
            <input required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" placeholder='Password:' name="password" id="password" className='border-[1px] rounded-lg border-[#F2CB35] py-2 w-full px-4 outline-none bg-[#F8FEFF]' />
          </div>        
          <div className='w-full flex gap-2 items-center'>
            <span className='text-nowrap p-3'>Do you have an account?</span>
            <Link className='w-full text-[#F2CB35]' to={'/sign-in'}>Log in</Link>
          </div>
          <button className='mx-auto my-3 bg-[#F2CB35] px-10 text-2xl py-2 rounded-xl text-white' type='submit'>Register</button>
        </form>
      </div>
    </div>
    </>
  )
}
