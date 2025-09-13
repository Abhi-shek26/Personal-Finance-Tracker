import { Link } from 'react-router-dom';

const TransactionList = ({ transactions, deleteTransaction }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-800 text-white text-sm sm:text-base">
                        <th className="py-3 px-4 text-left font-semibold">Title</th>
                        <th className="py-3 px-4 text-left font-semibold">Amount</th>
                        <th className="py-3 px-4 text-left font-semibold">Date</th>
                        <th className="py-3 px-4 text-left font-semibold hidden sm:table-cell">Category</th>
                        <th className="py-3 px-4 text-center font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {transactions.map((transaction, index) => (
                        <tr
                            key={transaction._id}
                            className={`text-sm sm:text-base ${
                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            } hover:bg-gray-100 transition`}
                        >
                            <td className="py-3 px-4 font-medium">{transaction.title}</td>
                            <td
                                className={`py-3 px-4 font-semibold ${
                                    transaction.amount < 0 ? 'text-red-500' : 'text-green-600'
                                }`}
                            >
                                ${transaction.amount.toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                                {new Date(transaction.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                                    {transaction.category}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-center space-x-3">
                                <Link
                                    to={`/${transaction._id}/edit`}
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteTransaction(transaction._id)}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
