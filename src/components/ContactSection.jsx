import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  GiMailbox,
  GiSmartphone,
  GiPositionMarker,
  GiSwordsPower,
  GiShieldBash,
  GiLightningBow,
  GiWolfHead,
  GiSpellBook,
} from 'react-icons/gi';
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuLinkedin,
  LuGithub,
  LuTwitter,
  LuInstagram,
  LuSend,
  LuUser,
  LuMessageSquare,
} from 'react-icons/lu';

const ContactSection = ({
  contactInfo = {
    email: 'johanadiwimbanu@gmail.com',
    phone: '+689 610 378 655',
    location: 'Bantul, DI Yogyakarta, Indonesia',
    availability: 'Available for new battles',
  },
  socialLinks = [
    {
      platform: 'LinkedIn',
      icon: LuLinkedin,
      url: 'https://www.linkedin.com/in/johan-adi-wimbanu-1b0a2b27a/',
      color: 'from-blue-500 to-blue-600',
    },
    {
      platform: 'GitHub',
      icon: LuGithub,
      url: 'https://github.com/johanadiwimbanu',
      color: 'from-gray-700 to-gray-800',
    },
    {
      platform: 'Instagram',
      icon: LuInstagram,
      url: 'https://www.instagram.com/_awjohn/',
      color: 'from-pink-500 to-purple-600',
    },
  ],
  className = '',
}) => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contactCardRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef([]);
  const contactItemRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactItems = [
    {
      icon: LuMail,
      title: 'Email Spell',
      value: contactInfo.email,
      description: 'Send me a magical message',
      bgIcon: GiMailbox,
    },
    {
      icon: LuPhone,
      title: 'Battle Horn',
      value: contactInfo.phone,
      description: 'Call for immediate assistance',
      bgIcon: GiSmartphone,
    },
    {
      icon: LuMapPin,
      title: 'Wolf Den',
      value: contactInfo.location,
      description: 'Current location',
      bgIcon: GiPositionMarker,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headerRef.current, contactCardRef.current, formRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(contactItemRefs.current, {
        opacity: 0,
        x: -30,
        scale: 0.9,
      });

      gsap.set(socialRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 180,
      });

      // Main timeline
      const tl = gsap.timeline();

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.2)',
      })
        .to(
          contactCardRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .to(
          contactItemRefs.current,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.1)',
          },
          '-=0.3'
        )
        .to(
          formRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.5)',
          },
          '-=0.1'
        );

      // Floating animation for contact items
      contactItemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.to(item, {
            y: Math.sin(index) * 5,
            duration: 3 + index * 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut',
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button animation
    gsap.to(e.target.querySelector('button[type="submit"]'), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    const recipient = 'johanadiwimbanu@gmail.com';
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Halo, saya ${formData.name} (${formData.email}).\n\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    // Success animation
    gsap.to(formRef.current, {
      scale: 1.02,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleSocialHover = (index, isEntering) => {
    if (socialRef.current[index]) {
      gsap.to(socialRef.current[index], {
        scale: isEntering ? 1.1 : 1,
        rotation: isEntering ? 15 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleContactItemHover = (index, isEntering) => {
    if (contactItemRefs.current[index]) {
      gsap.to(contactItemRefs.current[index], {
        scale: isEntering ? 1.02 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-7xl mx-auto px-6 py-12 ${className}`}
    >
      {/* Header */}
      <div ref={headerRef} className='text-center mb-12'>
        <div className='inline-flex items-center gap-3 mb-4'>
          <div className='bg-gray-100 p-3 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]'>
            <GiSwordsPower className='w-8 h-8 text-gray-700' />
          </div>
          <h2 className='text-5xl font-bold text-gray-800'>Call to Arms</h2>
        </div>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed'>
          Ready to embark on a new quest? Send me a message and let's forge
          something legendary together. The Wolf is always ready for the next
          battle!
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        {/* Contact Information */}
        <div ref={contactCardRef} className='space-y-8'>
          {/* Availability Status */}
          <div className='bg-gray-100 rounded-3xl p-6 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] relative overflow-hidden'>
            <div className='absolute top-4 right-4'>
              <GiWolfHead className='w-16 h-16 text-gray-200 opacity-50' />
            </div>
            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='bg-green-100 p-2 rounded-xl shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]'>
                  <GiShieldBash className='w-5 h-5 text-green-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-800'>
                  Battle Status
                </h3>
              </div>
              <p className='text-gray-600 mb-3'>{contactInfo.availability}</p>
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[2px_2px_4px_#bebebe,-2px_-2px_4px_#ffffff]'></div>
                <span className='text-green-600 font-semibold text-sm'>
                  Online & Ready
                </span>
              </div>
            </div>
          </div>

          {/* Contact Items */}
          <div className='space-y-4'>
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const BgIcon = item.bgIcon;

              return (
                <div
                  key={index}
                  ref={(el) => (contactItemRefs.current[index] = el)}
                  className='bg-gray-100 rounded-2xl p-6 shadow-[12px_12px_24px_#bebebe,-12px_-12px_24px_#ffffff] hover:shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] transition-all duration-300 cursor-pointer relative overflow-hidden group'
                  onMouseEnter={() => handleContactItemHover(index, true)}
                  onMouseLeave={() => handleContactItemHover(index, false)}
                >
                  <div className='absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity'>
                    <BgIcon className='w-12 h-12 text-gray-400' />
                  </div>
                  <div className='relative z-10'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-gray-100 p-3 rounded-xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] group-hover:shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] transition-all duration-300'>
                        <Icon className='w-5 h-5 text-gray-700' />
                      </div>
                      <div className='flex-1'>
                        <h4 className='text-lg font-bold text-gray-800 mb-1'>
                          {item.title}
                        </h4>
                        <p className='text-gray-600 font-medium mb-1'>
                          {item.value}
                        </p>
                        <p className='text-gray-500 text-sm'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className='bg-gray-100 rounded-2xl p-6 shadow-[12px_12px_24px_#bebebe,-12px_-12px_24px_#ffffff]'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-gray-100 p-2 rounded-xl shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]'>
                <GiSpellBook className='w-5 h-5 text-gray-700' />
              </div>
              <h3 className='text-lg font-bold text-gray-800'>
                Social Portals
              </h3>
            </div>
            <div className='flex gap-4'>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <button
                    key={index}
                    ref={(el) => (socialRef.current[index] = el)}
                    className={`bg-gray-100 p-3 rounded-xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] transition-all duration-300 group relative overflow-hidden`}
                    onMouseEnter={() => handleSocialHover(index, true)}
                    onMouseLeave={() => handleSocialHover(index, false)}
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                    <Icon className='w-5 h-5 text-gray-700 group-hover:text-gray-800 transition-colors relative z-10' />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          ref={formRef}
          className='bg-gray-100 rounded-3xl p-8 shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff] relative overflow-hidden'
        >
          <div className='absolute top-6 right-6 opacity-10'>
            <GiLightningBow className='w-20 h-20 text-gray-400' />
          </div>

          <div className='relative z-10'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='bg-gray-100 p-3 rounded-xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]'>
                <LuMessageSquare className='w-6 h-6 text-gray-700' />
              </div>
              <h3 className='text-2xl font-bold text-gray-800'>Send Message</h3>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name Input */}
              <div>
                <label className='block text-gray-700 font-semibold mb-2 text-sm'>
                  Warrior Name *
                </label>
                <div className='relative'>
                  <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                    <LuUser className='w-5 h-5 text-gray-500' />
                  </div>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className='w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] border-none outline-none text-gray-800 placeholder-gray-500 focus:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-300'
                    placeholder='Enter your name'
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className='block text-gray-700 font-semibold mb-2 text-sm'>
                  Magic Portal (Email) *
                </label>
                <div className='relative'>
                  <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                    <LuMail className='w-5 h-5 text-gray-500' />
                  </div>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] border-none outline-none text-gray-800 placeholder-gray-500 focus:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-300'
                    placeholder='your.email@domain.com'
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label className='block text-gray-700 font-semibold mb-2 text-sm'>
                  Quest Title *
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-4 bg-gray-100 rounded-xl shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] border-none outline-none text-gray-800 placeholder-gray-500 focus:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-300'
                  placeholder="What's your project about?"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className='block text-gray-700 font-semibold mb-2 text-sm'>
                  Battle Plan *
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full px-4 py-4 bg-gray-100 rounded-xl shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] border-none outline-none text-gray-800 placeholder-gray-500 focus:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 resize-none'
                  placeholder='Tell me about your project, timeline, budget, and any specific requirements...'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-gray-100 shadow-[12px_12px_24px_#bebebe,-12px_-12px_24px_#ffffff] hover:shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] active:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg relative overflow-hidden group'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
                <div className='relative z-10 flex items-center gap-3'>
                  {isSubmitting ? (
                    <>
                      <div className='w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin'></div>
                      Sending Battle Cry...
                    </>
                  ) : (
                    <>
                      <LuSend className='w-5 h-5' />
                      Launch Attack!
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Additional Info */}
            <div className='mt-8 p-4 bg-gray-100 rounded-xl shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]'>
              <div className='flex items-start gap-3'>
                <GiWolfHead className='w-5 h-5 text-orange-500 mt-1 flex-shrink-0' />
                <div>
                  <p className='text-gray-700 text-sm font-semibold mb-1'>
                    Quick Response Guarantee
                  </p>
                  <p className='text-gray-600 text-xs leading-relaxed'>
                    I typically respond within 24 hours. For urgent battles,
                    feel free to call the Battle Horn directly!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className='text-center mt-16'>
        <div className='bg-gray-100 rounded-3xl p-8 shadow-[20px_20px_40px_#bebebe,-20px_-20px_40px_#ffffff] max-w-2xl mx-auto relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50'></div>
          <div className='relative z-10'>
            <GiWolfHead className='w-16 h-16 text-gray-600 mx-auto mb-4' />
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>
              Ready to Build Something Epic?
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Whether it's a simple website or a complex web application, I'm
              here to turn your ideas into reality. Let's create something that
              will make your competitors howl with envy! 🐺
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
