"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib";
import { SparklesCore } from '@/components/ui/sparkles';
import Particles from "./particles";

export default function LampDemo() {
  return (
    <LampContainer>
         <SparklesCore
          background="transparent"
          minSize={0.9}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#ffffff"
        />
  
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mt-8 py-4 font-bold text-4xl text-center text-transparent md:text-7xl tracking-tight"
      >
        Revolutionizing Healthcare with 
        <br/>AI-Powered Research
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 mt-8 py-4 font-medium text-center text-transparent text-xl md:text-3xl leading-relaxed tracking-tight"
      >
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div></div>
  );
};
