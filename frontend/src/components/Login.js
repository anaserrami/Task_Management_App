import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import loginLogo from '../assets/login.png';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = response.data.user.role === 'ADMIN' ? '/admin' : '/user';
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed!');
        }
    };

    const clearError = () => {
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-3">
            <div className="flex items-center shadow-4 bg-white rounded-3xl overflow-hidden">
                <div className="hidden lg:block p-8 lg:w-1/2 bg-indigo-100">
                    <div className="p-6 flex flex-col items-center justify-center bg-gray-200">
                        <img src={Logo} alt="Logo" className="w-30 mb-4" />
                        <p className="text-gray-700 text-center">
                            Welcome to your Task Maker! <br />
                        </p>
                        <img src={loginLogo} alt="Login Illustration" className="login-width mt-4" />
                    </div>
                </div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign In to Task Maker</h2>
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 relative" role="alert">
                            <span>{error}</span>
                            <button onClick={clearError} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
