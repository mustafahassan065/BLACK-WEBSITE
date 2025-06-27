"use client";
import React, { useState, useEffect, useRef } from "react";
import data from "../../data/data.json";
import "./style.css";
import { isMobile } from "react-device-detect";

const Header = () => {
  const [openMobileNavbar, setOpenMobileNavBar] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // ✅ Fix: Properly typed ref for array of HTMLElements
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("section[data-section]")
    ) as HTMLElement[];

    sectionsRef.current = sections;

    const observer = new IntersectionObserver(
      (entries) => {
        let newActiveSection = activeSection;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId) {
              newActiveSection = sectionId;
            }
          }
        });

        setActiveSection(newActiveSection);
      },
      { threshold: [0.3, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const firstSectionTop = sections[0]?.getBoundingClientRect().top || 0;
      if (firstSectionTop > window.innerHeight * 0.4) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      sectionsRef.current.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("main-Id-For-Header")?.classList.remove("hidden");
    }, 1600);
  }, []);

  const handleScrollToSection = (section: string) => {
    const targetSection = document.querySelector(
      `section[data-section="${section}"]`
    );
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      setActiveSection(section);
    }
    if (openMobileNavbar) {
      setOpenMobileNavBar(false);
    }
  };

  const navItems = ["Experience", "Integration", "Features", "Download"];

  return (
    <header
      className="fixed top-0 left-0 right-0 m-auto z-50 hidden transition-all ease-in-out duration-200"
      id="main-Id-For-Header"
    >
      <div
        data-animation="default"
        className="navbar w-nav"
        data-easing2="ease"
        data-easing="ease"
        data-collapse="medium"
        role="banner"
        data-no-scroll="1"
        data-duration="500"
        data-doc-height="1"
      >
        <div className="container nav-container">
          <div className="nav-menu-container flex items-center gap-6 justify-between">
            <a
              href="/"
              aria-current="page"
              className="brand w-nav-brand w--current mr-6"
              aria-label="home"
            >
              <img
                src={data.header_logo}
                loading="lazy"
                alt=""
                className="brand-image"
              />
            </a>

            <nav
              role="navigation"
              className="nav-menu w-nav-menu hidden md:flex gap-6"
            >
              {navItems.map((section) => (
                <div className="nav-link-active-holder" key={section}>
                  <button
                    className={`nav-link-holder w-inline-block ${
                      activeSection === section ? "w--current" : ""
                    }`}
                    onClick={() => handleScrollToSection(section)}
                  >
                    <div className="nav-link-text-holder">
                      <div className="nav-link-text">{section}</div>
                    </div>
                  </button>
                </div>
              ))}
              <div className="nav-button-holder">
                <button
                  className="button navbar-button w-button"
                  onClick={() => handleScrollToSection("sign-up")}
                >
                  {data.header_button_1}
                </button>
              </div>
            </nav>

            <div
              className="menu-button w-nav-button cursor-pointer"
              aria-label="menu"
              role="button"
              tabIndex={0}
              aria-controls="w-nav-overlay-0"
              aria-haspopup="menu"
              onClick={() => setOpenMobileNavBar(!openMobileNavbar)}
            >
              <div className="center-box">
                <img src={data.header_menu} loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {openMobileNavbar && (
        <div className="fixed top-16 left-0 w-[70%] bg-black shadow-lg z-500000 py-4 rounded-lg">
          <nav role="navigation" className="flex flex-col items-center space-y-1">
            {navItems.map((section) => (
              <div className="nav-link-active-holder" key={section}>
                <button
                  className={`nav-link-holder w-inline-block bg-black ${
                    activeSection === section ? "w--current" : ""
                  }`}
                  onClick={() => handleScrollToSection(section)}
                >
                  <div className="nav-link-text-holder">
                    <div className="nav-link-text font-medium text-lg bg-gray-900 text-white rounded-xl px-3 py-1 hover:bg-gray-800 transition duration-200 ease-in-out">
                      {section}
                    </div>
                  </div>
                </button>
              </div>
            ))}
            <div className="nav-button-holder mt-4">
              <button
                className="button navbar-button w-button"
                onClick={() => handleScrollToSection("sign-up")}
              >
                Sign up
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
