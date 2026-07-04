import Navbar from '@/components/Navbar';
import Hero from '@/components/Homepage/Hero';
import Features from '@/components/Homepage/Features';
import Footer from '@/components/Footer';
import MissionVision from '@/components/Homepage/Mission';
import WhySylvenOS from '@/components/Homepage/Why';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MissionVision/>
        <WhySylvenOS/>
      </main>
      <Footer />
    </>
  );
}