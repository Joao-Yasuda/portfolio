import { useRef, useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Globe } from "../components/Globe";

const FloatingParticle = ({ index, size = "small" }) => {
  const isLarge = size === "large";
  const particleSize = isLarge ? 6 + Math.random() * 8 : 2 + Math.random() * 4;

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${
        isLarge ? "bg-gradient-to-r from-gray-600 to-gray-500" : "bg-gray-400"
      }`}
      style={{
        width: `${particleSize}px`,
        height: `${particleSize}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: isLarge ? [0, -30, -10, 0] : [0, -20, 0],
        x: isLarge ? [0, 10, -10, -20, 0] : [0],
        rotate: isLarge ? [0, 120, 240, 360] : [0, 180, 360],
        opacity: isLarge ? [0.1, 0.3, 0.2, 0.1] : [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: isLarge ? 8 + Math.random() * 12 : 4 + Math.random() * 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 4,
      }}
    />
  );
};

const GradientOrb = ({ size, position, colors, delay = 0 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      ...position,
      background: `linear-gradient(to right, ${colors.from}, ${colors.to})`,
      filter: "blur(40px)",
    }}
    animate={{
      opacity: [0.05, 0.15, 0.05],
      x: [0, 20, -10, -20, 0],
      y: [0, -10, -20, 10, 0],
    }}
    transition={{
      opacity: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
      x: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
      y: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    }}
  />
);

const AboutMe = () => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const socialRef = useRef(null);
  const descriptionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const leftColumnInView = useInView(leftColumnRef, {
    once: true,
    amount: 0.1,
  });
  const rightColumnInView = useInView(rightColumnRef, {
    once: true,
    amount: 0.1,
  });

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  useEffect(() => {
    if (leftColumnInView) {
      leftControls.start("visible");
    }
  }, [leftColumnInView, leftControls]);

  useEffect(() => {
    if (rightColumnInView) {
      rightControls.start("visible");
    }
  }, [rightColumnInView, rightControls]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const slideLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      <style jsx="true">{`
        .gradient-text {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #e5e7eb 25%,
            #d1d5db 50%,
            #9ca3af 75%,
            #6b7280 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12 relative overflow-hidden"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <FloatingParticle key={`particle-${i}`} index={i} />
          ))}

          {[...Array(8)].map((_, i) => (
            <FloatingParticle
              key={`large-particle-${i}`}
              index={i}
              size="large"
            />
          ))}

          <div className="absolute inset-0 overflow-hidden">
            <GradientOrb
              size={400}
              position={{ top: "20%", left: "15%" }}
              colors={{
                from: "rgba(75, 85, 99, 0.08)",
                to: "rgba(107, 114, 128, 0.08)",
              }}
              delay={2}
            />
            <GradientOrb
              size={350}
              position={{ bottom: "25%", right: "20%" }}
              colors={{
                from: "rgba(55, 65, 81, 0.06)",
                to: "rgba(75, 85, 99, 0.06)",
              }}
              delay={0}
            />
            <GradientOrb
              size={300}
              position={{ top: "60%", left: "60%" }}
              colors={{
                from: "rgba(107, 114, 128, 0.05)",
                to: "rgba(156, 163, 175, 0.05)",
              }}
              delay={10}
            />
            <GradientOrb
              size={500}
              position={{ top: "10%", right: "10%" }}
              colors={{
                from: "rgba(31, 41, 55, 0.04)",
                to: "rgba(55, 65, 81, 0.04)",
              }}
              delay={15}
            />
          </div>

          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`subtle-${i}`}
              className="absolute w-px h-px bg-gray-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 8,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-[30%_70%] gap-12 items-center">
            <motion.div
              ref={leftColumnRef}
              className="space-y-8 flex flex-col items-start"
              variants={staggerContainer}
              initial="hidden"
              animate={leftControls}
            >
              <div>
                <motion.h1
                  ref={nameRef}
                  className="text-5xl md:text-6xl font-bold mb-4 gradient-text"
                  variants={fadeUpVariants}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    João Murat
                  </motion.span>
                </motion.h1>

                <motion.p
                  ref={titleRef}
                  className="text-xl md:text-2xl text-gray-400 mb-4"
                  variants={fadeUpVariants}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    style={{
                      display: "inline-block",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      borderRight: "3px  solid ",
                    }}
                  >
                    Full Stack Developer
                  </motion.span>
                </motion.p>

                <motion.div
                  ref={locationRef}
                  className="flex items-center mb-6 gap-2 text-gray-500"
                  variants={fadeUpVariants}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <MapPin size={16} />
                  <span>São Paulo, SP</span>
                </motion.div>

                <motion.div
                  ref={socialRef}
                  className="flex gap-4 mb-8"
                  variants={scaleUpVariants}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {[
                    { href: "https://github.com/Joao-Yasuda", icon: Github },
                    {
                      href: "https://www.linkedin.com/in/joao-yasuda/",
                      icon: Linkedin,
                    },
                    { href: "mailto:joaoyasuda@gmail.com", icon: Mail },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="p-3 rounded-full bg-[#1a1a1a] border border-gray-800 transition-all duration-300 group"
                      whileHover={{
                        y: -3,
                        scale: 1.05,
                        backgroundColor: "#2a2a2a",
                        borderColor: "oklch(27.8% 0.033 256.848)",
                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <social.icon
                        size={20}
                        className="group-hover:text-blue-400 transition-colors"
                      />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="w-[270px] p-6 h-[300px] bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden"
                variants={slideLeftVariants}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                  borderColor: "rgba(59, 130, 246, 0.5)",
                }}
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={16} />
                  <span>São Paulo, SP</span>
                </div>
                <div className="mt-10 overflow-hidden -mx-6">
                  <Globe />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              ref={rightColumnRef}
              className="max-w-3xl flex flex-col justify-between"
              variants={slideRightVariants}
              initial="hidden"
              animate={rightControls}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                ref={descriptionRef}
                className="text-xl text-gray-300 leading-relaxed"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
                whileHover={{
                  y: -5,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const y = (e.clientY - rect.top) / rect.height;
                  e.currentTarget.style.transform = `translateY(${
                    (y - 0.5) * 10
                  }px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {[
                  "Minha trajetória na tecnologia começou de forma pouco convencional como bartender no Canadá. Entre um drink e outro, aprendi a trabalhar em equipe, resolver problemas sob pressão e me comunicar com clareza em inglês com pessoas de diferentes culturas.",
                  "Enquanto trabalhava, conciliava os estudos em desenvolvimento de software. Foi ali que desenvolvi disciplina, adaptabilidade e um olhar voltado para criar soluções que realmente ajudem as pessoas, base que carrego até hoje como desenvolvedor web.",
                  "Desde então, foco em transformar problemas reais em produtos simples e funcionais. Gosto de estar próximo dos usuários, entender suas dores e construir soluções enxutas, com entregas rápidas com qualidade. Acredito que ouvir bem é o primeiro passo para programar melhor.",
                  "Valorizo ambientes colaborativos, onde posso contribuir com pensamento crítico e autonomia. Me desenvolvo constantemente em .NET, Golang e React, sempre com foco no impacto que cada solução pode gerar no dia a dia do usuário.",
                ].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.2 + index * 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default AboutMe;
