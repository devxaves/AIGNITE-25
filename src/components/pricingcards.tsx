"use client";

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Lexend } from "next/font/google";
import PricingComparisonTable from "./PricingTable";
import {RetroGri} from "./Retrogrid";

const font = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const DATA_CARDS = [
    {
      price: isYearly ? 499 : 0,
      title: "Starter",
      text: "Perfect for researchers and small labs getting started with AI in healthcare.",
      list: [
        { value: "Access to basic LLM for healthcare research" },
        { value: "Limited drug discovery tools" },
        { value: "Basic data analysis capabilities" },
        { value: "Up to 100 API calls per month" },
        { value: "Email support" },
      ],
    },
    {
      price: isYearly ? 1999 : 199,
      originalPrice: isYearly ? 2499 : 249,
      title: "Professional",
      text: "Ideal for growing research teams and medium-sized pharmaceutical companies.",
      list: [
        { value: "Everything in Starter, plus:" },
        { value: "Advanced LLM for healthcare research" },
        { value: "Comprehensive drug discovery toolkit" },
        { value: "Advanced data analysis and visualization" },
        { value: "Up to 1000 API calls per month" },
        { value: "Priority email and chat support" },
        { value: "Collaboration tools for team research" },
      ],
      recommended: true,
    },
    {
      price: isYearly ? 4999 : 499,
      originalPrice: isYearly ? 5999 : 599,
      title: "Enterprise",
      text: "For large pharmaceutical companies and research institutions.",
      list: [
        { value: "Everything in Professional, plus:" },
        { value: "Customizable LLM for specific research needs" },
        { value: "Unlimited API calls" },
        { value: "Advanced drug simulation capabilities" },
        { value: "Dedicated account manager" },
        { value: "24/7 premium support" },
        { value: "On-premise deployment options" },
      ],
    },
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardAnimation = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -ml-[500px] h-[500px] w-[1000px] rounded-full blur-3xl" />
      </div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerAnimation}
        id="price"
        className="py-20 sm:py-32"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            variants={itemAnimation}
            className="mb-16 md:mb-20 text-center"
          >
            <motion.h2
              className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 font-bold text-4xl text-transparent md:text-5xl tracking-tight p-6"
              variants={itemAnimation}
            >
              Simple pricing for everyone
            </motion.h2>
            <motion.p
              variants={itemAnimation}
              className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-8"
            >
              Flexible plans designed for healthcare researchers at every level.
            </motion.p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            variants={itemAnimation}
            className="flex justify-center items-center mb-12"
          >
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !isYearly
                    ? "bg-white dark:bg-gray-900 text-blue-600 shadow-md"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isYearly
                    ? "bg-white dark:bg-gray-900 text-blue-600 shadow-md"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly <span className="ml-1 text-xs text-blue-500">(Save 30%)</span>
              </button>
            </div>
          </motion.div>

          {/* Pricing cards */}
          <motion.div
            variants={containerAnimation}
            className="gap-6 grid grid-cols-1 md:grid-cols-3"
          >
            {DATA_CARDS.map((card, index) => (
              <motion.div
                key={card.title}
                variants={cardAnimation}
                className={`relative p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 ${
                  card.recommended ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
                }`}
                whileHover="hover"
              >
                {card.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className={`${font.className} mb-3 font-bold text-xl text-gray-900 dark:text-white`}>
                    {card.title}
                  </h3>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">{card.text}</p>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${card.price}-${isYearly}`}
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-center items-baseline">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ₹{card.price}
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          /{isYearly ? "year" : "month"}
                        </span>
                      </div>
                      {card.originalPrice && (
                        <div className="mt-1">
                          <span className="text-gray-400 dark:text-gray-500 text-sm line-through">
                            ${card.originalPrice}
                          </span>
                          <span className="ml-2 text-green-500 text-sm font-medium">
                            30% off
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <button className="w-full mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg">
                    Get Started
                  </button>
                </div>

                <ul className="space-y-3">
                  {card.list.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <CheckCircle2 className="flex-shrink-0 mt-1 w-4 h-4 text-blue-500" />
                      <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">
                        {item.value}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <PricingComparisonTable />
      <RetroGri />
    </div>
  );
}