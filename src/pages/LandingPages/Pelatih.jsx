import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function Pelatih() {
    const [activeCategory, setActiveCategory] = useState('Pelatih Populer');
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);

    // Use IntersectionObserver for smoother scroll detection
    useEffect(() => {
        const currentSectionRef = sectionRef.current; // Copy the ref value into a local variable
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.5 } // 50% of the element is in view before triggering
        );

        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef); // Use the copied value for cleanup
            }
        };
    }, []);


    const categories = ['Pelatih Populer', 'Cardio', 'Dance', 'Mind & Body'];
    const communityCards = [
        { id: 1, title: 'Yakkhukkhan', image: '/assets/images/pelatih/yakhhukhan.jpg' },
        { id: 2, title: 'Amy Jem', image: '/assets/images/pelatih/amyjem.jpg' },
        { id: 3, title: 'Rolland Shak', image: '/assets/images/pelatih/rolland.jpg' },
        { id: 4, title: 'Natalinne Stuart', image: '/assets/images/pelatih/natalinne.jpg' },
    ];

    return (
        <div
            className="w-full bg-slate-50 shadow-lg border-2 px-8 lg:px-20 py-16 flex flex-col items-center"
            ref={sectionRef}
        >
            {/* Header */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
                <h1 className="text-3xl lg:text-4xl font-bold text-green-600 hover:scale-105 transition-transform">
                    Pelatih yang Profesional
                </h1>
                <p className="text-gray-700 mt-4">
                    Di sini kami menyediakan pelatih berpengalaman dan berkualifikasi. Pilih pelatih sesuai kelas yang Anda ikuti.
                </p>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
                className="grid grid-cols-2 gap-4 mb-8 md:flex md:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`text-lg font-semibold px-4 py-2 border rounded-xl transition-all duration-300 ${activeCategory === category
                            ? 'text-white bg-green-500 border-green-500 hover:bg-white hover:text-green-500 transform hover:scale-105'
                            : 'text-green-500 border-green-500 hover:bg-green-500 hover:text-white transform hover:scale-105'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </motion.div>

            {/* Community Cards */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                            staggerChildren: 0.15,  // Reduced stagger for smoother timing
                            duration: 0.6,
                            ease: 'easeInOut',  // Smooth easing for all children
                        },
                    },
                }}
            >
                {communityCards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        className="relative group overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:scale-105"
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                        transition={{
                            delay: index * 0.15,  // Reduced delay for smoother entry
                            duration: 0.6,  // Longer duration for smoother effect
                        }}
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-60 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-0"></div>
                        <motion.p
                            className="absolute bottom-4 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            {card.title}
                        </motion.p>
                    </motion.div>
                ))}
            </motion.div>

            {/* View All Trainers Button */}
            <motion.button
                className="mt-8 px-6 py-2 bg-green-600 text-lg font-semibold text-white rounded-xl hover:bg-white hover:text-green-600 border border-green-600 transition duration-300 transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                Lihat Semua Pelatih
            </motion.button>
        </div>
    );
}

export default Pelatih;
