import React from 'react';
import Home from '../LandingPages/Home';
import About from '../LandingPages/About';
import Komunitas from '../LandingPages/Komunitas';
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

            <section id="komunitas">
                <Komunitas />
            </section>

            <section id="pelatih"> 
                <Pelatih /> 
            </section>

            <section id="clienttestimonials"> 
                <ClientTestimonials /> 
            </section>

            <footer>
                <Footer />
            </footer>
        </main>
    );
};

export default LandingPage;
