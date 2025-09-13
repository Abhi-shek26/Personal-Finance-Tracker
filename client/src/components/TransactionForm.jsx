import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

const TransactionForm = () => {
    const [formData, setFormData] = useState({ title: '', amount: '', date: '', category: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {        
        if (id) {
            api.get(`/transactions/${id}`)
                .then(res => {
                    const { title, amount, date, category } = res.data;
                    const formattedData = {
                        title,
                        amount,
                        date: new Date(date).toISOString().split('T')[0],
                        category
                    };
                    setFormData(formattedData);
                })
                .catch(err => {
                    console.error("--- API CALL FAILED ---");
                    if (err.response) {
                        console.error("Server responded with error status:", err.response.status);
                        console.error("Server error data:", err.response.data);
                    } else {
                        console.error("An error occurred during the request setup:", err.message);
                    }
                });
        } else {
            console.log("No ID found in URL. ");
        }
    }, [id]); 

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const transaction = { ...formData, amount: parseFloat(formData.amount) };
        try {
            if (id) {
                await api.put(`/transactions/${id}`, transaction);
            } else {
                await api.post('/transactions', transaction);
            }
            navigate('/');
        } catch (err) {
            console.error("Transaction submit failed:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 max-w-lg mx-auto space-y-6 mt-10">
             <h2 className="text-2xl font-bold text-gray-800 text-center">
                {id ? 'Update Transaction' : 'Add New Transaction'}
            </h2>
             <div>
                <label className="block text-gray-600 mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block text-gray-600 mb-1">Amount</label>
                <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block text-gray-600 mb-1">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block text-gray-600 mb-1">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg">
                {id ? 'Update Transaction' : 'Add Transaction'}
            </button>
        </form>
    );
};

export default TransactionForm;
