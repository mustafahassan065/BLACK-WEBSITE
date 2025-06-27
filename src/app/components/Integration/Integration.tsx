"use client"
import React, { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect';
import { ScrollParallax } from "react-just-parallax"
import data from '../../data/data.json';

const Integration = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagemove = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLElement | null>(null);
  const lightRef = useRef<HTMLElement | null>(null);
  const prevScrollY = useRef(0);
  const hasEnteredRef = useRef(false);

 

  //card ref itmes...
  const ImgRotate1 = useRef<HTMLDivElement | null>(null);
const ImgRotate2 = useRef<HTMLDivElement | null>(null);
const ImgRotate3 = useRef<HTMLDivElement | null>(null);
const ImgRotate4 = useRef<HTMLDivElement | null>(null);
const ImgRotate5 = useRef<HTMLDivElement | null>(null);
const ImgRotate6 = useRef<HTMLDivElement | null>(null);
const ImgRotate7 = useRef<HTMLDivElement | null>(null);
  //cards states...
  const [cardStyle1, setCardStyle1] = useState({});
  const [cardStyle2, setCardStyle2] = useState({});
  const [cardStyle3, setCardStyle3] = useState({});
  const [cardStyle4, setCardStyle4] = useState({});
  const [cardStyle5, setCardStyle5] = useState({});
  const [cardStyle6, setCardStyle6] = useState({});
  const [cardStyle7, setCardStyle7] = useState({});

  useEffect(() => {
    const scrollableDiv = document.getElementById("integration");
    const imageScrollBarPosition = document.getElementById(
      "imageScrollBarPosition"
    );
    let topPosition = 0;
    let element = scrollableDiv;
    let currentPosition = 100; // Start at initial transform value
    let targetPosition = 100; // Target position that will change with scroll
    let animationId: number | null = null;


    while (element) {
      topPosition += element.offsetTop;
      element = element.offsetParent as HTMLElement | null;

    }

    const initialTransform = 200;
    const slowFactor = 4; 

    const smoothAnimation = () => {
      const distance = targetPosition - currentPosition;

      if (Math.abs(distance) > 0.1) {
        currentPosition += distance * 0.1;

        if (imageScrollBarPosition) {
          imageScrollBarPosition.style.transform = `translateY(${currentPosition}px)`;
        }

        animationId = requestAnimationFrame(smoothAnimation);
      } else {
        animationId = null;

        if (imageScrollBarPosition) {
          imageScrollBarPosition.style.transform = `translateY(${targetPosition}px)`;
        }
      }
    };

    const handleScroll = function () {
      let offset = window.pageYOffset + 500; 

      if (offset >= topPosition) {
        let scrolledPastTop = offset - topPosition;

        targetPosition = initialTransform - scrolledPastTop / slowFactor;
        targetPosition = Math.max(targetPosition, -100);

        if (animationId === null) {
          animationId = requestAnimationFrame(smoothAnimation);
        }
      } else {
        targetPosition = initialTransform;

        if (animationId === null) {
          animationId = requestAnimationFrame(smoothAnimation);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Line with glow animation based on scroll
  
useEffect(() => {
  const line = lineRef.current;
  const light = lightRef.current;

  const handleScroll = () => {
    if (!line || !light) return;

    const lineRect = line.getBoundingClientRect();
    const lightRect = light.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < prevScrollY.current;

    const isLineFullyVisible =
      lineRect.top >= 0 && lineRect.bottom <= windowHeight;
    const isLightFullyVisible =
      lightRect.top >= 0 && lightRect.bottom <= windowHeight;

    const isInView =
      (lineRect.top < windowHeight && lineRect.bottom > 0) ||
      (lightRect.top < windowHeight && lightRect.bottom > 0);

    // ✅ Case 1: Fully entered and visible — lock default styles
    if (isLineFullyVisible && isLightFullyVisible) {
      if (!hasEnteredRef.current) {
        hasEnteredRef.current = true; // mark as fully entered
        line.style.width = "80%";
        light.style.opacity = "0.23";
        light.style.filter = "blur(90px)";
      }
    }

    // ✅ Case 2: Approaching (but not fully entered)
    else if (isInView && !hasEnteredRef.current) {
      line.style.width = "60%";
      light.style.opacity = "0";
      light.style.filter = "blur(0px)";
    }

    // ✅ Case 3: Scroll UP and leave from top — reset!
    else if (!isInView && isScrollingUp && hasEnteredRef.current) {
      hasEnteredRef.current = false; // allow reset next time
      line.style.width = "60%";
      light.style.opacity = "0";
      light.style.filter = "blur(0px)";
    }

    // ✅ Case 4: Scrolling down and leaving — do nothing, stay in peak
    prevScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



useEffect(() => {
  const container = containerRef.current as HTMLElement | null;
  const imageMove = imagemove.current as HTMLElement | null;

  setTimeout(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!container || !imageMove) return;
      const rect = container.getBoundingClientRect();
      const deltaX = e.clientX - (rect.left + rect.width / 2);

      imageMove.style.position = 'absolute';
      imageMove.style.top = '34%';
      imageMove.style.left = '51%';
      imageMove.style.transition = '.8s ease-in-out';
      imageMove.style.transform = `translate(${deltaX / 20}px, -50%)`;
    }

    function handleMouseLeave() {
      if (imageMove) {
        imageMove.style.transform = `translate(-50%, -50%)`;
      }
    }

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, 1800);
}, []);

  return (
    <section id="integration" data-section="Integration" className="section">
      <div
        data-w-id="c78f219d-acfe-cf0c-7273-cb7eb8df08a1"
        className="effortlessly-integration-section"
        ref={containerRef}
      >
        <div className="container">
          <div className="effortlessly-integration-container">
            <div className="center-title">
              <div className="title-holder">
                <div className="fade-in-move-on-scroll">
                  <h1 className="title">{data.integration_title_1}</h1>
                </div>
                <div className="fade-in-move-on-scroll">
                  <div className="experience-paragraph-holder">
                    <p>{data.integration_paragraph_1}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="effortlessly-integration-wrapper ">
          <div className="iphone-holder-effortlessly-integration">
            {/* <ScrollParallax
              shouldPause={false}
              strength={0.2} // Adjust this value to control the speed/distance
              direction="up" // Make it move up on scroll
              startScroll={0} // When to start the effect
              endScroll={800} // When to end the effect
            > */}
            <div
              id="imageScrollBarPosition"
              className="effortlessly-integration---iphone-holder"
            >
              <img
                src={data.integration_black_1}
                loading="eager"
                sizes="(max-width: 479px) 200px, (max-width: 991px) 319.9921875px, 429.9921875px"
                srcSet="https://assets.website-files.com/63aee5793ca698452efe7f60/63aefb47917c0cfa0943fc97_iPhone%2014%20Pro%20%E2%80%93%20Space%20Black-p-500.webp 500w, https://assets.website-files.com/63aee5793ca698452efe7f60/63aefb47917c0cfa0943fc97_iPhone%2014%20Pro%20%E2%80%93%20Space%20Black.webp 800w"
                alt=""
                className="iphone-image"
              />
              <div className="iphone-screen">
                <img
                  src={data.integration_black_2}
                  loading="eager"
                  alt=""
                  sizes="390.453125px"
                  srcSet="https://assets.website-files.com/63aee5793ca698452efe7f60/63aefd2632bfdbf4073fa431_Hero%20Iphone%20Image-p-500.webp 500w, https://assets.website-files.com/63aee5793ca698452efe7f60/63aefd2632bfdbf4073fa431_Hero%20Iphone%20Image.webp 729w"
                  className="iphone-screen-image"
                />
              </div>
              <div className="iphone-drop-shadow low"></div>
            </div>
            {/* </ScrollParallax> */}
          </div>
          <div className="logo-holder-effortlessly-integration" ref={imagemove}>
            <div
              className="w-full h-full justify-center align-middle"
              ref={ImgRotate1}
              style={{ perspective: "1000px" }}
            >
              <div className="logo-holder group relative" style={cardStyle1}>
                <img
                  src={data.integration_black_3}
                  loading="lazy"
                  alt=""
                  className="logo-image cursor-pointer w-[300px]"
                />
                <img
                  src={data.integration_black_31}
                  loading="lazy"
                  alt=""
                  className="logo-image blured absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30  "
                />
              </div>
            </div>
            <div
              className="w-full h-full justify-center align-middle"
              ref={ImgRotate2}
              style={{ perspective: "1000px" }}
            >
              <div className="logo-holder group relative" style={cardStyle2}>
                <img
                  src={data.integration_black_4}
                  loading="lazy"
                  alt=""
                  className="logo-image "
                />
                <img
                  src={data.integration_black_41}
                  loading="lazy"
                  alt=""
                  className="logo-image blured absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30 "
                />
              </div>
            </div>
            <div
              className="w-full h-full justify-center align-middle"
              ref={ImgRotate3}
              style={{ perspective: "1000px" }}
            >
              <div className="logo-holder group relative" style={cardStyle3}>
                <img
                  src={data.integration_black_5}
                  loading="lazy"
                  alt=""
                  className="logo-image "
                />
                <img
                  src={data.integration_black_6}
                  loading="lazy"
                  alt=""
                  className="logo-image blured absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30 "
                />
              </div>
            </div>
            <div
              className="w-full h-full justify-center align-middle"
              ref={ImgRotate4}
              style={{ perspective: "1000px" }}
            >
              <div className="logo-holder group relative" style={cardStyle4}>
                <img
                  src={data.integration_black_7}
                  loading="lazy"
                  alt=""
                  className="logo-image"
                />
                <img
                  src={data.integration_black_8}
                  loading="lazy"
                  alt=""
                  className="logo-image blured absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30 "
                />
              </div>
            </div>
            <div
              className="w-full h-full justify-center align-middle"
              ref={ImgRotate5}
              style={{ perspective: "1000px" }}
            >
              <div className="logo-holder group relative" style={cardStyle5}>
                <img
                  src={data.integration_black_9}
                  loading="lazy"
                  alt=""
                  className="logo-image "
                />
                <img
                  src={data.integration_black_10}
                  loading="lazy"
                  alt=""
                  className="logo-image blured absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30 "
                />
              </div>
            </div>
            <div
              className="w-full h-full justify-center align-middle"
              ref={ImgRotate6}
              style={{ perspective: "1000px" }}
            >
              <div className="logo-holder group relative" style={cardStyle6}>
                <img
                  src={data.integration_black_11}
                  loading="lazy"
                  alt=""
                  className="logo-image"
                />
                <img
                  src={data.integration_black_12}
                  loading="lazy"
                  alt=""
                  className="logo-image blured absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30 "
                />
              </div>
            </div>
            <div
              className="w-full h-full justify-center align-middle"
              ref={ImgRotate7}
              style={{ perspective: "1000px" }}
            >
              <div className="logo-holder group relative" style={cardStyle7}>
                <img
                  src={data.integration_black_13}
                  loading="lazy"
                  alt=""
                  className="logo-image "
                />
                <img
                  src={data.integration_black_14}
                  loading="lazy"
                  alt=""
                  className="logo-image blured absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30 "
                />
              </div>
            </div>
          </div>
          <div className="light-holder" ref={lightRef}></div>
          <div className="workflow-section">
            <div className="fade-in-move-on-scroll">
              <div className="card-title">{data.integration_black_title}</div>
            </div>
            <div className="fade-in-move-on-scroll">
              <div className="experience-paragraph-holder">
                <p>{data.integration_paragraph_2}</p>
              </div>
            </div>
            <div className="line" ref={lineRef}></div>




          </div>
        </div>
      </div>
    </section>
  );
}

export default Integration