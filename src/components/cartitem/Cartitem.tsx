import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { IProduct } from "../../types/server";
import Button from "../button/Button";


interface CartItemProps {
  product: IProduct;
}
function CartItem({ product }: CartItemProps) {
  const { cartItems, handleIncreaseProductQty, handleDecreaseProductQty, handleRemoveProduct } = useShoppingCartContext();
  const cartItem = cartItems.find((item) => item.id === product.id);
  return (
    <div className="flex flex-row justify-between item-center border-2 border-gray-300 rounded-xl p-2 ">
      <img
        src={product.image}
        alt={product.title}
        className="w-1/10 rounded-xl mr-5"
      />
      <h1 className="text-xl font-bold mt-5">{product.title}</h1>
      <p className="text-xl mt-5">${product.price}</p>
      <div className="flex item-center flex-row gap-2 ">
        <Button variant="primary" className="text-2xl " onClick={() => handleIncreaseProductQty(product.id)}>
          +
        </Button>
        <span className="items-center my-auto text-2xl">
          {cartItem?.qty || 0}
        </span>
        <Button variant="primary" className="text-2xl" onClick={() => handleDecreaseProductQty(product.id)}>
          -
        </Button>
        <Button variant="danger" onClick={() => handleRemoveProduct(product.id)}>Remove</Button>
      </div>
    </div>
  );
}
export default CartItem;
