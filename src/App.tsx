import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { ShoppingCartProvider, useShoppingCartContext } from "./context/ShoppingCartContext";
import About from "./pages/about/about";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Product from "./pages/product/Product";
import Store from "./pages/store/Store";
function App() {
  const { isLogin } = useShoppingCartContext();
  return (
    <Layout>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login/>} />
        <Route element={<PrivateRoute/>}>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
