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

    // Animate text change
    gsap.fromTo(
      dialogContentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
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
    <div className='relative min-w-52 max-w-80 pb-12 p-4 bg-black border-2 border-cyan-300 min-h-32 rounded-2xl shadow-lg'>
      <div ref={dialogContentRef}>
        <p
          className='text-lg text-white font-mono min-h-16'
          dangerouslySetInnerHTML={{ __html: displayText || '...' }}
        />
      </div>

      <div className='absolute bottom-2 right-2 flex gap-2'>
        {!isComplete && (
          <button
            onClick={handleSkip}
            className='px-4 py-1 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors'
          >
            Skip
          </button>
        )}
        {isComplete && (
          <button
            onClick={onNext}
            className='px-4 py-1 bg-cyan-300 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors'
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
