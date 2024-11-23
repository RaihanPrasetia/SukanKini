import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import classService from '../../service/classService'; // Import service
import trainerService from '../../service/trainerService'; // Import service
import categoryService from '../../service/categoryService'; // Import service

const KelasMitra = () => {
const navigate = useNavigate();
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState({
name: '',
category: '',
trainer: '',
schedules: [],
address: '',
price: '',
image_path: null,
});
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editingClass, setEditingClass] = useState(null);

const [newSchedule, setNewSchedule] = useState({ hari: '', jam: '' });
const [classes, setClasses] = useState([]);
const [categories, setCategories] = useState([]);
const [trainers, setTrainers] = useState([]);
const [loading, setLoading] = useState(false);


const handleEdit = async (kelas) => {
setEditingClass(kelas);
try {
const [categoryData, trainerData] = await Promise.all([
categoryService.getCategory(),
trainerService.getTrainer(),
]);
setCategories(categoryData);
setTrainers(trainerData);

setFormData({
name: kelas.name,
category: kelas.category.id,
trainer: kelas.trainer.id,
address: kelas.address,
schedules: kelas.schedules || [],
price: kelas.price,
image_path: kelas.image_path || '',
});
setIsEditModalOpen(true);
} catch (error) {
Swal.fire({
title: 'Error',
text: error.message || 'Gagal mengambil data kategori atau pelatih.',
icon: 'error',
confirmButtonText: 'OK',
});
}
};


const handleEditFormSubmit = async (e) => {
e.preventDefault();
try {
setLoading(true);

const classId = editingClass?.id;


const formDataToSubmit = {
name: formData.name,
category_id: parseInt(formData.category),
alamat: formData.address,
schedules: formData.schedules,
trainer_id: parseInt(formData.trainer),
image_path: formData.image_path,
price: formData.price
};


await classService.updateClass(classId,
formDataToSubmit.name,
formDataToSubmit.category_id,
formDataToSubmit.alamat,
formDataToSubmit.schedules,
formDataToSubmit.trainer_id,
formDataToSubmit.image_path,
formDataToSubmit.price
);

Swal.fire({
title: "Berhasil",
text: "Kelas berhasil diperbarui!",
icon: "success",
confirmButtonText: "OK",
});

setIsEditModalOpen(false);
setEditingClass(null); // Clear the class data

// Refresh class list
const newClass = await classService.getClasses();
setClasses(newClass);
} catch (error) {
console.error("Error:", error); // Log full error
Swal.fire({
title: "Error",
text: error.message || "Gagal memperbarui kelas.",
icon: "error",
confirmButtonText: "OK",
});
} finally {
setLoading(false);
}
};






// Fetch classes on component mount
useEffect(() => {
const fetchClasses = async () => {
setLoading(true);
try {
const classData = await classService.getClasses();
setClasses(classData); // Update state with new class data
} catch (error) {
Swal.fire({
title: 'Upss!!!',
text: error.message || 'Gagal mengambil data kelas.',
icon: 'error',
confirmButtonText: 'OK',
});
console.error("Error fetching classes:", error); // Log the error for debugging
} finally {
setLoading(false);
}
};
fetchClasses();
}, []);

const handleViewDetails = (kelasId) => {
navigate(`/mitra/kelas/${kelasId}`);
};

// Fetch categories and trainers when modal is opened
const handleModalOpen = async () => {
try {
const [categoryData, trainerData] = await Promise.all([
categoryService.getCategory(),
trainerService.getTrainer(),
]);
setCategories(categoryData);
setTrainers(trainerData);
setIsModalOpen(true);
} catch (error) {
Swal.fire({
title: 'Error',
text: error.message || 'Gagal mengambil data kategori atau pelatih.',
icon: 'error',
confirmButtonText: 'OK',
});
}
};

const handleModalClose = () => setIsModalOpen(false);

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData({
...formData,
[name]: value,
});
};

const handleFormSubmit = async (e) => {
e.preventDefault();
try {
setLoading(true);

// Prepare form data
const formDataToSubmit = {
name: formData.name,
category_id: formData.category,
alamat: formData.address,
schedules: formData.schedules,
trainer_id: formData.trainer,
image_path: formData.image_path,
price: formData.price
};

// Call API to create class
await classService.createClass(formDataToSubmit);

Swal.fire({
title: "Berhasil",
text: "Kelas berhasil dibuat!",
icon: "success",
confirmButtonText: "OK",
});

// Close the modal and reset form
setIsModalOpen(false);
setFormData({
name: '',
category: '',
trainer: '',
schedule: '',
address: '',
});

} finally {
setLoading(false);
}
};

const handleDelete = async (kelasId) => {
try {
const result = await Swal.fire({
title: 'Apakah Anda yakin?',
text: 'Kelas ini akan dihapus!',
icon: 'warning',
showCancelButton: true,
confirmButtonText: 'Ya, Hapus!',
cancelButtonText: 'Batal',
});

if (result.isConfirmed) {
setLoading(true);
await classService.deleteClassById(kelasId);
Swal.fire('Dihapus!', 'Kelas telah dihapus.', 'success');
}
// Refresh class list
const newClass = await classService.getClasses();
setClasses(newClass);

} finally {
setLoading(false);
}
};


