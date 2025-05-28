import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  GiBackpack,
  GiDatabase,
  GiGears,
  GiLightBulb,
  GiMagicSwirl,
  GiRocket,
  GiShield,
  GiSpellBook,
  GiTreasureMap,
  GiWizardStaff,
  GiCrystalBall,
  GiMineralHeart,
  GiSwordAltar,
  GiWireframeGlobe,
  GiMagicGate,
} from 'react-icons/gi';
import {
  LuDatabase,
  LuGitBranch,
  LuLayers,
  LuMonitor,
  LuPalette,
  LuCpu,
  LuCloud,
  LuSpellCheck,
  LuSpellCheck2,
} from 'react-icons/lu';

const SkillsSection = ({
  playerLevel = 25,
  experiencePoints = 15420,
  maxExperience = 20000,
  skills = [
    // Frontend Arsenal
    {
      name: 'Javascript',
      level: 92,
      type: 'frontend',
      icon: LuSpellCheck2,
      rarity: 'rare',
      description: 'Magic spell',
    },
    {
      name: 'TypeScript',
      level: 72,
      type: 'frontend',
      icon: LuSpellCheck,
      rarity: 'legendary',
      description: 'Type-safe spell casting',
    },
    {
      name: 'React.js',
      level: 95,
      type: 'frontend',
      icon: GiMagicSwirl,
      rarity: 'rare',
      description: 'Master of component magic',
    },
    {
      name: 'Vue.js',
      level: 88,
      type: 'frontend',
      icon: GiCrystalBall,
      rarity: 'rare',
      description: 'Vue mastery for reactive UIs',
    },
    {
      name: 'Tailwind CSS',
      level: 90,
      type: 'frontend',
      icon: LuPalette,
      rarity: 'rare',
      description: 'Styling wizard toolkit',
    },
    {
      name: 'Three.js',
      level: 70,
      type: 'frontend',
      icon: GiWireframeGlobe,
      rarity: 'epic',
      description: '3D sorcery for immersive web experiences',
    },
    {
      name: 'GSAP',
      level: 72,
      type: 'frontend',
      icon: GiMagicGate,
      rarity: 'epic',
      description: 'Animation magic that brings interfaces to life',
    },

    // Backend Arsenal
    {
      name: 'Node.js',
      level: 87,
      type: 'backend',
      icon: GiGears,
      rarity: 'epic',
      description: 'Server-side battle engine',
    },
    {
      name: 'Php',
      level: 85,
      type: 'backend',
      icon: GiWizardStaff,
      rarity: 'epic',
      description: 'Versatile coding serpent',
    },
    {
      name: 'MySQL',
      level: 85,
      type: 'backend',
      icon: GiDatabase,
      rarity: 'rare',
      description: 'Reliable data fortress for persistent storage',
    },
    {
      name: 'SQLServer',
      level: 84,
      type: 'backend',
      icon: LuDatabase,
      rarity: 'rare',
      description: 'Data fortress guardian',
    },
    {
      name: 'MongoDB',
      level: 82,
      type: 'backend',
      icon: GiDatabase,
      rarity: 'rare',
      description: 'NoSQL treasure vault',
    },

    // Tools & DevOps
    {
      name: 'Docker',
      level: 60,
      type: 'devops',
      icon: LuLayers,
      rarity: 'epic',
      description: 'Container deployment magic',
    },
    {
      name: 'AWS',
      level: 63,
      type: 'devops',
      icon: LuCloud,
      rarity: 'rare',
      description: 'Cloud kingdom ruler',
    },
    {
      name: 'Git',
      level: 90,
      type: 'devops',
      icon: LuGitBranch,
      rarity: 'epic',
      description: 'Version control time magic',
    },
    {
      name: 'Linux',
      level: 70,
      type: 'devops',
      icon: GiShield,
      rarity: 'rare',
      description: 'System administration armor',
    },
  ],
  className = '',
}) => {
  const containerRef = useRef(null);
  const backpackRef = useRef(null);
  const skillsRef = useRef([]);
  const headerRef = useRef(null);
  const expBarRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = [
    {
      id: 'all',
      name: 'All Items',
      icon: GiBackpack,
      color: 'text-orange-500',
    },
    {
      id: 'frontend',
      name: 'Frontend',
      icon: LuMonitor,
      color: 'text-blue-600',
    },
    { id: 'backend', name: 'Backend', icon: LuCpu, color: 'text-green-600' },
    { id: 'devops', name: 'DevOps', icon: GiRocket, color: 'text-red-600' },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'epic':
        return 'from-purple-400 to-pink-500';
      case 'rare':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'shadow-[0_0_20px_rgba(251,191,36,0.3)]';
      case 'epic':
        return 'shadow-[0_0_15px_rgba(147,51,234,0.3)]';
      case 'rare':
        return 'shadow-[0_0_10px_rgba(59,130,246,0.3)]';
      default:
        return '';
    }
  };

  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((skill) => skill.type === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([backpackRef.current, headerRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(expBarRef.current, {
        opacity: 0,
        scaleX: 0,
      });

      gsap.set(skillsRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 30,
      });

      // Animation timeline
      const tl = gsap.timeline();

      // Header animation
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
      })
        // Backpack animation
        .to(
          backpackRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        // Experience bar animation
        .to(
          expBarRef.current,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        // Skills stagger animation
        .to(
          skillsRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.2)',
          },
          '-=0.3'
        );

      // Floating animation for backpack
      gsap.to(backpackRef.current, {
        y: 5,
        duration: 3,
        yoyo: true,
        repeat: 2,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSkillHover = (index, skill, isEntering) => {
    if (skillsRef.current[index]) {
      gsap.to(skillsRef.current[index], {
        scale: isEntering ? 1.05 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      setHoveredSkill(isEntering ? skill : null);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    // Animate skills out then in
    gsap.to(skillsRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(skillsRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.03,
            ease: 'back.out(1.2)',
          });
        }, 100);
      },
    });
  };

  const expPercentage = (experiencePoints / maxExperience) * 100;

  return (
    <div
      ref={containerRef}
      className={`md:absolute md:right-4 md:top-4 w-full md:w-[65%] md:max-w-lg mx-auto ${className}`}
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className='bg-gray-100 rounded-3xl p-8 mb-6 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] relative overflow-hidden'
      >
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-4'>
            <div
              ref={backpackRef}
              className='w-16 h-16 rounded-2xl bg-gray-100 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] p-3 flex items-center justify-center'
            >
              <GiBackpack className='w-10 h-10 text-orange-500' />
            </div>
            <div>
              <h2 className='text-3xl font-bold text-gray-800 mb-1'>
                Skills Arsenal
              </h2>
              <p className='text-gray-600 text-sm'>
                Level {playerLevel} Code Warrior
              </p>
            </div>
          </div>

          <div className='text-right'>
            <div className='text-2xl font-bold text-gray-800'>
              {skills.length}
            </div>
            <div className='text-xs text-gray-500'>Skills Mastered</div>
          </div>
        </div>

        {/* Experience Bar */}
        <div className='mb-6'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium text-gray-700'>
              Experience Points
            </span>
            <span className='text-sm text-gray-600'>
              {experiencePoints.toLocaleString()} /{' '}
              {maxExperience.toLocaleString()}
            </span>
          </div>
          <div className='w-full h-3 bg-gray-100 rounded-full shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] overflow-hidden'>
            <div
              ref={expBarRef}
              className='h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-left'
              style={{ width: `${expPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Category Filters */}
        <div className='flex gap-2 flex-wrap'>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gray-100 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] text-gray-800'
                    : 'bg-gray-100 shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] text-gray-600 hover:shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${category.color}`} />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className='grid p-8 md:p-0 grid-cols-2 md:grid-cols-3  gap-4'>
        {filteredSkills.map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <div
              key={`${skill.name}-${selectedCategory}`}
              ref={(el) => (skillsRef.current[index] = el)}
              className={`bg-gray-100 rounded-2xl p-6 shadow-[12px_12px_24px_#bebebe,-12px_-12px_24px_#ffffff] hover:shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] transition-all duration-300 cursor-pointer relative overflow-hidden ${getRarityBorder(
                skill.rarity
              )}`}
              onMouseEnter={() => handleSkillHover(index, skill, true)}
              onMouseLeave={() => handleSkillHover(index, skill, false)}
            >
              {/* Rarity Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(
                  skill.rarity
                )} opacity-5 rounded-2xl`}
              ></div>

              {/* Content */}
              <div className='relative z-10'>
                {/* Icon */}
                <div className='w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-100 shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center'>
                  <IconComponent className='w-6 h-6 text-gray-700' />
                </div>

                {/* Skill Name */}
                <h3 className='text-sm font-bold text-gray-800 text-center mb-2'>
                  {skill.name}
                </h3>

                {/* Level Progress */}
                <div className='mb-3'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-xs text-gray-600'>
                      Lv. {Math.floor(skill.level / 10)}
                    </span>
                    <span className='text-xs font-semibold text-gray-700'>
                      {skill.level}%
                    </span>
                  </div>
                  <div className='w-full h-2 bg-gray-100 rounded-full shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] overflow-hidden'>
                    <div
                      className={`h-full bg-gradient-to-r ${getRarityColor(
                        skill.rarity
                      )} rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>

                {/* Rarity Badge */}
                <div
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(
                    skill.rarity
                  )} text-white shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]`}
                >
                  {skill.rarity.charAt(0).toUpperCase() + skill.rarity.slice(1)}
                </div>
              </div>

              {/* Tooltip */}
              {hoveredSkill?.name === skill.name && (
                <div className='absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-20 whitespace-nowrap'>
                  {skill.description}
                  <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800'></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className='mt-6 bg-gray-100 rounded-3xl p-6 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]'>
        <div className='grid grid-cols-4 gap-4'>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-2 rounded-xl bg-gray-100 shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center'>
              <GiSwordAltar className='w-6 h-6 text-red-600' />
            </div>
            <div className='text-xl font-bold text-gray-800'>
              {skills.filter((s) => s.rarity === 'legendary').length}
            </div>
            <div className='text-xs text-gray-500'>Legendary</div>
          </div>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-2 rounded-xl bg-gray-100 shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center'>
              <GiMineralHeart className='w-6 h-6 text-purple-600' />
            </div>
            <div className='text-xl font-bold text-gray-800'>
              {skills.filter((s) => s.rarity === 'epic').length}
            </div>
            <div className='text-xs text-gray-500'>Epic</div>
          </div>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-2 rounded-xl bg-gray-100 shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center'>
              <GiTreasureMap className='w-6 h-6 text-blue-600' />
            </div>
            <div className='text-xl font-bold text-gray-800'>
              {skills.filter((s) => s.rarity === 'rare').length}
            </div>
            <div className='text-xs text-gray-500'>Rare</div>
          </div>
          <div className='text-center'>
            <div className='w-12 h-12 mx-auto mb-2 rounded-xl bg-gray-100 shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center'>
              <GiLightBulb className='w-6 h-6 text-yellow-600' />
            </div>
            <div className='text-xl font-bold text-gray-800'>
              {Math.round(
                skills.reduce((acc, s) => acc + s.level, 0) / skills.length
              )}
            </div>
            <div className='text-xs text-gray-500'>Avg Level</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
