import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Zap, Cloud, Database, CheckCircle, ArrowRight,
  Clock, Users, TrendingUp, Activity, AlertTriangle, Play
} from 'lucide-react';
import AnimatedBackground from '../ui/AnimatedBackground';
import GlassCard from '../ui/GlassCard';

const HeroSection = () => {
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems = [
    { problem: 'Constant IT Fires?', solution: '24/7 Proactive Monitoring', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
    { problem: 'Security Concerns?', solution: 'professional-grade Protection', icon: Shield, color: 'from-blue-500 to-cyan-500' },
    { problem: 'Slow Systems?', solution: 'Optimized Performance', icon: Zap, color: 'from-yellow-500 to-amber-500' },
    { problem: 'Data Loss Risk?', solution: 'Automated Backups', icon: Database, color: 'from-green-500 to-emerald-500' }
  ];

  const stats = [
    { value: '150+', label: 'SMBs Protected', icon: Users },
    { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
    { value: '24/7', label: 'Monitoring', icon: Activity },
    { value: '<2hrs', label: 'Response Time', icon: Zap }
  ];

  const trustBadges = [
    { icon: CheckCircle, text: '99.9% Uptime SLA' },
    { icon: Clock, text: '<2hr Response' },
    { icon: Shield, text: 'Zero-Trust Security' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % problems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = problems[currentProblem].icon;

  return (
    <section id="hero" className="relative h-screen min-h-[650px] max-h-[1100px] flex items-center overflow-hidden pt-24 sm:pt-28 lg:pt-8">
      <AnimatedBackground />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
            >
              <span className="text-2xl">????</span>
              <span className="text-blue-400 font-medium">Victorian SMB Specialists</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-4 sm:mb-6">
              Stop Fighting IT.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Start Growing.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mb-6 sm:mb-8 leading-relaxed">
              professional-grade IT support, security, and automation designed specifically for Victorian small and medium businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all"
              >
                Free IT Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#services"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 text-white font-semibold text-base sm:text-lg rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Play className="w-5 h-5" />
                View Solutions
              </motion.a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                >
                  <badge.icon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300 font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Interactive Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Problem-Solution Card */}
            <GlassCard className="p-6 sm:p-8 mb-6" gradient>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Common SMB Challenge
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProblem}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${problems[currentProblem].color}`} style={{ opacity: 0.2 }}>
                        <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-base sm:text-xl font-bold text-white">
                        {problems[currentProblem].problem}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="sm:border-l border-white/10 sm:pl-6 pt-4 sm:pt-0 border-t sm:border-t-0">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Our Solution
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentProblem}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm sm:text-lg font-semibold text-blue-400"
                    >
                      {problems[currentProblem].solution}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-2 mt-6">
                {problems.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i === currentProblem ? 'bg-blue-500' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </GlassCard>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, i) => (
                <GlassCard 
                  key={i} 
                  className="p-4 sm:p-5 text-center group" 
                  delay={0.5 + i * 0.1}
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400 truncate">{stat.label}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-15 blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;


// // src/components/hero/HeroSection.jsx
// import React, { useState, useEffect, lazy, Suspense, memo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Individual Lucide imports (tree-shake friendly + alias)
// import Shield from '@lucide/shield';
// import Zap from '@lucide/zap';
// import Database from '@lucide/database';
// import CheckCircle from '@lucide/check-circle';
// import ArrowRight from '@lucide/arrow-right';
// import Clock from '@lucide/clock';
// import Users from '@lucide/users';
// import TrendingUp from '@lucide/trending-up';
// import Activity from '@lucide/activity';
// import AlertTriangle from '@lucide/alert-triangle';
// import Play from '@lucide/play';
// import Lock from '@lucide/lock';
// import Server from '@lucide/server';

// import GlassCard from '../ui/GlassCard';

// // Lazy-load AnimatedBackground
// const AnimatedBackground = lazy(() => import('../ui/AnimatedBackground'));

// // Memoized static badge
// const Badge = memo(() => (
//   <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mx-auto lg:mx-0 text-xs sm:text-sm md:text-base">
//     <span className="text-xl">????</span>
//     <span className="text-blue-400 font-semibold tracking-wide">
//       Victorian SMB IT Specialists
//     </span>
//   </div>
// ));

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);
//   const [currentTagline, setCurrentTagline] = useState(0);

//   const taglines = [
//     "Stop Fighting IT.",
//     "Stop Worrying About IT.",
//     "Leave IT Headaches Behind.",
//     "Focus on Growth, Not IT.",
//   ];

//   const problems = [
//     { problem: 'Frequent IT disruptions?', solution: 'Proactive 24/7 Monitoring', icon: AlertTriangle },
//     { problem: 'Security vulnerabilities?', solution: 'Enterprise Zero-Trust Protection', icon: Shield },
//     { problem: 'Slow or unreliable systems?', solution: 'Performance Optimisation & Tuning', icon: Zap },
//     { problem: 'Risk of data loss?', solution: 'Automated Encrypted Backups', icon: Database },
//     { problem: 'Complex IT administration?', solution: 'Fully Managed Infrastructure', icon: Server },
//     { problem: 'Rising cyber threats?', solution: 'Advanced Threat Detection & Response', icon: Lock },
//   ];

//   const stats = [
//     { value: '150+', label: 'Victorian SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
//     { value: '24/7', label: 'Proactive Monitoring', icon: Activity },
//     { value: '<2 hrs', label: 'Average Response', icon: Clock },
//   ];

//   useEffect(() => {
//     const problemTimer = setInterval(() => {
//       setCurrentProblem(prev => (prev + 1) % problems.length);
//     }, 5000);

//     const taglineTimer = setInterval(() => {
//       setCurrentTagline(prev => (prev + 1) % taglines.length);
//     }, 7000);

//     return () => {
//       clearInterval(problemTimer);
//       clearInterval(taglineTimer);
//     };
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section className="
//       relative min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh] xl:min-h-screen
//       bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
//       overflow-hidden flex items-center
//       z-0
//     ">
//       {/* Animated Background */}
//       <div className="absolute inset-0 pointer-events-none opacity-60">
//         <Suspense fallback={null}>
//           <AnimatedBackground />
//         </Suspense>
//       </div>

//       <div className="
//         relative z-10 w-full max-w-7xl mx-auto
//         px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12
//         py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32
//       ">
//         <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
//           {/* LEFT COLUMN */}
//           <div className="space-y-5 sm:space-y-7 md:space-y-9 text-center lg:text-left">
//             {/* Badge */}
//             <Badge />

//             {/* Tagline + Headline */}
//             <h2 className="sr-only">Hero Section Taglines</h2>
//             <div className="space-y-3 sm:space-y-4 md:space-y-6">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentTagline}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.7, ease: "easeOut" }}
//                   className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-200/90"
//                 >
//                   {taglines[currentTagline]}
//                 </motion.div>
//               </AnimatePresence>

//               <h1 className="
//                 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
//                 font-black leading-[0.92] md:leading-[0.95] tracking-[-0.02em] text-white
//               ">
//                 <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent block">
//                   Start Growing.
//                 </span>
//               </h1>
//             </div>

//             {/* Description - static paragraph */}
//             <p className="max-w-xl lg:max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-300/90">
//               professional-grade IT support, cybersecurity, cloud services and automation —
//               purpose-built for Victorian small and medium businesses.
//             </p>

//             {/* CTAs */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 md:pt-6">
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03]"
//                 aria-label="Get a free IT assessment"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </a>

//               <a
//                 href="#services"
//                 className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
//                 aria-label="View IT solutions"
//               >
//                 <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 View Solutions
//               </a>
//             </div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.9, delay: 0.3 }}
//             className="mt-10 lg:mt-0 space-y-6 md:space-y-8"
//           >
//             <GlassCard className="p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10" gradient>
//               <div className="grid sm:grid-cols-2 gap-5 items-center">
//                 <div>
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Common Challenge
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       transition={{ duration: 0.5 }}
//                       className="flex items-center gap-4"
//                     >
//                       <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
//                         <CurrentIcon className="w-6 h-6 text-blue-400" />
//                       </div>
//                       <span className="text-lg sm:text-xl font-semibold text-white leading-tight">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-l border-white/10 pl-5 sm:pl-6">
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Our Solution
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       transition={{ duration: 0.5 }}
//                       className="text-lg sm:text-xl font-semibold text-cyan-300 leading-tight"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
//                       i === currentProblem ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-110' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
//               {stats.map((stat, i) => (
//                 <GlassCard key={i} className="p-4 sm:p-5 md:p-6">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2.5 rounded-lg bg-blue-500/10">
//                       <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
//                     </div>
//                     <div>
//                       <div className="text-2xl sm:text-3xl font-bold text-white">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
//                         {stat.label}
//                       </div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



// // src/components/hero/HeroSection.jsx
// // src/components/hero/HeroSection.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Individual Lucide imports (tree-shake friendly + alias) – keep as you have
// import Shield from '@lucide/shield';
// import Zap from '@lucide/zap';
// import Database from '@lucide/database';
// import CheckCircle from '@lucide/check-circle';
// import ArrowRight from '@lucide/arrow-right';
// import Clock from '@lucide/clock';
// import Users from '@lucide/users';
// import TrendingUp from '@lucide/trending-up';
// import Activity from '@lucide/activity';
// import AlertTriangle from '@lucide/alert-triangle';
// import Play from '@lucide/play';
// import Lock from '@lucide/lock';
// import Server from '@lucide/server';

// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// // ... rest of your component code remains unchanged ...

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);
//   const [currentTagline, setCurrentTagline] = useState(0);

//   const taglines = [
//     "Stop Fighting IT.",
//     "Stop Worrying About IT.",
//     "Leave IT Headaches Behind.",
//     "Focus on Growth, Not IT.",
//   ];

//   const problems = [
//     { problem: 'Frequent IT disruptions?', solution: 'Proactive 24/7 Monitoring', icon: AlertTriangle },
//     { problem: 'Security vulnerabilities?', solution: 'Enterprise Zero-Trust Protection', icon: Shield },
//     { problem: 'Slow or unreliable systems?', solution: 'Performance Optimisation & Tuning', icon: Zap },
//     { problem: 'Risk of data loss?', solution: 'Automated Encrypted Backups', icon: Database },
//     { problem: 'Complex IT administration?', solution: 'Fully Managed Infrastructure', icon: Server },
//     { problem: 'Rising cyber threats?', solution: 'Advanced Threat Detection & Response', icon: Lock },
//   ];

//   const stats = [
//     { value: '150+', label: 'Victorian SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
//     { value: '24/7', label: 'Proactive Monitoring', icon: Activity },
//     { value: '<2 hrs', label: 'Average Response', icon: Clock },
//   ];

//   useEffect(() => {
//     const problemTimer = setInterval(() => {
//       setCurrentProblem(prev => (prev + 1) % problems.length);
//     }, 5000);

//     const taglineTimer = setInterval(() => {
//       setCurrentTagline(prev => (prev + 1) % taglines.length);
//     }, 7000);

//     return () => {
//       clearInterval(problemTimer);
//       clearInterval(taglineTimer);
//     };
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section className="
//       relative min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh] xl:min-h-screen
//       bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
//       overflow-hidden flex items-center
//       z-0
//     ">
//       <div className="absolute inset-0 pointer-events-none opacity-60">
//         <AnimatedBackground />
//       </div>

//       <div className="
//         relative z-10 w-full max-w-7xl mx-auto
//         px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12
//         py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32
//       ">
//         <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
//           {/* LEFT COLUMN */}
//           <div className="space-y-5 sm:space-y-7 md:space-y-9 text-center lg:text-left">
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mx-auto lg:mx-0 text-xs sm:text-sm md:text-base"
//             >
//               <span className="text-xl">????</span>
//               <span className="text-blue-400 font-semibold tracking-wide">
//                 Victorian SMB IT Specialists
//               </span>
//             </motion.div>

//             {/* Tagline + Headline */}
//             <div className="space-y-3 sm:space-y-4 md:space-y-6">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentTagline}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.7, ease: "easeOut" }}
//                   className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-200/90"
//                 >
//                   {taglines[currentTagline]}
//                 </motion.div>
//               </AnimatePresence>

//               <h1 className="
//                 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
//                 font-black leading-[0.92] md:leading-[0.95] tracking-[-0.02em] text-white
//               ">
//                 <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent block">
//                   Start Growing.
//                 </span>
//               </h1>
//             </div>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 35 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl leading-relaxed text-slate-300/90"
//             >
//               professional-grade IT support, cybersecurity, cloud services and automation —
//               purpose-built for Victorian small and medium businesses.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 md:pt-6"
//             >
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03]"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </a>

//               <a
//                 href="#services"
//                 className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
//               >
//                 <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 View Solutions
//               </a>
//             </motion.div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.9, delay: 0.3 }}
//             className="mt-10 lg:mt-0 space-y-6 md:space-y-8"
//           >
//             <GlassCard className="p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10" gradient>
//               <div className="grid sm:grid-cols-2 gap-5 items-center">
//                 <div>
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Common Challenge
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       transition={{ duration: 0.5 }}
//                       className="flex items-center gap-4"
//                     >
//                       <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
//                         <CurrentIcon className="w-6 h-6 text-blue-400" />
//                       </div>
//                       <span className="text-lg sm:text-xl font-semibold text-white leading-tight">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-l border-white/10 pl-5 sm:pl-6">
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Our Solution
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       transition={{ duration: 0.5 }}
//                       className="text-lg sm:text-xl font-semibold text-cyan-300 leading-tight"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
//                       i === currentProblem ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-110' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
//               {stats.map((stat, i) => (
//                 <GlassCard key={i} className="p-4 sm:p-5 md:p-6">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2.5 rounded-lg bg-blue-500/10">
//                       <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
//                     </div>
//                     <div>
//                       <div className="text-2xl sm:text-3xl font-bold text-white">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
//                         {stat.label}
//                       </div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


// // src/components/hero/HeroSection.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Shield, Zap, Database, CheckCircle, ArrowRight, Clock, Users,
//   TrendingUp, Activity, AlertTriangle, Play, Lock, Server
// } from 'lucide-react';

// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);
//   const [currentTagline, setCurrentTagline] = useState(0);

//   const taglines = [
//     "Stop Fighting IT.",
//     "Stop Worrying About IT.",
//     "Leave IT Headaches Behind.",
//     "Focus on Growth, Not IT.",
//   ];

//   const problems = [
//     { problem: 'Frequent IT disruptions?',     solution: 'Proactive 24/7 Monitoring',              icon: AlertTriangle },
//     { problem: 'Security vulnerabilities?',    solution: 'Enterprise Zero-Trust Protection',       icon: Shield },
//     { problem: 'Slow or unreliable systems?',  solution: 'Performance Optimisation & Tuning',      icon: Zap },
//     { problem: 'Risk of data loss?',           solution: 'Automated Encrypted Backups',            icon: Database },
//     { problem: 'Complex IT administration?',   solution: 'Fully Managed Infrastructure',           icon: Server },
//     { problem: 'Rising cyber threats?',        solution: 'Advanced Threat Detection & Response',   icon: Lock },
//   ];

//   const stats = [
//     { value: '150+', label: 'Victorian SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
//     { value: '24/7', label: 'Proactive Monitoring', icon: Activity },
//     { value: '<2 hrs', label: 'Average Response', icon: Clock },
//   ];

//   useEffect(() => {
//     const problemTimer = setInterval(() => {
//       setCurrentProblem(prev => (prev + 1) % problems.length);
//     }, 5000);

//     const taglineTimer = setInterval(() => {
//       setCurrentTagline(prev => (prev + 1) % taglines.length);
//     }, 7000);

//     return () => {
//       clearInterval(problemTimer);
//       clearInterval(taglineTimer);
//     };
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex items-center">
//       {/* Animated background - lowered opacity */}
//       <div className="absolute inset-0 pointer-events-none opacity-60">
//         <AnimatedBackground />
//       </div>

//       <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 xl:py-32">
//         <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

//           {/* LEFT - Text content */}
//           <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mx-auto lg:mx-0"
//             >
//               <span className="text-xl">????</span>
//               <span className="text-blue-400 text-sm font-semibold tracking-wide">
//                 Victorian SMB IT Specialists
//               </span>
//             </motion.div>

//             {/* Tagline + Main Headline */}
//             <div className="space-y-3 sm:space-y-5">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentTagline}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.7, ease: "easeOut" }}
//                   className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-200/90"
//                 >
//                   {taglines[currentTagline]}
//                 </motion.div>
//               </AnimatePresence>

//               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-[0.92] sm:leading-[0.95] tracking-[-0.02em] text-white">
//                 <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent block">
//                   Start Growing.
//                 </span>
//               </h1>
//             </div>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 35 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="max-w-xl text-base sm:text-lg lg:text-xl text-slate-300/90 leading-relaxed mx-auto lg:mx-0"
//             >
//               professional-grade IT support, cybersecurity, cloud services and automation —  
//               purpose-built for Victorian small and medium businesses.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start pt-4"
//             >
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03]"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </a>

//               <a
//                 href="#services"
//                 className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
//               >
//                 <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 View Solutions
//               </a>
//             </motion.div>

//             {/* Trust badges */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.7 }}
//               className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2"
//             >
//               {[
//                 { icon: CheckCircle, text: '99.9% Uptime' },
//                 { icon: Clock, text: '<2hr Response' },
//                 { icon: Shield, text: 'Zero-Trust Security' },
//               ].map((badge, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
//                 >
//                   <badge.icon className="w-5 h-5 text-green-400" />
//                   <span className="text-sm text-slate-200">{badge.text}</span>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* RIGHT - Problem/Solution + Stats */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.9, delay: 0.3 }}
//             className="space-y-6 sm:space-y-8"
//           >
//             <GlassCard className="p-5 sm:p-6 lg:p-8" gradient>
//               <div className="grid sm:grid-cols-2 gap-5 items-center">
//                 <div>
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Common Challenge
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       transition={{ duration: 0.5 }}
//                       className="flex items-center gap-4"
//                     >
//                       <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
//                         <CurrentIcon className="w-6 h-6 text-blue-400" />
//                       </div>
//                       <span className="text-lg sm:text-xl font-semibold text-white leading-tight">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-l border-white/10 pl-5 sm:pl-6">
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Our Solution
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       transition={{ duration: 0.5 }}
//                       className="text-lg sm:text-xl font-semibold text-cyan-300 leading-tight"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
//                       i === currentProblem ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-110' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4 sm:gap-5">
//               {stats.map((stat, i) => (
//                 <GlassCard key={i} className="p-4 sm:p-5">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2.5 rounded-lg bg-blue-500/10">
//                       <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
//                     </div>
//                     <div>
//                       <div className="text-2xl sm:text-3xl font-bold text-white">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
//                         {stat.label}
//                       </div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// // src/components/hero/HeroSection.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Shield,
//   Zap,
//   Database,
//   CheckCircle,
//   ArrowRight,
//   Clock,
//   Users,
//   TrendingUp,
//   Activity,
//   AlertTriangle,
//   Play
// } from 'lucide-react';

// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);

//   const problems = [
//     { problem: 'Constant IT Fires?', solution: '24/7 Proactive Monitoring', icon: AlertTriangle },
//     { problem: 'Security Concerns?', solution: 'professional-grade Protection', icon: Shield },
//     { problem: 'Slow Systems?', solution: 'Performance Optimisation', icon: Zap },
//     { problem: 'Data Loss Risk?', solution: 'Automated Backups', icon: Database }
//   ];

//   const stats = [
//     { value: '150+', label: 'SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
//     { value: '24/7', label: 'Monitoring', icon: Activity },
//     { value: '<2hrs', label: 'Response Time', icon: Zap }
//   ];

//   const trustBadges = [
//     { icon: CheckCircle, text: '99.9% Uptime SLA' },
//     { icon: Clock, text: '<2hr Response' },
//     { icon: Shield, text: 'Zero-Trust Security' }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentProblem((prev) => (prev + 1) % problems.length);
//     }, 4500);
//     return () => clearInterval(interval);
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section
//       id="hero"
//       className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex items-center"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 pointer-events-none opacity-70 contain-paint">
//         <AnimatedBackground />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

//           {/* LEFT COLUMN */}
//           <div className="space-y-6 sm:space-y-7 lg:space-y-8 text-center lg:text-left">

//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
//             >
//               <span className="text-lg sm:text-xl">????</span>
//               <span className="text-blue-400 text-xs sm:text-sm font-medium">
//                 Victorian SMB Specialists
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="font-black leading-[1.1] tracking-tight text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
//             >
//               Stop Fighting IT.
//               <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
//                 Start Growing.
//               </span>
//             </motion.h1>

//             {/* Subheadline */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="max-w-2xl text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mx-auto lg:mx-0"
//             >
//               professional-grade IT support, security, and automation designed
//               specifically for Victorian small and medium businesses.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
//             >
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
//               </a>

//               <a
//                 href="#services"
//                 className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/20 bg-white/5 text-white text-sm sm:text-base font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
//               >
//                 <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
//                 View Solutions
//               </a>
//             </motion.div>

//             {/* Trust Badges */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start"
//             >
//               {trustBadges.map((badge, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
//                 >
//                   <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
//                   <span className="text-xs sm:text-sm text-slate-200 whitespace-nowrap">{badge.text}</span>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* RIGHT COLUMN */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="space-y-4 sm:space-y-5 lg:space-y-6"
//           >

//             {/* Problem / Solution Card */}
//             <GlassCard className="p-4 sm:p-5 lg:p-6 xl:p-8" gradient>
//               <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-center">

//                 <div className="min-w-0">
//                   <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mb-2 sm:mb-3">
//                     Common SMB Challenge
//                   </p>

//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 10 }}
//                       transition={{ duration: 0.4, ease: 'easeInOut' }}
//                       className="flex items-center gap-3"
//                     >
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl bg-blue-500/20 flex-shrink-0">
//                         <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-400" />
//                       </div>
//                       <span className="text-sm sm:text-base lg:text-lg font-semibold text-white leading-tight">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-l border-white/10 pl-4 sm:pl-5 lg:pl-6 min-w-0">
//                   <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mb-2 sm:mb-3">
//                     Our Solution
//                   </p>

//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 10 }}
//                       transition={{ duration: 0.4, ease: 'easeInOut' }}
//                       className="text-sm sm:text-base lg:text-lg font-semibold text-blue-400 leading-tight"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Progress Indicators */}
//               <div className="flex gap-2 mt-4 sm:mt-5 lg:mt-6">
//                 {problems.map((_, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ duration: 0.3, delay: i * 0.1 }}
//                     className={`h-1 flex-1 rounded-full transition-all duration-500 ${
//                       i === currentProblem ? 'bg-blue-500' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
//               {stats.map((stat, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
//                 >
//                   <GlassCard className="p-3 sm:p-4 lg:p-5 h-full">
//                     <div className="flex flex-col gap-2 sm:gap-3">
//                       <div className="flex items-center gap-2 sm:gap-3">
//                         <div className="p-2 sm:p-2.5 rounded-lg bg-blue-500/10 flex-shrink-0">
//                           <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-none">
//                             {stat.value}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-[10px] sm:text-xs text-slate-400 leading-tight">
//                         {stat.label}
//                       </div>
//                     </div>
//                   </GlassCard>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1, delay: 1 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
//       >
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           className="flex flex-col items-center gap-2 text-slate-400"
//         >
//           <span className="text-xs uppercase tracking-wider">Scroll</span>
//           <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
//             <motion.div
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="w-1.5 h-1.5 bg-slate-400 rounded-full"
//             />
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;



// // src/components/hero/HeroSection.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Shield,
//   Zap,
//   Database,
//   CheckCircle,
//   ArrowRight,
//   Clock,
//   Users,
//   TrendingUp,
//   Activity,
//   AlertTriangle,
//   Play
// } from 'lucide-react';

// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);

//   const problems = [
//     { problem: 'Constant IT Fires?', solution: '24/7 Proactive Monitoring', icon: AlertTriangle },
//     { problem: 'Security Concerns?', solution: 'professional-grade Protection', icon: Shield },
//     { problem: 'Slow Systems?', solution: 'Performance Optimisation', icon: Zap },
//     { problem: 'Data Loss Risk?', solution: 'Automated Backups', icon: Database }
//   ];

//   const stats = [
//     { value: '150+', label: 'SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
//     { value: '24/7', label: 'Monitoring', icon: Activity },
//     { value: '<2hrs', label: 'Response Time', icon: Zap }
//   ];

//   const trustBadges = [
//     { icon: CheckCircle, text: '99.9% Uptime SLA' },
//     { icon: Clock, text: '<2hr Response' },
//     { icon: Shield, text: 'Zero-Trust Security' }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentProblem((prev) => (prev + 1) % problems.length);
//     }, 4500);
//     return () => clearInterval(interval);
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section
//       id="hero"
//       className="relative min-h-[90vh] lg:min-h-[85vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 pointer-events-none opacity-70 contain-paint">
//         <AnimatedBackground />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* LEFT */}
//           <div className="space-y-10 text-center lg:text-left">

//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
//               <span className="text-xl">????</span>
//               <span className="text-blue-400 text-sm font-medium">
//                 Victorian SMB Specialists
//               </span>
//             </div>

//             {/* Headline */}
//             <h1 className="font-black leading-tight tracking-tight text-white text-[clamp(2.5rem,5vw,4rem)]">
//               Stop Fighting IT.
//               <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                 Start Growing.
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p className="max-w-2xl text-slate-200 text-[clamp(1.1rem,2.2vw,1.35rem)] leading-relaxed mx-auto lg:mx-0">
//               professional-grade IT support, security, and automation designed
//               specifically for Victorian small and medium businesses.
//             </p>

//             {/* CTAs */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <a
//                 href="#contact"
//                 className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5" />
//               </a>

//               <a
//                 href="#services"
//                 className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition"
//               >
//                 <Play className="w-5 h-5" />
//                 View Solutions
//               </a>
//             </div>

//             {/* Trust Badges */}
//             <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
//               {trustBadges.map((badge, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
//                 >
//                   <badge.icon className="w-5 h-5 text-green-400" />
//                   <span className="text-sm text-slate-200">{badge.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="space-y-8">

//             {/* Problem / Solution Card */}
//             <GlassCard className="p-8 min-h-[180px]" gradient>
//               <div className="grid sm:grid-cols-2 gap-6 items-center">

//                 <div>
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Common SMB Challenge
//                   </p>

//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.35, ease: 'easeOut' }}
//                       className="flex items-center gap-4"
//                     >
//                       <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-500/20">
//                         <CurrentIcon className="w-7 h-7 text-blue-400" />
//                       </div>
//                       <span className="text-lg font-semibold text-white">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-l border-white/10 pl-6">
//                   <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">
//                     Our Solution
//                   </p>

//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.35, ease: 'easeOut' }}
//                       className="text-lg font-semibold text-blue-400"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Progress */}
//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1 flex-1 rounded-full ${
//                       i === currentProblem ? 'bg-blue-500' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             {/* Stats */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {stats.map((stat, i) => (
//                 <GlassCard key={i} className="p-5">
//                   <div className="flex items-center gap-3">
//                     <div className="p-3 rounded-lg bg-blue-500/10">
//                       <stat.icon className="w-6 h-6 text-blue-400" />
//                     </div>
//                     <div>
//                       <div className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-white">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs text-slate-400">
//                         {stat.label}
//                       </div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



// // src/components/hero/HeroSection.jsx (your original + fixes)
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Shield, Zap, Cloud, Database, CheckCircle, ArrowRight,
//   Clock, Users, TrendingUp, Activity, AlertTriangle, Play } from 'lucide-react';
// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);

//   const problems = [
//     { problem: 'Constant IT Fires?', solution: '24/7 Proactive Monitoring', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
//     { problem: 'Security Concerns?', solution: 'professional-grade Protection', icon: Shield, color: 'from-blue-500 to-cyan-500' },
//     { problem: 'Slow Systems?', solution: 'Optimized Performance', icon: Zap, color: 'from-yellow-500 to-amber-500' },
//     { problem: 'Data Loss Risk?', solution: 'Automated Backups', icon: Database, color: 'from-green-500 to-emerald-500' }
//   ];

//   const stats = [
//     { value: '150+', label: 'SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
//     { value: '24/7', label: 'Monitoring', icon: Activity },
//     { value: '<2hrs', label: 'Response Time', icon: Zap }
//   ];

//   const trustBadges = [
//     { icon: CheckCircle, text: '99.9% Uptime SLA' },
//     { icon: Clock, text: '<2hr Response' },
//     { icon: Shield, text: 'Zero-Trust Security' }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentProblem((prev) => (prev + 1) % problems.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
//       <AnimatedBackground />
      
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left Content – Better spacing & font scaling */}
//           <div className="text-center lg:text-left space-y-8 lg:space-y-10">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
//               <span className="text-2xl">????</span>
//               <span className="text-blue-400 font-medium text-sm sm:text-base">Victorian SMB Specialists</span>
//             </div>

//             {/* Headline – Fluid, bold, fills space */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight">
//               Stop Fighting IT.<br className="sm:hidden" />
//               <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                 Start Growing.
//               </span>
//             </h1>

//             {/* Subheadline – Larger, better line height */}
//             <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
//               professional-grade IT support, security, and automation designed specifically for Victorian small and medium businesses.
//             </p>

//             {/* CTAs – Bigger, more prominent */}
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
//               <a
//                 href="#contact"
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all w-full sm:w-auto"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </a>
//               <a
//                 href="#services"
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all w-full sm:w-auto"
//               >
//                 <Play className="w-5 h-5" />
//                 View Solutions
//               </a>
//             </div>

//             {/* Trust Badges – Larger, better spacing */}
//             <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
//               {trustBadges.map((badge, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full border border-white/10 shadow-sm"
//                 >
//                   <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
//                   <span className="text-sm sm:text-base text-slate-200 font-medium">{badge.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Content – Stats & Problem Card – Better balance */}
//           <div className="relative mt-12 lg:mt-0 space-y-8">
//             {/* Problem-Solution Card */}
//             <GlassCard className="p-6 sm:p-8" gradient>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Common SMB Challenge
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="flex items-center gap-4"
//                     >
//                       <div className={`p-4 rounded-xl bg-gradient-to-br ${problems[currentProblem].color} bg-opacity-20`}>
//                         <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                       </div>
//                       <span className="text-xl sm:text-2xl font-bold text-white">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
                
//                 <div className="border-l border-white/10 pl-6">
//                   <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Our Solution
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="text-xl sm:text-2xl font-semibold text-blue-400"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Progress bar */}
//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
//                       i === currentProblem ? 'bg-blue-500 scale-110' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             {/* Stats Grid – Larger, better spacing */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
//               {stats.map((stat, i) => (
//                 <GlassCard key={i} className="p-5 sm:p-6 text-center group shadow-lg">
//                   <div className="flex items-center justify-center gap-3 sm:gap-4">
//                     <div className="p-3 sm:p-4 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                       <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
//                     </div>
//                     <div className="text-left">
//                       <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">{stat.value}</div>
//                       <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
//       >
//         <motion.div
//           animate={{ y: [0, 12, 0] }}
//           transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
//           className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
//         >
//           <div className="w-1.5 h-3 bg-white/60 rounded-full" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;



// // src/components/hero/HeroSection.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { 
//   Shield, Zap, Cloud, Database, CheckCircle, ArrowRight,
//   Clock, Users, TrendingUp, Activity, AlertTriangle, Play
// } from 'lucide-react';
// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// const HeroSection = () => {
//   const shouldReduceMotion = useReducedMotion();
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: true,
//   });

//   const [currentProblem, setCurrentProblem] = useState(0);

//   const problems = [
//     { problem: 'Constant IT Fires?', solution: '24/7 Proactive Monitoring', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
//     { problem: 'Security Concerns?', solution: 'professional-grade Protection', icon: Shield, color: 'from-blue-500 to-cyan-500' },
//     { problem: 'Slow Systems?', solution: 'Optimized Performance', icon: Zap, color: 'from-yellow-500 to-amber-500' },
//     { problem: 'Data Loss Risk?', solution: 'Automated Backups', icon: Database, color: 'from-green-500 to-emerald-500' }
//   ];

//   const stats = [
//     { value: '150+', label: 'SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
//     { value: '24/7', label: 'Monitoring', icon: Activity },
//     { value: '<2hrs', label: 'Response Time', icon: Zap }
//   ];

//   const trustBadges = [
//     { icon: CheckCircle, text: '99.9% Uptime SLA' },
//     { icon: Clock, text: '<2hr Response' },
//     { icon: Shield, text: 'Zero-Trust Security' }
//   ];

//   useEffect(() => {
//     if (!inView || shouldReduceMotion) return;
//     const interval = setInterval(() => {
//       setCurrentProblem((prev) => (prev + 1) % problems.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [inView, shouldReduceMotion]);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section
//       id="hero"
//       ref={ref}
//       className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
//     >
//       <AnimatedBackground />

//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left Content - Responsive Typography */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
//             className="text-center lg:text-left"
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.2, duration: shouldReduceMotion ? 0 : 0.6 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 sm:mb-8 mx-auto lg:mx-0"
//             >
//               <span className="text-2xl">????</span>
//               <span className="text-blue-400 font-medium text-sm sm:text-base">Victorian SMB Specialists</span>
//             </motion.div>

//             {/* Headline - Fluid scaling */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
//               Stop Fighting IT.
//               <br className="sm:hidden" />
//               <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                 Start Growing.
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 lg:mb-10 leading-relaxed">
//               professional-grade IT support, security, and automation designed specifically for Victorian small and medium businesses.
//             </p>

//             {/* CTAs - Stacked on mobile, row on desktop */}
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-10 lg:mb-12">
//               <motion.a
//                 href="#contact"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all w-full sm:w-auto"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </motion.a>

//               <motion.a
//                 href="#services"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all w-full sm:w-auto"
//               >
//                 <Play className="w-5 h-5" />
//                 View Solutions
//               </motion.a>
//             </div>

//             {/* Trust Badges - Responsive wrapping */}
//             <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
//               {trustBadges.map((badge, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={inView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ delay: 0.4 + i * 0.1, duration: shouldReduceMotion ? 0 : 0.6 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
//                 >
//                   <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
//                   <span className="text-sm sm:text-base text-slate-300 font-medium">{badge.text}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Content - Interactive Cards - Responsive */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.3 }}
//             className="relative mt-12 lg:mt-0"
//           >
//             {/* Problem-Solution Card */}
//             <GlassCard className="p-6 sm:p-8 mb-6" gradient>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Common SMB Challenge
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
//                       className="flex items-center gap-3"
//                     >
//                       <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${problems[currentProblem].color} bg-opacity-20`}>
//                         <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                       </div>
//                       <span className="text-xl sm:text-2xl font-bold text-white">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>

//                 <div className="border-l border-white/10 pl-6">
//                   <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Our Solution
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
//                       className="text-xl sm:text-2xl font-semibold text-blue-400"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Progress Indicators */}
//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1 flex-1 rounded-full transition-all duration-500 ${
//                       i === currentProblem ? 'bg-blue-500 scale-110' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             {/* Stats Grid - Responsive */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {stats.map((stat, i) => (
//                 <GlassCard 
//                   key={i} 
//                   className="p-4 sm:p-5 text-center group" 
//                 >
//                   <div className="flex items-center justify-center gap-3">
//                     <div className="p-2 sm:p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                       <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
//                     </div>
//                     <div className="text-left">
//                       <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
//                       <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>

//             {/* Floating Elements - Reduced on mobile */}
//             <motion.div
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//               className="hidden sm:block absolute -top-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl"
//             />
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//               className="hidden sm:block absolute -bottom-4 -left-4 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-15 blur-xl"
//             />
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
//         >
//           <div className="w-1 h-2 bg-white/50 rounded-full" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;




// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Shield, Zap, Cloud, Database, CheckCircle, ArrowRight,
//   Clock, Users, TrendingUp, Activity, AlertTriangle, Play
// } from 'lucide-react';
// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);

//   const problems = [
//     { problem: 'Constant IT Fires?', solution: '24/7 Proactive Monitoring', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
//     { problem: 'Security Concerns?', solution: 'professional-grade Protection', icon: Shield, color: 'from-blue-500 to-cyan-500' },
//     { problem: 'Slow Systems?', solution: 'Optimized Performance', icon: Zap, color: 'from-yellow-500 to-amber-500' },
//     { problem: 'Data Loss Risk?', solution: 'Automated Backups', icon: Database, color: 'from-green-500 to-emerald-500' }
//   ];

//   const stats = [
//     { value: '150+', label: 'SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
//     { value: '24/7', label: 'Monitoring', icon: Activity },
//     { value: '<2hrs', label: 'Response Time', icon: Zap }
//   ];

//   const trustBadges = [
//     { icon: CheckCircle, text: '99.9% Uptime SLA' },
//     { icon: Clock, text: '<2hr Response' },
//     { icon: Shield, text: 'Zero-Trust Security' }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentProblem((prev) => (prev + 1) % problems.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section id="hero" className="relative h-screen min-h-[650px] max-h-[1100px] flex items-center overflow-hidden">
//       <AnimatedBackground />
      
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
//             >
//               <span className="text-2xl">????</span>
//               <span className="text-blue-400 font-medium">Victorian SMB Specialists</span>
//             </motion.div>

//             {/* Headline */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6">
//               Stop Fighting IT.
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                 Start Growing.
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p className="text-lg sm:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed">
//               professional-grade IT support, security, and automation designed specifically for Victorian small and medium businesses.
//             </p>

//             {/* CTAs */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-10">
//               <motion.a
//                 href="#contact"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </motion.a>
              
//               <motion.a
//                 href="#services"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
//               >
//                 <Play className="w-5 h-5" />
//                 View Solutions
//               </motion.a>
//             </div>

//             {/* Trust Badges */}
//             <div className="flex flex-wrap gap-4">
//               {trustBadges.map((badge, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 + i * 0.1 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
//                 >
//                   <badge.icon className="w-4 h-4 text-green-400" />
//                   <span className="text-sm text-slate-300 font-medium">{badge.text}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Content - Interactive Cards */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="relative"
//           >
//             {/* Problem-Solution Card */}
//             <GlassCard className="p-8 mb-6" gradient>
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Common SMB Challenge
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="flex items-center gap-3"
//                     >
//                       <div className={`p-3 rounded-xl bg-gradient-to-br ${problems[currentProblem].color} bg-opacity-20`}>
//                         <CurrentIcon className="w-6 h-6 text-white" />
//                       </div>
//                       <span className="text-xl font-bold text-white">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
                
//                 <div className="border-l border-white/10 pl-6">
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Our Solution
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="text-lg font-semibold text-blue-400"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Progress Indicators */}
//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1 flex-1 rounded-full transition-all duration-300 ${
//                       i === currentProblem ? 'bg-blue-500' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               {stats.map((stat, i) => (
//                 <GlassCard 
//                   key={i} 
//                   className="p-5 text-center group" 
//                   delay={0.5 + i * 0.1}
//                 >
//                   <div className="flex items-center justify-center gap-3">
//                     <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                       <stat.icon className="w-5 h-5 text-blue-400" />
//                     </div>
//                     <div className="text-left">
//                       <div className="text-2xl font-black text-white">{stat.value}</div>
//                       <div className="text-xs text-slate-400">{stat.label}</div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>

//             {/* Floating Elements */}
//             <motion.div
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//               className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl"
//             />
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//               className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-15 blur-xl"
//             />
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
//         >
//           <div className="w-1 h-2 bg-white/50 rounded-full" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Shield, Zap, Cloud, Database, CheckCircle, ArrowRight,
//   Clock, Users, TrendingUp, Activity, AlertTriangle, Play
// } from 'lucide-react';
// import AnimatedBackground from '../ui/AnimatedBackground';
// import GlassCard from '../ui/GlassCard';

// const HeroSection = () => {
//   const [currentProblem, setCurrentProblem] = useState(0);

//   const problems = [
//     { problem: 'Constant IT Fires?', solution: '24/7 Proactive Monitoring', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
//     { problem: 'Security Concerns?', solution: 'professional-grade Protection', icon: Shield, color: 'from-blue-500 to-cyan-500' },
//     { problem: 'Slow Systems?', solution: 'Optimized Performance', icon: Zap, color: 'from-yellow-500 to-amber-500' },
//     { problem: 'Data Loss Risk?', solution: 'Automated Backups', icon: Database, color: 'from-green-500 to-emerald-500' }
//   ];

//   const stats = [
//     { value: '150+', label: 'SMBs Protected', icon: Users },
//     { value: '99.9%', label: 'Uptime SLA', icon: TrendingUp },
//     { value: '24/7', label: 'Monitoring', icon: Activity },
//     { value: '<2hrs', label: 'Response Time', icon: Zap }
//   ];

//   const trustBadges = [
//     { icon: CheckCircle, text: '99.9% Uptime SLA' },
//     { icon: Clock, text: '<2hr Response' },
//     { icon: Shield, text: 'Zero-Trust Security' }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentProblem((prev) => (prev + 1) % problems.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const CurrentIcon = problems[currentProblem].icon;

//   return (
//     <section id="hero" className="relative h-screen min-h-[650px] max-h-[1100px] flex items-center overflow-hidden">
//       <AnimatedBackground />
      
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
//             >
//               <span className="text-2xl">????</span>
//               <span className="text-blue-400 font-medium">Victorian SMB Specialists</span>
//             </motion.div>

//             {/* Headline */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6">
//               Stop Fighting IT.
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                 Start Growing.
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p className="text-lg sm:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed">
//               professional-grade IT support, security, and automation designed specifically for Victorian small and medium businesses.
//             </p>

//             {/* CTAs */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-10">
//               <motion.a
//                 href="#contact"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all"
//               >
//                 Free IT Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </motion.a>
              
//               <motion.a
//                 href="#services"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all"
//               >
//                 <Play className="w-5 h-5" />
//                 View Solutions
//               </motion.a>
//             </div>

//             {/* Trust Badges */}
//             <div className="flex flex-wrap gap-4">
//               {trustBadges.map((badge, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 + i * 0.1 }}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
//                 >
//                   <badge.icon className="w-4 h-4 text-green-400" />
//                   <span className="text-sm text-slate-300 font-medium">{badge.text}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Content - Interactive Cards */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="relative"
//           >
//             {/* Problem-Solution Card */}
//             <GlassCard className="p-8 mb-6" gradient>
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Common SMB Challenge
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="flex items-center gap-3"
//                     >
//                       <div className={`p-3 rounded-xl bg-gradient-to-br ${problems[currentProblem].color} bg-opacity-20`}>
//                         <CurrentIcon className="w-6 h-6 text-white" />
//                       </div>
//                       <span className="text-xl font-bold text-white">
//                         {problems[currentProblem].problem}
//                       </span>
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
                
//                 <div className="border-l border-white/10 pl-6">
//                   <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
//                     Our Solution
//                   </p>
//                   <AnimatePresence mode="wait">
//                     <motion.p
//                       key={currentProblem}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="text-lg font-semibold text-blue-400"
//                     >
//                       {problems[currentProblem].solution}
//                     </motion.p>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Progress Indicators */}
//               <div className="flex gap-2 mt-6">
//                 {problems.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1 flex-1 rounded-full transition-all duration-300 ${
//                       i === currentProblem ? 'bg-blue-500' : 'bg-white/10'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </GlassCard>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               {stats.map((stat, i) => (
//                 <GlassCard 
//                   key={i} 
//                   className="p-5 text-center group" 
//                   delay={0.5 + i * 0.1}
//                 >
//                   <div className="flex items-center justify-center gap-3">
//                     <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                       <stat.icon className="w-5 h-5 text-blue-400" />
//                     </div>
//                     <div className="text-left">
//                       <div className="text-2xl font-black text-white">{stat.value}</div>
//                       <div className="text-xs text-slate-400">{stat.label}</div>
//                     </div>
//                   </div>
//                 </GlassCard>
//               ))}
//             </div>

//             {/* Floating Elements */}
//             <motion.div
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//               className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl"
//             />
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//               className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-15 blur-xl"
//             />
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
//         >
//           <div className="w-1 h-2 bg-white/50 rounded-full" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;