return (
<div className="w-full bg-white p-6 lg:px-16 rounded-lg py-24 lg:pt-32 shadow-lg min-h-[80vh]">
    <div className="flex flex-col lg:flex-row justify-between mb-5">
        <h2 className="text-3xl font-semibold mb-4 lg:mb-0">Daftar Kelas</h2>
        <button className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
            onClick={handleModalOpen}>
            <FaPlus className="mr-2" />
            Buat Kelas
        </button>
    </div>

    {/* Modal */}
    {isModalOpen && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-2xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Buat Kelas</h3>
            <form onSubmit={handleFormSubmit}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kelas</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select name="category" value={formData.category} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option value="">Pilih Kategori</option>
                            {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pelatih</label>
                        {trainers.length === 0 ? (
                        <p className="text-red-500 font-semibold">Silahkan buat Pelatih Terlebih dahulu</p>
                        ) : (
                        <select name="trainer" value={formData.trainer} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option value="">Pilih Pelatih</option>
                            {trainers.map((trainer) => (
                            <option key={trainer.id} value={trainer.id}>
                                {trainer.name}
                            </option>
                            ))}
                        </select>
                        )}
                    </div>

                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal</label>
                    <div className="flex items-center space-x-2 mb-3">
                        <select name="hari" value={newSchedule.hari} onChange={(e)=> setNewSchedule({
                            ...newSchedule,
                            hari: e.target.value
                            })}
                            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
                            focus:ring-blue-500"
                            >
                            <option value="">Pilih Hari</option>
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jumat">Jumat</option>
                            <option value="Sabtu">Sabtu</option>
                            <option value="Minggu">Minggu</option>
                        </select>

                        <input type="time" name="jam" value={newSchedule.jam} onChange={(e)=> setNewSchedule({
                        ...newSchedule, jam: e.target.value
                        })}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
                        focus:ring-blue-500"
                        />

                        <button type="button" onClick={()=> {
                            if (newSchedule.hari && newSchedule.jam) {
                            setFormData((prev) => ({
                            ...prev,
                            schedules: [...prev.schedules, newSchedule],
                            }));
                            setNewSchedule({ hari: '', jam: '' });
                            } else {
                            alert("Mohon isi hari dan jam sebelum menambah jadwal.");
                            }
                            }}
                            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none
                            focus:ring-2 focus:ring-blue-400"
                            >
                            Tambah
                        </button>
                    </div>

                    <ul className="mt-2 space-y-1">
                        {formData.schedules.map((schedule, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{`${schedule.hari} (${schedule.jam})`}</span>
                            <button type="button" onClick={()=>
                                setFormData((prev) => ({
                                ...prev,
                                schedules: prev.schedules.filter((_, i) => i !== index),
                                }))
                                }
                                className="text-red-500 hover:text-red-600 focus:outline-none"
                                >
                                Hapus
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                        <input type="file" name="image_path" onChange={(e)=> {
                        const file = e.target.files[0];
                        if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                        alert("Ukuran file tidak boleh lebih dari 5MB");
                        e.target.value = ""; // Reset input file
                        } else {
                        setFormData({
                        ...formData,
                        image_path: file,
                        });
                        }
                        }
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
                        focus:ring-blue-500"
                        />
                    </div>

                </div>

                <div className="flex justify-end space-x-4">
                    <button type="button"
                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={handleModalClose}>
                        Batal
                    </button>
                    <button type="submit"
                        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
    )}

    {isEditModalOpen && editingClass && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Edit Kelas</h3>
            <form onSubmit={handleEditFormSubmit}>
                {/* Kategori & Pelatih */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kelas</label>
                        <input type="text" name="name" value={formData.name !==undefined ? formData.name :
                            editingClass.name} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>

                    {/* Kategori */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select name="category" value={formData.category || editingClass.category.id}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option value="">Pilih Kategori</option>
                            {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                            ))}
                        </select>
                    </div>

                    {/* Pelatih */}
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pelatih</label>
                        {trainers.length === 0 ? (
                        <p className="text-red-500 font-semibold">Silahkan buat Pelatih Terlebih dahulu</p>
                        ) : (
                        <select name="trainer" value={formData.trainer || editingClass.trainer?.id || "" }
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option value="">Pilih Pelatih</option>
                            {trainers.map((trainer) => (
                            <option key={trainer.id} value={trainer.id}>
                                {trainer.name}
                            </option>
                            ))}
                        </select>
                        )}
                    </div>
                </div>

                {/* Jadwal */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal</label>
                    <div className="flex items-center gap-3 mb-3">
                        <select name="hari" value={newSchedule.hari} onChange={(e)=> setNewSchedule({
                            ...newSchedule,
                            hari: e.target.value
                            })}
                            className="w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none
                            focus:ring-2 focus:ring-blue-500"
                            >
                            <option value="">Pilih Hari</option>
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jumat">Jumat</option>
                            <option value="Sabtu">Sabtu</option>
                            <option value="Minggu">Minggu</option>
                        </select>

                        <input type="time" name="jam" value={newSchedule.jam} onChange={(e)=> setNewSchedule({
                        ...newSchedule, jam: e.target.value
                        })}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2
                        focus:ring-blue-500"
                        />

                        <button type="button" onClick={()=> {
                            if (newSchedule.hari && newSchedule.jam) {
                            setFormData((prev) => ({
                            ...prev,
                            schedules: [...prev.schedules, newSchedule],
                            }));
                            setNewSchedule({ hari: '', jam: '' });
                            } else {
                            alert("Mohon isi hari dan jam sebelum menambah jadwal.");
                            }
                            }}
                            className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none
                            focus:ring-2 focus:ring-blue-500"
                            >
                            Tambah
                        </button>
                    </div>
                    <ul className="space-y-1">
  {formData.schedules.map((schedule, index) => {
    // Memformat waktu menjadi format jam:menit
    const formattedTime = schedule.jam.split(':').slice(0, 2).join(':'); // Menyaring jam dan menit, kemudian menggabungkan dengan ":"
    return (
      <li key={index} className="flex justify-between items-center">
        <span>{`${schedule.hari} (${formattedTime})`}</span>
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              schedules: prev.schedules.filter((_, i) => i !== index),
            }))
          }
          className="text-red-500 hover:underline"
        >
          <i className="fas fa-trash-alt mr-1"></i> Hapus
        </button>
      </li>
    );
  })}
</ul>

                </div>

                {/* Alamat & Harga */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                        <input type="text" name="address" value={formData.address !==undefined ? formData.address :
                            editingClass.address} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                        <input type="number" name="price" value={formData.price !==undefined ? formData.price :
                            editingClass.price} onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Kelas</label>
                        <input type="file" name="image_path" onChange={(e)=> {
                        const file = e.target.files[0];
                        if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                        alert("Ukuran file tidak boleh lebih dari 5MB");
                        e.target.value = ""; // Reset input file
                        } else {
                        setFormData({
                        ...formData,
                        image_path: file
                        });
                        }
                        }
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none
                        focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                </div>

                <div className="flex justify-end gap-4">
                    <button type="button"
                        className="py-2 px-5 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={()=> setIsEditModalOpen(false)}
                        >
                        Batal
                    </button>
                    <button type="submit"
                        className="py-2 px-5 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Perbarui
                    </button>
                </div>
            </form>
        </div>
    </div>
    )}


    <div className="overflow-x-auto mt-6">
        {loading ? (
        <div className="text-center">Loading...</div>
        ) : (
        <table className="min-w-full text-sm text-left text-gray-500 rounded-lg shadow-lg bg-white">
            <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="px-6 py-4">Gambar</th>
                    <th className="px-6 py-4">Nama Kelas</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Hari & Jam</th>
                    <th className="px-6 py-4">Trainer</th>
                    <th className="px-6 py-4">Alamat</th>
                    <th className="px-6 py-4">Harga</th>
                    <th className="px-6 py-4">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {classes.length === 0 ? (
                <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-600 font-semibold">
                        Anda belum memiliki kelas
                    </td>
                </tr>
                ) : (
                classes.map((kelas) => (
                <tr key={kelas.id} className="hover:bg-gray-100 transition-all">
                    <td className="px-6 py-4 text-center">
                        <img src={`/images/kelas/${kelas.imagePath}`} alt={kelas.name}
                            className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className="px-6 py-4 font-medium">{kelas.name}</td>
                    <td className="px-6 py-4">{kelas.category.name}</td>
                    <td className="px-6 py-4">
                        <ul className="list-disc pl-6 space-y-2">
                            {kelas.schedules.map((schedule, index) => {
                            const formattedTime = schedule.jam.split(':').slice(0, 2).join(':');
                            return (
                            <li key={index} className="text-gray-700">
                                <span className="block font-medium text-green-600">{schedule.hari}</span>
                                <span className="text-sm text-gray-500">{formattedTime}</span>
                            </li>
                            );
                            })}
                        </ul>
                    </td>

                    <td className="px-6 py-4">{kelas.trainer.name}</td>
                    <td className="px-6 py-4">{kelas.address}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                        {`Rp ${kelas.price.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                            <button onClick={()=> handleEdit(kelas)}
                                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600
                                transition-all">
                                Edit
                            </button>
                            <button onClick={()=> handleDelete(kelas.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all">
                                Hapus
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                                onClick={()=> handleViewDetails(kelas.id)}
                                >
                                Lihat
                            </button>
                        </div>
                    </td>
                </tr>
                ))
                )}
            </tbody>
        </table>


        )}
    </div>
</div>
);
};

export default KelasMitra;