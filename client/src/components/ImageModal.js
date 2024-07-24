import React from 'react';

const ImageModal = ({ image, closeModal }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
        >
            <div className="relative p-4 bg-white rounded shadow-lg">
                <button
                    className="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full hover:bg-red-800"
                    onClick={closeModal}
                >
                    X
                </button>
                <img
                    src={`http://localhost:5000/uploads/${image.file_path}`}
                    alt="Modal Image"
                    className="max-w-full max-h-screen"
                />
            </div>
        </div>
    );
};

export default ImageModal;
