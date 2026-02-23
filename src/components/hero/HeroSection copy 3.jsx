// src/components/hero/HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
const MotionLink = motion.create(Link);


import Typed from 'typed.js';
import { 
  Shield, Zap, Database, Clock, Users, CheckCircle, ArrowRight, AlertTriangle,
  Lock, Server, TrendingUp, Activity, Phone
} from 'lucide-react';
import AnimatedBackground from '../ui/AnimatedBackground';
import GlassCard from '../ui/GlassCard';
import LottieAnimation from '../ui/LottieAnimation';

const HeroSection = () => {
  const typedRef = useRef(null);
  const hasSeenTyped = localStorage.getItem('heroTypedSeen') === 'true';

  // ──────────────────────────────────────────────────────────────
  // Pain points – realistic SMB owner language
  // ──────────────────────────────────────────────────────────────
  const problems = [
    { problem: 'Constant IT downtime costing you money?', solution: 'Proactive 24/7 monitoring & instant fixes', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
    { problem: 'Worried about ransomware or data breaches?', solution: 'Enterprise zero-trust security & rapid response', icon: Shield, color: 'from-blue-600 to-cyan-600' },
    { problem: 'Frustrated with slow, unreliable systems?', solution: 'Performance tuning & cloud optimisation', icon: Zap, color: 'from-yellow-500 to-amber-500' },
    { problem: 'Afraid of losing critical business data?', solution: 'Automated encrypted backups & fast recovery', icon: Database, color: 'from-green-500 to-emerald-500' },
    { problem: 'Tired of managing IT yourself?', solution: 'Fully managed IT – we take it off your plate', icon: Server, color: 'from-indigo-500 to-violet-500' },
    { problem: 'Surprise IT bills & hidden costs?', solution: 'Transparent fixed pricing & no surprises', icon: Lock, color: 'from-purple-500 to-pink-500' }
  ];

  // ──────────────────────────────────────────────────────────────
  // Credibility stats – long-term trust focus
  // ──────────────────────────────────────────────────────────────
  const stats = [
    { value: '150+', label: 'Victorian & Tasmanian SMBs trust us long-term', icon: Users },
    { value: '99.9%', label: 'Guaranteed uptime SLA', icon: TrendingUp },
    { value: '24/7', label: 'Proactive real-time monitoring', icon: Activity },
    { value: '<2 hrs', label: 'Average critical incident response', icon: Clock },
    { value: '98%', label: 'Customer satisfaction (last 12 months)', icon: CheckCircle },
    { value: '10+', label: 'Years building lasting partnerships', icon: Clock }
  ];

  // ──────────────────────────────────────────────────────────────
  // Trust badges – relationship-oriented messaging
  // ──────────────────────────────────────────────────────────────
  const trustBadges = [
    { icon: CheckCircle, text: '99.9% uptime – we stand behind our SLA' },
    { icon: Clock, text: '<2hr response – because your business can’t wait' },
    { icon: Shield, text: 'Zero-trust security – your data stays protected' },
    { icon: Users, text: 'Long-term partner – not just another vendor' },
    { icon: TrendingUp, text: 'Proven results – real growth for real businesses' }
  ];

  // ──────────────────────────────────────────────────────────────
  // Rotating benefit lines (after Typed.js)
  // ──────────────────────────────────────────────────────────────
  const rotatingBenefits = [
    "Stop losing revenue to IT downtime.",
    "Stop fearing ransomware attacks.",
    "Stop paying for IT problems you can't see.",
    "Stop managing IT — let experts handle it.",
    "Stop settling for slow support.",
    "Stop reacting — start preventing.",
    "Stop worrying about data loss.",
    "Stop wasting time on IT fires."
  ];

  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [currentLottie, setCurrentLottie] = useState(0);

  // Lottie files (must be in public/assets/lottie/)
  const lotties = [
    '/assets/lottie/animation1_IsometricDataAnalysis.json',
    '/assets/lottie/animation2_CloudService.json',
    '/assets/lottie/animation3_CyberSecurity.json',
  ];

  // ──────────────────────────────────────────────────────────────
  // Typed.js – only on first visit
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!hasSeenTyped && typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          "Constant IT fires?",
          "Security worries?",
          "Slow computers?",
          "Data loss scares?",
          "Unexpected downtime?",
          "Complicated IT bills?",
        ],
        typeSpeed: 55,
        backSpeed: 35,
        backDelay: 1800,
        loop: false,
        showCursor: true,
        cursorChar: '|',
        onComplete: () => {
          localStorage.setItem('heroTypedSeen', 'true');
        }
      });
      return () => typed.destroy();
    }

    // Rotate benefits after first load
    if (hasSeenTyped) {
      const interval = setInterval(() => {
        setCurrentBenefit(prev => (prev + 1) % rotatingBenefits.length);
      }, 4800);
      return () => clearInterval(interval);
    }
  }, [hasSeenTyped]);

  // Rotate problem card
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem(prev => (prev + 1) % problems.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [problems.length]);

  // Rotate Lotties – slower cycle, longer fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLottie(prev => (prev + 1) % lotties.length);
    }, 8000); // 8 seconds per animation
    return () => clearInterval(interval);
  }, [lotties.length]);

  const current = problems[currentProblem];
  const CurrentIcon = current.icon;

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="hero-title"
    >
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ──────────────────────────────────────────────────────────────
              LEFT COLUMN – Emotional headline + trust
          ────────────────────────────────────────────────────────────── */}
          <div className="text-center lg:text-left space-y-8 lg:space-y-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-600/10 border border-blue-500/20 backdrop-blur-sm mx-auto lg:mx-0"
            >
              <span className="text-2xl sm:text-3xl">🇦🇺</span>
              <span className="text-blue-300 font-semibold text-sm sm:text-base">
                Trusted IT Partner for Tasmanian & Victorian Small & Medium Businesses
              </span>
            </motion.div>

            {/* Headline */}
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight">
              <span className={hasSeenTyped ? 'opacity-100' : 'opacity-0'}>
                Stop Fighting IT.
              </span>
              <span 
                ref={typedRef}
                className={`text-blue-400 inline ${hasSeenTyped ? 'hidden' : ''}`}
                aria-live="polite"
              />
              <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Start Growing Your Business.
              </span>
            </h1>






