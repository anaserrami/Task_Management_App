import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import Navbar from './components/NavBar';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log("userData", userData);
        if (userData) {
            setUser(userData);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="/admin" element={user ? <AdminDashboard user={user} /> : <Login setUser={setUser} />} />
                <Route path="/user" element={user ? <UserDashboard user={user} /> : <Login setUser={setUser} />} />
                <Route path="/profile" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
            </Routes>
        </Router>
    );
}


export default App;
