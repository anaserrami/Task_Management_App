import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import UserDetails from './components/UserDetails';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import EditProfile from './components/EditProfile';
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
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={user ? <AdminDashboard user={user} /> : <Login setUser={setUser} />} />
                <Route path="/user" element={user ? <UserDashboard user={user} /> : <Login setUser={setUser} />} />
                <Route path="/profile/:userId" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
                <Route path="/UserDetails/:userId" element={user ? <UserDetails user={user} /> : <Login setUser={setUser} />} />
                <Route path="/EditTask/:taskId" element={user ? <EditTask user={user} /> : <Login setUser={setUser} />} />
                <Route path="/AddTask" element={user ? <AddTask user={user} /> : <Login setUser={setUser} />} />
                <Route path="/edit-profile/:userId" element={user ? <EditProfile user={user} />: <Login setUser={setUser} />} />
            </Routes>
        </Router>
    );
}

export default App;