{/* CTAs */}
<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-4">

  {/* Primary CTA – MotionLink (NO RELOAD) */}
  <MotionLink
    to="/contact"
    whileHover={{ scale: 1.06, y: -3 }}
    whileTap={{ scale: 0.97 }}
    className="
      relative inline-flex items-center justify-center gap-3 px-10 py-4
      font-bold text-lg text-white rounded-2xl transition-all
      bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
      shadow-[0_0_25px_rgba(37,99,235,0.45)]
      hover:shadow-[0_0_45px_rgba(6,182,212,0.65)]
      hover:brightness-110
      overflow-hidden group w-full sm:w-auto
    "
    aria-label="Get your free IT health check"
  >
    <span className="relative z-10 flex items-center gap-3">
      Get Your Free IT Health Check Today
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>

    {/* Glow aura */}
    <span
      className="
        absolute inset-0 rounded-2xl opacity-60 blur-xl
        bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
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

  {/* Secondary CTA – Phone (kept as <motion.a>) */}
  <motion.a
    href="tel:1300XXXXXX"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="
      relative inline-flex items-center justify-center gap-3 px-10 py-4
      font-bold text-lg text-blue-300 rounded-2xl transition-all
      border border-blue-500/40
      hover:bg-blue-950/30 hover:border-blue-400
      shadow-[0_0_20px_rgba(255,255,255,0.15)]
      overflow-hidden w-full sm:w-auto
    "
    aria-label="Call us now at 1300 XXX XXX"
  >
    <Phone className="w-5 h-5" />
    Call 1300 XXX XXX Now

    {/* Soft glow */}
    <span
      className="
        absolute inset-0 rounded-2xl opacity-40 blur-xl
        bg-blue-400/20
      "
    ></span>
  </motion.a>

</div>










            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-6">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"
                >
                  <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-slate-200 font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────────
              RIGHT COLUMN – Lottie showcase + credibility stats
          ────────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-12 lg:mt-0 space-y-8 lg:space-y-10"
          >
            {/* Lottie Rotator – clean container */}
            <div className="
              relative w-full 
              aspect-[4/3] lg:aspect-video
              max-h-[420px] lg:max-h-[480px]
              mx-auto 
              overflow-hidden 
              rounded-2xl 
              border border-white/10 
              shadow-2xl 
              bg-slate-900/60           /* fallback hides loading/gap */
            ">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLottie}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <LottieAnimation
                    src={lotties[currentLottie]}
                    autoplay={true}
                    loop={false}
                    speed={0.65}                    // slightly slower – feels premium
                    className="w-[90%] h-[90%] max-w-full max-h-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stats Grid – high credibility */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <GlassCard key={i} className="p-5 sm:p-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-400 leading-tight text-center">{stat.label}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;