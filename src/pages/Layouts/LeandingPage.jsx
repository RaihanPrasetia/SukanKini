import React from 'react';
import Home from '../Home'
import About from '../About'
import Komunitas from '../Komunitas'
import Pelatih from '../Pelatih'
import Kelas from '../Kelas'
import Membership from '../Membership'
import Navbar from '../../components/Navbar';


const LandingPage = () => {
    return (
        <div>
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

            <section id="kelas">
                <Kelas />
            </section>

            <section id="membership">
                <Membership />
            </section>
        </div>
    );
};

export default LandingPage;
