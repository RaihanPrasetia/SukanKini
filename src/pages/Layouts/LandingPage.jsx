import React from 'react';
import Home from '../LeandingPages/Home';
import About from '../LeandingPages/About';
import Komunitas from '../LeandingPages/Komunitas';
import Kelas from '../LeandingPages/Kelas';
import Pelatih from '../LeandingPages/Pelatih';
import Navbar from '../../components/Navbar';
import ClientTestimonials from '../ClientTestimonials'
import Footer from '../../components/Footer'
import Promosi from '../LeandingPages/Promosi';

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
            <footer>
                <Footer />
            </footer>
        </main>
    );
};

export default LandingPage;
