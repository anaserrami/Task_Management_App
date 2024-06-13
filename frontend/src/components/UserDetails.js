import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import { useParams } from 'react-router-dom';

function UserDetails({ user }) {
    const [tasks, setTasks] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get(`http://localhost:5000/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(res.data.tasks);
            console.log("res", res.data);
            console.log("Tasks: ", tasks);
            console.log("User ID: ", userId);
        };

        fetchTasks();
    }, [userId]);

    return (
        <div>
            <Navbar user={user}/>
            <div className="flex justify-center items-center">
                <div className="overflow-x-auto max-w-4xl mx-auto my-5">
                    <div className="inline-block min-w-full align-middle shadow-lg sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 text-center shadow-lg sm:rounded-lg">
                            <thead className="bg-blue-100">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Title
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Description
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
