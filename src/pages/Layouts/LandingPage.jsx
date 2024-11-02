import React from 'react';
import Home from '../Home';
import About from '../About';
import Komunitas from '../Komunitas';
import Pelatih from '../Pelatih';
import ClientTestimonials from '../ClientTestimonials'; 
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
            <section id="ClientTestimonials"> 
                <ClientTestimonials /> 
            </section>
            <footer>
                <Footer />
            </footer>
        </main>
    );
};

export default LandingPage;
