import React, { useEffect, useState } from "react";
import { getUserProfile, editUserProfile } from "../../controllers/userController";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";



const ProfileMitra = () => {
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
        const token = localStorage.getItem("token");
        const userData = await getUserProfile(token);
        setUser(userData);
        // Set initial values for the form
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
    alert("Are you sure you want to delete your account?");
  };

  return (
    <div className="w-full min-h-screen justify-center flex flex-col md:flex-row py-6 space-y-7 md:space-y-0 md:space-x-4 pt-24">
      <div className="flex flex-col space-y-4 w-full md:w-3/4 lg:w-4/5">
        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src={user.image_path ? `/images/profile/${user.image_path}` : "https://via.placeholder.com/150"}
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
          <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 md:p-10 transition-all duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">Detail Profile</h3>
            <button
              onClick={handleEditProfile}
              className={`px-5 py-2 text-white rounded-md text-[16px] font-semibold ${isEditing ? 'bg-red-500' : 'bg-yellow-500'} hover:opacity-80 transition`}
            >
              {isEditing ? "Batal Edit" : "Edit"}
            </button>
          </div>
        
          {/* Profile Image */}
          <div className="flex items-center justify-center my-6">
            <div className="relative">
              <img
                src={isEditing && imagePreview ? imagePreview : `/images/profile/${user.image_path}`} 
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-105"
              />
              {isEditing && (
                <button
                  onClick={() => document.getElementById("fileInput").click()}
                  className="absolute bottom-0 right-0 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-400 transition duration-200"
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
        
          {/* Profile Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-lg text-gray-700">Full Name*</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              />
            </div>
            <div>
              <label className="text-lg text-gray-700">Email Address*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              />
            </div>
            <div>
              <label className="text-lg text-gray-700">Nomor Handphone*</label>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              />
            </div>
            <div>
              <label className="text-lg text-gray-700">Alamat*</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              />
            </div>
            <div>
              <label className="text-lg text-gray-700">Umur</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              />
            </div>
            <div>
              <label className="text-lg text-gray-700">Jenis Kelamin*</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              >
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="text-lg text-gray-700">Tinggi Badan (cm)</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              />
            </div>
            <div>
              <label className="text-lg text-gray-700">Berat Badan (kg)</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300`}
              />
            </div>
          </div>
        
          {/* Update Button */}
          {isEditing && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleUpdateAccount}
                className="bg-green-500 text-white px-6 py-3 text-[16px] font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
              >
                Perbaharui
              </button>
            </div>
          )}
        </div>        
        )}

        {/* Outlet for additional routes */}
      </div>
    </div>
  );
};

export default ProfileMitra;
