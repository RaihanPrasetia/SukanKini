import React from 'react';
import Home from '../Home'
import About from '../About'
import Komunitas from '../Komunitas'
import Pelatih from '../Pelatih'
import Kelas from '../Kelas'
import Membership from '../Membership'
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


            <section id="membership">
                <Membership />
            </section>
        </div>
    </div>
    );
};

export default LandingPage;
