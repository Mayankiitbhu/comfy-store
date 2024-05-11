import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorElement } from './components';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleProductLoader } from './pages/SingleProduct';
import { loader as productLoader } from './pages/Products'
import { loader as ordersLoader } from './pages/Orders';
import { loader as checkoutLoader } from './pages/Checkout';
import { action as checkoutAction } from './components/CheckoutForm';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { store } from './store';

function App() {

  const router = createBrowserRouter([
    {
      path : "/",
      element : <HomeLayout />,
      errorElement : <Error />,
      children : [
        {
          index : true,
          element : <Landing />,
          errorElement : <ErrorElement />,
          loader : landingLoader
        },
        {
          path : 'products',
          element : <Products />,
          errorElement : <ErrorElement />,
          loader : productLoader
        },
        {
          path : 'products/:id',
          element : <SingleProduct />,
          loader : singleProductLoader
        },
        {
          path : 'cart',
          element : <Cart />
        },
        {
          path : 'about',
          element : <About />
        },
        {
          path : 'checkout',
          element : <Checkout />,
          loader : checkoutLoader(store),
          action : checkoutAction(store),
        },
        {
          path : 'orders',
          element : <Orders />,
          loader : ordersLoader(store),
        }
      ]
    },
    {
      path : "/login",
      element : <Login />,
      errorElement : <Error />,
      action : loginAction(store),
    },
    {
      path : "/register",
      element : <Register />,
      errorElement : <Error />,
      action : registerAction,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
