import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup"; 

const Signup = () => {
    const { signup, isLoading, error } = useSignup();
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [dateofbirth, setDateOfBirth] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = await signup(name, email, password, confirmPassword, dateofbirth);
        if (data) {
            console.log("Signup successful:", data);
        } else {
            console.error("Signup failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-[70vh] w-full">
            <div className="bg-white p-8 rounded-lg w-[350px] shadow-lg text-center mx-auto">
                <h2 className="text-2xl mb-5 text-black text-left font-bold">Signup</h2>
                
                {error && <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4 text-sm">{error}</p>}
                
                <form onSubmit={handleSignup} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 my-1 border border-gray-300 rounded-md text-sm box-border"
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 my-1 border border-gray-300 rounded-md text-sm box-border"
                    />
                    
                    <input
                        type="text"
                        placeholder="Date of Birth (YYYY-MM-DD)"
                        value={dateofbirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                        className="w-full p-3 my-1 border border-gray-300 rounded-md text-sm box-border"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 my-1 border border-gray-300 rounded-md text-sm box-border"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-3 my-1 border border-gray-300 rounded-md text-sm box-border"
                    />

                    <button 
                        type="submit" 
                        className="w-1/3 bg-blue-600 text-white border-0 py-3 rounded-md text-base cursor-pointer mt-4 mx-auto hover:bg-blue-800 disabled:opacity-50" 
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Signup"}
                    </button>
                </form>

                <div className="mt-4 text-sm">
                    Already a member?{" "}
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
