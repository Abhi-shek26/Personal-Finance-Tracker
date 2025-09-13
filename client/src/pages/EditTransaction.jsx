import TransactionForm from '../components/TransactionForm';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const EditTransaction = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
          api.get(`/transactions/${id}`)
            .then(res => setTransaction(res.data))
            .catch(err => console.error("Error fetching transaction:", err));
    }, [id]); 

    if (!transaction) return <div>Loading...</div>;

    return (
        <div>
            <TransactionForm existingTransaction={transaction} />
        </div>
    );
};


export default EditTransaction;
