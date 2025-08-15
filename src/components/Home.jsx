import React from 'react'
import Navbar from './Navbar';
import Hero from './Hero';
import HeadlineCards from './HeadlineCards';
import About from './About';
import Categories from './Categories';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
        
    <Navbar />
      <Hero />
      <HeadlineCards />
      <About />
      
      <Categories />
      <Footer />

    </div>
  )
}

export default Home