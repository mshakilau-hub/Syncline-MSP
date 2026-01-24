// src/components/cta/CTASection.jsx
import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
const MotionLink = motion.create(Link);

import CountUp from 'react-countup';
import { ArrowRight, Phone, Shield, Clock, Zap } from 'lucide-react';
import LottieAnimation from '../ui/LottieAnimation';

const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const benefits = [
    { icon: Shield, text: 'Free security assessment included' },
    { icon: Clock, text: 'Results within 48 hours' },
    { icon: Zap, text: 'No obligation, no pressure' }
  ];

  const rotatingTexts = [
    'Stop fearing ransomware attacks.',
    'Stop losing revenue to IT downtime.',
    'Stop wasting time on IT fires.',
    'Stop settling for slow support.',
  ];

  const metrics = [
    { end: 150, suffix: '+', label: 'Victorian businesses' },
    { end: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
    { end: 98, suffix: '%', label: 'Customer satisfaction' },
  ];

  const lotties = [
    '/assets/lottie/animation1_IsometricDataAnalysis.json',
    '/assets/lottie/animation2_CloudService.json',
    '/assets/lottie/animation3_CyberSecurity.json',
  ];

  const [currentText, setCurrentText] = useState(0);
  const [currentLottie, setCurrentLottie] = useState(0);

  // Rotate rotating text
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Rotate Lottie
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLottie((prev) => (prev + 1) % lotties.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        {/* Orbs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
            Limited Time Offer
          </span>



<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  <Link to="/contact" className="cta-button">
    Book Free Assessment
  </Link>
</motion.div>



          {/* Subheadline */}
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Discover vulnerabilities, inefficiencies, and opportunities in your current IT setup. 
            No cost, no obligation – just clarity.
          </p>

          {/* Rotating text – simple fade, no Typed.js */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              <span className="text-blue-400 font-medium">
                {rotatingTexts[currentText]}
              </span>
            </motion.p>
          </AnimatePresence>

          {/* Metrics – CountUp only when in view */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {metrics.map((metric, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1">
                  {isInView ? (
                    <CountUp 
                      start={0}
                      end={metric.end}
                      duration={2.5}
                      decimals={metric.decimals || 0}
                      suffix={metric.suffix}
                      delay={0.3 + i * 0.4}
                    />
                  ) : (
                    '0' + (metric.suffix || '')
                  )}
                </div>
                <div className="text-sm sm:text-base text-slate-400 leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Lottie – zoomed out */}
          <div className="
            relative w-full aspect-[4/3] max-h-[380px] lg:max-h-[440px] mx-auto
            overflow-hidden rounded-2xl border border-white/10 shadow-2xl
            bg-slate-900/70 p-6 lg:p-10 mb-10
          ">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLottie}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center"
              >
                <LottieAnimation
                  src={lotties[currentLottie]}
                  autoplay={true}
                  loop={false}
                  speed={0.55}
                  className="w-[80%] h-[80%] max-w-[85%] max-h-[85%] object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* Primary CTA – MotionLink */}
            <MotionLink
              to="/contact"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="
                relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4
                font-bold text-lg text-white rounded-2xl transition-all
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                shadow-[0_0_25px_rgba(139,92,246,0.45)]
                hover:shadow-[0_0_45px_rgba(236,72,153,0.65)]
                hover:brightness-110
                overflow-hidden group
              "
            >
              {/* Text + Icon */}
              <span className="relative z-10 flex items-center gap-3">
                Book Free Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Glow aura */}
              <span
                className="
                  absolute inset-0 rounded-2xl opacity-60 blur-xl
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                  animate-pulse
                "
              ></span>

              {/* Border ring */}
              <span
                className="
                  absolute inset-0 rounded-2xl border border-white/20
                  group-hover:border-white/40 transition-all
                "
              ></span>
            </MotionLink>

            {/* Secondary CTA – Phone */}
            <motion.a
              href="tel:1300000000"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="
                relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4
                font-bold text-lg text-white rounded-2xl transition-all
                bg-white/10 border border-white/20
                hover:bg-white/20 hover:border-white/30
                shadow-[0_0_20px_rgba(255,255,255,0.15)]
                overflow-hidden
              "
            >
              <Phone className="w-5 h-5" />
              Call 1300 XXX XXX

              {/* Soft glow */}
              <span
                className="
                  absolute inset-0 rounded-2xl opacity-40 blur-xl
                  bg-white/20
                "
              ></span>
            </motion.a>

          </div>


          {/* Trust */}
          <p className="mt-8 text-white/60 text-sm">
            Trusted by 150+ Victorian businesses
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;