import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./layout/Header";
import ProductPage from "./pages/ProductPage";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "products/:id", element: <ProductPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
