import gsap from 'gsap';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

const GameDialog = ({ text, onNext }) => {
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

    // Enhanced neumorphic animation
    gsap.fromTo(
      dialogContentRef.current,
      {
        opacity: 0,
        y: 10,
        boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
      },
      {
        opacity: 1,
        y: 0,
        boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
        duration: 0.5,
        ease: 'power2.out',
      }
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
    <div className='relative min-w-52 max-w-80'>
      <div
        ref={dialogContentRef}
        className='p-4 rounded-xl bg-gray-100 
                   shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] pb-12'
      >
        <p
          className='text-lg text-gray-700 font-mono min-h-16'
          dangerouslySetInnerHTML={{ __html: displayText || '...' }}
        />
      </div>

      <div className='absolute bottom-4 right-4 flex gap-3'>
        {!isComplete && (
          <button
            onClick={handleSkip}
            className='px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl
                       shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]
                       hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]
                       transition-all duration-500'
          >
            Skip
          </button>
        )}
        {isComplete && (
          <button
            onClick={onNext}
            className='px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl
                       shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]
                       hover:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]
                       hover:text-cyan-500 transition-all duration-500'
          >
            ▶ Next
          </button>
        )}
      </div>
    </div>
  );
};

GameDialog.propTypes = {
  text: PropTypes.string,
  onNext: PropTypes.func,
};

export default GameDialog;
