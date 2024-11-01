import React from "react";

const Kelas = () => {
  const classes = [
    {
      title: "CARDIO",
      image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1487919849/jx7xw9n1jzejqp50nwir.jpg",
      location: "Raffles Hotel Jakarta",
      address: "Ciputra World 1, Jl. Prof. DR. Satrio No.5, Jakarta, Daerah Khusus Ibukota Jakarta 12940",
      hours: "06.00 - 22.00 WIB",
      price: "Mulai 200.000-an",
    },
    {
      title: "PEMBENTUKKAN OTOT",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/73/94/e2/abadi-suite-hotel-and.jpg?w=700&h=-1&s=1",
      location: "Abadi suite Jambi",
      address: "Jalan Telanai pura, no 123 Lt.3",
      hours: "06.00 - 22.00 WIB",
      price: "Mulai 200.000-an",
    },
    {
      title: "Relaksasi",
      image: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/250/2024/09/27/jktbt-facade-copy-1950118200.jpg",
      location: "Jaya Vi Hotel Tanggerang",
      address: "Jalan Sari Putra School, Lr.sampean Lt.4",
      hours: "06.00 - 22.00 WIB",
      price: "Mulai 200.000-an",
    },
    {
        title: "Zumba",
        image: "https://cdn.1001malam.com/uploads/hotels/dhyanapurahotel_interior_1071227.jpg",
        location: "Pura Hotel Bali",
        address: "Jalan Denpasar, Lrg Seminyak LT.4",
        hours: "06.00 - 22.00 WIB",
        price: "Mulai 200.000-an",
      },
      {
        title: "Dance",
        image: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67799767-357d253eec474de5bf23a834745306fe.jpeg?_src=imagekit&tr=c-at_max,f-jpg,fo-auto,h-500,pr-true,q-80,w-740",
        location: "Buana Hotel Jogja",
        address: "Lrg Seger Mayu LT.4",
        hours: "06.00 - 22.00 WIB",
        price: "Mulai 200.000-an",
      },
      {
        title: "Yoga",
        image: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-dskt/tix-hotel/images-web/2020/11/05/79eba043-b68b-430f-b79e-d35495a7750f-1604521901546-e96465e1583bd7c250602bd3c31bc2e1.jpg",
        location: "Amaya Hotel Bandung",
        address: "Lrg Cibaduyu,Purwolinggo LT.4",
        hours: "06.00 - 22.00 WIB",
        price: "Mulai 200.000-an",
      },
  ];

  return (
    <div className="p-6 font-sans text-center">
      <h1 className="text-3xl font-bold text-teal-500 mb-8">DAFTAR KELAS PELATIHAN</h1>
      {classes.map((trainingClass, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-800 text-white rounded-lg p-5 mb-6 shadow-md"
        >
          <div className="relative flex-none w-40 mr-5">
            <img
              src={trainingClass.image}
              alt={trainingClass.title}
              className="w-full h-28 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-bold opacity-0 hover:opacity-100 rounded-lg transition-opacity duration-300">
              {trainingClass.title}
            </div>
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg font-semibold">{trainingClass.location}</h3>
            <p className="text-sm text-gray-300">{trainingClass.address}</p>
            <p className="text-sm text-gray-300">Jam Operasi: {trainingClass.hours}</p>
            <p className="text-sm text-gray-300">Harga: {trainingClass.price}</p>
            <div className="mt-3">
              <button className="px-4 py-2 bg-white text-gray-800 font-bold rounded-md mr-3 hover:bg-gray-200">
                Lihat Kelas
              </button>
              <button className="px-4 py-2 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600">
                Daftar Kelas
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kelas;
