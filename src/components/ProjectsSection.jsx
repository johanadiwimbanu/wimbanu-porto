import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  GiSpiderWeb,
  GiRocket,
  GiTrophyCup,
  GiDiamonds,
  GiLightningBow,
  GiSwordsPower,
} from 'react-icons/gi';
import {
  LuExternalLink,
  LuGithub,
  LuCode,
  LuMonitor,
  LuSmartphone,
  LuDatabase,
  LuCloud,
  LuBrain,
} from 'react-icons/lu';

const ProjectsSection = ({
  projects = [
    {
      id: 1,
      title: 'Payroll',
      description: 'Aplikasi penggajian dengan perhitungan pajak pph 21',
      image: '/api/placeholder/400/240',
      tags: ['Laravel', 'React.js', 'Supervisor', 'Queue'],
      status: 'in-progress',
      type: 'web',
      level: 'legendary',
      stats: { lines: '15K+', commits: '50+', users: '1' },
      links: {
        live: '#',
        github: '#',
      },
    },
    {
      id: 2,
      title: 'My Portofolio',
      description: 'Website portofolio pribadi saya',
      image: '/api/placeholder/400/240',
      tags: ['React.js', 'Three.js', 'GSAP'],
      status: 'completed',
      type: 'web',
      level: 'legendary',
      stats: { lines: '1.5K+', commits: '10+', users: 'Public' },
      links: {
        live: 'https://johanadiwimbanu.netlify.app/',
        github: '#',
      },
    },
    {
      id: 3,
      title: 'SIM Beasiswa Unisa Yogya',
      description: 'Sistem pengajuan dan monev beasiswa internal',
      image: '/api/placeholder/400/240',
      tags: ['Laravel', 'Blade', 'Js', 'Kendo', 'JQuery'],
      status: 'completed',
      type: 'web',
      level: 'epic',
      stats: { lines: '15K+', commits: '200+', users: '500+' },
      links: {
        live: 'https://beasiswa.unisayogya.ac.id/',
        github: '#',
      },
    },
    {
      id: 4,
      title: 'Backend eSDM ITNY',
      description:
        'API aplikasi mobile sdm Institut Teknologi Nasional Yogyakarta',
      image: '/api/placeholder/400/240',
      tags: ['Laravel for API', 'Firebase Cloud Messaging'],
      status: 'completed',
      type: 'mobile',
      level: 'rare',
      stats: { lines: '5K+', commits: '100+', users: '300+' },
      links: {
        live: '#',
        github: '#',
      },
    },
    {
      id: 5,
      title: 'New SIMSDM',
      description:
        'Sistem pengelolaan sumber daya manusia yang ditujukan untuk pengelolaan tenaga kerja perguruan tinggi',
      image: '/api/placeholder/400/240',
      tags: ['Laravel', 'Kendo', 'Javascript'],
      status: 'completed',
      type: 'web',
      level: 'rare',
      stats: { lines: '25K+', commits: '`100+', users: '300+' },
      links: {
        live: 'https://simsdm.utc-umy.id',
        github: '#',
      },
    },
  ],
  className = '',
}) => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);
  const filterRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const filters = [
    { key: 'all', label: 'All Projects', icon: GiSwordsPower },
    { key: 'web', label: 'Web Apps', icon: LuMonitor },
    { key: 'mobile', label: 'Mobile', icon: LuSmartphone },
    // { key: 'ai', label: 'AI/ML', icon: LuBrain },
    // { key: 'cloud', label: 'Cloud', icon: LuCloud },
  ];

  const typeIcons = {
    web: LuMonitor,
    mobile: LuSmartphone,
    ai: LuBrain,
    cloud: LuCloud,
    database: LuDatabase,
  };

  const levelColors = {
    legendary: 'from-yellow-400 to-orange-500',
    epic: 'from-purple-400 to-pink-500',
    rare: 'from-blue-400 to-cyan-500',
    common: 'from-gray-400 to-gray-500',
  };

  const levelIcons = {
    legendary: GiTrophyCup,
    epic: GiDiamonds,
    rare: GiLightningBow,
    common: GiSpiderWeb,
  };

  useEffect(() => {
    const filtered =
      selectedFilter === 'all'
        ? projects
        : projects.filter((project) => project.type === selectedFilter);
    setFilteredProjects(filtered);
  }, [selectedFilter, projects]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headerRef.current, filterRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(projectRefs.current, {
        opacity: 0,
        y: 10,
        scale: 0.9,
      });

      // Main timeline
      const tl = gsap.timeline();

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.2)',
      })
        .to(
          filterRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          projectRefs.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power4.in',
          },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleProjectHover = (index, isEntering) => {
    if (projectRefs.current[index]) {
      gsap.to(projectRefs.current[index], {
        scale: isEntering ? 1.02 : 1,
        y: isEntering ? -5 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleFilterClick = (filterKey) => {
    setSelectedFilter(filterKey);

    // Button click animation
    gsap.to(filterRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });
  };

  const TypeIcon = ({ type }) => {
    const Icon = typeIcons[type] || LuCode;
    return <Icon className='w-5 h-5' />;
  };

  const LevelIcon = ({ level }) => {
    const Icon = levelIcons[level] || GiSpiderWeb;
    return <Icon className='w-4 h-4' />;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full md:w-[65%] md:max-w-2xl md:absolute md:right-4 mx-auto px-6 py-12 ${className}`}
    >
      {/* Header */}
      <div ref={headerRef} className='text-center mb-12'>
        <div className='inline-flex items-center gap-3 mb-4'>
          <div className='bg-gray-100 p-3 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'>
            <GiRocket className='w-8 h-8 text-orange-500' />
          </div>
          <h2 className='text-5xl font-bold text-gray-800'>Battle Arena</h2>
        </div>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed'>
          Witness the legendary projects forged in the fires of code. Each one a
          testament to countless hours of battle against bugs and deadlines.
        </p>
      </div>

      {/* Filter Buttons */}
      <div
        ref={filterRef}
        className='flex flex-wrap justify-center gap-3 mb-12'
      >
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = selectedFilter === filter.key;

          return (
            <button
              key={filter.key}
              onClick={() => handleFilterClick(filter.key)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                ${
                  isActive
                    ? 'bg-gray-100 shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] text-gray-800'
                    : 'bg-gray-100 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] text-gray-600 hover:shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]'
                }
              `}
            >
              <Icon className='w-4 h-4' />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[index] = el)}
            className='bg-gray-100 rounded-3xl p-6 shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff] hover:shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] transition-all duration-500 cursor-pointer group'
            onMouseEnter={() => handleProjectHover(index, true)}
            onMouseLeave={() => handleProjectHover(index, false)}
          >
            {/* Project Header */}
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-gray-100 p-2 rounded-xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]'>
                  <TypeIcon type={project.type} />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors'>
                    {project.title}
                  </h3>
                  <div className='flex items-center gap-2 mt-1'>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r ${
                        levelColors[project.level]
                      } text-white text-xs font-semibold`}
                    >
                      <LevelIcon level={project.level} />
                      {project.level.toUpperCase()}
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-700 shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]'
                          : 'bg-orange-100 text-orange-700 shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]'
                      }`}
                    >
                      {project.status === 'completed' ? 'Victory' : 'In Battle'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Image */}
            <div className='bg-gray-200 rounded-2xl h-48 mb-4 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] flex items-center justify-center group-hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-300'>
              <div className='text-gray-500 text-6xl opacity-50'>
                <TypeIcon type={project.type} />
              </div>
            </div>

            {/* Project Description */}
            <p className='text-gray-600 text-sm leading-relaxed mb-4'>
              {project.description}
            </p>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-3 mb-4'>
              <div className='bg-gray-100 rounded-xl p-3 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] text-center'>
                <div className='text-sm font-bold text-gray-800'>
                  {project.stats.lines}
                </div>
                <div className='text-xs text-gray-500'>Lines</div>
              </div>
              <div className='bg-gray-100 rounded-xl p-3 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] text-center'>
                <div className='text-sm font-bold text-gray-800'>
                  {project.stats.commits}
                </div>
                <div className='text-xs text-gray-500'>Commits</div>
              </div>
              <div className='bg-gray-100 rounded-xl p-3 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] text-center'>
                <div className='text-sm font-bold text-gray-800'>
                  {project.stats.users}
                </div>
                <div className='text-xs text-gray-500'>Users</div>
              </div>
            </div>

            {/* Technologies */}
            <div className='flex flex-wrap gap-2 mb-4'>
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className='px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700 shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]'
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <a
                href={project.links.live}
                target='_blank'
                className='flex-1 bg-gray-100 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] text-gray-800 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm'
              >
                <LuExternalLink className='w-4 h-4' />
                Live Demo
              </a>
              <button className='flex-1 bg-gray-100 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] text-gray-800 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm'>
                <LuGithub className='w-4 h-4' />
                Source Code
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className='text-center py-12'>
          <div className='bg-gray-100 p-6 rounded-3xl shadow-[inset_20px_20px_40px_#bebebe,inset_-20px_-20px_40px_#ffffff] max-w-md mx-auto'>
            <GiSpiderWeb className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-bold text-gray-600 mb-2'>
              No Projects Found
            </h3>
            <p className='text-gray-500'>
              No battles have been fought in this category yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
