'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MouseParallax } from 'react-just-parallax'
import data from '../../data/data.json'

const Hero = () => {
  const heroTextHolderRef = useRef<HTMLDivElement | null>(null);
  const meetTextRef = useRef<HTMLDivElement | null>(null);
  const blackTextRef = useRef<HTMLDivElement | null>(null);
  const iphoneImageref = useRef<HTMLDivElement | null>(null);
  const logosSectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

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
      if (!container || !text || !iphoneImageRef) return;
      if (window.innerWidth <= 768) return;

      const rect = container.getBoundingClientRect();
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
    <section className="section" ref={containerRef}>
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

            <div className="iphone-holder" ref={iphoneImageref} style={{ marginTop: '60px' }}>
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
                <form id="email-form" name="email-form" method="get">
                  <div className="from-holder">
                    <input className="text-field-form w-input" maxLength={256} name="email" placeholder="Enter Your Email" type="email" required />
                    <input type="submit" className="button from w-button" value="Start Free Trial" />
                  </div>
                </form>
                <div className="success-message w-form-done">
                  <div>{data.hero_form_success}</div>
                </div>
                <div className="error-message w-form-fail">
                  <div>{data.hero_form_error}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="logo-grid-holder" id='logo-grid-holder' ref={logosSectionRef}>
          <div className="w-layout-grid logo-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="logo-small-container">
                <img
                  src={data[`hero_logo_${i + 1}`]}
                  loading="lazy"
                  alt=""
                  className="logo-small"
                />
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
