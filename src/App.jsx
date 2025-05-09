import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import NotFound from './Components/NotFound/NotFound'
import Books from './Components/Books/Books'
import ContactUs from './Components/ContactUs/ContactUs'
import About from './Components/About/About'
import Cart from './Components/Cart/Cart'
import Favorites from './Components/Favorites/Favorites'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import RouterUser from './Components/RouterUser/RouterUser'
import UserGuest from './Components/UserGuest/UserGuest'
import RouterAdmin from './Components/RouterAdmin/RouterAdmin'
import BooksManagement from './Components/BooksManagement/BooksManagement'

function App() {
  const router = createBrowserRouter([
    {
      path: '/' , element: <Layout /> , children: [
        { index:true, element: <Home />},
        { path:"/books", element: <Books />},
        { path:"/contact-us", element: <ContactUs />},
        { path:"/about", element: <About />},
        { path:"/sign-in", element: <RouterUser><SignIn /></RouterUser>},
        { path:"/register", element:<RouterUser><Register /></RouterUser>},
        { path:"/cart", element: <UserGuest><Cart /></UserGuest>},
        { path:"/favorites", element: <UserGuest><Favorites /></UserGuest>},
        { path:"/books-management", element:<RouterAdmin><BooksManagement /></RouterAdmin>},
        { path:"*", element: <NotFound />},

      ],
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
