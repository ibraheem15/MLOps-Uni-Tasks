import { Provider } from "./components/ui/provider.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from 'react-hot-toast';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/Reset Password.jsx";
import CheckToken from "./pages/Check-Token.jsx";
import AuthTabs from "./pages/Authtabs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthTabs />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/check-token",
    element: <CheckToken />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
    <RouterProvider router={router} />
    <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: 'red',
              color: 'white',
            },
          },
          // Default options for all toasts
          style: {
            borderRadius: '8px',
            padding: '16px',
          },
        }}
      />
    </Provider>
  </StrictMode>
);
