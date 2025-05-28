import gsap from 'gsap';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Navigation = ({ menuItems = [], setActiveMenu }) => {
  const menuRef = useRef(null);
  const iconMenuRef = useRef([]);
  const ulRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const items = iconMenuRef.current;

    // Set initial state
    // gsap.set(menu, {
    //   height: '5rem',
    //   width: '5rem',
    //   scale: 0.8,
    //   opacity: 0,
    // });

    // gsap.set(ulRef.current, {
    //   padding: '3rem 1rem',
    // });
    gsap.set(menu, {
      height: '2.5rem',
      width: '2.5rem',
      scale: 0.8,
      opacity: 0,
    });

    // gsap.set(ulRef.current, {
    //   padding: '2rem .5rem',
    // });

    items.forEach((item, index) => {
      gsap.set(item, {
        opacity: 0,
        display: 'none',
        y: 20,
      });
    });

    const tl = gsap.timeline({
      delay: 0.2,
    });

    tl.to(menu, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })
      .to(menu, {
        height: 'auto',
        width: 'auto',
        duration: 0.5,
        delay: 0.3,
        ease: 'power3.inOut',
      })
      .to(
        items,
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
      className='flex items-center opacity-0 justify-center 
      overflow-hiddens
      md:rounded-tr-4xl md:rounded-br-4xl 
      md:shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]
      shadow-[0px_-10px_60px_#bebebe,0px_10px_30px_#ffffff]
      w-full md:w-auto'
    >
      <ul
        ref={ulRef}
        className='flex md:flex-col  justify-around py-4 px-1 text-gray-600 md:gap-12 w-full md:w-auto'
      >
        {menuItems.map((item, index) => (
          <li
            key={index}
            ref={(el) => (iconMenuRef.current[index] = el)}
            onClick={() => {
              setActiveMenu(item.name);
              item.onSectionShow();
            }}
            className='cursor-pointer px-4 group transition-all duration-500 hover:text-orange-500'
          >
            <div className='relative flex items-center justify-center p-4 rounded-4xl bg-gray-100 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]'>
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
  setActiveMenu: PropTypes.func.isRequired,
};

export default Navigation;
