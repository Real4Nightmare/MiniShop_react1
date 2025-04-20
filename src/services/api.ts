import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3100",
});
export async function getProducts() {
    const {data} = await client("/products");
    return data;
}
export async function getProduct(id: number) {
    const {data} = await client(`/products/${id}`);
    return data;
}
export async function login(username: string, password: string) {
    // Mock authentication for development
    if (username === "admin" && password === "admin") {
        return { token: "mock-token" };
    }
    throw new Error("Invalid credentials");
}