import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import { Link } from 'react-router-dom';

function UserDashboard({ user }) {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/tasks/${user.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setTasks(res.data);
            } catch (error) {
                console.error("Error fetching tasks: ", error);
                setErrorMessage("Failed to load tasks.");
            }
        };
        fetchTasks();
    }, [user.id]);

    useEffect(() => {
        const results = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(results);
        //setCurrentPage(1);
    }, [searchTerm, tasks]);

    const handleDeleteTask = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const newTasks = tasks.filter(task => task.id !== taskId);
                setTasks(newTasks);
                setFilteredTasks(newTasks);
                setSuccessMessage("Task deleted successfully.");
            } catch (error) {
                console.error("Error deleting task: ", error);
                setErrorMessage("Failed to delete task.");
            }
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
                status: newStatus
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, status: newStatus };
                }
                return task;
            });
            setTasks(updatedTasks);
            setSuccessMessage("Task status updated successfully.");
        } catch (error) {
            console.error("Error updating task status: ", error);
            setErrorMessage("Failed to update task status.");
        }
    };

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

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const clearErrorMessage = () => {setErrorMessage('');};
    const clearSuccessMessage = () => {setSuccessMessage('');};

    return (
        <div className="bg-gray-3">
            <Navbar user={user}/>
            <div className="flex justify-center mt-20 height-page">
                <div className="mx-auto my-5 bg-gray-3 width-table">
                    <div className="pb-4 bg-gray-3 dark:bg-gray-900 ml-1 flex flex-row justify-between items-center">
                        <div className="relative flex-grow">
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
                                   placeholder="Search for a task" onChange={e => setSearchTerm(e.target.value)}
                                   value={searchTerm}/>
                        </div>
                        <Link to="/AddTask" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Task</Link>
                    </div>
                    <div className="inline-block min-w-full align-middle sm:rounded-lg">
                        <div className="overflow-hidden sm:rounded-lg">
                            <table
                                className="min-w-full divide-y divide-gray-200 text-center shadow-lg sm:rounded-lg bg-white">
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
                                        Date of Creation
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-blue divide-y divide-blue-200">
                                {currentTasks.map((task, index) => (
                                    <tr key={index}
                                        className="odd:bg-blue odd:dark:bg-blue-50 even:bg-blue-50 even:dark:bg-blue-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                                            {index + 1 + (currentPage - 1) * tasksPerPage}
                                        </td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-base text-gray-500 overflow-hidden text-overflow:ellipsis">
                                            {task.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-base text-gray-500 overflow-hidden text-overflow:ellipsis">
                                            {task.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-pre-wrap text-base text-gray-500 overflow-hidden text-overflow:ellipsis">
                                            {task.creationDate.split("T")[0]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <select
                                                className={`border border-gray-300 rounded-lg text-gray-700 h-full pl-3 pr-8 bg-white focus:outline-none appearance-none ${task.status === 'DONE' ? 'cursor-not-allowed' : ''}`}
                                                onChange={e => handleStatusChange(task.id, e.target.value)}
                                                value={task.status}
                                                disabled={task.status === 'DONE'}
                                            >
                                                <option value="TO_DO">TO DO</option>
                                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                                <option value="DONE">DONE</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                                            {task.status !== 'DONE' && (
                                                <Link to={`/EditTask/${task.id}`}
                                                      className="text-indigo-600 hover:text-indigo-900 px-3">Edit</Link>
                                            )}
                                            <button onClick={() => handleDeleteTask(task.id)}
                                                    className="text-red-600 hover:text-red-900 ml-4">Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>

                            </table>
                            <div className="flex items-center justify-center gap-3 mt-4">
                                <button onClick={() => currentPage > 1 ? paginate(currentPage - 1) : null}
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
                                <button onClick={() => currentPage < totalPages ? paginate(currentPage + 1) : null}
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

export default UserDashboard;
