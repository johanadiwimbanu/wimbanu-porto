import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Navigation = ({ menuItems = [], isMenuShow = false }) => {
  const menuRef = useRef(null);
  const iconMenuRef = useRef([]);
  useEffect(() => {
    iconMenuRef.current.forEach((el) => {
      if (el) {
        gsap.set(el, { scale: 1, x: 0 });

        el.addEventListener('mouseenter', () => {
          gsap.to(el, {
            scale: 1.15,
            x: 2.5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, x: 0, duration: 0.3, ease: 'power2.out' });
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!menuRef.current && menuRef.current.hasChildNodes()) return;
    if (isMenuShow) {
      // Set initial circular state
      gsap.set(menuRef.current, {
        height: '64px',
        padding: '10px',
        opacity: 0,
      });

      // Create animation timeline
      const tl = gsap.timeline({
        delay: 0.5,
      });

      // First show the circular shape
      tl.to(menuRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.in',
      })
        // Then expand to full size
        .to(menuRef.current, {
          height: 'auto',
          padding: '2rem 1rem',
          duration: 0.8,
          delay: 1.5,
          ease: 'expo.in',
        });
    }
  }, [isMenuShow]);
  return (
    <nav
      ref={menuRef}
      className='flex items-start opacity-0 bg-white/90 overflow-hidden absolute top-1/2 left-10 -translate-y-1/2 backdrop-blur-xl rounded-full shadow-xl border-2 border-orange-500'
    >
      <ul className='flex flex-col space-y-8 text-orange-500'>
        {menuItems.map((item, index) => (
          <li
            key={index}
            ref={(el) => (iconMenuRef.current[index] = el)}
            className='cursor-pointer group transition-transform duration-300 hover:text-orange-700 hover:scale-110 hover:translate-x-1'
          >
            <div className='relative flex items-center justify-center'>
              {item.icon}
              {/* Indikator Aktif */}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
