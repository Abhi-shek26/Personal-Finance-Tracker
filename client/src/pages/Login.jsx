import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'; 
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("--- Sending to backend ---");
        console.log({ email, password });
        await login(email, password);
    };

    return (
        <div className="flex justify-center items-center h-[70vh] w-full">
            <div className="bg-white p-8 rounded-lg w-[350px] shadow-lg text-center mx-auto">
                <h2 className="text-2xl mb-5 text-black text-left font-bold">Login</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="email"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="w-full p-3 my-1 border border-gray-300 rounded-md text-sm box-border"
                    />
                    
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="w-full p-3 my-1 border border-gray-300 rounded-md text-sm box-border"
                    />

                    {error && (
                        <div className="text-red-500 bg-red-100 p-3 rounded-md my-2 text-sm text-left">
                            {error.general && <p>{error.general}</p>}
                            {error.email && <p>Email: {error.email}</p>}
                            {error.password && <p>Password: {error.password}</p>}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white border-0 py-3 rounded-md text-base cursor-pointer mt-4 hover:bg-blue-800 disabled:opacity-50" 
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-4 text-sm">
                    Not a member?{" "}
                    <Link to="/signup" className="text-blue-600 font-bold hover:underline">
                        Signup now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
