import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/Navbar/Sidebar';
import { getUserProfile, editUserProfile } from "../../../controllers/userController";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [kota, setKota] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const userData = await getUserProfile();
        setUser(userData);
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPhone(userData.phone_number || "");
        setAlamat(userData.alamat || "");
        setAge(userData.age || "");
        setGender(userData.gender || "");
        setKota(userData.kota || "");
        setWeight(userData.weight || "");
        setHeight(userData.height || "");
        setImagePreview(userData.image_path || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) return <p>Loading...</p>;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Menyimpan gambar yang dipilih dalam state
      setImagePreview(URL.createObjectURL(file)); // Menampilkan pratinjau gambar
    }
  };

  const handleUpdateAccount = async () => {
    const confirmUpdate = await Swal.fire({
      title: "Konfirmasi Pembaruan",
      text: "Apakah Anda yakin ingin memperbaharui informasi akun?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, perbaharui!",
      cancelButtonText: "Batal",
    });
    if (confirmUpdate.isConfirmed) {
      try {
        const userId = user.id;

        const updatedUser = await editUserProfile(userId, image, name, age, weight, height, phone_number, gender, kota, alamat);
        setUser(updatedUser);

        await Swal.fire({
          title: "Berhasil!",
          text: "Akun Anda berhasil diperbaharui.",
          icon: "success",
          confirmButtonText: "Oke",
        });

        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update account:", error);

        await Swal.fire({
          title: "Gagal!",
          text: "Pembaruan akun gagal. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "Oke",
        });
      }
    }
  };




  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion initiated");
    alert("Are you sure you want to delete your account?");
  };

  return (
    <div className="w-full flex flex-col md:flex-row min-h-[100vh] py-6 space-y-7 md:space-y-0 md:space-x-4 px-6 pt-20">
      <Sidebar className="w-full md:w-1/4 lg:w-1/5" />
      <div className="flex flex-col space-y-4 w-full md:w-3/4 lg:w-4/5">
        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src={user.image_path ? `/images/profile/${user.image_path}` : "/default_profile.jpg"}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-500"
              />

              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{name}</h2>
                <p className="text-gray-600">{kota}, Indonesia</p>
                <div className="flex flex-col sm:flex-row sm:space-x-2 mt-2">
                  <button
                    onClick={handleToggleDetails}
                    className={`px-4 py-1 text-white rounded-lg text-[16px] font-semibold ${showDetails ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  >
                    {showDetails ? "Tutup Detail" : "Detail Profile"}
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-500 text-white text-[16px] font-semibold px-4 py-1 mt-2 sm:mt-0 rounded-lg"
                  >
                    Hapus Akun
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-1/3 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full sm:flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSearch}
                className="bg-green-500 text-white px-4 py-2 text-[16px] font-semibold rounded-md"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Detail Profile Section */}
        {showDetails && (
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Detail Profile</h3>
              <button
                onClick={handleEditProfile}
                className={`px-4 py-2 text-white rounded-md text-[16px] font-semibold ${isEditing ? 'bg-red-600' : 'bg-yellow-600'}`}
              >
                {isEditing ? "Batal Edit" : "Edit"}
              </button>
            </div>

            <div className="flex justify-center items-center mb-6">
              <div className="relative">
                <img
                  src={isEditing && imagePreview ? imagePreview : user.image_path ? `/images/profile/${user.image_path}` : `/default_profile.jpg`}
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-yellow-600 shadow-lg"
                />
                {isEditing && (
                  <button
                    onClick={() => document.getElementById("fileInput").click()}
                    className="absolute bottom-0 right-0 bg-yellow-600 text-white p-2 rounded-full"
                  >
                    <FaPencilAlt />
                  </button>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">Full Name*</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">Email Address*</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="phone_number" className="block text-gray-700 font-medium">Nomor Handphone*</label>
                <input
                  id="phone_number"
                  type="text"
                  value={phone_number}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="alamat" className="block text-gray-700 font-medium">Alamat*</label>
                <input
                  id="alamat"
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-gray-700 font-medium">Umur</label>
                <input
                  id="age"
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-gray-700 font-medium">Jenis Kelamin*</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label htmlFor="height" className="block text-gray-700 font-medium">Tinggi Badan (cm)</label>
                <input
                  id="height"
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-gray-700 font-medium">Berat Badan (kg)</label>
                <input
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleUpdateAccount}
                  className="bg-green-600 text-white px-6 py-2 text-[16px] font-semibold rounded-lg"
                >
                  Perbaharui
                </button>
              </div>
            )}
          </div>

        )}


        {/* Outlet for additional routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
