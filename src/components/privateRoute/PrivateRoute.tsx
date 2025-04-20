import React from "react";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { Outlet,Navigate } from "react-router-dom";
function PrivateRoute(){
    const {isLogin}=useShoppingCartContext();
    return(
        <>
        {
            isLogin?<Outlet/>:<Navigate to="/login" />
        }
        </>
    )
}
export default PrivateRoute;