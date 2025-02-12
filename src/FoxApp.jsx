import { useEffect, useRef } from 'react';
import Fox from './components/FoxModel';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const FoxApp = () => {
  const circleRef = useRef(false);
  const aboutContentRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    gsap.fromTo(
      circleRef.current,
      { scale: 0 }, // Mulai dari kecil
      {
        scale: 20, // Membesar lebih dari layar
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top -25vh',
          end: 'center center', // Selesai ketika bagian .about-section sampai ke atas viewport
          scrub: true,
        },
      }
    );

    // Animasi Masuk dan Keluar About Content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.fromTo(
      aboutContentRef.current,
      { x: '-100%', opacity: 0 },
      { x: 0, opacity: 1, ease: 'power2.inOut' }
    ).to(aboutContentRef.current, {
      x: '-100%',
      opacity: 0,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
      lenis.destroy(); // Cleanup Lenis saat komponen di-unmount
    };
  }, []);
  return (
    <>
      <Fox />
      <div className='h-[1600vh] w-full bg-lime-100 relative -z-10'>
        <div className='h-[200vh] w-full welcome '></div>{' '}
        <div
          ref={circleRef}
          className='fixed h-52 w-52 top-[50%] left-[67vw] -z-5 aspect-square bg-indigo-100 rounded-full'
        ></div>
        <div className='h-[300vh] about-section border border-black flex items-center'>
          <div
            ref={aboutContentRef}
            className='h-[150vh] text-black/70 w-1/2 bg-amber-100 rounded-tr-4xl rounded-br-4xl flex justify-center px-20 py-64'
          >
            <h2 className='text-7xl'>About Me</h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default FoxApp;
