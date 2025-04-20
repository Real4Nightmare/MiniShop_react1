import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import ProductItem from "../../components/productitem/ProductItem";
import { getProducts } from "../../services/api";
import { IProduct } from "../../types/server";

function Store() {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        getProducts().then((data) => setProducts(data));
    }, []);
    return (
        <Container>
            <div className="container mx-auto">
                <h1 className="text-left mt-5 text-2xl font-bold mb-5">Newest Products</h1>
                <div className="grid grid-cols-4 gap-4">
                    {products.map((item) => (
                        <Link key={item.id} to={`/product/${item.id}`}>
                            <ProductItem
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                image={item.image}
                                category={item.category}
                                rating={item.rating}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default Store;