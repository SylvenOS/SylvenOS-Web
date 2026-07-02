import Navbar from '@/components/Navbar';
import Hero from '@/components/Homepage/Hero';
import Features from '@/components/Homepage/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}