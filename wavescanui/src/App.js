// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Form from './Pages/ProjectForm'
import SideBar from './Components/SideBar';
import './CSS/App.css'

const App = () => {
    return (
        <div className='App'>
            <SideBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<Form />} />
            </Routes>
        </div>
    );
};

export default App;