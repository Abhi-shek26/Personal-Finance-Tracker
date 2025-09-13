import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TransactionForm from './components/TransactionForm';

function App() {
    const { user } = useAuthContext();

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="container mx-auto p-4">
                <Routes>
                    <Route 
                        path="/login" 
                        element={!user ? <Login /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/signup" 
                        element={!user ? <Signup /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/" 
                        element={user ? <Home /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/add" 
                        element={user ? <TransactionForm /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/:id/edit" 
                        element={user ? <TransactionForm  /> : <Navigate to="/login" />} 
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
