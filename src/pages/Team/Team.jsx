import React from 'react';
import CardTeam from '../../components/Card/CardTeam';
import AuthFooter from '../../components/AuthFooter';

const Team = () => {
    // Array data anggota tim
    const teamMembers = [
        {
            name: 'Raihan Prasetia',
            age: 22,
            university: 'Universitas Dinamika Bangsa',
            job: 'Freelance',
            city: 'Jambi',
            motto: 'Selalu Semangat!',
            socialLinks: {
                whatsapp: 'https://wa.me/6285788332343',
                twitter: 'https://twitter.com/username',
                facebook: 'https://facebook.com/username',
                instagram: 'https://instagram.com/username',
                linkedin: 'https://linkedin.com/in/username',
            },
        },
        {
            name: 'Dewi Lestari',
            age: 25,
            university: 'Universitas Indonesia',
            job: 'Frontend Developer',
            city: 'Jakarta',
            motto: 'Belajar tanpa henti.',
            socialLinks: {
                instagram: 'https://instagram.com/dewilestari',
                linkedin: 'https://linkedin.com/in/dewilestari',
            },
        },

    ];
    const teamMembers2 = [
        {
            name: 'Raihan Prasetia',
            age: 22,
            university: 'Universitas Dinamika Bangsa',
            job: 'Freelance',
            city: 'Jambi',
            motto: 'Selalu Semangat!',
            socialLinks: {
                whatsapp: 'https://wa.me/123456789',
                twitter: 'https://twitter.com/username',
                facebook: 'https://facebook.com/username',
                instagram: 'https://instagram.com/username',
                linkedin: 'https://linkedin.com/in/username',
            },
        },
        {
            name: 'Dewi Lestari',
            age: 25,
            university: 'Universitas Indonesia',
            job: 'Frontend Developer',
            city: 'Jakarta',
            motto: 'Belajar tanpa henti.',
            socialLinks: {
                instagram: 'https://instagram.com/dewilestari',
                linkedin: 'https://linkedin.com/in/dewilestari',
            },
        },
        {
            name: 'Andi Pratama',
            age: 28,
            university: 'Institut Teknologi Bandung',
            job: 'Backend Engineer',
            city: 'Bandung',
            motto: 'Code. Sleep. Repeat.',
            socialLinks: {
                twitter: 'https://twitter.com/andipratama',
                linkedin: 'https://linkedin.com/in/andipratama',
            },
        },
    ];

    return (
        <>
            <div className="w-full min-h-screen relative flex flex-col py-10 justify-start items-center lg:p-10">
                <div className="flex flex-col justify-center items-center lg:absolute lg:top-28 top-0 relative">
                    <h1 className="font-semibold text-[40px] text-black z-10 ">Tim Kami</h1>
                    <div className="w-[80px] h-[80px] rounded-full z-10 border-4 border-white overflow-hidden shadow-md">
                        <img src="/default_profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h1 className='text-black text-lg font-semibold'>PM</h1>
                    <div className="border-t-4 border-l-4 border-r-4 border-black h-4 lg:w-[290px] w-[200px]"></div>
                    <div className='flex justify-between items-center lg:w-[450px] w-[370px]'>
                        <div className='flex lg:flex gap-2'>
                            <div className="w-[80px] h-[80px] rounded-full z-10 border-4 border-white overflow-hidden shadow-md">
                                <img src="/default_profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[80px] h-[80px] rounded-full z-10 border-4 border-white overflow-hidden shadow-md">
                                <img src="/default_profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className='flex  lg:flex gap-2'>
                            <div className="w-[80px] h-[80px] rounded-full z-10 border-4 border-white overflow-hidden shadow-md">
                                <img src="/default_profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="w-[80px] h-[80px] rounded-full z-10 border-4 border-white overflow-hidden shadow-md">
                                <img src="/default_profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center lg:w-[350px] w-full px-12 lg:px-0'>
                        <h1 className='text-black text-lg font-semibold'>Hipster</h1>
                        <h1 className='text-black text-lg font-semibold'>Coder</h1>
                    </div>
                </div>
                <div className="absolute lg:block hidden top-0 left-0 w-[60px] h-[390px] bg-gradient-to-b from-green-500 to-green-300 "></div>
                <div className="absolute lg:block hidden bottom-0 right-0 w-[60px] h-[390px] bg-gradient-to-b from-green-500 to-green-400 "></div>
                <div className="absolute lg:block hidden top-0 right-20 h-[60px] w-[390px] bg-gradient-to-l from-green-300 to-green-500 "></div>
                <div className="absolute lg:block hidden top-0 left-20 h-[60px] w-[390px] bg-gradient-to-r from-green-300 to-green-500 "></div>
                <div className='flex justify-center gap-9 items-center w-full mt-10 lg:px-20 px-5'>
                    <div className='flex flex-col space-y-8 w-full'>
                        <div className="flex flex-wrap gap-6 justify-between ">
                            {teamMembers.map((member, index) => (
                                <CardTeam
                                    key={index}
                                    name={member.name}
                                    age={member.age}
                                    university={member.university}
                                    job={member.job}
                                    city={member.city}
                                    motto={member.motto}
                                    socialLinks={member.socialLinks}
                                />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-6 justify-between ">
                            {teamMembers2.map((member, index) => (
                                <CardTeam
                                    key={index}
                                    name={member.name}
                                    age={member.age}
                                    university={member.university}
                                    job={member.job}
                                    city={member.city}
                                    motto={member.motto}
                                    socialLinks={member.socialLinks}
                                />
                            ))}
                        </div>
                    </div>
                    {/* <div className='w-[400px] h-full p-6 text-justify bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-medium text-[20px] rounded-lg'>
                        <p>    Dibalik terbentuknya website ini, diantara kami berlima hanya dua orang yang berasal dari kota dan perguruan tinggi yang berbeda. Yaitu Hipster kami yang akrab di panggil Riska dan Coder kami yang akrab di panggil Tegar. Sementara tiga lainnya berasal dari satu kota dan universitas yang sama.
                            Awal merancang hingga terbentuknya website ini dipenuhi banyak pengalaman yang dimana tidak semua berjalan lancar. Banyak kendala-kendala serta suka dan duka yang ikut mewarnai perjalanan kami hingga bisa menjadi seperti sekarang.
                            Harapan kami semoga kedepannya website ini dapat berguna untuk banyak pengguna dan dapat memotivasi orang-orang yang ingin berkreasi</p>
                    </div> */}
                </div>
            </div>
            <AuthFooter />
        </>
    );
};

export default Team;
