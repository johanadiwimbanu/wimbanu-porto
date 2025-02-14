import gsap from 'gsap';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Navigation = ({ menuItems = [] }) => {
  const menuRef = useRef(null);
  const iconMenuRef = useRef([]);
  const ulRef = useRef(null);

  // Handle hover animations
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

  // Handle menu show/hide animation
  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const items = iconMenuRef.current;

    // Set initial state - semua elemen harus diset di awal
    gsap.set(menu, {
      height: '5rem',
      width: '5rem',
      scale: 0.8, // Mulai sedikit lebih kecil
      opacity: 0,
    });

    // Set initial state untuk ul container
    gsap.set(ulRef.current, {
      padding: '3rem 1rem',
    });

    // Set initial state untuk semua items
    items.forEach((item, index) => {
      if (index === 0) {
        gsap.set(item, {
          opacity: 1,
          scale: 1,
          y: 0,
        });
      } else {
        gsap.set(item, {
          opacity: 0,
          display: 'none',
          y: 20, // Mulai dari bawah untuk efek slide up
        });
      }
    });

    // Create animation timeline
    const tl = gsap.timeline({
      delay: 0.2,
    });

    tl.to(menu, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)', // Memberikan efek bounce ringan
    })
      .to(menu, {
        height: 'auto',
        width: 'auto',
        duration: 0.5,
        delay: 0.3,
        ease: 'power3.inOut',
      })
      .to(
        items.slice(1),
        {
          opacity: 1,
          display: 'block',
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      );
  }, []);

  return (
    <nav
      ref={menuRef}
      className='flex items-center opacity-0 justify-center bg-black  overflow-hidden rounded-full shadow-2xl border border-cyan-300'
    >
      <ul ref={ulRef} className='flex flex-col text-gray-300  gap-12'>
        {menuItems.map((item, index) => (
          <li
            key={index}
            ref={(el) => (iconMenuRef.current[index] = el)}
            className='cursor-pointer group transition-transform duration-300 hover:text-cyan-400 hover:scale-110 hover:translate-x-1'
          >
            <div className='relative flex items-center justify-center'>
              {item.icon}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  menuItems: PropTypes.array,
  isMenuShow: PropTypes.bool,
};

export default Navigation;
