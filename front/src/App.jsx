
// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Account from './components/Account';
import RegistrationForm from './components/RegistrationForm';
import UserTable from './components/UserTable'





function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="/user/:userId/table" element={<UserTable />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;
