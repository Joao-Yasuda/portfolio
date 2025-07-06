import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FlipWords = ({ words, className = "" }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className={`inline-block ${className}`}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.span
            key={currentWord}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            {words[currentWord]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeroText = () => {
  const words = ["Resultado", "Soluções", "Experiências", "Inovação"];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const lineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "calc(95vh - 10rem)", opacity: 1 },
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="relative z-20 w-full h-screen flex items-center justify-center md:justify-start md:items-start md:mt-40 px-4 md:px-0 overflow-hidden bg-transparent">
      <div className="relative flex-col hidden md:flex c-space">
        <div className="absolute left-0 top-0">
          <motion.div
            className="w-1 bg-gray-500/50"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 0.8,
              duration: 2,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "top",
            }}
          />
          <motion.div
            className="w-3 h-3 bg-gray-500/50 rounded-full absolute -left-1 "
            variants={dotVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 2.5,
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        </div>
        <div>
          <motion.h1
            className="text-5xl font-medium text-white"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            Prazer, João
          </motion.h1>
          <div className="flex flex-col items-start">
            <motion.p
              className="text-5xl font-medium text-neutral-300"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              Desenvolvedor Web
            </motion.p>
            <motion.p
              className="text-5xl font-medium text-neutral-300"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              que acredita em
            </motion.p>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5 }}
            >
              <FlipWords
                words={words}
                className="font-black text-white mb-2 text-9xl"
              />
              <motion.p
                className="text-5xl font-medium text-neutral-300"
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.8 }}
              >
                Através da tecnologia
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col md:hidden w-full h-full justify-center items-center text-center px-6 py-8 max-w-sm mx-auto">
        <div className="relative z-10 p-6">
          <motion.div
            className="relative mb-8"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl font-light text-white/90 mb-2">
              Prazer,
            </h1>
            <h2 className="text-6xl sm:text-6xl font-bold text-white">João</h2>
          </motion.div>

          <motion.div
            className="mb-8"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <p className="text-2xl sm:text-2xl font-medium text-gray-300 leading-relaxed mb-2">
              Desenvolvedor Web
            </p>
            <p className="text-2xl sm:text-2xl font-medium text-gray-300 leading-relaxed">
              que acredita em
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-400/50"></div>
          </motion.div>

          <motion.div
            className="mb-6"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <FlipWords
              words={words}
              className="font-black text-5xl sm:text-6xl leading-tight text-white"
            />
          </motion.div>

          <motion.div
            className="flex justify-center mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <div className="w-8 h-px bg-gray-500/40"></div>
          </motion.div>

          <motion.p
            className="text-xl sm:text-2xl font-medium text-gray-300 leading-relaxed"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            Através da tecnologia
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.div
            className="w-1 h-8 bg-gray-400/40 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
