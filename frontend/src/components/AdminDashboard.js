import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import { Link } from 'react-router-dom';

function AdminDashboard({ user }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(res.data);
            setFilteredUsers(res.data);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const results = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
        //setCurrentPage(1);
    }, [searchTerm, users]);

    const handleDeleteUser = async (userId) => {
        // Confirmation dialog before deleting
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5000/api/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const newUsers = users.filter(user => user.id !== userId);
                setUsers(newUsers);
                setFilteredUsers(newUsers);
                alert("User deleted successfully.");
            } catch (error) {
                console.error("Error deleting user: ", error);
                alert("Failed to delete user.");
            }
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div>
            <Navbar user={user}/>
            <div className="flex justify-center items-center">
                <div className="overflow-x-auto max-w-4xl mx-auto my-5">
                    <div className="pb-4 bg-white dark:bg-gray-900 ml-1">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div
                                className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" id="table-search"
                                   className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search for a user" onChange={e => setSearchTerm(e.target.value)}
                                   value={searchTerm}/>
                        </div>
                    </div>
                    <div className="inline-block min-w-full align-middle shadow-lg sm:rounded-lg">
                        <div className="overflow-hidden shadow-lg sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 text-center shadow-lg sm:rounded-lg">
                                <thead className="bg-blue-100">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-blue divide-y divide-blue-200">
                                {currentUsers.map((user, index) => (
                                    <tr key={index}
                                        className="odd:bg-blue odd:dark:bg-blue-50 even:bg-blue-50 even:dark:bg-blue-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{index + 1 + (currentPage - 1) * usersPerPage}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/UserDetails/${user.id}`}
                                                  className="text-indigo-600 hover:text-indigo-900 px-3">Details</Link>
                                            <button onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-600 hover:text-red-900">Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="flex items-center justify-center gap-3 mt-6">
                                <button
                                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor"
                                         aria-hidden="true" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                                    </svg>
                                    Previous
                                </button>
                                <div className="flex items-center gap-2">
                                    {Array.from({length: totalPages}, (_, i) => (
                                        <button type="button" key={i + 1} onClick={() => paginate(i + 1)}
                                                className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-gray-900/10`}>
                                            <span
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-bold text-sm">{i + 1}</span>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor"
                                         aria-hidden="true" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
