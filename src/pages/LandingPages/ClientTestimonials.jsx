import React from 'react';

const testimonials = [
  {
    name: 'M. Irzaq Baihaqi',
    role: 'Member Kelas Gym',
    feedback: '“Setiap sesi latihan selalu menyenangkan dan menantang! Saya merasa lebih bertenaga dan siap menghadapi aktivitas sehari-hari.”',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXJ8ZW58MHx8MHx8fDA%3D'
  },
  {
    name: 'Caryn Alesha',
    role: 'Member Kelas Yoga',
    feedback: '“Latihan di sini bukan hanya tentang kebugaran, tetapi juga tentang membangun komunitas. Saya merasa didukung dan termotivasi oleh teman-teman baru.”',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww'
  },
  {
    name: 'Juan Immanuel',
    role: 'Member Kelas Gym',
    feedback: '“Pelatih di sini sangat profesional dan siap membantu. Mereka memberikan tips yang bermanfaat dan membuat setiap sesi latihan menjadi menyenangkan!”',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1520223297779-95bbd1ea79b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww'
  }
];

const ClientTestimonials = () => {
  return (
    <section className="bg-gray-100 py-16 px-8 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-600">PENDAPAT KLIEN</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Layanan yang kami terima sangat memuaskan, dengan pelatih yang selalu siap membantu dan memberikan motivasi.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-8 text-center transition-transform transform hover:scale-105"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold text-xl text-gray-800">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm">{testimonial.role}</p>
            <p className="text-gray-700 mt-4 italic">{testimonial.feedback}</p>
            <div className="flex justify-center mt-4 text-yellow-500">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i}>&#9733;</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientTestimonials;
