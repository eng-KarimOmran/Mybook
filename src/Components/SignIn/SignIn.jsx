import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Error from '../Error/Error'
import { UserContext } from '../Context/UserContext'

export default function SignIn() {
  const navigate = useNavigate();
  const [data , setData] = useState(null)
  const dataUser = useContext(UserContext)
  const userSignIn = async (values)=>{
    const res = await axios.post('https://www.my-book.wuaze.com/MyBook/signin.php',JSON.stringify(values))
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
        email:"",
        password:""
      },
      onSubmit:(values)=>{userSignIn(values)}
    }
  )

  return (
    <>
    {
      data?.status === "error" ? <Error message={data.message} /> : null
    }
    <div className='h-[calc(100dvh-95px)] flex justify-center items-center'>
      <div className='shadow-xl h-full w-[90%] max-w-[1000px] max-h-[400px] lg:max-h-[400px] flex flex-col items-center'>
        <h2 className='text-center text-4xl font-bold text-[#D95B96]'>Sign in</h2>
        <form className='max-w-[800px] w-full flex flex-col items-center justify-center lg:flex-row flex-wrap grow' onSubmit={formik.handleSubmit}>
          <div className='w-full p-3 py-5'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder='Email:' name="email" id="email" className='border-[1px] rounded-lg border-[#F2CB35] py-2 w-full px-4 outline-none bg-[#F8FEFF]' />
          </div>        
          <div className='w-full p-3 py-5'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" placeholder='Password:' name="password" id="password" className='border-[1px] rounded-lg border-[#F2CB35] py-2 w-full px-4 outline-none bg-[#F8FEFF]' />
          </div>        
          <div className='w-full flex gap-2 items-center'>
            <span className='text-nowrap p-3'>You don't have an account ?</span>
            <Link className='w-full text-[#F2CB35]' to={'/Register'}>register</Link>
          </div>
          <button className='mx-auto my-3 bg-[#F2CB35] px-10 text-2xl py-2 rounded-xl text-white' type='submit'>Sign in</button>
        </form>
      </div>
    </div>
    </>
  )
}
