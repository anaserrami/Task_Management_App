import React from 'react';
import Navbar from './NavBar';
import aboutPhoto from '../assets/about-photo.png';

function About({ user }) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar user={user} />
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
                <p className="text-gray-600 text-lg text-center">
                    We are dedicated to providing our users with the best task management experience. Our platform allows users to effectively track and manage their tasks and projects, enhancing productivity and efficiency.
                </p>
                <p className="mt-4 text-gray-600 text-lg text-center">
                    Our team is made up of passionate professionals who are committed to delivering quality and innovation. We believe in the power of technology to transform daily operations and help individuals and teams achieve their goals.
                </p>
                <div className="mt-8 flex justify-center items-center w-80 h-80">
                    <img src={aboutPhoto} alt="Our Team" className="rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default About;
