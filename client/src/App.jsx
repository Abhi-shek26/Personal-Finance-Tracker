import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';

function App() {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddTransaction />} />
                    <Route path="/:id/edit" element={<EditTransaction />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
