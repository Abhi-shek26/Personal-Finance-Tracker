import React, { useState, useRef, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import ExpenseChart from '../components/ExpenseChart';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import api from '../utils/api';

const API_URL = '/api/transactions';

const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { logout } = useLogout(); 
    const effectRan = useRef(false);

    const handleLogoutClick = () => {
        logout();
    }

    useEffect(() => {
        if (effectRan.current) return; 
        effectRan.current = true;
        api.get('/transactions')
            .then(res => {
                setTransactions(res.data);
                setFilteredTransactions(res.data);
            })
            .catch(error => {
                console.error("Error fetching transactions:", error);
                if (error.response && error.response.status === 401) {
                    handleLogoutClick();
                }
            });
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredTransactions(transactions);
        } else if (filter === 'income') {
            setFilteredTransactions(transactions.filter(t => t.amount > 0));
        } else {
            setFilteredTransactions(transactions.filter(t => t.amount < 0));
        }
    }, [filter, transactions]);

    const deleteTransaction = async (id) => {
        try {
            await api.delete(`/transactions/${id}`);
            setTransactions(prev => prev.filter(t => t._id !== id));
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
        }, 250); 
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                    Personal Finance Tracker
                </h1>
                <div className="flex items-center gap-3">
                    <Link
                        to="/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors"
                    >
                        + Add Transaction
                    </Link>
                    <button
                        onClick={handleLogoutClick}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors"
                    >
                        Logout
                    </button>  
                </div>
            </div>

            {/* Filter Controls */}
            <div className="flex justify-center sm:justify-start mb-6">
                <div className="bg-gray-200 p-1 rounded-lg flex space-x-1">
                    {['all', 'income', 'expense'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors
                                ${filter === f ? 'bg-white text-gray-800 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Transaction List */}
            <div className="overflow-hidden rounded-xl shadow-md border border-gray-200">
              <TransactionList
                 transactions={filteredTransactions}
                 deleteTransaction={deleteTransaction}
             />
           </div>

            {/* Expense Chart Container */}
            <div
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mt-10 cursor-pointer 
                    transition transform hover:scale-[1.02]"
                onClick={openModal}
            >
                <ExpenseChart transactions={transactions} />
                <p className="text-center text-gray-500 mt-3 text-sm italic">
                    Click chart to view in fullscreen
                </p>
            </div>

            {/* Fullscreen Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div
                        className={`bg-white rounded-2xl shadow-2xl p-8 w-11/12 md:w-3/4 lg:w-2/3 relative 
                            ${isClosing ? 'animate-scaleDown' : 'animate-scaleUp'}`}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                            Detailed Expense Breakdown
                        </h2>
                        <ExpenseChart transactions={transactions} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;
