import React from "react";
import { Link } from "react-router-dom";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import Container from "../container/Container";
import Button from "../button/Button";
const Navbar: React.FC = () => {
  const { cartQty,handleLogout } = useShoppingCartContext();
  return (
    <div className="bg-gray-800 p-4 shadow flex">
      <Container>
        <ul className="container mx-auto flex justify-between">
          <li>
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white">
              About
            </Link>
          </li>
          <li>
            <Link to="/store" className="text-white">
              Store
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-white">
              Cart
              <span className="text-white ml-2 rounded-full bg-blue-500 px-2 py-1 text-sm">{cartQty}</span>
            </Link>
          </li>

          <li>
            <Link to="/logout" className="text-white">
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Link>
          </li>
          
        </ul>
      </Container>
    </div>
  );
};

export default Navbar;
