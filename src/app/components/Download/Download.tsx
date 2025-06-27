"use client";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { isMobile } from "react-device-detect";
import data from "../../data/data.json";

const Download = () => {
    const mainDivRef = useRef<HTMLDivElement>(null);
    const stickyImageRef = useRef<HTMLDivElement>(null);
    const [revealPercentage, setRevealPercentage] = useState(0);
    const [revealPx, setRevealPx] = useState(0);
    const [phoneHeightState, setPhoneHeightState] = useState(0);
    const [parallaxOffset, setParallaxOffset] = useState(0);

    useEffect(() => {
        const scrollableDiv = mainDivRef.current;
        const stickyDiv = stickyImageRef.current;
        if (!scrollableDiv || !stickyDiv) return;

        const handleScroll = () => {
            const rect = scrollableDiv.getBoundingClientRect();
            const stickyRect = stickyDiv.getBoundingClientRect();
            const phoneHeight = stickyRect.height;
            setPhoneHeightState(phoneHeight);
            const phoneTop = stickyRect.top;
            const phoneBottom = phoneTop + phoneHeight;

            // Calculate parallax offset for background
            const scrollYForParallax = window.scrollY;
            const parallaxSpeed = 0.8; // Parallax intensity
            setParallaxOffset(scrollYForParallax * parallaxSpeed);

            // Calculate section heights
            const totalHeight = rect.height;
            const whiteBackgroundStart = totalHeight * 0.4169999; // Start of white section
            const whiteBackgroundHeight = totalHeight * 0.60; // Height of white section

            // Get the top of the white background relative to the viewport
            const whiteBgTop = rect.top + whiteBackgroundStart;

            // Calculate the distance from the top of the phone to the top of the white background
            const revealPxRaw = phoneBottom - whiteBgTop;
            // Clamp between 0 and phoneHeight with a small offset for perfect alignment
            const revealPxClamped = Math.max(0, Math.min(revealPxRaw + 2, phoneHeight));
            setRevealPx(revealPxClamped);

            // Start reveal when top of white bg touches bottom of phone
            if (whiteBgTop <= phoneBottom && whiteBgTop >= phoneBottom - whiteBackgroundHeight) {
                const distanceIntoWhite = phoneBottom - whiteBgTop;
                const percentage = Math.min(100, Math.max(0, (distanceIntoWhite / whiteBackgroundHeight) * 100));
                setRevealPercentage(percentage);
            } else if (whiteBgTop < phoneBottom - whiteBackgroundHeight) {
                setRevealPercentage(100);
            } else {
                setRevealPercentage(0);
            }

            // Sticky behavior
            const sectionTopFromPage = scrollableDiv.offsetTop;
            const scrollY = window.scrollY;

            if (isMobile) {
                if (scrollY > sectionTopFromPage) {
                    stickyDiv.classList.add("stickyForMObile");
                } else {
                    stickyDiv.classList.remove("stickyForMObile");
                }
            } else {
                if (scrollY > sectionTopFromPage) {
                    stickyDiv.classList.add("sticky");
                } else {
                    stickyDiv.classList.remove("sticky");
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="download" data-section="Download" className="section">
            <div className="container">
                <div className="effortlessly-integration-container">
                    <div className="center-title">
                        <div className="title-holder">
                            <div className="fade-in-move-on-scroll">
                                <h1 className="title">{data.downloads_total}</h1>
                            </div>
                            <div className="fade-in-move-on-scroll">
                                <div className="experience-paragraph-holder">
                                    <p>{data.downloads_paragraph}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="download-badge-holder">
                        <div className="download-badge-container">
                            <a
                                href="http://applestore.com"
                                target="_blank"
                                className="download-badge-button w-inline-block"
                            >
                                <img
                                    src={data.downloads_google}
                                    loading="lazy"
                                    alt=""
                                    className="download-badge-image"
                                />
                            </a>
                            <a
                                href="http://googleplay.com"
                                target="_blank"
                                className="download-badge-button w-inline-block"
                            >
                                <img
                                    src={data.downloads_google2}
                                    loading="lazy"
                                    alt=""
                                    className="download-badge-image"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Section with Sticky Phone Reveal */}
            <div className="h-[230vh] relative scroll-smooth" ref={mainDivRef} style={{ scrollBehavior: 'smooth' }}>
                <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0">
                    <div className="w-full h-[42%] bg-black transition-colors "></div>
                    <div className="w-full h-[60%] bg-white transition-colors"></div>
                </div>

                <div
                    className="absolute top-[65px] left-0 right-0 grid justify-center"
                    ref={stickyImageRef}
                >
                    <div className="translate-y-[-3.6px] [@media(min-width:479px)]:translate-y-[-5px] relative">
                        <div id="getImageBackgroundCOlorName" className="relative">
                            <img
                                src={data.downlaods_phone}
                                loading="eager"
                                sizes="(max-width: 479px) 350px, 400px"
                                srcSet="
                                        https://assets.website-files.com/63aee5793ca698452efe7f60/63b5761b8fb633b42f3ad6c4_Iphone%20In%20Hand-p-500.webp 500w,
                                        https://assets.website-files.com/63aee5793ca698452efe7f60/63b5761b8fb633b42f3ad6c4_Iphone%20In%20Hand-p-800.webp 800w,
                                        https://assets.website-files.com/63aee5793ca698452efe7f60/63b5761b8fb633b42f3ad6c4_Iphone%20In%20Hand.webp 848w"
                                alt="Phone frame"
                                className="relative z-10"
                            />
                            
                            <div className="dark-mode-app-holder overflow-hidden absolute top-0 left-0 w-full h-full">
                                <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: '10% 5% 0% 10%' }}>
                                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                                        <img
                                            src={data.iphone_screen}
                                            alt="App black screen"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div
                                        className="absolute inset-0 w-full h-full overflow-hidden"
                                        style={{
                                            clipPath: `inset(${phoneHeightState - revealPx}px 0 0 0)`,
                                            transition: 'none'
                                        }}
                                    >
                                        <img
                                            src={data.iphone_screen_2}
                                            alt="App white screen"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Download;
