import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import { useParams, Link } from 'react-router-dom';
import avatar from '../assets/user.png';
import bgImage from '../assets/bg-picture.jpg';

function Profile() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user profile: ", error);
            }
        };
        fetchUserProfile();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar user={user}/>
            <div className="w-full">
                <img
                    src={bgImage}
                    alt="User Cover"
                    className="w-full h-56 object-cover"
                />
            </div>
            <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
                <div className="relative -top-16">
                    <img
                        src={avatar}
                        alt="User Profile"
                        className="rounded-full border-4 border-white dark:border-gray-800 w-32 h-32 object-cover"
                    />
                </div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{user.bio || "Welcome to your Profile."}</p>
                <div className="w-full mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl">
                    <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                            <dd className="text-lg font-semibold">{user.email}</dd>
                        </div>
                        <div className="flex flex-col items-center">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone</dt>
                            <dd className="text-lg font-semibold">{user.phone}</dd>
                        </div>
                        <div className="flex flex-col items-center">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Role</dt>
                            <dd className="text-lg font-semibold">{user.role}</dd>
                        </div>
                    </dl>
                </div>
                <Link to={`/edit-profile/${userId}`}
                      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit Profile
                </Link>
            </div>
        </div>
    );
}

export default Profile;
