import React, { useContext } from "react";
import Home from "./pages/homepage/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import TransactionAdd from "./pages/transaction/TransactionAdd.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthContext } from "./context/authContext.js";

function App() {
  const { user, login } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      login();
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/transaction/add",
      element: <TransactionAdd />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
