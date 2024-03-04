import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChatTemplate from "./components/ChatTemplate";
import Collections from "./components/Collections";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers/rootReducer";
import axios from "axios";
import { useEffect } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  const data = useSelector((state: RootState) => state.collections.userCollections)
  let user: any
  const userString = localStorage.getItem('user');
  if (userString !== null) {
    user = JSON.parse(userString);
  }

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        let token: any
        const tokenString = localStorage.getItem('user');

        if (tokenString) {
          try {
            let obj = JSON.parse(tokenString);
            token = obj.accessToken;
          } catch (error) {
            console.error('Error parsing token:', error);
          }
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.post('http://localhost:3003/auth/collections', { data, user }, config);
        console.log('Response:', response.data);

        const userCollections = response.data.userCollections;
        console.log('User collections:', userCollections);
        localStorage.setItem('userCollections', JSON.stringify(userCollections))
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    sendDataToServer()
  }, [data])

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
