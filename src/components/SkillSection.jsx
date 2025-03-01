import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useEffect, useRef } from 'react';
import {
  FaAws,
  FaClock,
  FaComments,
  FaFigma,
  FaGitAlt,
  FaLightbulb,
  FaNodeJs,
  FaSyncAlt,
  FaUsers,
} from 'react-icons/fa';
import { FaLaravel } from 'react-icons/fa6';
import { GiLightBackpack } from 'react-icons/gi';
import { LuCode, LuDatabase, LuGlobe, LuServer } from 'react-icons/lu';
import {
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNginx,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
gsap.registerPlugin(Draggable);

const SkillsScattered = () => {
  const technicalSkillGroups = [
    {
      title: 'Frontend',
      icon: <LuGlobe className='text-orange-400' size={50} />,
      skills: [
        {
          name: 'React',
          logo: <SiReact className='text-cyan-500' size={50} />,
        },
        {
          name: 'Framer Motion',
          logo: <SiFramer className='text-green-500' size={50} />,
        },
        {
          name: 'GSAP',
          logo: <span className='italic font-black text-green-800'>GSAP</span>,
        },
        {
          name: 'THREE.js',
          logo: <TbBrandThreejs className='text-gray-900' size={50} />,
        },
        {
          name: 'Tailwind CSS',
          logo: <SiTailwindcss className='text-cyan-500' size={50} />,
        },
      ],
    },
    {
      title: 'Backend',
      icon: <LuServer className='text-orange-400' size={60} />,
      skills: [
        {
          name: 'Node.js',
          logo: <FaNodeJs className='text-teal-800' size={60} />,
        },
        { name: 'Nest', logo: <SiNestjs className='text-red-700' size={60} /> },
        {
          name: 'Laravel',
          logo: <FaLaravel className='text-red-500' size={60} />,
        },
        {
          name: 'Nginx',
          logo: <SiNginx className='text-teal-900' size={60} />,
        },
      ],
    },
    {
      title: 'Database',
      icon: <LuDatabase className='text-orange-400' size={60} />,
      skills: [
        {
          name: 'MongoDB',
          logo: <SiMongodb className='text-green-700' size={60} />,
        },
        {
          name: 'MySQL',
          logo: <SiMysql className='text-blue-500' size={60} />,
        },
      ],
    },
    {
      title: 'Tools',
      icon: <LuCode className='text-orange-400' size={60} />,
      skills: [
        { name: 'Git', logo: <FaGitAlt className='text-red-500' size={60} /> },
        {
          name: 'VS Code',
          logo: <VscVscode className='text-blue-500' size={60} />,
        },
        {
          name: 'Figma',
          logo: <FaFigma className='text-gray-800' size={60} />,
        },
      ],
    },
  ];

  const usedPositions = [];
  const skillRefs = useRef({});

  useEffect(() => {
    Object.values(skillRefs.current).forEach((el, index) => {
      if (el) {
        gsap.set(el, { y: -200, opacity: 0 });
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'bounce.out',
          delay: index * 0.1,
        });
        Draggable.create(el);
      }
    });
  }, []);

  return (
    <div className='perspective-1000'>
      {technicalSkillGroups.flatMap((group) =>
        group.skills.map((skill) => {
          let randomX, randomY;
          let maxTries = 20;
          do {
            randomX = Math.floor(Math.random() * 80) + 10;
            randomY = Math.floor(Math.random() * 15) + 60;
            maxTries--;
          } while (
            usedPositions.some(
              ([x, y]) =>
                Math.abs(x - randomX) < 60 && Math.abs(y - randomY) < 60
            ) &&
            maxTries > 0
          );

          usedPositions.push([randomX, randomY]);

          const randomRotate = Math.random() * 60 - 30;
          const randomTilt = Math.random() * 15 - 7;
          const uniqueKey = `${group.title}-${skill.name}`;

          return (
            <div
              key={uniqueKey}
              ref={(el) => (skillRefs.current[uniqueKey] = el)}
              className='absolute z-50 flex antialiashed bg- flex-col items-center'
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                transform: `rotateX(65deg) rotate(${randomRotate}deg) skewY(${randomTilt}deg) translateY(-50%)`,
                transformOrigin: 'center',
              }}
            >
              <div
                className={`bg-white-50 p-3 pointer-events-auto rounded-lg shadow-lg hover:scale-110 transition-transform duration-300`}
              >
                {skill.logo}
              </div>
              <span className='text-lg font-medium text-gray-600 mt-1'>
                {skill.name}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};

const softSkills = [
  {
    name: 'Problem Solving',
    icon: <FaLightbulb className='text-yellow-500' size={40} />,
  },
  {
    name: 'Team Collaboration',
    icon: <FaUsers className='text-blue-500' size={40} />,
  },
  {
    name: 'Communication',
    icon: <FaComments className='text-green-500' size={40} />,
  },
  {
    name: 'Time Management',
    icon: <FaClock className='text-red-500' size={40} />,
  },
  {
    name: 'Adaptability',
    icon: <FaSyncAlt className='text-purple-500' size={40} />,
  },
];

const SoftSkills = () => {
  const skillRefs = useRef({});

  useEffect(() => {
    Object.values(skillRefs.current).forEach((el, index) => {
      if (el) {
        gsap.set(el, { y: -50, opacity: 0 });
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.1,
        });
        Draggable.create(el);
      }
    });
  }, []);

  return (
    <div className='relative w-full h-[150px] gap-20 flex items-end justify-center perspective-800'>
      {softSkills.map((skill, index) => {
        let top = 40;
        if (index % 2 === 1) {
          top = 30;
        }

        return (
          <div
            key={skill.name}
            ref={(el) => (skillRefs.current[skill.name] = el)}
            className='relative flex flex-col items-center'
            style={{
              top: `${top}%`,
            }}
          >
            <div className='p-3 rounded-lg bg-white shadow-lg hover:scale-110 transition-transform duration-300'>
              {skill.icon}
            </div>
            <span className='text-lg font-medium text-gray-600 mt-1'>
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const certificates = [
  {
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: 'Jan 2023',
    logo: <FaAws className='text-gray-800' size={48} />,
  },
  {
    name: 'React Certification',
    issuer: 'Meta',
    date: 'Mar 2022',
    logo: <SiReact className='text-cyan-500' size={48} />,
  },
  {
    name: 'Frontend Web Developer',
    issuer: 'Google',
    date: 'Nov 2021',
    logo: <LuGlobe className='text-lime-900' size={48} />,
  },
  {
    name: 'JavaScript Advanced',
    issuer: 'Udemy',
    date: 'May 2020',
    logo: <SiJavascript className='text-yellow-500' size={48} />,
  },
];

const CertificateScattered = () => {
  const certRefs = useRef({});

  useEffect(() => {
    Object.values(certRefs.current).forEach((el, index) => {
      if (el) {
        gsap.set(el, { y: -50, opacity: 0 });
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.1,
        });
      }
    });
  }, []);

  return (
    <div className='absolute cursor-pointer bottom-20 h-[200px] left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-8'>
      {certificates.map((cert, index) => (
        <div
          key={cert.name}
          ref={(el) => (certRefs.current[cert.name] = el)}
          className='relative p-4 bg-gray-50 shadow-lg rounded-lg flex flex-col items-center w-64 hover:scale-105 transition-transform duration-300'
        >
          <div className='mb-2'>{cert.logo}</div>
          <h3 className='text-lg font-bold text-gray-800'>{cert.name}</h3>
          <p className='text-sm text-gray-500'>{cert.issuer}</p>
          <span className='text-xs text-gray-400 mt-1'>{cert.date}</span>
        </div>
      ))}
    </div>
  );
};

const SkillsSection = () => {
  return (
    <div className='w-full p-8'>
      {/* Header */}
      <h2
        className='absolute
          text-4xl font-semibold px-20 py-3 
          top-16 left-1/2 -translate-x-1/2 
          items-center gap-3 flex 
          rounded-br-full rounded-tr-full 
          shadow-[80px_10px_100px_#bebebe,-60px_10px_100px_#ffffff]'
      >
        <GiLightBackpack size={40} className='text-orange-400' />
        Skillset
      </h2>

      <SkillsScattered />
      <SoftSkills />
      <CertificateScattered />
    </div>
  );
};

export default SkillsSection;
