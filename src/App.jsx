import RobotModel from './components/RobotModel';
import SectionSkills from './components/SectionSkill';
import SectionProjects from './components/SectionProjects';
import { useEffect } from 'react';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  // const techStack = ['React', 'Three.js', 'Node.js', 'Laravel', 'Tailwind CSS'];

  return (
    <div className='relative font-orbitron bg-[#fcfcfc] overflow-hidden'>
      <div className='fixed top-0'>
        <RobotModel />
      </div>
      <section
        id='welcome'
        className='relative inset-0 z-10 flex flex-col items-center justify-center text-center h-screen'
      >
        <div className='relative'>
          {/* Teks utama dengan efek shadow yang halus */}
          <h1
            className='text-6xl md:text-8xl font-bold mb-4 text-[#373737]
            drop-shadow-lg'
          >
            {'<'} Johan Adi Wimbanu {'/>'}
          </h1>

          <p className='text-2xl md:text-3xl text-[#373737] font-inter mb-4'>
            Web Developer | Crafting Digital Experiences
          </p>
          <p className='text-gray-600'>
            Transforming Ideas into Digital Reality
          </p>
        </div>
      </section>

      <SectionSkills />
      <SectionProjects />
    </div>
  );
}

export default App;
