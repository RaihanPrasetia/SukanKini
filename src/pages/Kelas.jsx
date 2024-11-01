import React from "react";

const Kelas = () => {
  const communityData = [
    {
      id: 1,
      title: 'Yoga & Flexibilitas',
      image: 'https://cdn.shopify.com/s/files/1/0259/3665/8531/files/04-Blog-Eye-of-the-needle.jpg',
    },
    {
      id: 2,
      title: 'Pembentukan Otot',
      image: 'https://d324bm9stwnv8c.cloudfront.net/article/20180919193248.2961461548584.png',
    },
    {
      id: 3,
      title: 'Cardio',
      image: 'https://www.puregym.com/media/3f1pvvjw/the-best-gym-cardio-workouts_blogheader-notitle.jpg?quality=80',
    },
    {
      id: 4,
      title: 'Zumba',
      image: 'https://www.verywellfit.com/thmb/WtaRzGOCbJdVYFlWr_7VOfwn_Ow=/3000x2002/filters:no_upscale():max_bytes(150000):strip_icc()/zumba-fatcamera-c9d4ee824a0f4fda883484f878abc8ae.jpg',
    },
    {
      id: 5,
      title: 'Relaksasi',
      image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1599532937/attached_image/relaksasi-sederhana-di-rumah-bisa-mengusir-stres.jpg',
    },
    {
      id: 6,
      title: 'Dance',
      image: 'https://markmorrisdancegroup.org/wp-content/uploads/2023/11/MicrosoftTeams-image-14-scaled.jpg',
    },
  ];

  return (

    <div className=" flex flex-col justify-center items-center px-36 space-y-10 w-full">
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center text-green-700">
          Ikuti 40+ variasi kelas sepuasnya
        </h2>
        <p className="text-center text-gray-600 ">
          Dibimbing oleh instruktur berpengalaman dan bersertifikasi internasional.
        </p>
      </div>


      <div className="flex justify-start gap-4 items-start w-full">
        {['Cardio', 'Dance', 'Mind & Body', 'Strength'].map((category) => (
          <button key={category}
            className="px-4 py-2 border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white transition">
            {category}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {communityData.map((community) => (
          <div key={community.id} className="relative w-full">
            <img
              src={community.image}
              alt={community.title}
              className="w-full h-80 object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-50 rounded-md transition-opacity duration-300 hover:opacity-0"></div>
            <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              {community.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
          Lihat Semua Kelas
        </button>
      </div>

    </div>
  );
};

export default Kelas;
