import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

export default function BooksManagement() {
  const [books , setBooks] = useState([])
  const [idBook , setId] = useState(null)

  const [functionStatus , setFunctionStatus] = useState("Add Book")

  useEffect(()=>{
    getBooks()
  },[])

  async function addBooks(values){
    const res = await axios.post('https://www.my-book.wuaze.com/MyBook/addBooks.php',values)
    getBooks()
    formik.resetForm();
  }

  async function getBooks() {
    const res = await axios.get('https://www.my-book.wuaze.com/MyBook/getBooks.php')
    setBooks(res.data)
  }

  function updateForm(id){
    const [book] = books.filter((book)=> book.id == id)
    formik.setValues({
      title: book.title,
      author: book.author,
      price: book.price,
      image_url: book.image_url
    });
    setFunctionStatus("Update Book")
    setId(id)
  }

  async function updateBook(values) {
    const book = {
      id:idBook,
      ...values
    }
    const res = await axios.post('https://www.my-book.wuaze.com/MyBook/updateBook.php',book)
    setFunctionStatus("Add Book")
    getBooks()
    formik.resetForm();
  }

  async function deleteBook(id) {
    const idDele = {"id":id}
    console.log(idDele)
    const res = await axios.delete('https://www.my-book.wuaze.com/MyBook/deleteBook.php',{data:idDele})
    console.log(res.data)
    getBooks()
  }
  const formik = useFormik({
    initialValues:{
      title:"",
      author:"",
      price:"",
      image_url:""
    },
    onSubmit:(values)=>{
      switch(functionStatus){
        case"Add Book":
        addBooks(values)
        break
        case"Update Book":
        updateBook(values)
        break
      }
    }
  })
  return (
    <div className='container'>
      <h2 className='text-center text-4xl font-bold text-[#D95B96] my-5'>UpdateBooks</h2>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-10 my-5'>
        <div>
          <label className='text-[#D95B96] ps-3 text-lg' htmlFor="title">Title</label>
          <input onChange={formik.handleChange} required onBlur={formik.handleBlur} value={formik.values.title} className='border-[1px] rounded-xl border-[#F2CB35] py-3 w-full px-4 outline-none bg-[#F8FEFF]' type="text" name="title" id="title" />
        </div>
        <div>
          <label className='text-[#D95B96] ps-3 text-lg' htmlFor="author">Author</label>
          <input onChange={formik.handleChange} required onBlur={formik.handleBlur} value={formik.values.author} className='border-[1px] rounded-xl border-[#F2CB35] py-3 w-full px-4 outline-none bg-[#F8FEFF]' type="text" name="author" id="author" />
        </div>
        <div>
          <label className='text-[#D95B96] ps-3 text-lg' htmlFor="price">Price</label>
          <input onChange={formik.handleChange} required onBlur={formik.handleBlur} value={formik.values.price} className='border-[1px] rounded-xl border-[#F2CB35] py-3 w-full px-4 outline-none bg-[#F8FEFF]' type="text" name="price" id="price" />
        </div>
        <div>
          <label className='text-[#D95B96] ps-3 text-lg' htmlFor="image_url">Image</label>
          <input onChange={(e) => {formik.setFieldValue("image_url", e.target.files[0].name)}} onBlur={formik.handleBlur} className='border-[1px] rounded-xl border-[#F2CB35] py-3 w-full px-4 outline-none bg-[#F8FEFF]' type="file" accept='image/*' name="image_url" id="image_url" />
        </div>
        <button type='submit' className={`w-[160px] h-[60px] border-2 rounded-2xl text-black border-[#D95B96] text-xl hover:bg-[#D95B96] hover:text-white transition-all duration-300`}>{functionStatus}</button>
      </form>
      <div className='overflow-x-scroll'>
        <table className='w-full border-2 border-[#D95B96]'>
          <thead>
            <tr className='flex justify-between items-center py-2 border-b-2'>
              <th className='px-1 w-1/5 mx-auto'>Title</th>
              <th className='px-1 w-1/5 mx-auto'>Author</th>
              <th className='px-1 w-1/5 mx-auto'>Price</th>
              <th className='px-1 w-1/5 mx-auto'>Photo</th>
              <th className='px-1 w-1/5 mx-auto'>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              books?.map((book)=>(
              <tr key={book.id} className='flex justify-between items-center py-1 border-b-2'>
                <td className='px-1 w-1/5 text-start'>{book.title.split(' ').slice(0, 2).join(' ')}</td>
                <td className='px-1 w-1/5 text-center'>{book.author.split(' ').slice(0, 2).join(' ')}</td>
                <td className='px-1 w-1/5 text-center'>{`${book.price} EG`}</td>
                <td className='px-1 w-1/5'>
                  <img src={`https://www.my-book.wuaze.com/MyBook/ImgBooks/${book.image_url}`} className='max-w-[30px] max-h-[60px] object-cover object-center mx-auto' alt="TheGreatAdventure" />
                </td>
                <td className='px-1 w-1/5 flex flex-wrap items-center justify-around'>
                  <button onClick={()=>{updateForm(book.id)}} className='border-blue-300 border-2 rounded-lg p-2 flex items-center gap-2 text-blue-500'>
                    <FaPencilAlt />
                    <span className='hidden md:block'>Update</span>
                  </button>
                  <button onClick={()=>{deleteBook(book.id)}} className='border-red-300 border-2 rounded-lg p-2 flex items-center gap-2 text-red-500'>
                    <MdDelete />
                    <span className='hidden md:block'>Delete</span>
                  </button>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}	
