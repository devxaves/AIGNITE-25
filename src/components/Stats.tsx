"use client";

import { motion } from "framer-motion";
import NumberTicker from '@/components/ui/number-ticker';
import React from 'react';

const numberAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 0.5,
      duration: 1.5,
      delay: 0.3
    }
  }
};

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
      ease: "easeInOut"
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Stats: React.FC = () => {
  return (
    <div className="min-h-52 bg-transparent my-20 md:my-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10" />
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerAnimation}
      >
        {/* Active Users */}
        <motion.div 
          className="flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          variants={itemAnimation}
          whileHover={{ y: -5 }}
        >
          <NumberTicker
            value={11990}
            className="font-extrabold text-2xl md:text-4xl bg-clip-text bg-blue-500 text-transparent"
          />
          <motion.h2
            className="mt-4 text-lg md:text-xl font-medium text-center text-gray-700 dark:text-gray-300"
            variants={itemAnimation}
          >
            Active Healthcare Researchers
          </motion.h2>
        </motion.div>

        {/* Paying Customers */}
        <motion.div 
          className="flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          variants={itemAnimation}
          whileHover={{ y: -5 }}
        >
          <NumberTicker
            value={2100}
            className="font-extrabold text-2xl md:text-4xl bg-clip-text bg-blue-500 text-transparent"
          />
          <motion.h2
            className="mt-4 text-lg md:text-xl font-medium text-center text-gray-700 dark:text-gray-300"
            variants={itemAnimation}
          >
            Medical Institutions Using Our Platform
          </motion.h2>
        </motion.div>

        {/* Agencies Joined */}
        <motion.div 
          className="flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          variants={itemAnimation}
          whileHover={{ y: -5 }}
        >
          <NumberTicker
            value={619}
            className="font-extrabold text-2xl md:text-4xl bg-clip-text bg-blue-500 text-transparent"
          />
          <motion.h2
            className="mt-4 text-lg md:text-xl font-medium text-center text-gray-700 dark:text-gray-300"
            variants={itemAnimation}
          >
            Research Partners Worldwide
          </motion.h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Stats;