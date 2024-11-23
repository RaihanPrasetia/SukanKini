import React, { useState, useEffect } from 'react';
import bankMitraService from '../../service/bankMitraService';
import Swal from 'sweetalert2';
import { FaPlus } from 'react-icons/fa';

const Bank = () => {
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [bankData, setBankData] = useState({
        brand: '',
        no_rek: '',
        an: '',
    });
    const [selectedBank, setSelectedBank] = useState(null);

    useEffect(() => {
        const fetchBanks = async () => {
            setLoading(true);
            try {
                const bankData = await bankMitraService.getBankMitra();
                setBanks(bankData);
            } catch (error) {
                setError(error.message || 'Failed to fetch bank data');
            } finally {
                setLoading(false);
            }
        };

        fetchBanks();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { brand, no_rek, an } = bankData;

        if (!brand || !no_rek || !an) {
            Swal.fire('All fields are required');
            return;
        }

        try {
            await bankMitraService.createBank({ brand, no_rek, an });
            Swal.fire('Bank added successfully');
            setIsModalOpen(false);
            setBankData({ brand: '', no_rek: '', an: '' });
            const updatedBanks = await bankMitraService.getBankMitra();
            setBanks(updatedBanks);
        } catch (error) {
            Swal.fire('Error adding bank', error.message, 'error');
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const { brand, no_rek, an } = bankData;

        if (!brand || !no_rek || !an) {
            Swal.fire('All fields are required');
            return;
        }

        try {
            if (selectedBank) {
                await bankMitraService.updateBank(selectedBank.id, { brand, no_rek, an });
                Swal.fire('Bank updated successfully');
                setIsUpdateModalOpen(false);
                setBankData({ brand: '', no_rek: '', an: '' });
                const updatedBanks = await bankMitraService.getBankMitra();
                setBanks(updatedBanks);
            }
        } catch (error) {
            Swal.fire('Error updating bank', error.message, 'error');
        }
    };

    const handleEditClick = (bank) => {
        setSelectedBank(bank);
        setBankData({
            brand: bank.brand,
            no_rek: bank.no_rek,
            an: bank.an,
        });
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = async (bankId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await bankMitraService.deleteBank(bankId);
                Swal.fire('Deleted!', 'Bank has been deleted.', 'success');
                setBanks((prevBanks) => prevBanks.filter((bank) => bank.id !== bankId));
            } catch (error) {
                Swal.fire('Error deleting bank', error.message, 'error');
            }
        }
    };

    if (loading) {
        return <div>Loading banks...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full bg-white p-6 lg:px-16 rounded-lg py-24 lg:pt-32 shadow-lg min-h-[80vh]">
            <div className="flex flex-col lg:flex-row justify-between mb-5">
                <h2 className="text-3xl font-semibold mb-4 lg:mb-0">Bank List</h2>
                <button
                    className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    <FaPlus className="mr-2" />
                    Add Bank
                </button>
            </div>

            {/* Modal Add Bank */}
            {isModalOpen && (
                <Modal
                    title="Add Bank"
                    bankData={bankData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}

            {/* Modal Edit Bank */}
            {isUpdateModalOpen && (
                <Modal
                    title="Edit Bank"
                    bankData={bankData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleUpdateSubmit}
                    closeModal={() => setIsUpdateModalOpen(false)}
                />
            )}

            {/* Bank List Table */}
            <table className="table-auto min-w-full text-sm text-left text-gray-500 shadow-lg bg-white">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="border px-4 py-2">No</th>
                        <th className="border px-4 py-2">Bank Name</th>
                        <th className="border px-4 py-2">Account Number</th>
                        <th className="border px-4 py-2">Account Holder</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banks.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-5 text-xl font-semibold text-gray-500">
                                No bank data available
                            </td>
                        </tr>
                    ) : (
                        banks.map((bank, index) => (
                            <tr key={bank.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{bank.brand}</td>
                                <td className="border px-4 py-2">{bank.no_rek}</td>
                                <td className="border px-4 py-2">{bank.an}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex gap-2 items-center justify-center">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleEditClick(bank)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(bank.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const Modal = ({ title, bankData, handleInputChange, handleSubmit, closeModal }) => (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="brand" className="block text-sm font-medium">Nama Bank</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={bankData.brand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="no_rek" className="block text-sm font-medium">Nomor Rekening</label>
                    <input
                        type="text"
                        id="no_rek"
                        name="no_rek"
                        value={bankData.no_rek}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="an" className="block text-sm font-medium">Nama Pemilik Rekening</label>
                    <input
                        type="text"
                        id="an"
                        name="an"
                        value={bankData.an}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default Bank;
