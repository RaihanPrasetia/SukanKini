import React, { useRef } from 'react';
import { FaUserCheck, FaVideo, FaClock } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Animation variants for the main content
    const fadeInRight = {
        hidden: { opacity: 0, x: 50, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1 },
        transition: { duration: 1.2, ease: 'easeOut' },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1 },
        transition: { duration: 1.2, ease: 'easeOut' },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.3, duration: 1, ease: 'easeOut' },
        }),
    };

    return (
        <div className="w-full flex flex-col-reverse lg:flex-row bg-white">
            <motion.div
                className="relative w-full lg:w-72 h-56 sm:h-80 md:h-96 lg:h-auto hidden lg:block overflow-hidden bg-green-500"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInLeft}
                ref={ref}
            >
                <img
                    src="/assets/images/left-img.png"
                    alt=""
                    className="absolute left-0 bottom-0 w-full h-full object-cover"
                />
            </motion.div>

            <motion.div
                className="p-6 sm:p-8 md:p-12 lg:p-16 bg-white flex-1"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeInRight}
            >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left text-green-700 mb-4 lg:mb-6">
                    KENAPA HARUS KAMI?
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-justify lg:text-left text-gray-700 mb-6 lg:mb-8">
                    Kami punya segala yang Anda butuhkan untuk mencapai tujuan kesehatan Anda.
                    Bergabunglah dengan komunitas yang mendukung dan nikmati program khusus yang
                    dirancang hanya untuk Anda.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Program Khusus */}
                    <motion.div className="flex items-start" variants={itemVariants} custom={0}>
                        <FaUserCheck className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-base md:text-lg font-semibold text-green-700">
                                Program Khusus
                            </h2>
                            <p className="text-sm md:text-base text-gray-700">
                                Program latihan yang disesuaikan dengan kebutuhan individu,
                                memastikan setiap anggota mendapatkan perhatian dan rencana yang sesuai.
                            </p>
                        </div>
                    </motion.div>

                    {/* Kualifikasi Pelatih */}
                    <motion.div className="flex items-start" variants={itemVariants} custom={1}>
                        <FaUserCheck className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-base md:text-lg font-semibold text-green-700">
                                Kualifikasi Pelatih
                            </h2>
                            <p className="text-sm md:text-base text-gray-700">
                                Tim pelatih kami memiliki kualifikasi tinggi dan pengalaman bertahun-tahun
                                untuk membantu Anda mencapai tujuan kebugaran Anda.
                            </p>
                        </div>
                    </motion.div>

                    {/* Video Tutorial */}
                    <motion.div className="flex items-start" variants={itemVariants} custom={2}>
                        <FaVideo className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-base md:text-lg font-semibold text-green-700">
                                Video Tutorial
                            </h2>
                            <p className="text-sm md:text-base text-gray-700">
                                Kami menyediakan video tutorial untuk membantu Anda melakukan aktivitas
                                kebugaran jasmani yang diinginkan.
                            </p>
                        </div>
                    </motion.div>

                    {/* Jam Operasional */}
                    <motion.div className="flex items-start" variants={itemVariants} custom={3}>
                        <FaClock className="text-green-600 text-2xl lg:text-3xl mr-3 lg:mr-4" />
                        <div>
                            <h2 className="text-base md:text-lg font-semibold text-green-700">
                                Jam Operasional
                            </h2>
                            <p className="text-sm md:text-base text-gray-700">
                                Kami buka dari jam 6 pagi hingga 10 malam setiap hari, sehingga Anda bisa
                                berlatih kapan saja sesuai jadwal Anda.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default About;
