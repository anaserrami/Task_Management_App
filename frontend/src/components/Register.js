import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import registerLogo from '../assets/sign-up.png';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { email, password, name, phone });
            localStorage.setItem('token', response.data.token);
            console.log('Registration successful!');
            window.location.href = '/';
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed!');
        }
    };

    const clearError = () => {
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-3">
            <div className="flex items-stretch bg-white shadow-4 rounded-3xl overflow-hidden">
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign Up for Task Maker</h2>
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
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your Name"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
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
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your Phone number"
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
                                placeholder="Enter a password"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit"
                                    className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        Already have an account?{' '}
                        <Link to="/" className="text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2 bg-indigo-100">
                    <div className="p-6 flex flex-col items-center justify-center bg-gray-200">
                        <img src={Logo} alt="Logo" className="w-28 mb-6 mt-6"/>
                        <p className="text-gray-700 text-center">
                            Join us and manage your tasks efficiently! <br/>
                        </p>
                        <img src={registerLogo} alt="Registration Illustration" className="login-width mt-10"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;