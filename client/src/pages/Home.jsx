import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from '../components/TransactionList';
import ExpenseChart from '../components/ExpenseChart';
import { Link } from 'react-router-dom';

const API_URL = '/api/transactions';

const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setTransactions(res.data);
                setFilteredTransactions(res.data);
            })
            .catch(error => console.error("Error fetching transactions:", error));
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
            await axios.delete(`${API_URL}/${id}`);
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
        <div className="max-w-6xl mx-auto px-6 py-10 rounded-2xl bg-white bg-opacity-30 backdrop-blur-md shadow-xl border border-white border-opacity-20 relative overflow-hidden">

            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-center mb-8 
                bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Personal Finance Tracker
            </h1>

            

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
                <Link
                    to="/add"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transform transition
            text-white font-bold py-2 px-5 rounded-lg shadow-lg text-sm sm:text-base text-center"
    >
                    + Add Transaction
                </Link>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium shadow-md transition transform hover:-translate-y-0.5 
                            ${filter === 'all'
                                ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                                : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('income')}
                        className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium shadow-md transition transform hover:-translate-y-0.5 
                            ${filter === 'income'
                                ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-300'
                                : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        Income
                    </button>
                    <button
                        onClick={() => setFilter('expense')}
                        className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium shadow-md transition transform hover:-translate-y-0.5 
                            ${filter === 'expense'
                                ? 'bg-red-500 text-white shadow-lg ring-2 ring-red-300'
                                : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        Expenses
                    </button>
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
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                    Expense Breakdown
                </h2>
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
