import RobotModel from './components/RobotModel';

function App() {
  return (
    <>
      <RobotModel />
      <div className='h-[200vh] max-w-full overflow-x-hidden'>
        <div className='h-screen flex justify-center p-20 w-full'>
          <div className='text-9xl text-black font-orbitron font-black z-10'>
            Lets Scroll
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
