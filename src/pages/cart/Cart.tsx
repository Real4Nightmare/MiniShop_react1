import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import CartItem from "../../components/cartitem/Cartitem";
import Container from "../../components/container/Container";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { getProducts } from "../../services/api";
import type { IProduct } from "../../types/server";

function Cart(): React.ReactElement {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { cartItems } = useContext(ShoppingCartContext);
    useEffect(() => {
        getProducts().then((data) => setProducts(data));
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            const product = products.find(p => p.id === cartItem.id);
            return total + (product?.price || 0) * cartItem.qty;
        }, 0);
    };

    const total = calculateTotal();
    const shipping = total * 0.1;
    const discount = total * 0.1;
    const finalTotal = total + shipping - discount;

    if (products.length === 0) {
        return (
            <Container>
                <h1 className="text-2xl font-bold my-3">Cart is empty</h1>
            </Container>
        );
    }

    return (
        <div>
            <Container>
                <h1 className="text-2xl font-bold my-3 flex top-0 ml-3">Cart</h1>
                <div>
                    {cartItems.map((cartItem) => {
                        const product = products.find(p => p.id === cartItem.id);
                        return product ? <CartItem key={cartItem.id} product={product} /> : null;
                    })}
                </div>
                <div className="justify-between rounded-xl p-2 m-2 bg-gray-200">
                    <div className="flex justify-between rounded-xl p-2 m-2 bg-gray-200 border-b-2 border-gray-300">
                        <h1>Subtotal</h1>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between rounded-xl p-2 m-2 bg-gray-200 border-b-2 border-gray-300">
                        <h1>Shipping</h1>
                        <p>${shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between rounded-xl p-2 m-2 bg-gray-200 border-b-2 border-gray-300">
                        <h1>Discount</h1>
                        <p>-${discount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between rounded-xl p-2 m-2 bg-gray-200">
                        <h1>Total</h1>
                        <p>${finalTotal.toFixed(2)}</p>
                    </div>
                </div>
                <Button variant="success">Checkout</Button>
            </Container>
        </div>
    );
}

export default Cart;
