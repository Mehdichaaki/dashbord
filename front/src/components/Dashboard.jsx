import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistrationForm from './RegistrationForm';
import EditDash from './EditDash';
import UserTable from './UserTable';

function Dashboard() {
    // State variables initialization
    const [data, setData] = useState([]); // Store user data
    const [searchTerm, setSearchTerm] = useState(''); // Store search term
    const [loading, setLoading] = useState(true); // Indicates if data is loading
    const [error, setError] = useState(null); // Store error message
    const [showRegistrationForm, setShowRegistrationForm] = useState(false); // Toggle registration form visibility
    const [editingUserId, setEditingUserId] = useState(null); // Track the ID of the user being edited
    const [showEditForm, setShowEditForm] = useState(false); // Toggle edit form visibility
    const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user for detailed view
    
    // Fetch initial data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch user data from the server
    const fetchData = async () => {
        try {
            console.log('Fetching user data...');
            const response = await axios.get('http://localhost:3001/api/users');
            console.log('User data fetched successfully:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Error fetching user data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle search input change
    const handleSearch = (event) => {
        console.log('Search term changed:', event.target.value);
        setSearchTerm(event.target.value);
    };

    // Function to delete a user
    const handleDelete = async (id) => {
        try {
            console.log('Deleting user with ID:', id);
            await axios.delete(`http://localhost:3001/api/users/${id}`);
            console.log('User deleted successfully.');
            const updatedData = data.filter((user) => user._id !== id);
            setData(updatedData);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to handle editing a user
    const handleEdit = (id) => {
        console.log('Editing user with ID:', id);
        setEditingUserId(id);
        setShowEditForm(true);
    };

    // Function to toggle selected user for detailed view
    const handleUserClick = (userId) => {
        console.log('Clicked user ID:', userId);
        setSelectedUserId(userId === selectedUserId ? null : userId);
    };

    // Function to download user data as CSV
    const downloadUserData = () => {
        // Extract only the required fields
        const csvData = data.map(user => {
            const { name, email, phoneNumber, grade, year } = user;
            // Enclose phoneNumber in quotes to treat it as text
            return [name, email, `"${phoneNumber}"`, grade, year];
        });

        // Convert data to CSV format
        const csv = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });

        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user_data.csv';

        // Trigger download
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Filter data based on search term
const filteredData = data.filter((item) =>
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.phoneNumber && item.phoneNumber.includes(searchTerm)) ||
    (item.grade && item.grade.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.year && item.year.toString().includes(searchTerm))
);


    // JSX returned by the component
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search bar and new registration button */}
            <div className="flex items-center justify-between mb-4">
                {/* Input for search term */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md p-2 w-1/4"
                />
                {/* Button to toggle registration form visibility */}
                <button
                    onClick={() => setShowRegistrationForm(!showRegistrationForm)}
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                    {showRegistrationForm ? 'X' : 'New Register +'}
                </button>
            </div>
            {/* Conditional rendering based on loading state */}
            {showRegistrationForm ? (
                <RegistrationForm handleRegister={(newUserData) => setData([...data, newUserData])} />
            ) : loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                // Display user table
                <>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                                <th className="border border-gray-300 px-4 py-2">Grade</th>
                                <th className="border border-gray-300 px-4 py-2">Year</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through filtered data to render rows */}
                            {filteredData.map((user) => (
                                <tr key={user._id}>
                                    <td className="border border-gray-300 px-4 py-2" onClick={() => handleUserClick(user._id)} style={{ cursor: 'pointer' }}>
                                        <a href={`/user/${user._id}/table`}>{user.name}</a>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.phoneNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.grade}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.year}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(user._id)}
                                            className="bg-green-500 text-white rounded-md px-2 py-1 mx-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white rounded-md px-2 py-1 mx-1"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Show detailed user table if a user is selected */}
                    {selectedUserId && (
                        <UserTable data={filteredData.find(user => user._id === selectedUserId).tables} />
                    )}
                </>
            )}
            {/* Show edit form if editing is triggered */}
            {showEditForm && (
                <EditDash
                    user={data.find(user => user._id === editingUserId)}
                    onCancel={() => setShowEditForm(false)}
                />
            )}
            {/* Button to download user data */}
            <div className="mt-4">
                <button onClick={downloadUserData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Download
                </button>
            </div>
            {/* User table with selected user details */}
            {selectedUserId && <UserTable userId={selectedUserId} />}
        </div>
    );
}

export default Dashboard;
