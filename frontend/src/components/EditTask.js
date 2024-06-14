import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './NavBar';

function EditTask({ user }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            const res = await axios.get(`http://localhost:5000/api/tasks/details/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTitle(res.data.title);
            setDescription(res.data.description);
            setStatus(res.data.status);
        };

        fetchTask();
    }, [taskId]);

    const handleEditTask = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}`,
                { title, description, status },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            //setSuccessMessage('Task updated successfully');
            navigate('/user');
        } catch (error) {
            console.error('Error updating task:', error);
            setErrorMessage('Failed to update task');
        }
    };

    const clearErrorMessage = () => {setErrorMessage('');};

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar user={user} />
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white rounded-lg shadow-8 overflow-hidden">
                    {errorMessage && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 relative" role="alert">
                            <span>{errorMessage}</span>
                            <button onClick={clearErrorMessage} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="px-6 py-8">
                        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                            Edit Task
                        </h2>
                        <form className="space-y-6" onSubmit={handleEditTask}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter task description"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="TO_DO">TO-DO</option>
                                    <option value="IN_PROGRESS">IN-PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Update Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTask;
