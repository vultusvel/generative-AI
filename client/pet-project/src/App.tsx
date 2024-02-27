import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatTemplate from "./components/ChatTemplate";
import ImageGenerate from "./components/ImageGenerate";

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

  ])



  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
