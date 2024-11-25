import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
