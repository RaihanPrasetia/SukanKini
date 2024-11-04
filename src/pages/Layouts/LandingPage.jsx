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
import Space from '../../components/assets/Space';
import Membership from '../LandingPages/Membership';

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

<<<<<<< HEAD
            <section id="membership">
=======
            <section id="promosi">
>>>>>>> bd731ba6fad3963c4ee7f1c1cd54a48531675ef6
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
        </>
    );
};

export default LandingPage;
