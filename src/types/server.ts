export type IProduct = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: IProductRating;
}
export type IProductRating = {
    rate: number;
    count: number;
}
