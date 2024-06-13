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
        };

        fetchTasks();
    }, [userId]);

    // Function to determine the class based on status
    const getStatusClass = (status) => {
        switch (status) {
            case 'TO_DO':
                return 'status-todo';
            case 'IN_PROGRESS':
                return 'status-in-progress';
            case 'DONE':
                return 'status-done';
            default:
                return '';
        }
    };

    return (
        <div className="bg-gray-3">
            <Navbar user={user}/>
            <div className="flex justify-center items-center height-page">
                <div className="overflow-x-auto shadow-lg sm:rounded-lg max-w-4xl mx-auto bg-gray-3">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 text-center bg-white">
                                <thead className="bg-blue-100">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-2xs font-bold text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-blue divide-y divide-blue-200">
                                {tasks.map((task, index) => (
                                    <tr key={index} className="odd:bg-blue odd:dark:bg-blue-50 even:bg-blue-50 even:dark:bg-blue-50">
                                        <td className="px-6 py-4 whitespace-pre-wrap text-sm font-bold text-gray-500">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500 overflow-hidden text-overflow:ellipsis">{task.title}</td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500 overflow-hidden text-overflow:ellipsis">{task.description}</td>
                                        <td className={`px-6 py-4 whitespace-pre-wrap text-sm ${getStatusClass(task.status)}`}>{task.status}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
