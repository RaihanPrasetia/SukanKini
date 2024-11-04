import React from 'react';
import Home from '../LandingPages/Home';
import About from '../LandingPages/About';
import Komunitas from '../LandingPages/Komunitas';
import Membership from '../LandingPages/Membership'; 
import Kelas from '../LandingPages/Kelas';
import Pelatih from '../LandingPages/Pelatih';
import ClientTestimonials from '../LandingPages/ClientTestimonials';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Space from '../../components/Space';

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
                <Space />
                <About />
            </section>

            <section id="membership">
                <Space />
                <Membership /> 
            </section>

            <section id="komunitas">
                <Space />
                <Komunitas />
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
        </main>
    );
};

export default LandingPage;
