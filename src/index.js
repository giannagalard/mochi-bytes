import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from './Home';
import Recipe from './Recipe';
import Recipes from './Recipes';
import { Navbar } from './components';
import { Login, Admin, Edit } from "./Admin"
import NotFound from "./NotFound"
import Search from './Search';
import './index.css'

import { getCount } from './firebase/firebase';

const NavbarWrapper = () => {
  useEffect(() => {
    (async () => {
      try {
        if (!localStorage.getItem("count")) {
          await getCount().then((result) => localStorage.setItem("count", result));
        }
      } catch (e) {
      }
    })();
  }, [])

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/recipe/:recipeId",
        element: <Recipe />,
        errorElement: <NotFound />
      },
      {
        path: "/edit/:recipeId",
        element: <Edit />,
        errorElement: <NotFound />
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/giannagalard",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
