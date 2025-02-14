import { GiWolfHead } from 'react-icons/gi';

export default function About() {
  return (
    <section id='about' className='absolute top-1/2 -translate-y-1/2 right-8'>
      <div className='bg-black text-white max-w-lg mx-auto rounded-lg overflow-hidden shadow-md shadow-cyan-300'>
        {/* Profile Header */}
        <div className='p-4 flex items-center gap-2 border-b border-cyan-500'>
          <img
            src='https://images.unsplash.com/photo-1423479185712-25d4a4fe1006?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Profile'
            className='w-16 h-16 rounded-full border border-cyan-500'
          />
          <span className='text-2xl font-semibold'>Johan Adi Wimbanu</span>
        </div>

        {/* Prestige Section */}
        <div className='relative flex flex-col justify-center items-center gap-2 w-full min-h-64'>
          <div className='flex items-center'>
            <GiWolfHead className='w-16 h-16' />

            <div className='text-2xl font-black'>Web Developer</div>
          </div>

          <button className='bg-white cursor-pointer text-sm text-black px-4 py-2 rounded font-semibold'>
            Full Stats
          </button>
        </div>

        {/* Stats Section */}
        <div className='flex justify-around p-4 bg-gray-900'>
          <div className='text-center'>
            <p className='text-xl font-bold'>5Y +</p>
            <p className='text-sm text-gray-400'>Experience</p>
          </div>
          <div className='text-center'>
            <p className='text-xl font-bold'>3+</p>
            <p className='text-sm text-gray-400'>Programing Lang</p>
          </div>
          <div className='text-center'>
            <p className='text-xl font-bold'>8.73</p>
            <p className='text-sm text-gray-400'>Creativity</p>
          </div>
        </div>

        {/* Text Section (Replacing Match Review) */}
        <div className='p-4 text-sm text-gray-300'>
          <p className='font-semibold text-lg'>Player performance overview:</p>
          <p>
            Continuously delivering high-quality web applications, ensuring a
            seamless user experience. Progressing steadily in mastering modern
            technologies and optimizing development workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
