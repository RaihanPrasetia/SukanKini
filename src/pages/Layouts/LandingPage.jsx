import React from 'react';
import Home from '../LeandingPages/Home'
import About from '../LeandingPages/About'
import Komunitas from '../LeandingPages/Komunitas'
import Pelatih from '../LeandingPages/Pelatih'
import Kelas from '../LeandingPages/Kelas'
import Navbar from '../../components/Navbar';


const LandingPage = () => {
    return (<div className="w-full">
        <Navbar />
        <div className="flex flex-col space-y-12 -z-50 ">

            <section id="home">
                <Home />
            </section>

            <section id="about">
                <About />
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
        </div>
    </div>
    );
};

export default LandingPage;
