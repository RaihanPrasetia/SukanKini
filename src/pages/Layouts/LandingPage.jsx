import React from 'react';
import Home from '../LandingPages/Home';
import About from '../LandingPages/About';
import Komunitas from '../LandingPages/Komunitas';
import Promosi from '../LandingPages/Promosi';
import Kelas from '../LandingPages/Kelas';
import Pelatih from '../LandingPages/Pelatih';
import ClientTestimonials from '../LandingPages/ClientTestimonials';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const LandingPage = () => {
    return (
        <main>
            <header>
                <Navbar />
            </header>

            <section id="home">
                <Home />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="promosi">
                <Promosi />
            </section>

            <section id="komunitas">
                <Komunitas />
            </section>

            <section id="kelas">
                <Kelas />
            </section>

            <section id="pelatih">
                <Pelatih />
            </section>

            <section id="client">
                <ClientTestimonials />
            </section>

            <footer id="footer">
                <Footer />
            </footer>
        </main>
    );
};

export default LandingPage;