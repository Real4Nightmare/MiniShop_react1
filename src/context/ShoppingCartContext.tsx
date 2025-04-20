import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cartitem/Cartitem";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { login } from "../services/api";
interface ShoppingCartProvider{
    children:React.ReactNode
  }
interface CartItem{
    id:number,
    qty:number
}
interface ShoppingCartContext{
    cartItems:CartItem[]
    getProductQty:(id:number)=>number
    handleIncreaseProductQty:(id:number)=>void
    handleDecreaseProductQty:(id:number)=>void
    handleRemoveProduct:(id:number)=>void
    cartQty:number
    isLogin:boolean
    handleLogin:(username:string,password:string)=>void
    handleLogout:()=>void
}

export const ShoppingCartContext=createContext({}as ShoppingCartContext);
export const useShoppingCartContext=()=>{
    return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({children}:ShoppingCartProvider){
    const [cartItems,setCartItems]=useLocalStorage<CartItem[]>("cartItems",[]);
    const navigate = useNavigate();
    const handleIncreaseProductQty=(id:number)=>{
        setCartItems((currentItems:CartItem[])=>{
            const selectedItem=currentItems.find((item:CartItem)=>item.id==id);
            if(selectedItem==null){
                return [...currentItems,{id:id,qty:1}]
            }else{
                return currentItems.map((item:CartItem)=>{
                    if(item.id==id){
                        return {...item,qty:item.qty+1}
                    }else{
                        return item;
                    }
                });
            }
        });
    };
    const handleDecreaseProductQty=(id:number)=>{
        setCartItems((currentItems:CartItem[])=>{
            const selectedItem=currentItems.find((item:CartItem)=>item.id==id);
            if(selectedItem?.qty===1){
                return currentItems.filter((item:CartItem)=>item.id!==id);
            }else{
                return currentItems.map((item:CartItem)=>{
                    if(item.id==id){
                        return {...item,qty:item.qty-1}
                    }else{
                        return item;
                    }
                });
            }
        });
    };
    const getProductQty=(id:number)=>{
        return cartItems.find((item:CartItem)=>item.id==id)?.qty||0;
    }
    const handleRemoveProduct=(id:number)=>{
        setCartItems((currentItems:CartItem[])=>{
            return currentItems.filter((item:CartItem)=>item.id!==id);
        });
    }
    const handleLogin = (username: string, password: string) => {
        login(username, password).then((data: { token: string }) => {
            localStorage.setItem("token", data.token);
            setIsLogin(true);
            navigate("/");
        }).catch((error) => {
            console.error("Login failed:", error);
        });
    };
    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token){
            setIsLogin(true)
        }
    },[])
    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/login")
        setIsLogin(false)
    }
    const cartQty = cartItems.reduce((qty:number, item:CartItem)=>qty+item.qty,0);
    const [isLogin,setIsLogin]=useState(false);
    return(
        <ShoppingCartContext.Provider value={{handleLogout,handleLogin,isLogin,cartItems,cartQty,handleRemoveProduct,getProductQty,handleDecreaseProductQty,handleIncreaseProductQty,handleLogout}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}