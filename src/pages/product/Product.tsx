import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { getProduct } from "../../services/api";
import { IProduct } from "../../types/server";
function Product() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>();
  const {
    handleDecreaseProductQty,
    handleIncreaseProductQty,
    cartItems,
    getProductQty,
    handleRemoveProduct,
  } = useShoppingCartContext();
  useEffect(() => {
    getProduct(Number(params.id)).then((data) => {
      setProduct(data);
    });
  }, [params.id]);
  if (!product) {
    return (
      <Container>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-sky-200 p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="mx-auto flex flex-col items-center gap-4 mt-4">
                {getProductQty(product.id) === 0 ? (
                  <Button
                    variant="primary"
                    onClick={() => handleIncreaseProductQty(product.id)}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="grid grid-cols-3 gap-4 items-center justify-center m-3">
                      <Button
                        variant="danger"
                        onClick={() => handleDecreaseProductQty(product.id)}
                      >
                        -
                      </Button>
                      <p className="text-2xl font-semibold text-gray-700 mb-4 items-center justify-center flex mt-3 my-auto">
                        {cartItems.find((item) => item.id === product.id)
                          ?.qty || 0}
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => handleIncreaseProductQty(product.id)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-2xl font-semibold text-gray-700 mb-4">
                ${product.price}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Product;
