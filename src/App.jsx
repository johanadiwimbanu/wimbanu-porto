import RobotModel from './components/RobotModel';

function App() {
  const techStack = ['React', 'Three.js', 'Node.js', 'Laravel', 'Tailwind CSS'];

  return (
    <div className='relative font-orbitron bg-[#fcfcfc] overflow-hidden'>
      <div className='fixed top-0'>
        <RobotModel />
      </div>
      <section
        id='welcome'
        className='relative inset-0 z-10 flex flex-col items-center justify-center text-center h-screen'
      >
        <div className='relative'>
          {/* Teks utama dengan efek shadow yang halus */}
          <h1
            className='text-6xl md:text-8xl font-bold mb-4 text-[#373737]
            drop-shadow-lg'
          >
            Johan Adi Wimbanu
          </h1>

          <p className='text-2xl md:text-3xl text-[#373737] font-inter mb-4'>
            Web Developer | Crafting Digital Experiences
          </p>
          <p className='text-gray-600'>
            Transforming Ideas into Digital Reality
          </p>
        </div>
      </section>

      <Skills />

      <Projects />

      <section
        id='contact'
        className='bg-[#f2f2f2] h-screen flex flex-col justify-center text-center'
      >
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-4xl font-bold text-[#373737] mb-6'>
            Get in Touch
          </h2>
          <p className='text-lg text-gray-600 mb-8'>
            Let's connect! Feel free to reach out via email or follow me on
            social media.
          </p>

          {/* Email & Phone */}
          <div className='mb-6'>
            <p className='text-xl font-medium text-[#373737]'>
              📧{' '}
              <a
                href='mailto:johan@example.com'
                className='text-blue-600 hover:underline'
              >
                johan@example.com
              </a>
            </p>
            <p className='text-xl font-medium text-[#373737] mt-2'>
              📞{' '}
              <a
                href='tel:+6281234567890'
                className='text-blue-600 hover:underline'
              >
                +62 812-3456-7890
              </a>
            </p>
          </div>

          {/* Social Media Links */}
          <div className='flex justify-center space-x-6 mt-4'>
            <a
              href='https://linkedin.com/in/johan'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/icons/linkedin.svg'
                alt='LinkedIn'
                className='h-10 w-10 hover:opacity-80 transition-all'
              />
            </a>
            <a
              href='https://github.com/johan'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/icons/github.svg'
                alt='GitHub'
                className='h-10 w-10 hover:opacity-80 transition-all'
              />
            </a>
            <a
              href='https://twitter.com/johan'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src='/icons/twitter.svg'
                alt='Twitter'
                className='h-10 w-10 hover:opacity-80 transition-all'
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const Skills = () => {
  const skills = [
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'Three.js', icon: '/icons/threejs.svg' },
    { name: 'Node.js', icon: '/icons/nodejs.svg' },
    { name: 'Laravel', icon: '/icons/laravel.svg' },
    { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
  ];

  return (
    <section
      id='skills'
      className='bg-[#f8f8f8] h-screen flex flex-col justify-center text-center'
    >
      <h2 className='text-4xl font-bold text-[#373737] mb-6'>My Skills</h2>
      <p className='text-lg text-gray-600 mb-10'>
        Here are some of the technologies I work with:
      </p>

      <div className='flex flex-wrap justify-center gap-6'>
        {skills.map((skill, index) => (
          <div
            key={index}
            className='flex flex-col items-center p-4 bg-white shadow-md rounded-lg'
          >
            <img src={skill.icon} alt={skill.name} className='h-16 w-16 mb-3' />
            <span className='text-xl font-medium text-[#373737]'>
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

function Projects() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio built with React and Three.js.',
      image: '/projects/portfolio.png',
      link: 'https://example.com/portfolio',
    },
    {
      title: 'E-Commerce Platform',
      description: 'An online store powered by Laravel and Vue.js.',
      image: '/projects/ecommerce.png',
      link: 'https://example.com/ecommerce',
    },
    {
      title: 'Task Management App',
      description: 'A productivity tool for tracking tasks and goals.',
      image: '/projects/taskapp.png',
      link: 'https://example.com/taskapp',
    },
  ];

  return (
    <section
      id='projects'
      className=' bg-white h-screen flex flex-col justify-center text-center'
    >
      <h2 className='text-4xl font-bold text-[#373737] mb-6'>Projects</h2>
      <p className='text-lg text-gray-600 mb-10'>
        Here are some of the projects I have worked on:
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto'>
        {projects.map((project, index) => (
          <div
            key={index}
            className='bg-[#f8f8f8] rounded-lg shadow-md p-4 hover:scale-105 transition-all'
          >
            <img
              src={project.image}
              alt={project.title}
              className='rounded-md mb-4'
            />
            <h3 className='text-2xl font-semibold text-[#373737]'>
              {project.title}
            </h3>
            <p className='text-gray-600 mb-4'>{project.description}</p>
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-[#373737] text-white px-6 py-2 rounded-md hover:bg-[#222222] transition-all'
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
