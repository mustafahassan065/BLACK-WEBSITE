'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MouseParallax } from 'react-just-parallax'
import data from '../../data/data.json'

const Hero = () => {
  const heroTextHolderRef = useRef(null);
  const meetTextRef = useRef(null);
  const blackTextRef = useRef(null);
  const iphoneImageref = useRef(null);
  const logosSectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      const tl = gsap.timeline();

      gsap.fromTo(containerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      tl.fromTo(
        [meetTextRef.current, blackTextRef.current],
        { scale: 0 },
        { scale: 1.05, duration: 0.5, ease: "power4.out" }
      );

      tl.fromTo(
        meetTextRef.current,
        { y: -50, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.6, ease: "power4.out" },
        "+=0.3"
      );

      tl.fromTo(
        blackTextRef.current,
        { y: -50, opacity: 0, rotationX: -90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.6, ease: "power4.out" },
        "-=0.8"
      );

      tl.to(
        [meetTextRef.current, blackTextRef.current],
        { scale: 0.9, duration: 1.5, ease: "power4.out" },
        "-=0.6"
      );

      tl.fromTo(
        iphoneImageref.current,
        { y: 200, opacity: 0 },
        { y: 10, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=1"
      );
    });
  }, []);
  useEffect(() => {
  const container = containerRef.current;
  const text = textRef.current;
  const iphoneImageRef = iphoneImageref.current;

  const handleMouseMove = (e: MouseEvent) => {
    if (window.innerWidth <= 768) return;

    const rect = container?.getBoundingClientRect();
    if (!rect || !text || !iphoneImageRef) return;

    const deltaX = e.clientX - (rect.left + rect.width / 2);

    gsap.to(text, {
      x: -(deltaX / 60),
      duration: 0.3,
      ease: 'power3.out',
    });

    gsap.to(iphoneImageRef, {
      x: deltaX / 40,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const resetMouseEffects = () => {
    gsap.to([text, iphoneImageRef], {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  container?.addEventListener('mousemove', handleMouseMove);
  container?.addEventListener('mouseleave', resetMouseEffects);

  return () => {
    container?.removeEventListener('mousemove', handleMouseMove);
    container?.removeEventListener('mouseleave', resetMouseEffects);
  };
}, []);


  return (
    <section data-w-id="bbb1681c-62a0-7375-a529-1c7bec5a4a0e" className="section " ref={containerRef}>
      <div className='container no-paddings'>
        <div className='hero-section'>
          <div className="hero-section-text-holder" ref={heroTextHolderRef}>
            <div className="hero-section-sticky">
              <div className="hero-sticky-holder">
                <div className="hero-text-holder" ref={textRef}>
                  <div className="hero-text-wrapper _01" ref={meetTextRef}>
                    <div className="hero-text">{data.hero_text1}</div>
                    <div className="hero-text-blur">{data.hero_text1_blur}</div>
                  </div>
                  <div className="hero-text-wrapper _02" ref={blackTextRef}>
                    <div className="hero-text _02">{data.hero_text2}</div>
                    <div className="hero-text-blur">{data.hero_text2_blur}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="iphone-holder " ref={iphoneImageref} style={{ marginTop: '60px' }}>
              <img 
                src={data.iphone_cover}
                loading="lazy" 
                alt="" 
                className="iphone-image"
              />
              <div className="iphone-screen">
                <img 
                  src={data.iphone_screen}
                  loading="lazy" 
                  alt="" 
                  className="iphone-screen-image"
                />
              </div>
              <div className="iphone-drop-shadow"></div>
            </div>
          </div>

          <div className="hero-section-paragraph-holder">
            <div className="hero-paragraph-holder">
              <p>{data.hero_paragraph_1}</p>
            </div>
            <div className="from-wra-er">
              <div className="form-block w-form">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" aria-label="Email Form">
                  <div className="from-holder">
                    <input className="text-field-form w-input" maxLength={256} name="email-2" data-name="Email 2" placeholder="Enter Your Email" type="email" id="email-2" required />
                    <input type="submit" data-wait="Please wait..." className="button from w-button" value="Start Free Trial" />
                  </div>
                </form>
                <div className="success-message w-form-done" role="region" aria-label="Email Form success">
                  <div>{data.hero_form_success}</div>
                </div>
                <div className="error-message w-form-fail" role="region" aria-label="Email Form failure">
                  <div>{data.hero_form_error}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="logo-grid-holder" id='logo-grid-holder' ref={logosSectionRef}>
          <div className="w-layout-grid logo-grid">
            {[data.hero_logo_1, data.hero_logo_2, data.hero_logo_3, data.hero_logo_4, data.hero_logo_5, data.hero_logo_6, data.hero_logo_7, data.hero_logo_8].map((logo, i) => (
              <div key={i} className="logo-small-container">
                <img src={logo} loading="lazy" alt="" className="logo-small" />
              </div>
            ))}
          </div>
          <div className="fade-in-move-on-scroll">
            <p>{data.hero_trusted}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
