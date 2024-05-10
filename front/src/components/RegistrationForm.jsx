import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm({ handleRegister }) {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            phoneNumber: event.target.phoneNumber.value,
            grade: event.target.grade.value,
            year: event.target.year.value
        };
    
        // Check if the ID field is defined (e.g., when editing an existing user)
        const id = event.target.id ? event.target.id.value : null;
        console.log('ID:', id); // Log the ID to see its value
        if (id) {
            formData.id = id;
        }
    
        try {
            const response = await axios.post('http://localhost:3001/api/users/register', formData);
            console.log(response);
    
            if (response && response.data) {
                console.log(response.data);
                handleRegister(response.data);
                navigate('/Dashboard'); // Navigate to the Dashboard after successful registration
            } else {
                console.error('Empty response or missing data property');
            }
        } catch (error) {
            console.error('Registration error:', error.response.data);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred during registration.');
            }
        }
    };
    


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <form className="max-w-md mx-auto bg-black p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium">Confirm password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium">Name</label>
                        <input
                            type="text"
                            id="Name"
                            name="name"
                            className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Grade</label>
                        <input
                            type="text"
                            id="Grade"
                            name="grade"
                            className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phoneNumber"
                            pattern="[0-9]{10}"
                            className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="06 -- -- -- --"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="year" className="block mb-2 text-sm font-medium">Year</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center"
                >
                    Register
                </button>
            </form>
        </div>
    );    
}

export default RegistrationForm;

