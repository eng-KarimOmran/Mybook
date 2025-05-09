import React, { useContext, useEffect, useState } from 'react'
import { GrClose } from "react-icons/gr";
import { LiaCheckCircle } from "react-icons/lia";
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

export default function Cart() {
  const [price , setPrice] =  useState(0)

  const {user} = useContext(UserContext)

  const [data , setData] = useState([])

  async function gitCart(id) {
    const res =await axios.post('https://www.my-book.wuaze.com/MyBook/getCart.php',{user_id:id})
    setPrice(res.data)
    setData(res.data.cart)    
  }

  async function removBookCart(user_id , book_id) {
    const data = {
      "user_id":user_id,
      "book_id":book_id
    }

    const res =await axios.post('https://www.my-book.wuaze.com/MyBook/removBookCart.php',data)
    console.log(res.data)
    gitCart(user.id)
  }

  async function cartQuantity(user_id , book_id , action) {
    const data = {
      "user_id":user_id,
      "book_id":book_id,
      "action":action
    }

    const res =await axios.post('https://www.my-book.wuaze.com/MyBook/cartQuantity.php',data)
    console.log(res.data)
    gitCart(user.id)
  }

  useEffect(()=>{
    gitCart(user.id)
  },[])

  return (
    <div>
      <h2 className='text-center text-4xl font-bold text-[#D95B96] py-6'>Cart</h2>
      <div className='container px-5'>
        {
          data.length == 0 ? <div className='py-9 font-bold text-center text-2xl'>There are no books inside the cart.</div> :
          data.map((book)=>          (
            <div key={book.book_id} className='flex justify-between items-center border-b-[1px] border-gray-300 pb-2 '>
              <div className='w-1/5'>
                <img src={`https://www.my-book.wuaze.com/MyBook/ImgBooks/${book.image_url}`} className='h-[50px] sm:h-[90px] w-[30px] sm:w-[70px] object-cover object-center me-auto' alt="TheGreatAdventure" />
              </div>
              <div className='flex flex-col gap-2 justify-center w-[25%] sm:w-1/5'>
                <div className='font-bold text-center'>{book.title.split(' ').slice(0, 2).join(' ')}</div>
                <div className='text-center'>John Doe</div>
              </div>
              <div className='flex gap-2 w-1/5 justify-center items-center'>
                <button onClick={()=>{cartQuantity(user.id , book.book_id , "increase")}} className='text-lg font-medium'>+</button>
                <div className='border-[1px] px-2 py-0.5 rounded-md border-gray-300'>{book.quantity}</div>
                <button onClick={()=>{cartQuantity(user.id , book.book_id , "decrease")}} className='text-lg font-medium'>-</button>
              </div>
              <div className='text-green-700 text-center sm:w-1/5 w-[10%]'>{Number(book.price)*(book.quantity)}</div>
              <button onClick={()=>{removBookCart(user.id , book.book_id)}} className='text-red-500 text-xl ps-1 sm:w-1/5 w-[10%] flex justify-end'><GrClose /></button>
            </div>
          )) 
        }

        <div className='pt-8 flex justify-between items-center'>
          <div className='text-xl text-[#D95B96]'>The price of books</div>
          <div className='text-xl text-gray-600'>{data.length == 0 ? "0" : price.total_price} EG</div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='text-xl text-[#D95B96]'>Delivery price</div>
          <div className='text-xl text-gray-600'>{data.length == 0 ? "0" : price.delivery_fee} EG</div>
        </div>
        <div className='pb-8 flex justify-between items-center'>
          <div className='text-[#D95B96] font-bold'>Total</div>
          <div className='text-2xl font-bold text-gray-600'>{data.length == 0 ? "0" : price.final_total} EG</div>
        </div>

        {data.length == 0 ? null : <button className='w-full text-2xl text-white bg-green-500 flex justify-center items-center gap-2 mx-auto my-10 text-center py-3'>
          <LiaCheckCircle />
          <span>Finish Checkout</span>
        </button>
        }    
      </div>
    </div>
  )
}
