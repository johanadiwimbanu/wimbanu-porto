import { useCallback, useEffect, useRef, useState } from 'react';
import FoxModel from './components/FoxModel';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GiCardboardBoxClosed,
  GiLightBackpack,
  GiMailbox,
  GiWolfHead,
} from 'react-icons/gi';
import Navigation from './components/Navigation';
import GameDialog from './components/GameDialog';
import AboutSection from './components/AboutSection';
gsap.registerPlugin(ScrollTrigger);

const FoxApp = () => {
  const circleRef = useRef(false);
  const aboutContentRef = useRef(null);
  const foxRef = useRef(null);
  const [isWelcomeDialogStart, setIsWelcomeDialogStart] = useState(false);
  const welcomeDialogRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuShow, setIsMenuShow] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const gameDialogStartTimer = setTimeout(() => {
      setIsWelcomeDialogStart(true);
    }, 8500);

    return () => {
      clearTimeout(gameDialogStartTimer);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isWelcomeDialogStart && welcomeDialogRef.current) {
      setIsAnimating(true);
      gsap.fromTo(
        welcomeDialogRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          onComplete: () => setIsAnimating(false),
        }
      );
    }
  }, [isWelcomeDialogStart]);

  useEffect(() => {
    if (!isMenuShow) return;
    foxRef.current.setAnimation(
      foxRef.current.mixerRef,
      foxRef.current.animationsRef,
      'Fox_Jump',
      false,
      () => {
        foxRef.current.setAnimation(
          foxRef.current.mixerRef,
          foxRef.current.animationsRef,
          'Fox_Sit1',
          false,
          () => {
            foxRef.current.setAnimation(
              foxRef.current.mixerRef,
              foxRef.current.animationsRef,
              'Fox_Sit_Yes'
            );
          }
        );
      }
    );
  }, [isMenuShow]);

  const welcomeDialogues = [
    'Hai! Aku Foxy, asisten virtual yang akan memandu kamu menjelajahi portfolio ini.',
    'Aku akan mengenalkanmu kepada <strong>The Wolf</strong>, sang pemilik portofolio ini. Siap untuk menjelajah?',
    'Kamu bisa mengklik menu navigasi atau scroll down untuk melihat lebih detail setelah ini.',
    'Selamat menikmati pengalaman interaktif ini!✨',
  ];
  const [currentDialoguesIndex, setCurrentDialoguesIndex] = useState(0);

  const handleNext = (arrayDialog, setDialogState) => {
    if (currentDialoguesIndex == arrayDialog.length - 1) {
      setDialogState(false);
      setIsMenuShow(true);
    }
    if (currentDialoguesIndex < arrayDialog.length - 1 && !isAnimating) {
      setIsAnimating(true);
      gsap.to(welcomeDialogRef.current, {
        y: -20,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentDialoguesIndex((prev) => prev + 1);
          gsap.fromTo(
            welcomeDialogRef.current,
            { y: 20, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.7)',
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    }
  };

  const menuItems = [
    { id: 'wolf', icon: <GiWolfHead className='w-12 h-12' /> },
    { id: 'backpack', icon: <GiLightBackpack className='w-12 h-12' /> },
    { id: 'box', icon: <GiCardboardBoxClosed className='w-12 h-12' /> },
    { id: 'mailbox', icon: <GiMailbox className='w-12 h-12' /> },
  ];

  const containerRef = useRef(null);
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        containerRef.current.style.transform = `translate(-50%, -${
          height / 2
        }px)`;
      }
    };

    // Observer untuk memantau perubahan tinggi
    const resizeObserver = new ResizeObserver(updatePosition);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [isMenuShow]);

  return (
    <div className='h-screen w-full relative'>
      <div className='relative z-0 h-screen'>
        <FoxModel ref={foxRef} />
      </div>

      {isWelcomeDialogStart && (
        <div
          className='absolute z-10 top-[35%] right-[55%]'
          ref={welcomeDialogRef}
        >
          <GameDialog
            text={welcomeDialogues[currentDialoguesIndex]}
            onNext={() => {
              handleNext(welcomeDialogues, setIsWelcomeDialogStart);
            }}
          />
        </div>
      )}

      {isMenuShow && (
        <>
          <div ref={containerRef} className='fixed top-[50%] left-16 '>
            <Navigation menuItems={menuItems} />
          </div>
          <div className='h-[100vh]'>
            <AboutSection />
          </div>
        </>
      )}
    </div>
  );
};

export default FoxApp;
