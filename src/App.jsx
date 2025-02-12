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

      <section
        id='contact'
        className='bg-[#f2f2f2] h-screen flex flex-col justify-center text-center'
      >
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-6xl font-bold text-[#373737] mb-6'>
            Get in Touch
          </h2>
          <p className='text-lg text-gray-600 mb-8'>
            Let&apos;s connect! Feel free to reach out via email or follow me on
            social media.
          </p>

          {/* Email & Phone */}
          <div className='mb-6'>
            <p className='text-xl font-medium text-[#373737]'>
              📧{' '}
              <a
                href='mailto:johan@example.com'
                className='text-blue-600 hover:underline'
              >
                johan@example.com
              </a>
            </p>
            <p className='text-xl font-medium text-[#373737] mt-2'>
              📞{' '}
              <a
                href='tel:+6281234567890'
                className='text-blue-600 hover:underline'
              >
                +62 812-3456-7890
              </a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className='flex justify-center space-x-6 mt-4'>
            <a
              href='https://linkedin.com/in/johan'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/icons/linkedin.svg'
                alt='LinkedIn'
                className='h-10 w-10 hover:opacity-80 transition-all'
              />
            </a>
            <a
              href='https://github.com/johan'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/icons/github.svg'
                alt='GitHub'
                className='h-10 w-10 hover:opacity-80 transition-all'
              />
            </a>
            <a
              href='https://twitter.com/johan'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/icons/twitter.svg'
                alt='Twitter'
                className='h-10 w-10 hover:opacity-80 transition-all'
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
