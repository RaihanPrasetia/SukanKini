import React from "react";

const Kelas = () => {
  // const classes = [
  //   {
  //     title: "CARDIO",
  //     image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1487919849/jx7xw9n1jzejqp50nwir.jpg",
  //     location: "Raffles Hotel Jakarta",
  //     address: "Ciputra World 1, Jl. Prof. DR. Satrio No.5, Jakarta, Daerah Khusus Ibukota Jakarta 12940",
  //     hours: "06.00 - 22.00 WIB",
  //     price: "Mulai 200.000-an",
  //   },
  //   {
  //     title: "PEMBENTUKKAN OTOT",
  //     image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/73/94/e2/abadi-suite-hotel-and.jpg?w=700&h=-1&s=1",
  //     location: "Abadi suite Jambi",
  //     address: "Jalan Telanai pura, no 123 Lt.3",
  //     hours: "06.00 - 22.00 WIB",
  //     price: "Mulai 200.000-an",
  //   },
  //   {
  //     title: "Relaksasi",
  //     image: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/250/2024/09/27/jktbt-facade-copy-1950118200.jpg",
  //     location: "Jaya Vi Hotel Tanggerang",
  //     address: "Jalan Sari Putra School, Lr.sampean Lt.4",
  //     hours: "06.00 - 22.00 WIB",
  //     price: "Mulai 200.000-an",
  //   },
  //   {
  //     title: "Zumba",
  //     image: "https://cdn.1001malam.com/uploads/hotels/dhyanapurahotel_interior_1071227.jpg",
  //     location: "Pura Hotel Bali",
  //     address: "Jalan Denpasar, Lrg Seminyak LT.4",
  //     hours: "06.00 - 22.00 WIB",
  //     price: "Mulai 200.000-an",
  //   },
  //   {
  //     title: "Dance",
  //     image: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67799767-357d253eec474de5bf23a834745306fe.jpeg?_src=imagekit&tr=c-at_max,f-jpg,fo-auto,h-500,pr-true,q-80,w-740",
  //     location: "Buana Hotel Jogja",
  //     address: "Lrg Seger Mayu LT.4",
  //     hours: "06.00 - 22.00 WIB",
  //     price: "Mulai 200.000-an",
  //   },
  //   {
  //     title: "Yoga",
  //     image: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-dskt/tix-hotel/images-web/2020/11/05/79eba043-b68b-430f-b79e-d35495a7750f-1604521901546-e96465e1583bd7c250602bd3c31bc2e1.jpg",
  //     location: "Amaya Hotel Bandung",
  //     address: "Lrg Cibaduyu,Purwolinggo LT.4",
  //     hours: "06.00 - 22.00 WIB",
  //     price: "Mulai 200.000-an",
  //   },
  // ];

  return (

    <div className=" flex flex-col justify-center items-center space-y-10 px-10 ">
      <div>
        <h2 className="text-2xl font-bold text-center text-green-700">
          Ikuti 40+ variasi kelas sepuasnya
        </h2>
        <p className="text-center text-gray-600 ">
          Dibimbing oleh instruktur berpengalaman dan bersertifikasi internasional.
        </p>
      </div>


      <div className="flex flex-wrap justify-start gap-4 items-start w-full ">
        {['Cardio', 'Dance', 'Mind & Body', 'Strength'].map((category) => (
          <button key={category}
            className="px-4 py-2 border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white transition">
            {category}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
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
  );
};

export default Kelas;
