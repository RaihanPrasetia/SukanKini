// Komunitas.js
import React from 'react';

const Komunitas = () => {
    return (
        <section className="w-full lg:px-20 lg:py-16 p-6 bg-green-500">
            <div className="w-full sm:w-1/2 p-6 rounded-2xl bg-white shadow-lg text-black mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Komunitas</h2>
                <div className="rounded-lg">
                    <p className="text-lg">
                        Bergabunglah dengan komunitas kami untuk berbagi pengalaman dan motivasi.
                    </p>
                    <div className="flex justify-center mt-6">
                        <button className="px-5 py-3 bg-green-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-white hover:text-green-500 hover:shadow-xl transition duration-200">
                            Lihat Komunitas
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Komunitas;
