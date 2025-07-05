import React, { useState, useEffect, useRef } from "react";
import { Home, User, Briefcase, Award, Mail, Menu, X } from "lucide-react";

const MobileNavBar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const buttonRefs = useRef({});

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "aboutme", label: "Sobre Mim", icon: User },
    { id: "projectssection", label: "Projetos", icon: Briefcase },
    { id: "myexperience", label: "Experiências", icon: Award },
    { id: "contactsection", label: "Contato", icon: Mail },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = scrollTop + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== navItems[i].id) {
            setActiveSection(navItems[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, navItems]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navRef.current && isHovered) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  useEffect(() => {
    const activeButton = buttonRefs.current[activeSection];
    if (indicatorRef.current && activeButton && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const relativeLeft = buttonRect.left - navRect.left - 24;

      indicatorRef.current.style.transform = `translateX(${relativeLeft}px)`;
      indicatorRef.current.style.width = `${buttonRect.width}px`;
    }
  }, [activeSection]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out hidden md:block">
        <nav
          ref={navRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative px-6 py-3 rounded-2xl transition-all duration-500 ease-out
            ${
              isScrolled
                ? "bg-gray-800/60 backdrop-blur-md border border-gray-700/60 shadow-2xl"
                : "bg-gray-700/40 backdrop-blur-sm border border-gray-700/50 shadow-xl"
            }
            ${isHovered ? "scale-105 bg-gray-800/70" : "scale-100"}
            hover:shadow-2xl hover:shadow-gray-600/10
          `}
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(156, 163, 175, 0.15) 0%, transparent 50%)`
              : undefined,
          }}
        >
          <div
            ref={indicatorRef}
            className="absolute top-3 left-6 h-10 bg-gradient-to-r from-gray-600/20 to-gray-500/20 rounded-xl transition-all duration-500 ease-out opacity-80"
            style={{
              boxShadow: "0 0 20px rgba(156, 163, 175, 0.3)",
            }}
          />

          <div className="relative flex items-center space-x-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => (buttonRefs.current[item.id] = el)}
                onClick={() => scrollToSection(item.id)}
                className={`
                  group cursor-pointer relative px-4 py-2 rounded-xl transition-all duration-300 ease-out
                  flex items-center space-x-2 text-sm font-medium
                  ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }
                  hover:scale-105 active:scale-95
                `}
              >
                <item.icon
                  size={16}
                  className={`
                    transition-all duration-300 ease-out
                    ${
                      activeSection === item.id
                        ? "rotate-12 scale-110"
                        : "rotate-0 scale-100"
                    }
                    group-hover:rotate-12 group-hover:scale-110
                  `}
                />
                <span
                  className={`
                  transition-all duration-300 ease-out transform
                  ${
                    activeSection === item.id
                      ? "translate-x-0 opacity-100"
                      : "translate-x-1 opacity-90"
                  }
                  group-hover:translate-x-0 group-hover:opacity-100
                `}
                >
                  {item.label}
                </span>
                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-gray-400/60 rounded-full animate-ping"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
            </div>
          )}

          <div
            className={`
            absolute inset-0 rounded-2xl transition-opacity duration-500 ease-out pointer-events-none
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(156, 163, 175, 0.1) 50%, transparent 70%)",
              padding: "1px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
            }}
          />
        </nav>
      </div>

      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
          <div
            className={`
              flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-500 ease-out
              ${
                isScrolled
                  ? "bg-gray-800/70 backdrop-blur-md border border-gray-700/60 shadow-2xl"
                  : "bg-gray-700/50 backdrop-blur-sm border border-gray-700/50 shadow-xl"
              }
            `}
          >
            <div className="flex items-center space-x-3">
              {(() => {
                const activeItem = navItems.find(
                  (item) => item.id === activeSection
                );
                return (
                  <>
                    <activeItem.icon
                      size={20}
                      className="text-white transition-all duration-300 ease-out rotate-12 scale-110"
                    />
                    <span className="text-white font-medium text-sm">
                      {activeItem.label}
                    </span>
                  </>
                );
              })()}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={`
                relative p-2 rounded-xl transition-all duration-300 ease-out
                ${
                  isMobileMenuOpen
                    ? "bg-gray-600/30 rotate-180"
                    : "bg-transparent rotate-0"
                }
                hover:bg-gray-600/20 active:scale-95
              `}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`
                    absolute inset-0 text-white transition-all duration-500 ease-out
                    ${
                      isMobileMenuOpen
                        ? "opacity-0 rotate-180 scale-50"
                        : "opacity-100 rotate-0 scale-100"
                    }
                  `}
                />
                <X
                  size={24}
                  className={`
                    absolute inset-0 text-white transition-all duration-500 ease-out
                    ${
                      isMobileMenuOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-180 scale-50"
                    }
                  `}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`
            fixed inset-0 z-40 transition-all duration-500 ease-out
            ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          <div
            className={`
              absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out
              ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}
            `}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            ref={mobileMenuRef}
            className={`
              absolute top-20 left-4 right-4 bg-gray-800/90 backdrop-blur-md 
              border border-gray-700/60 rounded-3xl shadow-2xl overflow-hidden
              transition-all duration-500 ease-out transform
              ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-10 scale-95"
              }
            `}
          >
            <div className="p-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection(item.id);
                  }}
                  className={`
                    group w-full p-4 rounded-2xl transition-all duration-300 ease-out
                    flex items-center space-x-4 text-left mb-1 last:mb-0
                    ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-gray-600/30 to-gray-700/30 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/30"
                    }
                    hover:scale-[1.02] active:scale-[0.98]
                    transform-gpu
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isMobileMenuOpen
                      ? `slideInUp 0.6s ease-out forwards`
                      : "none",
                  }}
                >
                  <div
                    className={`
                      p-3 rounded-xl transition-all duration-300 ease-out
                      ${
                        activeSection === item.id
                          ? "bg-gray-600/40 shadow-lg"
                          : "bg-gray-700/30 group-hover:bg-gray-600/30"
                      }
                    `}
                  >
                    <item.icon
                      size={20}
                      className={`
                        transition-all duration-300 ease-out
                        ${
                          activeSection === item.id
                            ? "rotate-12 scale-110 text-white"
                            : "rotate-0 scale-100 group-hover:rotate-12 group-hover:scale-110"
                        }
                      `}
                    />
                  </div>

                  <div className="flex-1">
                    <span className="font-medium text-base block">
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-gray-400 to-transparent rounded-full mt-1 animate-pulse" />
                    )}
                  </div>

                  <div
                    className={`
                      transition-all duration-300 ease-out
                      ${
                        activeSection === item.id
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                      }
                    `}
                  >
                    <div className="w-2 h-2 border-r-2 border-t-2 border-current rotate-45 transform" />
                  </div>

                  <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-active:opacity-100 transition-opacity duration-150 ease-out" />
                </button>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-gray-700/30">
              <div className="flex justify-center space-x-2">
                {navItems.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300 ease-out
                      ${
                        navItems[index].id === activeSection
                          ? "bg-gray-400 scale-125"
                          : "bg-gray-600 scale-100"
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default MobileNavBar;
