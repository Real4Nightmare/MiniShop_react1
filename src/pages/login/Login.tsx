import React, { useState } from "react";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";

function Login() {
    const { handleLogin } = useShoppingCartContext();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            await handleLogin(user.username, user.password);
        } catch (err) {
            console.log(err);
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center j">
            <Container>
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        {error && (
                            <div className="mb-4 text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                        <Button 
                            variant="primary" 
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}

export default Login;