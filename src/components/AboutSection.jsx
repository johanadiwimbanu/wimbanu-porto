import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  GiAchievement,
  GiCloudDownload,
  GiMailbox,
  GiWolfHead,
} from 'react-icons/gi';
import { LuBackpack, LuCode, LuGlobe } from 'react-icons/lu';

const AboutSection = ({
  name = 'Johan Adi W',
  title = 'Full Stack Web Developer',
  company = 'UMB Techno Creative',
  workExperience = [
    {
      position: 'Full Stack Web Developer',
      company: 'UTC UMB.',
      duration: 'Okt 2019 - Present',
      current: true,
      description:
        'Developed and maintained multiple client projects using modern web technologies and agile methodologies.',
    },
  ],
  achievements = [
    { name: 'Tech Lead of the Year', icon: GiAchievement, type: 'award' },
    { name: 'Open Source Contributor', icon: LuCode, type: 'contribution' },
    {
      name: 'Certified AWS Solutions Architect',
      icon: LuGlobe,
      type: 'certification',
    },
  ],
  stats = {
    experience: 5,
    programingLanguage: 3,
    repository: 25,
    projectsCompleted: 10,
  },
  className = '',
  onDownloadCV,
  onGetInTouch,
}) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const avatarRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef([]);
  const timelineRef = useRef(null);
  const buttonsRef = useRef([]);
  const levelBadgeRef = useRef(null);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide all elements
      gsap.set([cardRef.current, avatarRef.current, headerRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(levelBadgeRef.current, {
        scale: 0,
        rotation: 180,
      });

      gsap.set(contactInfoRef.current, {
        opacity: 0,
        x: -30,
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
      });

      gsap.set(timelineRef.current, {
        opacity: 0,
        x: -20,
      });

      gsap.set(buttonsRef.current, {
        opacity: 0,
        y: 30,
      });

      // Create main timeline
      const tl = gsap.timeline();

      // Card entrance with bounce
      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
        // Avatar animation
        .to(
          avatarRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        // Level badge spin in
        .to(
          levelBadgeRef.current,
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          '-=0.3'
        )
        // Header text slide in
        .to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        // Contact info slide in
        .to(
          contactInfoRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        // Stats cards stagger animation
        .to(
          statsRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.2)',
          },
          '-=0.1'
        )
        // Timeline slide in
        .to(
          timelineRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        // Buttons fade in with stagger
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.1'
        );

      // Hover animations for stats cards
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.set(stat, {
            transformOrigin: 'center center',
          });
        }
      });

      // Continuous floating animation for avatar
      gsap.to(avatarRef.current, {
        y: 5,
        duration: 3,
        yoyo: true,
        repeat: 2,
        ease: 'power2.inOut',
      });

      // Pulse animation for level badge
      gsap.to(levelBadgeRef.current, {
        scale: 1.1,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleStatHover = (index, isEntering) => {
    if (statsRef.current[index]) {
      gsap.to(statsRef.current[index], {
        scale: isEntering ? 1.05 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleButtonHover = (index, isEntering) => {
    if (buttonsRef.current[index]) {
      gsap.to(buttonsRef.current[index], {
        scale: isEntering ? 1.02 : 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const handleButtonClick = (index) => {
    if (buttonsRef.current[index]) {
      gsap.to(buttonsRef.current[index], {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  };

  const handleButtonCV = (index) => {
    handleButtonClick(index);
    onDownloadCV();
  };

  const handleButtonGetInTouch = (index) => {
    handleButtonClick(index);
    onGetInTouch();
  };

  return (
    <div
      ref={containerRef}
      className={`md:absolute md:right-4 md:top-4 w-full md:w-[65%] md:max-w-lg ${className}`}
    >
      {/* Main Card with Neumorphism Style */}
      <div
        ref={cardRef}
        className='bg-gray-100 rounded-3xl p-8 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] relative overflow-hidden'
      >
        <div className='relative z-10'>
          {/* Header Section */}
          <div className='flex items-start gap-5 mb-8'>
            <div className='relative'>
              {/* Avatar with neumorphism */}
              <div
                ref={avatarRef}
                className='w-24 h-24 rounded-2xl bg-gray-100 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] p-2 flex items-center justify-center'
              >
                <GiWolfHead className='w-12 h-12 text-gray-600' />
              </div>
              {/* Level badge with neumorphism */}
              <div
                ref={levelBadgeRef}
                className='absolute -bottom-2 -right-2 bg-gray-100 rounded-lg shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] px-2 py-1'
              >
                <span className='text-gray-700 text-xs font-semibold'>25</span>
              </div>
            </div>

            <div ref={headerRef} className='flex-1'>
              <h2 className='text-4xl font-bold text-gray-800 mb-1 leading-tight'>
                {name}
              </h2>
              <div className='text-gray-600 text-sm font-medium mb-2'>
                {title}
              </div>
              <div className='text-gray-500 text-sm'>{company}</div>
            </div>
          </div>

          {/* Summary */}
          <div
            ref={contactInfoRef}
            className='bg-gray-100 rounded-2xl p-4 mb-6 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]'
          >
            <div className='text-gray-700'>
              <GiWolfHead className='w-6 h-6 m-2 inline-block text-orange-500' />
              <b>Code Warrior</b>, ready for battle! <br />
              <p className='text-sm'>
                Armed with over 5 years of experience, I've conquered countless
                battlefields in the world of web development.
                <br />
                Bugs? Deadlines? Boss fights? Bring it on. I'm The Wolf.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div
              ref={(el) => (statsRef.current[0] = el)}
              className='bg-gray-100 rounded-xl p-4 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] transition-all duration-300 cursor-pointer'
              onMouseEnter={() => handleStatHover(0, true)}
              onMouseLeave={() => handleStatHover(0, false)}
            >
              <div className='text-2xl font-bold text-gray-800'>
                {stats.experience}+
              </div>
              <div className='text-xs text-gray-500'>Years Experience</div>
            </div>
            <div
              ref={(el) => (statsRef.current[1] = el)}
              className='bg-gray-100 rounded-xl p-4 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] transition-all duration-300 cursor-pointer'
              onMouseEnter={() => handleStatHover(1, true)}
              onMouseLeave={() => handleStatHover(1, false)}
            >
              <div className='text-2xl font-bold text-gray-800'>
                {stats.repository}+
              </div>
              <div className='text-xs text-gray-500'>Repositories</div>
            </div>
            <div
              ref={(el) => (statsRef.current[2] = el)}
              className='bg-gray-100 rounded-xl p-4 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] transition-all duration-300 cursor-pointer'
              onMouseEnter={() => handleStatHover(2, true)}
              onMouseLeave={() => handleStatHover(2, false)}
            >
              <div className='text-2xl font-bold text-gray-800'>
                {stats.projectsCompleted}+
              </div>
              <div className='text-xs text-gray-500'>Projects Completed</div>
            </div>
            <div
              ref={(el) => (statsRef.current[3] = el)}
              className='bg-gray-100 rounded-xl p-4 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] transition-all duration-300 cursor-pointer'
              onMouseEnter={() => handleStatHover(3, true)}
              onMouseLeave={() => handleStatHover(3, false)}
            >
              <div className='text-2xl font-bold text-gray-800'>
                {stats.programingLanguage}
              </div>
              <div className='text-xs text-gray-500'>Programing Languages</div>
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div ref={timelineRef} className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
              <LuBackpack className='w-5 h-5 text-gray-600' />
              Work Experience
            </h3>
            <div className='relative'>
              {/* Timeline Line with neumorphism */}
              <div className='absolute left-4 top-0 bottom-0 w-1 bg-gray-100 rounded-full shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]'></div>

              <div className='space-y-4'>
                {workExperience.map((job, index) => (
                  <div key={index} className='relative flex gap-4'>
                    {/* Timeline Dot with neumorphism */}
                    <div className='flex-shrink-0 relative'>
                      <div className='w-8 h-8 rounded-full bg-gray-100 shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] flex items-center justify-center relative z-10'>
                        <div className='w-3 h-3 bg-gray-600 rounded-full'></div>
                      </div>
                      {index === 0 && (
                        <div className='absolute -top-1 -left-1 w-10 h-10 rounded-full bg-gray-200 opacity-50 animate-pulse'></div>
                      )}
                    </div>

                    {/* Job Info with neumorphism */}
                    <div className='flex-1 p-4 bg-gray-100 rounded-xl shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] transition-all duration-300'>
                      <div className='flex justify-between items-start mb-2'>
                        <h4 className='text-gray-800 font-semibold text-sm'>
                          {job.position}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            job.current
                              ? 'bg-green-100 text-green-700 shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {job.current ? 'Current' : job.duration}
                        </span>
                      </div>
                      <div className='text-gray-700 font-medium text-sm mb-2'>
                        {job.company}
                      </div>
                      <div className='text-gray-500 text-xs mb-2'>
                        {job.duration}
                      </div>
                      <p className='text-gray-600 text-xs leading-relaxed'>
                        {job.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='space-y-3'>
            <button
              ref={(el) => (buttonsRef.current[0] = el)}
              className='w-full bg-gray-100 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] text-gray-800 font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2'
              onMouseEnter={() => handleButtonHover(0, true)}
              onMouseLeave={() => handleButtonHover(0, false)}
              onClick={() => handleButtonCV(0)}
            >
              <GiCloudDownload className='w-5 h-5' />
              Download CV
            </button>
            <button
              ref={(el) => (buttonsRef.current[1] = el)}
              className='w-full bg-gray-100 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] text-gray-800 font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2'
              onMouseEnter={() => handleButtonHover(1, true)}
              onMouseLeave={() => handleButtonHover(1, false)}
              onClick={() => handleButtonGetInTouch(1)}
            >
              <GiMailbox className='w-5 h-5' />
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
