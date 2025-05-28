import { useEffect, useRef, useState } from 'react';
import FoxModel from './components/FoxModel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GiCardboardBoxClosed,
  GiBackpack,
  GiMailbox,
  GiWolfHead,
  GiRocket,
} from 'react-icons/gi';
import Navigation from './components/Navigation';
import GameDialog from './components/GameDialog';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';

gsap.registerPlugin(ScrollTrigger);

const FoxApp = () => {
  const foxRef = useRef(null);
  const [isWelcomeDialogStart, setIsWelcomeDialogStart] = useState(false);
  const [isShitDialogStart, setIsShitDialogStart] = useState(false);
  const welcomeDialogRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [isContentShow, setIsContentShow] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModelHide, setIsModelHide] = useState(false);

  useEffect(() => {
    const gameDialogStartTimer = setTimeout(() => {
      setIsWelcomeDialogStart(true);
    }, 8000);

    return () => {
      clearTimeout(gameDialogStartTimer);
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
    'Hai! Aku Foxy, asisten virtual yang akan membimbingmu menjelajahi portofolio ini.',
    'Aku akan mengenalkanmu kepada <strong>The Wolf</strong>, sang pejuang kode yang punya pengalaman 5 tahun lebih.',
    'Siap berpetualang? Klik menu navigasi untuk melihat lebih detail.',
    'let`s gooo! 🐺✨',
  ];

  const shitDialogues = [
    'HUuuuaaaaaaaaahhh',
    'Maaf aku tiba-tiba mengantuk. Aku mau tidur dulu',
    'Jangan bilang <strong>The Wolf</strong> yaaa! nanti dia marah',
  ];

  const [currentDialoguesIndex, setCurrentDialoguesIndex] = useState(0);

  const handleNext = (arrayDialog, setDialogState, afterEnd) => {
    if (currentDialoguesIndex == arrayDialog.length - 1) {
      setDialogState(false);
      afterEnd();
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
    {
      id: 'wolf',
      icon: <GiWolfHead className='w-5 h-5 md:w-12 md:h-12' />,
      name: 'about',
      onSectionShow: () => {
        setIsModelHide(false);
        if (activeMenu !== null) return;
        foxRef.current.setAnimation(
          foxRef.current.mixerRef,
          foxRef.current.animationsRef,
          'Fox_Falling',
          false
        );
        setIsShitDialogStart(true);
      },
    },
    {
      id: 'backpack',
      icon: <GiBackpack className='w-6 h-6 md:w-12 md:h-12' />,
      name: 'skill',
      onSectionShow: () => {
        setIsModelHide(false);
        if (activeMenu !== null) return;
        foxRef.current.setAnimation(
          foxRef.current.mixerRef,
          foxRef.current.animationsRef,
          'Fox_Falling',
          false
        );
        setIsShitDialogStart(true);
      },
    },
    {
      id: 'box',
      icon: <GiRocket className='w-6 h-6 md:w-12 md:h-12' />,
      name: 'project',
      onSectionShow: () => {
        setIsModelHide(false);
        if (activeMenu !== null) return;
        foxRef.current.setAnimation(
          foxRef.current.mixerRef,
          foxRef.current.animationsRef,
          'Fox_Falling',
          false
        );
        setIsShitDialogStart(true);
      },
    },
    {
      id: 'mailbox',
      icon: <GiMailbox className='w-6 h-6 md:w-12 md:h-12' />,
      name: 'contact',
      onSectionShow: () => {
        if (activeMenu !== null) {
          setIsModelHide(true);
          return;
        }
        foxRef.current.setAnimation(
          foxRef.current.mixerRef,
          foxRef.current.animationsRef,
          'Fox_Falling',
          false,
          () => {
            setIsModelHide(true);
          }
        );
        setIsShitDialogStart(true);
        console.log('animasi contact');

        // console.log(foxRef.current.modelRef);
        // gsap.to(foxRef.current.modelRef.position, {
        //   x: 50,
        //   y: -80,
        //   duration: 5,
        //   onStart: () => {
        //     foxRef.current.setAnimation(
        //       foxRef.current.mixerRef,
        //       foxRef.current.animationsRef,
        //       'Fox_Run_InPlace'
        //     );
        //   },
        //   onComplete: () => {
        //     foxRef.current.setAnimation(
        //       foxRef.current.mixerRef,
        //       foxRef.current.animationsRef,
        //       'Fox_Sit1',
        //       false,
        //       () => {
        //         foxRef.current.setAnimation(
        //           foxRef.current.mixerRef,
        //           foxRef.current.animationsRef,
        //           'Fox_Sit_Idle_Break'
        //         );
        //       }
        //     );
        //   },
        // });
      },
    },
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
    <>
      <div
        className={`absolute z-0 md:h-screen ${isModelHide ? 'invisible' : ''}`}
      >
        <FoxModel ref={foxRef} />
      </div>
      <div className='md:h-screen relative'>
        {(isWelcomeDialogStart || isShitDialogStart) && (
          <div
            className='fixed z-10 md:top-[35%] md:right-[55%] bottom-0 w-full right-0 md:w-auto'
            ref={welcomeDialogRef}
          >
            {isWelcomeDialogStart && (
              <GameDialog
                text={welcomeDialogues[currentDialoguesIndex]}
                onNext={() => {
                  handleNext(welcomeDialogues, setIsWelcomeDialogStart, () => {
                    setIsMenuShow(true);
                    setCurrentDialoguesIndex(0);
                  });
                }}
              />
            )}

            {isShitDialogStart && (
              <GameDialog
                text={shitDialogues[currentDialoguesIndex]}
                onNext={() => {
                  handleNext(shitDialogues, setIsShitDialogStart, () => {
                    setCurrentDialoguesIndex(0);
                    foxRef.current.setAnimation(
                      foxRef.current.mixerRef,
                      foxRef.current.animationsRef,
                      'Fox_Falling_Left',
                      false,
                      () => {
                        setIsContentShow(true);
                      }
                    );
                  });
                }}
              />
            )}
          </div>
        )}

        {isMenuShow && (
          <div
            // ref={containerRef}
            className='w-full md:w-auto bg-white relative md:fixed md:top-1/2 md:-translate-y-1/2 z-100'
          >
            <Navigation menuItems={menuItems} setActiveMenu={setActiveMenu} />
          </div>
        )}

        {isContentShow && (
          <div className='relative md:mb-0'>
            {activeMenu === 'about' && (
              <AboutSection
                onDownloadCV={() => {
                  const fileUrl = '/files/resume-johanadiwimbanu.pdf';

                  const a = document.createElement('a');
                  a.href = fileUrl;
                  a.download = 'resume-johanadiwimbanu.pdf';
                  a.click();
                }}
                onGetInTouch={() => {
                  setActiveMenu('contact');
                }}
              />
            )}
            {activeMenu === 'skill' && <SkillsSection />}
            {activeMenu === 'project' && <ProjectsSection />}
            {activeMenu === 'contact' && <ContactSection />}
          </div>
        )}
      </div>
    </>
  );
};

export default FoxApp;
