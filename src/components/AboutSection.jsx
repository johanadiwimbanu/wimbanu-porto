import { useEffect, useRef } from 'react';
import { GiLightBackpack, GiWolfHead } from 'react-icons/gi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const contentElementsRef = useRef({
    head: null,
    profile: null,
    stats: null,
    overview: null,
  });

  useEffect(() => {
    Object.values(contentElementsRef.current).forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id='about' className='w-full p-8 '>
      <h2
        ref={(el) => (contentElementsRef.current['head'] = el)}
        className='absolute 
          text-4xl font-semibold px-20 py-3 
          top-16 left-1/2 -translate-x-1/2 
          items-center gap-3 flex 
          rounded-br-full rounded-tr-full 
          shadow-[80px_10px_100px_#bebebe,-60px_10px_100px_#ffffff]'
      >
        <GiWolfHead size={40} className='text-orange-400' />
        About
      </h2>
      <div className='text-gray-700 max-w-2xl min-w-xl mx-auto absolute right-0 top-1/2 -translate-y-1/2'>
        <div
          ref={(el) => (contentElementsRef.current['profile'] = el)}
          className='relative p-6 flex justify-center py-8 items-center gap-2 w-full min-h-80 rounded-bl-full rounded-tl-full shadow-[-20px_10px_60px_#bebebe,-20px_10px_60px_#ffffff] opacity-0'
        >
          <img
            src='https://images.unsplash.com/photo-1423479185712-25d4a4fe1006?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Profile'
            className='w-40 h-40 rounded-full p-1 bg-gray-100'
          />
          <div className='rounded-xl px-6 py-4 flex flex-col justify-center items-start gap-4'>
            <div className='text-4xl font-bold text-gray-700'>
              Johan Adi Wimbanu
              <p className='text-2xl font-semibold text-gray-700'>
                Web Developer
              </p>
            </div>
            <button className='bg-gray-100 text-orange-500 font-medium hover:text-gray-700 px-8 py-3 rounded-2xl shadow-[-5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-500'>
              Full Stats
            </button>
          </div>
        </div>

        <div
          ref={(el) => (contentElementsRef.current['stats'] = el)}
          className='py-8 rounded-tl-2xl rounded-bl-2xl opacity-0'
        >
          <div className='grid grid-cols-3 gap-6'>
            {[
              { label: 'Experience', value: '5Y +' },
              { label: 'Programming Lang', value: '3+' },
              { label: 'Creativity', value: '8.73' },
            ].map((stat, index) => (
              <div
                key={index}
                className='text-center rounded-2xl p-6 shadow-[-10px_5px_60px_#bebebe,-10px_5px_60px_#ffffff]'
              >
                <p className='text-2xl font-bold text-gray-700'>{stat.value}</p>
                <p className='text-sm text-gray-500'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={(el) => (contentElementsRef.current['overview'] = el)}
          className='p-6 text-gray-700 shadow-[-10px_5px_60px_#bebebe,-10px_5px_60px_#ffffff] rounded-2xl mt-6 opacity-0'
        >
          <p className='font-semibold text-lg text-gray-700'>
            Player performance overview:
          </p>
          <p>
            Continuously delivering high-quality web applications, ensuring a
            seamless user experience. Progressing steadily in mastering modern
            technologies and optimizing development workflows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
