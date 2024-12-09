import React from 'react';
import Home from '../LandingPages/Home';
import About from '../LandingPages/About';
import Kelas from '../LandingPages/Kelas';
import Pelatih from '../LandingPages/Pelatih';
import ClientTestimonials from '../LandingPages/ClientTestimonials';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';
import Space from '../../components/assets/Space';
import Promosi from '../LandingPages/Promosi';

const LandingPage = () => {
    return (
        <>

            <Navbar />

            <section id="home">
                <Home />
            </section>


            <section id="about">
                <Space />
                <About />
            </section>

            <section id="promosi">
                <Space />
                <Promosi />
            </section>

            <section id="kelas">
                <Space />
                <Kelas />
            </section>

            <section id="pelatih">
                <Space />
                <Pelatih />
            </section>

            <section id="client">
                <Space />
                <ClientTestimonials />
            </section>

            <footer id="footer">
                <Footer />
            </footer>
        </>
    );
};

export default LandingPage;
