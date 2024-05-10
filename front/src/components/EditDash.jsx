import React, { useState } from 'react';
import axios from 'axios';

const EditDash = ({ user, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        grade: user.grade,
        year: user.year
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/users/${user._id}`, formData);
            console.log('User updated successfully');
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Phone Number:</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Grade:</label>
                        <input
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Year:</label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2">Save</button>
                        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 rounded-md px-4 py-2">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditDash;