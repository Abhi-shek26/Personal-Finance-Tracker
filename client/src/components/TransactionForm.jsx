import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/transactions';

const TransactionForm = () => {
    const [formData, setFormData] = useState({ title: '', amount: '', date: '', category: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`${API_URL}/${id}`).then(res => {
                const { title, amount, date, category } = res.data;
                setFormData({ title, amount, date: new Date(date).toISOString().split('T')[0], category });
            });
        }
    }, [id]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const transaction = { ...formData, amount: parseFloat(formData.amount) };
        if (id) {
            await axios.put(`${API_URL}/${id}`, transaction);
        } else {
            await axios.post(API_URL, transaction);
        }
        navigate('/');
    };

    return (
        <form 
  onSubmit={handleSubmit} 
  className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 max-w-lg mx-auto space-y-6"
>
  <h2 className="text-2xl font-bold text-gray-800 text-center">
    {id ? 'Update Transaction' : 'Add Transaction'}
  </h2>

  <div>
    <label className="block text-gray-600 mb-1">Title</label>
    <input 
      type="text" 
      name="title" 
      value={formData.title} 
      onChange={handleChange} 
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm"
      required 
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-1">Amount (+/-)</label>
    <input 
      type="number" 
      name="amount" 
      value={formData.amount} 
      onChange={handleChange} 
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm"
      required 
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-1">Date</label>
    <input 
      type="date" 
      name="date" 
      value={formData.date} 
      onChange={handleChange} 
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm"
      required 
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-1">Category</label>
    <input 
      type="text" 
      name="category" 
      value={formData.category} 
      onChange={handleChange} 
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 shadow-sm"
      required 
    />
  </div>

  <button 
    type="submit" 
    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:scale-[1.02] transition-transform"
  >
    {id ? 'Update Transaction' : 'Add Transaction'}
  </button>
</form>

    );
};

export default TransactionForm;
