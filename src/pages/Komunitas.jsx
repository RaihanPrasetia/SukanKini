import React from 'react';

function Komunitas() {
return (
<div className="w-full h-screen p-8 bg-white rounded-lg shadow-lg">
    {/* Header Section */}
    <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-yellow-600">Temukan Komunitas yang Anda Minati</h1>
        <p className="text-gray-700 mt-4">
            Mulailah Berinteraksi Bersama Komunitas Yang Sesuai Dengan Diri Anda! Dan Ciptakan Pengalaman Seru Anda
            Dalam Perjalanan
            Melakukan Aktivitas Produktif!
        </p>
        <button className="mt-6 px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
            Lihat Semua Komunitas
        </button>
    </div>

    {/* Popular Communities Section */}
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800">Pilihan Komunitas Terpopuler Saat Ini</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {/* Replace with images of popular communities */}
            <div className="relative">
                <img src="https://miniletics.com/cdn/shop/articles/hormon-memengaruhi-pembentukan-otot-0.jpg?v=1657253255"
                    alt="Pembentukan Otot" className="w-full h-48 object-cover rounded-md" />
                <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Komunitas Pembentukan Otot</p>
            </div>
            <div className="relative">
                <img src="https://prod-swara.storage.googleapis.com/wp-content/uploads/2018/04/19224124/olahraga-lari.jpg"
                    alt="Relaksasi" className="w-full h-48 object-cover rounded-md" />
                <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Komunitas Relaksasi</p>
            </div>
            {/* Add more images as needed */}
        </div>
    </div>

    {/* Category Tabs */}
    <div className="mb-10">
        <h2 className="text-xl font-semibold text-green-600">Kategori Komunitas</h2>
        <div className="flex flex-wrap mt-4">
            {['Pembentukan Otot', 'Atletik', 'Cardio', 'Yoga & Flexibilitas', 'Relaksasi'].map((category) => (
            <button key={category}
                className="mr-4 mb-4 px-4 py-2 border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white transition">
                {category}
            </button>
            ))}
        </div>
    </div>

    {/* Community Cards Section */}
    <div>
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            Ikuti 40+ variasi kelas sepuasnya
        </h2>
        <p className="text-center text-gray-600 mb-8">
            Dibimbing oleh instruktur berpengalaman dan bersertifikasi internasional.
        </p>

        <div className="flex flex-wrap justify-start gap-4 mb-8">
            {['Cardio', 'Dance', 'Mind & Body', 'Strength'].map((category) => (
            <button key={category}
                className="px-4 py-2 border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white transition">
                {category}
            </button>
            ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* Example Community Card */}
            <div className="relative">
                <img src="https://cdn.shopify.com/s/files/1/0259/3665/8531/files/04-Blog-Eye-of-the-needle.jpg"
                    alt="Yoga & Flexibilitas" className="w-full h-48 object-cover rounded-md" />
                <div
                    className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0">
                </div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Yoga & Flexibilitas</p>
            </div>
            <div className="relative">
                <img src="https://d324bm9stwnv8c.cloudfront.net/article/20180919193248.2961461548584.png"
                    alt="Pembentukan Otot" className="w-full h-48 object-cover rounded-md" />
                <div
                    className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0">
                </div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Pembentukan Otot</p>
            </div>
            <div className="relative">
                <img src="https://www.puregym.com/media/3f1pvvjw/the-best-gym-cardio-workouts_blogheader-notitle.jpg?quality=80"
                    alt="Cardio" className="w-full h-48 object-cover rounded-md" />
                <div
                    className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0">
                </div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Cardio</p>
            </div>
            <div className="relative">
                <img src="https://www.verywellfit.com/thmb/WtaRzGOCbJdVYFlWr_7VOfwn_Ow=/3000x2002/filters:no_upscale():max_bytes(150000):strip_icc()/zumba-fatcamera-c9d4ee824a0f4fda883484f878abc8ae.jpg"
                    alt="Zumba" className="w-full h-48 object-cover rounded-md" />
                <div
                    className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0">
                </div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Zumba</p>
            </div>
            <div className="relative">
                <img src="https://res.cloudinary.com/dk0z4ums3/image/upload/v1599532937/attached_image/relaksasi-sederhana-di-rumah-bisa-mengusir-stres.jpg"
                    alt="Relaksasi" className="w-full h-48 object-cover rounded-md" />
                <div
                    className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0">
                </div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Relaksasi</p>
            </div>
            <div className="relative">
                <img src="https://markmorrisdancegroup.org/wp-content/uploads/2023/11/MicrosoftTeams-image-14-scaled.jpg"
                    alt="Dance" className="w-full h-48 object-cover rounded-md" />
                <div
                    className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0">
                </div>
                <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Dance</p>
            </div>
        </div>

        <div className="flex justify-center mt-6 gap-4">
            <button className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                Lihat Semua Kelas
            </button>
        </div>

    </div>
</div>
);
}

export default Komunitas;