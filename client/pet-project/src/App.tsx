import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatTemplate from "./components/ChatTemplate";
import Collections from "./components/Collections";
import Products from "./components/Products";
import Cart from "./components/Cart";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <SignIn />
        </div>
      ),
    },
    {
      path: "/registration",
      element: (
        <div>
          <SignUp />
        </div>
      ),
    },
    {
      path: "/chat",
      element: (
        <div>
          <ChatTemplate />
        </div>
      ),
    },
    {
      path: "/collections",
      element: (
        <div>
          <Collections />
        </div>
      ),
    },
    {
      path: "/shop",
      element: (
        <div>
          <Products />
        </div>
      ),
    },
    {
      path: "/cart",
      element: (
        <div>
          <Cart />
        </div>
      ),
    },
  ])



  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
