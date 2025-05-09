import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa6";
import { UserContext } from '../Context/UserContext';
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function Books() {
  const navigate = useNavigate();

  const [books , setBooks] = useState([])
  const [favorites , setFavorites] = useState([])
  const {user} = useContext(UserContext)
  const [addCart , setAddcart] = useState(null)

  async function getBooks() {

    const res = await axios.get('https://www.my-book.wuaze.com/MyBook/getBooks.php')
    setBooks(res.data)
  }

  async function addFavorites(user_id , book_id) {
    if(user_id){
      const data = {
        "user_id": user_id,
        "book_id": book_id
      }
      const res = await axios.post('https://www.my-book.wuaze.com/MyBook/addFavorites.php', data)
      getFavorites(user_id)
    }
    else{
      navigate("/sign-in");
    }
  }

  async function getFavorites(user_id) {
    if(user_id){
      const data = {
        "user_id": user_id,
      }
      const res = await axios.post('https://www.my-book.wuaze.com/MyBook/getFavorites.php', data)
      setFavorites(res.data)
    }else{
      setFavorites(null)
    }
  }

  async function setCart(user_id , book_id){
    if(user_id){
      setAddcart(null)
    const data = {
      "user_id": user_id,
      "book_id": book_id
    }
    const res = await axios.post('https://www.my-book.wuaze.com/MyBook/cartBooks.php', data)
    setAddcart(book_id)
    }
    else{
      navigate("/sign-in");
    }
  }
  
  useEffect(()=>{
    getBooks()
    getFavorites(user?.id)
  },[user?.id])

  return (
    <div>
      <h2 className='text-center text-4xl font-bold text-[#D95B96] py-6'>Books</h2>
      <div className='container flex items-center justify-center flex-wrap'>
        {
          books.map((book)=>(
          <div key={book.id} className='p-8 w-full max-w-[300px] sm:w-6/12 lg:w-1/4'>
            <div className='w-full h-[400px] rounded-lg overflow-hidden flex flex-col justify-between'>
              <img className='w-full mx-auto max-h-[270px] object-fill object-center block' src={`https://www.my-book.wuaze.com/MyBook/ImgBooks/${book.image_url}`} alt={book.image_url} />
              <div className='text-xl font-bold'>{book.title.split(' ').slice(0, 3).join(' ')}</div>
              <div>{book.author.split(' ').slice(0, 2).join(' ')}</div>
              <div className='flex justify-between items-center text-lg'>
                <div>{`${book.price} EG`}</div>
                <button onClick={()=>{addFavorites(user?.id,book.id)}} className={`text-3xl ${favorites?.includes(Number(book.id)) ? "text-red-500" : null}`}><FaHeart /></button>
              </div>
              { addCart == book.id ? 
                <div className='text-green-500 flex gap-2 items-center'>
                  <CiCircleCheck />
                  <span>Added to Cart</span>
                </div>: null
              }
              <button onClick={()=>{setCart(user?.id,book.id)}} className='border-2 bg-blue-400 text-white lg:text-black lg:bg-transparent border-[#D5EDF2] w-[150px] py-2 rounded-lg text-xl hover:bg-blue-400 hover:text-white transition-all duration-300'>Add to cart</button>
            </div>
          </div> 
          ))
        }       
      </div>
    </div>
  )
}
