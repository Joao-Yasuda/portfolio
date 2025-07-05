import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

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

  const mobileLineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "40vh", opacity: 1 },
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="relative z-20 w-full h-full flex items-center justify-center md:justify-start md:items-start md:mt-40 px-4 md:px-0">
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
            className="w-3 h-3 bg-gray-500/50 rounded-full -ml-1"
            variants={dotVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 2.5,
              duration: 0.5,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="flex md:hidden items-center space-x-2 mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <div className="w-8 h-px bg-white/60"></div>
            <div className="w-1 h-1 bg-white/80 rounded-full"></div>
            <div className="w-12 h-px bg-gradient-to-r from-white/60 to-transparent"></div>
          </motion.div>
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
      <div className="relative flex flex-col md:hidden w-full h-full justify-center items-start text-left px-6">
        <motion.div
          className="absolute top-8 left-6 right-6 h-px bg-gradient-to-r from-white/80 via-white/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          className="absolute top-4 right-8 w-2 h-2 bg-white/60 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />
        <motion.div
          className="absolute top-6 right-12 w-1 h-1 bg-white/40 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        />
        <div className="flex flex-col items-start space-y-3 w-full relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl font-medium text-gray leading-tight drop-shadow-lg"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1, duration: 0.8 }}
          >
            Eu sou o João
          </motion.h1>
          <motion.div
            className="w-16 h-0.5 bg-white/80 mt-2"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          <motion.p
            className="text-5xl sm:text-6xl font-bold text-white leading-tight drop-shadow-lg"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            Desenvolvedor <br /> Dedicado a construir
          </motion.p>
          <motion.div
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.6, duration: 0.8 }}
            className="py-1"
          >
            <FlipWords
              words={words}
              className="font-black text-white text-6xl sm:text-7xl leading-none drop-shadow-lg"
              style={{ textShadow: "3px 3px 10px rgba(0,0,0,0.9)" }}
            />
          </motion.div>
          <motion.p
            className="text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-lg"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            Web Applications
          </motion.p>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <div className="flex flex-col items-center space-y-3">
            <span
              className="text-white text-sm font-semibold drop-shadow-lg"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              Scroll
            </span>
            <div className="w-px h-12 bg-white shadow-lg"></div>
            <motion.div
              className="w-2 h-2 bg-white rounded-full shadow-lg"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
