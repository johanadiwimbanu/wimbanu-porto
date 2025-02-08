import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { FaTasks } from 'react-icons/fa';
import { FaLaravel, FaReact, FaVuejs } from 'react-icons/fa6';
import { SiThreedotjs } from 'react-icons/si';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built with React and Three.js.',
    image: '/projects/portfolio.png',
    link: 'https://example.com/portfolio',
    icon: (
      <div className='flex space-x-2'>
        <FaReact className='text-blue-500 text-4xl' />
        <SiThreedotjs className='text-gray-800 text-4xl' />
      </div>
    ),
  },
  {
    title: 'E-Commerce Platform',
    description: 'An online store powered by Laravel and Vue.js.',
    image: '/projects/ecommerce.png',
    link: 'https://example.com/ecommerce',
    icon: (
      <div className='flex space-x-2'>
        <FaLaravel className='text-red-600 text-4xl' />
        <FaVuejs className='text-green-500 text-4xl' />
      </div>
    ),
  },
  {
    title: 'Task Management App',
    description: 'A productivity tool for tracking tasks and goals.',
    image: '/projects/taskapp.png',
    link: 'https://example.com/taskapp',
    icon: <FaTasks className='text-gray-500 text-4xl' />,
  },
];

const SectionProjects = () => {
  const projectRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      projectRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <section
      id='projects'
      className='h-screen flex flex-col justify-center text-center px-4'
    >
      <h2 className='text-6xl font-bold text-gray-800 mb-6'>Projects</h2>
      <p className='text-lg text-gray-600 mb-10'>
        Here are some of the projects I have worked on:
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (projectRefs.current[index] = el)}
            className='relative bg-gray-100 rounded-lg shadow-md p-6 transition-all overflow-hidden hover:scale-105 hover:shadow-xl'
          >
            {/* Logo */}
            <div className='absolute top-4 right-4'>{project.icon}</div>

            {/* Gambar */}
            <img
              src={project.image}
              alt={project.title}
              className='rounded-md mb-4 w-full h-40 object-cover'
            />

            {/* Judul */}
            <h3 className='text-2xl font-semibold text-gray-800'>
              {project.title}
            </h3>

            {/* Deskripsi */}
            <p className='text-gray-600 mb-4'>{project.description}</p>

            {/* Tombol */}
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-all'
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionProjects;
