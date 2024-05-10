import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <form className="max-w-lg mx-auto bg-black p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                    <input type="email" id="email" className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
                    <input type="password" id="password" className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-800 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium">Remember me</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center">Sign In</button>
            </form>
        </div>
    );
}
