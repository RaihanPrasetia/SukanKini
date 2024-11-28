import React, { useEffect, useState } from 'react';
import { FaEye, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import adminVideoService from '../../service/admin/adminVideoService';

export default function DataVideo() {
    const [searchQuery, setSearchQuery] = useState('');
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null); // Video yang sedang diedit
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [newVideo, setNewVideo] = useState({
        title: '',
        description: '',
        videoLink: '',
        thumbnailLink: '',
    });

    useEffect(() => {
        const fetchAdminVideo = async () => {
            setLoading(true);
            try {
                const videoData = await adminVideoService.getAdminVideo();
                setVideoData(videoData);
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Gagal mengambil data video.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAdminVideo();
    }, []);

    const filteredVideos = videoData.filter((video) =>
        video.title && video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleOpenModal = () => {
        setNewVideo({ title: '', description: '', videoLink: '', thumbnailLink: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVideo((prev) => ({ ...prev, [name]: value }));
    };
    const handleEditVideo = (video) => {
        setNewVideo({
            title: video.title,
            description: video.description,
            videoLink: video.videoLink,
            thumbnailLink: video.thumbnailLink,
        });
        setEditingVideo(video); // Set video yang sedang diedit
        setIsModalOpen(true); // Buka modal
    };

    const handleSaveVideo = async () => {
        if (editingVideo) {
            await handleUpdateVideo(); // Perbarui video jika sedang dalam mode edit
        } else {
            try {
                const formData = new FormData();
                formData.append('title', newVideo.title);
                formData.append('description', newVideo.description);
                formData.append('video_link', newVideo.videoLink);
                formData.append('thumbnail_link', newVideo.thumbnailLink);

                await adminVideoService.createVideo(formData);

                Swal.fire('Berhasil', 'Video berhasil ditambahkan.', 'success');

                const videoData = await adminVideoService.getAdminVideo();
                setVideoData(videoData);

                handleCloseModal();
            } catch (error) {
                console.error('Error saving video:', error);
                Swal.fire('Gagal', 'Gagal menambahkan video.', 'error');
            }
        }
    };


    const handleUpdateVideo = async () => {
        if (!editingVideo) return;

        try {
            const formData = new FormData();
            formData.append('title', newVideo.title);
            formData.append('description', newVideo.description);
            formData.append('video_link', newVideo.videoLink);
            formData.append('thumbnail_link', newVideo.thumbnailLink);

            await adminVideoService.updateVideo(editingVideo.id, formData);

            Swal.fire('Berhasil', 'Video berhasil diperbarui.', 'success');

            // Ambil data terbaru dari server
            const updatedVideoData = await adminVideoService.getAdminVideo();
            setVideoData(updatedVideoData);

            // Reset state dan tutup modal
            setEditingVideo(null);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating video:', error);
            Swal.fire('Gagal', 'Gagal memperbarui video.', 'error');
        }
    };


    const handleDeleteVideo = async (id) => {
        const confirm = await Swal.fire({
            title: 'Hapus Video?',
            text: 'Apakah Anda yakin ingin menghapus video ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
        });

        if (confirm.isConfirmed) {
            try {
                await adminVideoService.deleteVideo(id);
                Swal.fire('Berhasil', 'Video berhasil dihapus.', 'success');
                setVideoData(videoData.filter((video) => video.id !== id));
            } catch (error) {
                Swal.fire('Gagal', 'Gagal menghapus video.', 'error');
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
            <main className="flex-1 space-y-8">
                <div>
                    <h2 className="text-3xl font-semibold mb-5">Data Video</h2>
                    <div className="flex justify-between items-center">
                        <div className="relative w-1/3 mb-4">
                            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari Video..."
                                className="p-2 pl-10 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-indigo-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            className="flex items-center bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                            onClick={handleOpenModal}
                        >
                            <FaPlus className="mr-2" />
                            Buat Video
                        </button>
                    </div>
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-indigo-500 text-white">
                                    <th className="p-4">No</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Jumlah View</th>
                                    <th className="p-4">Jumlah Like</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : filteredVideos.length > 0 ? (
                                    filteredVideos.map((video, index) => (
                                        <tr
                                            key={video.id}
                                            className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                                        >
                                            <td className="p-4">{index + 1}</td>
                                            <td className="p-4">{video.title}</td>
                                            <td className="p-4">{video.description}</td>
                                            <td className="p-4">{video.viewCount}</td>
                                            <td className="p-4">{video.likeCount}</td>
                                            <td className="p-4 flex space-x-3">
                                                <button
                                                    className="bg-indigo-500 text-white px-3 py-1 rounded-lg shadow hover:bg-indigo-600"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteVideo(video.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => handleEditVideo(video)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">
                                            Tidak ada data video yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal for Create Video */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-2xl font-semibold mb-4">
                            {editingVideo ? 'Edit Video' : 'Buat Video Baru'}
                        </h3>
                        <form>
                            {/* Title Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Judul Video</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newVideo.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                                    placeholder="Masukkan judul"
                                />
                            </div>

                            {/* Description Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={newVideo.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                                    placeholder="Masukkan deskripsi"
                                />
                            </div>

                            {/* Video Link Inputs */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Video Link</label>
                                <input
                                    type="text"
                                    name="videoLink"
                                    value={newVideo.videoLink}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                                    placeholder="Masukkan link video"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Thumbnail Link</label>
                                <input
                                    type="text"
                                    name="thumbnailLink"
                                    value={newVideo.thumbnailLink}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300"
                                    placeholder="Masukkan link thumbnail"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                                    onClick={handleSaveVideo}
                                >
                                    {editingVideo ? 'Perbarui' : 'Simpan'}
                                </button>
                                <button
                                    type="button"
                                    className="ml-4 bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400"
                                    onClick={handleCloseModal}
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
