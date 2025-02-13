import { useCallback, useEffect, useRef, useState } from 'react';
import FoxModel from './components/FoxModel';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaUser } from 'react-icons/fa6';
import { LuCircleUser } from 'react-icons/lu';
import { GrProjects } from 'react-icons/gr';
import { CiGrid42, CiUser } from 'react-icons/ci';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import {
  GiBackpack,
  GiCampCookingPot,
  GiCardboardBoxClosed,
  GiLightBackpack,
  GiMailbox,
  GiVisoredHelm,
  GiWolfHead,
} from 'react-icons/gi';
import Navigation from './components/Navigation';
gsap.registerPlugin(ScrollTrigger);

export function GameDialog({ text, onNext }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const dialogContentRef = useRef(null);
  const TYPING_SPEED = 50;

  const typeText = useCallback(() => {
    if (displayText.length < text.length) {
      setDisplayText(text.slice(0, displayText.length + 1));
    } else {
      setIsComplete(true);
    }
  }, [displayText.length, text]);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);

    // Animate text change
    gsap.fromTo(
      dialogContentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [text]);

  useEffect(() => {
    if (!isComplete) {
      const timer = setTimeout(typeText, TYPING_SPEED);
      return () => clearTimeout(timer);
    }
  }, [displayText, isComplete, typeText]);

  const handleSkip = () => {
    setDisplayText(text);
    setIsComplete(true);
  };

  return (
    <div className='relative min-w-52 max-w-80 pb-12 p-4 bg-gray-900 border-4 border-cyan-300 min-h-32 rounded-2xl shadow-lg'>
      <div ref={dialogContentRef}>
        <p
          className='text-lg text-white font-mono min-h-16'
          dangerouslySetInnerHTML={{ __html: displayText || '...' }}
        />
      </div>

      <div className='absolute bottom-2 right-2 flex gap-2'>
        {!isComplete && (
          <button
            onClick={handleSkip}
            className='px-4 py-1 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors'
          >
            Skip
          </button>
        )}
        {isComplete && (
          <button
            onClick={onNext}
            className='px-4 py-1 bg-cyan-300 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors'
          >
            ▶ Next
          </button>
        )}
      </div>
    </div>
  );
}

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

  const welcomeDialogues = [
    'Hai! Namaku Foxy, asisten virtual yang akan memandu kamu menjelajahi portfolio ini.',
    'Aku akan mengenalkanmu kepada <strong>The Wolf</strong>, sang pemilik portofolio ini, serta karya-karya menariknya. Siap untuk menjelajah?',
    'Kamu bisa mengklik menu navigasi atau berinteraksi dengan scene 3D untuk melihat lebih detail.',
    'Selamat menikmati pengalaman interaktif ini!✨',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (arrayDialog, setDialogState) => {
    if (currentIndex == arrayDialog.length - 1) {
      setDialogState(false);
      setIsMenuShow(true);
    }
    if (currentIndex < arrayDialog.length - 1 && !isAnimating) {
      setIsAnimating(true);
      gsap.to(welcomeDialogRef.current, {
        y: -20,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex((prev) => prev + 1);
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
    { id: 'grid', icon: <GiCardboardBoxClosed className='w-12 h-12' /> },
    { id: 'mailbox', icon: <GiMailbox className='w-12 h-12' /> },
  ];

  return (
    <div className='h-screen w-full relative'>
      <div className='z-0 relative'>
        <FoxModel ref={foxRef} />
      </div>
      {isWelcomeDialogStart && (
        <div
          className='absolute z-10 top-[35%] right-[55%]'
          ref={welcomeDialogRef}
        >
          <GameDialog
            text={welcomeDialogues[currentIndex]}
            onNext={() => {
              handleNext(welcomeDialogues, setIsWelcomeDialogStart);
            }}
          />
        </div>
      )}
      <Navigation menuItems={menuItems} isMenuShow={isMenuShow} />
    </div>
  );
};

export default FoxApp;
