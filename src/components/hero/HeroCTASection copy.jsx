// // src/components/hero/HeroCTASection.jsx - COMPACT ABOVE-THE-FOLD VERSION
// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { motion, AnimatePresence, useInView } from 'framer-motion';

// import { 
//   Phone, Shield, Zap, ArrowRight, CheckCircle, Clock, 
//   Server, Activity, Database, Cloud, Cpu, Code, Boxes, ChevronDown
// } from 'lucide-react';

// const HeroCTASection = () => {
//   const networkRef = React.useRef(null);
//   const isNetworkInView = useInView(networkRef, { once: true, margin: "-50px" });

//   const rotatingTexts = [
//     'Turn IT chaos into reliable growth',
//     'Eliminate ransomware fears forever',
//     'Stop losing revenue to downtime',
//     'Build unbreakable trust in your IT'
//   ];

//   const [currentText, setCurrentText] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentText(prev => (prev + 1) % rotatingTexts.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const serviceIcons = [
//     { icon: Cloud, label: 'Cloud', color: 'cyan' },
//     { icon: Activity, label: 'Network', color: 'blue' },
//     { icon: Boxes, label: 'M365', color: 'orange' },
//     { icon: Server, label: 'Azure', color: 'purple' },
//     { icon: Shield, label: 'Security', color: 'red' },
//     { icon: Code, label: 'Software', color: 'green' },
//     { icon: Cpu, label: 'Hardware', color: 'indigo' },
//     { icon: Database, label: 'Data', color: 'pink' }
//   ];

//   return (
//     <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/90 to-cyan-950/80 pt-20 pb-6">
//       {/* Subtle background orbs - smaller */}
//       <motion.div 
//         animate={{ x: [0, 80, 0], y: [0, -60, 0] }} 
//         transition={{ duration: 25, repeat: Infinity }} 
//         className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" 
//       />
//       <motion.div 
//         animate={{ x: [0, -80, 0], y: [0, 60, 0] }} 
//         transition={{ duration: 30, repeat: Infinity, delay: 1 }} 
//         className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" 
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
//         {/* ========== COMPACT HERO - All critical info above fold ========== */}
//         <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6 lg:gap-8 items-start mb-6">
          
//           {/* LEFT COLUMN - Main Message */}
//           <div className="space-y-4">
//             {/* Badge - Compact */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-white text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/20"
//             >
//               🇦🇺 Free IT Transformation Assessment
//             </motion.div>

//             {/* Headline - Compact */}
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight"
//             >
//               <span className="text-white">Transform Your Victorian SMB</span>
//               <br />
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 IT Risks Into Growth
//               </span>
//             </motion.h1>

//             {/* Subheadline - Compact */}
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl"
//             >
//               Eliminate downtime, defeat cyber threats, unlock growth — with transparent pricing and proven results.
//             </motion.p>

//             {/* Rotating Text - Minimal height */}
//             <div className="relative h-10 sm:h-12 flex items-center">
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={currentText}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.4 }}
//                   className="absolute inset-0 flex items-center text-base sm:text-lg font-semibold italic text-cyan-300"
//                 >
//                   {rotatingTexts[currentText]}
//                 </motion.p>
//               </AnimatePresence>
//             </div>

//             {/* CTAs - Prominent placement */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-2">
//               <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
//                 <RouterLink
//                   to="/contact"
//                   className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
//                 >
//                   <span>Book Free Assessment</span>
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </RouterLink>
//               </motion.div>

//               <motion.a
//                 href="tel:1300000000"
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base sm:text-lg font-bold text-cyan-300 border-2 border-cyan-500/60 bg-slate-900/60 backdrop-blur-md rounded-xl hover:bg-slate-800/80 hover:border-cyan-400 transition-all"
//               >
//                 <Phone className="w-5 h-5" />
//                 <span>1300 XXX XXX</span>
//               </motion.a>
//             </div>

//             {/* Compact Trust Badges - Inline */}
//             <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
//               <div className="flex items-center gap-1.5 text-slate-300">
//                 <CheckCircle className="w-4 h-4 text-green-400" />
//                 <span>99.9% Uptime</span>
//               </div>
//               <div className="flex items-center gap-1.5 text-slate-300">
//                 <Clock className="w-4 h-4 text-blue-400" />
//                 <span>&lt;2hr Response</span>
//               </div>
//               <div className="flex items-center gap-1.5 text-slate-300">
//                 <Shield className="w-4 h-4 text-cyan-400" />
//                 <span>150+ SMBs</span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN - Compact Visual */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="relative"
//           >
//             {/* IT Solutions Grid - Compact 4x2 */}
//             <div className="p-5 rounded-xl bg-slate-900/70 border border-white/10 backdrop-blur-xl">
//               <h3 className="text-sm font-bold text-white mb-3 text-center">Comprehensive IT Solutions</h3>
              
//               <div className="grid grid-cols-4 gap-2.5">
//                 {serviceIcons.map((service, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.5 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.3 + i * 0.03 }}
//                     whileHover={{ scale: 1.08, y: -3 }}
//                     className="flex flex-col items-center gap-1"
//                   >
//                     <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-${service.color}-500/10 border border-${service.color}-500/30 flex items-center justify-center transition-all hover:bg-${service.color}-500/20`}>
//                       <service.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${service.color}-400`} />
//                     </div>
//                     <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium text-center">{service.label}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Compact Stats - 3 columns */}
//             <div className="grid grid-cols-3 gap-2 mt-4">
//               {[
//                 { value: '150+', label: 'SMBs' },
//                 { value: '99.9%', label: 'Uptime' },
//                 { value: '<2hrs', label: 'Response' }
//               ].map((stat, i) => (
//                 <div key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-center">
//                   <div className="text-lg sm:text-xl font-black text-white">{stat.value}</div>
//                   <div className="text-[9px] sm:text-[10px] text-slate-400">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* ========== LIVE DATA FLOW - Compact, fits in viewport ========== */}
//         <div ref={networkRef} className="mb-6">
//           <h3 className="text-base sm:text-lg font-bold text-white mb-3 text-center">
//             Live Data Flow & Monitoring
//           </h3>
          
//           <div className="relative w-full h-48 sm:h-56 max-w-5xl mx-auto">
//             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid meet">
//               <defs>
//                 <filter id="glow">
//                   <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                   <feMerge>
//                     <feMergeNode in="coloredBlur"/>
//                     <feMergeNode in="SourceGraphic"/>
//                   </feMerge>
//                 </filter>
//               </defs>

//               {/* Network Lines */}
//               {[
//                 { x1: 120, y1: 120, x2: 320, y2: 80, color: '#06b6d4' },
//                 { x1: 320, y1: 80, x2: 520, y2: 120, color: '#3b82f6' },
//                 { x1: 520, y1: 120, x2: 720, y2: 80, color: '#8b5cf6' },
//                 { x1: 720, y1: 80, x2: 880, y2: 120, color: '#10b981' }
//               ].map((line, i) => (
//                 <motion.line
//                   key={i}
//                   x1={line.x1} y1={line.y1}
//                   x2={line.x2} y2={line.y2}
//                   stroke={line.color}
//                   strokeWidth="2"
//                   initial={{ pathLength: 0, opacity: 0 }}
//                   animate={isNetworkInView ? { pathLength: 1, opacity: 1 } : {}}
//                   transition={{ duration: 1.5, delay: i * 0.1 }}
//                 />
//               ))}

//               {/* Animated Packets */}
//               {isNetworkInView && [
//                 { x1: 120, y1: 120, x2: 320, y2: 80, color: '#06b6d4' },
//                 { x1: 320, y1: 80, x2: 520, y2: 120, color: '#3b82f6' },
//                 { x1: 520, y1: 120, x2: 720, y2: 80, color: '#8b5cf6' },
//                 { x1: 720, y1: 80, x2: 880, y2: 120, color: '#10b981' }
//               ].map((path, i) => (
//                 <motion.circle
//                   key={i}
//                   r="5"
//                   fill={path.color}
//                   filter="url(#glow)"
//                   initial={{ cx: path.x1, cy: path.y1 }}
//                   animate={{
//                     cx: [path.x1, path.x2, path.x1],
//                     cy: [path.y1, path.y2, path.y1],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     delay: i * 0.4,
//                     ease: "linear"
//                   }}
//                 />
//               ))}
//             </svg>

//             {/* Compact Network Nodes */}
//             {[
//               { Icon: Server, label: 'Edge', x: '12%', y: '50%', color: 'cyan' },
//               { Icon: Shield, label: 'Firewall', x: '32%', y: '33%', color: 'blue' },
//               { Icon: Activity, label: 'Monitor', x: '52%', y: '50%', color: 'purple' },
//               { Icon: Database, label: 'Database', x: '72%', y: '33%', color: 'green' },
//               { Icon: Cloud, label: 'Cloud', x: '88%', y: '50%', color: 'orange' }
//             ].map((node, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={isNetworkInView ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ delay: 0.8 + i * 0.08, type: "spring", stiffness: 200 }}
//                 className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
//                 style={{ left: node.x, top: node.y }}
//               >
//                 <motion.div 
//                   animate={{ scale: [1, 1.08, 1] }}
//                   transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
//                   className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-${node.color}-500/20 border-2 border-${node.color}-500 flex items-center justify-center backdrop-blur-sm`}
//                 >
//                   <node.Icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${node.color}-400`} />
//                 </motion.div>
//                 <p className={`mt-1 text-[9px] sm:text-[10px] font-bold text-${node.color}-300 bg-slate-900/80 px-1.5 py-0.5 rounded-full whitespace-nowrap`}>
//                   {node.label}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="flex justify-center pt-2"
//         >
//           <motion.div
//             animate={{ y: [0, 6, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="p-2 rounded-full bg-white/5 border border-white/10"
//           >
//             <ChevronDown className="w-5 h-5 text-blue-400" />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroCTASection;









// src/components/hero/HeroCTASection.jsx - FINAL UNIFIED HERO + CTA (Single Background, No Gaps, Data Flow Fully Visible)

// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { motion, AnimatePresence, useInView } from 'framer-motion';

// import { 
//   AlertTriangle, Phone, Shield, Zap, TrendingUp, ArrowRight, 
//   CheckCircle, Clock, Server, Activity, Database, 
//   Cloud, Cpu, HardDrive, Layers, Code, Boxes, ChevronDown
// } from 'lucide-react';

// const HeroCTASection = () => {
//   const networkRef = React.useRef(null);
//   const isNetworkInView = useInView(networkRef, { once: true, margin: "-100px" });

//   const rotatingTexts = [
//     { text: 'Turn IT chaos into reliable growth.', style: 'font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-wide text-cyan-300 drop-shadow-2xl' },
//     { text: 'Eliminate ransomware fears forever.', style: 'font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase text-blue-300 drop-shadow-2xl' },
//     { text: 'Stop losing revenue to downtime.', style: 'font-mono text-3xl sm:text-4xl lg:text-5xl tracking-widest text-purple-300 drop-shadow-2xl' },
//     { text: 'Build unbreakable trust in your IT.', style: 'font-serif italic text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-green-300 drop-shadow-2xl' }
//   ];

//   const [currentText, setCurrentText] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentText(prev => (prev + 1) % rotatingTexts.length);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, []);

//   const serviceIcons = [
//     { icon: Cloud, label: 'Cloud Solutions', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
//     { icon: Activity, label: 'Networking', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
//     { icon: Boxes, label: 'Microsoft 365', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
//     { icon: Server, label: 'Azure Expertise', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
//     { icon: Shield, label: 'Cybersecurity', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
//     { icon: Code, label: 'Software Development', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
//     { icon: Cpu, label: 'Hardware Procurement', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
//     { icon: HardDrive, label: 'Infrastructure', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' }
//   ];

//   const packetPaths = [
//     { x1: 120, y1: 200, x2: 320, y2: 150, color: '#06b6d4' },
//     { x1: 320, y1: 150, x2: 520, y2: 200, color: '#3b82f6' },
//     { x1: 520, y1: 200, x2: 720, y2: 150, color: '#8b5cf6' },
//     { x1: 720, y1: 150, x2: 920, y2: 200, color: '#10b981' }
//   ];

//   const networkNodes = [
//     { Icon: Server, label: 'Edge Server', left: '12%', top: '50%', color: 'cyan' },
//     { Icon: Shield, label: 'Firewall', left: '32%', top: '38%', color: 'blue' },
//     { Icon: Activity, label: 'Monitoring', left: '52%', top: '50%', color: 'purple' },
//     { Icon: Database, label: 'Database', left: '72%', top: '38%', color: 'green' },
//     { Icon: Cloud, label: 'Cloud Storage', left: '88%', top: '50%', color: 'orange' }
//   ];

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/90 to-cyan-950/80">
//       {/* Single unified background gradient – no section breaks */}

//       {/* Subtle background orbs */}
//       <motion.div animate={{ x: [0, 120, 0], y: [0, -80, 0] }} transition={{ duration: 30, repeat: Infinity }} className="absolute top-10 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl opacity-60" />
//       <motion.div animate={{ x: [0, -100, 0], y: [0, 90, 0] }} transition={{ duration: 35, repeat: Infinity, delay: 2 }} className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl opacity-60" />

//       <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 flex flex-col justify-between min-h-screen">
//         {/* Main Hero Content – Above the fold */}
//         <div className="space-y-16 lg:space-y-20">
//           {/* Badge + Headline + Subheadline + Rotating Text */}
//           <div className="text-center space-y-8">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
//               className="inline-block px-8 py-4 bg-white/10 rounded-full text-white font-bold text-lg backdrop-blur-md border border-white/20"
//             >
//               🇦🇺 Limited-Time Free IT Transformation Assessment
//             </motion.div>

//             <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
//               className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight"
//             >
//               <div className="font-serif italic text-white drop-shadow-2xl">Transform Your Victorian SMB</div>
//               <div className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
//                 IT Risks Into Reliable Growth
//               </div>
//             </motion.h1>

//             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
//               className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-light italic"
//             >
//               Eliminate downtime, defeat cyber threats, unlock growth — with transparent pricing and proven results.
//             </motion.p>

//             {/* Rotating Texts */}
//             <div className="relative h-32 flex items-center justify-center">
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={currentText}
//                   initial={{ opacity: 0, y: 40 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -40 }}
//                   transition={{ duration: 0.8 }}
//                   className={`absolute ${rotatingTexts[currentText].style}`}
//                 >
//                   {rotatingTexts[currentText].text}
//                 </motion.p>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Service Icons + Stats */}
//           <div className="space-y-12">
//             <div>
//               <h3 className="text-2xl sm:text-3xl font-black text-white mb-10 text-center font-serif italic drop-shadow-lg">
//                 Comprehensive IT Solutions
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
//                 {serviceIcons.map((service, i) => (
//                   <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
//                     whileHover={{ scale: 1.15, y: -10 }} className="flex flex-col items-center gap-3"
//                   >
//                     <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
//                       className={`w-24 h-24 rounded-2xl ${service.color} border-4 flex items-center justify-center backdrop-blur-sm shadow-2xl`}
//                     >
//                       <service.icon className={`w-12 h-12 ${service.color.split(' ')[0]}`} />
//                     </motion.div>
//                     <p className="text-base text-slate-300 font-medium font-serif italic">{service.label}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
//               {[
//                 { value: '150+', label: 'Victorian SMBs Protected' },
//                 { value: '99.9%', label: 'Guaranteed Uptime SLA' },
//                 { value: '<2hrs', label: 'Critical Response Time' }
//               ].map((stat, i) => (
//                 <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl text-center">
//                   <div className="text-4xl lg:text-5xl font-black text-white">{stat.value}</div>
//                   <div className="text-sm lg:text-base text-slate-400 mt-2">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Live Data Flow – Fully visible in default view, no gaps */}
//           <div ref={networkRef} className="mt-16 lg:mt-20">
//             <h3 className="text-2xl sm:text-3xl font-black text-white mb-10 text-center font-serif italic drop-shadow-lg">
//               Live Data Flow & Monitoring Network
//             </h3>
//             <div className="relative w-full h-96 lg:h-[500px] max-w-6xl mx-auto">
//               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
//                 <defs>
//                   <filter id="glow">
//                     <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
//                     <feMerge>
//                       <feMergeNode in="coloredBlur"/>
//                       <feMergeNode in="SourceGraphic"/>
//                     </feMerge>
//                   </filter>
//                 </defs>

//                 {/* Lines */}
//                 {packetPaths.map((line, i) => (
//                   <motion.line key={`line-${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke={line.color} strokeWidth="3"
//                     initial={{ pathLength: 0, opacity: 0.6 }}
//                     animate={isNetworkInView ? { pathLength: 1, opacity: 1 } : {}}
//                     transition={{ duration: 2, delay: i * 0.2 }}
//                   />
//                 ))}

//                 {/* Packets */}
//                 {isNetworkInView && packetPaths.map((path, i) => (
//                   <motion.circle key={`packet-${i}`} r="8" fill={path.color} filter="url(#glow)"
//                     initial={{ cx: path.x1, cy: path.y1 }}
//                     animate={{ cx: [path.x1, path.x2, path.x1], cy: [path.y1, path.y2, path.y1] }}
//                     transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
//                   />
//                 ))}
//               </svg>

//               {/* Nodes */}
//               {networkNodes.map((node, i) => (
//                 <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={isNetworkInView ? { opacity: 1, scale: 1 } : {}}
//                   transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 200 }}
//                   className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
//                   style={{ left: node.left, top: node.top }}
//                 >
//                   <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
//                     className={`w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-${node.color}-500/20 border-4 border-${node.color}-500 flex items-center justify-center backdrop-blur-sm shadow-2xl`}
//                   >
//                     <node.Icon className={`w-10 h-10 lg:w-12 lg:h-12 text-${node.color}-400`} />
//                   </motion.div>
//                   <p className={`mt-3 text-sm lg:text-base font-bold text-${node.color}-300 bg-slate-900/80 px-3 py-1 rounded-full`}>
//                     {node.label}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Final CTA – No gaps, pinned near bottom */}
//         <div className="mt-16 lg:mt-20 text-center">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
//             className="space-y-6"
//           >
//             <p className="text-xl lg:text-2xl font-bold text-white">
//               Ready to eliminate IT risks and unlock reliable growth?
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-6">
//               <RouterLink to="/contact"
//                 className="group inline-flex items-center justify-center gap-4 px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl shadow-2xl hover:scale-105 hover:shadow-cyan-500/50 transition-all"
//               >
//                 Book Free Assessment
//                 <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
//               </RouterLink>
//               <a href="tel:1300XXXXXX"
//                 className="inline-flex items-center justify-center gap-4 px-12 py-6 text-2xl font-bold text-cyan-300 border-4 border-cyan-500/60 bg-slate-900/60 backdrop-blur-md rounded-3xl hover:bg-slate-800/80 hover:border-cyan-400 transition-all"
//               >
//                 <Phone className="w-8 h-8" />
//                 Call 1300 XXX XXX
//               </a>
//             </div>
//             <p className="text-slate-400">Limited-time offer • No obligation • Results in 48 hours</p>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
//           className="flex justify-center mt-12"
//         >
//           <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}
//             className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
//           >
//             <ChevronDown className="w-7 h-7 text-blue-400" />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroCTASection;






// src/components/cta/CTASection.jsx - OPTIMIZED FOR ABOVE-THE-FOLD
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

import { 
  AlertTriangle, Phone, Shield, Zap, TrendingUp, ArrowRight, 
  CheckCircle, Clock, Server, Activity, Database, 
  Cloud, Cpu, HardDrive, Code, Boxes
} from 'lucide-react';

const HeroCTASection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const terminalRef = useRef(null);
  const networkRef = useRef(null);

  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const isTerminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
  const isNetworkInView = useInView(networkRef, { once: true, margin: "-100px" });

  const [terminalStep, setTerminalStep] = useState(0);

  // Terminal typing animation
  useEffect(() => {
    if (isTerminalInView) {
      const interval = setInterval(() => {
        setTerminalStep(prev => (prev < 5 ? prev + 1 : prev));
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isTerminalInView]);

  const terminalLines = [
    { text: '> Scanning systems for vulnerabilities...', color: 'text-red-400' },
    { text: '> Deploying zero-trust security protocols...', color: 'text-orange-400' },
    { text: '> Optimising performance & cloud resources...', color: 'text-blue-400' },
    { text: '> Enabling proactive 24/7 monitoring...', color: 'text-purple-400' },
    { text: '> Transformation complete. Growth unlocked.', color: 'text-green-400' }
  ];

  const services = [
    { icon: Cloud, label: 'Cloud', color: 'cyan' },
    { icon: Activity, label: 'Networking', color: 'blue' },
    { icon: Boxes, label: 'M365', color: 'orange' },
    { icon: Server, label: 'Azure', color: 'purple' },
    { icon: Shield, label: 'Security', color: 'red' },
    { icon: Code, label: 'Software', color: 'green' },
    { icon: Cpu, label: 'Hardware', color: 'indigo' },
    { icon: HardDrive, label: 'Infrastructure', color: 'pink' }
  ];

  const networkNodes = [
    { Icon: Server, label: 'Edge Server', x: '10%', y: '50%', color: 'cyan' },
    { Icon: Shield, label: 'Firewall', x: '25%', y: '30%', color: 'blue' },
    { Icon: Activity, label: 'Monitoring', x: '40%', y: '50%', color: 'purple' },
    { Icon: Database, label: 'Database', x: '60%', y: '30%', color: 'green' },
    { Icon: Cloud, label: 'Cloud Storage', x: '75%', y: '50%', color: 'orange' },
    { Icon: Cpu, label: 'AI Engine', x: '90%', y: '50%', color: 'cyan' }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
      {/* Background orbs - Reduced opacity */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-8 lg:py-12">
        
        {/* ============ ABOVE THE FOLD: HERO CONTENT ============ */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-8 lg:mb-12">
          
          {/* LEFT: Main Message - Compact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 lg:space-y-6"
          >
            {/* Badge - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-white text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/20"
            >
              🇦🇺 Free IT Transformation Assessment
            </motion.div>

            {/* Headline - Reduced spacing */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Transform Your Victorian SMB IT Risks
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Into Reliable Growth
              </span>
            </h1>

            {/* Subheadline - More compact */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              Eliminate downtime, defeat cyber threats, unlock growth — with transparent pricing and proven results.
            </p>

            {/* CTAs - Prominent */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <RouterLink
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                >
                  <span>Book Free Assessment</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </RouterLink>
              </motion.div>

              <motion.a
                href="tel:1300XXXXXX"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-cyan-300 rounded-xl border-2 border-cyan-500/60 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 hover:border-cyan-400 transition-all"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>1300 XXX XXX</span>
              </motion.a>
            </div>

            {/* Trust Badges - Inline, compact */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { Icon: CheckCircle, text: '99.9% Uptime', color: 'green' },
                { Icon: Clock, text: '<2hr Response', color: 'blue' },
                { Icon: Shield, text: 'Zero-Trust Security', color: 'cyan' }
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 text-xs sm:text-sm text-slate-300"
                >
                  <badge.Icon className={`w-4 h-4 text-${badge.color}-400 flex-shrink-0`} />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Visual - IT Solutions Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 backdrop-blur-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">
                Comprehensive IT Solutions
              </h3>
              
              {/* Compact 4x2 Grid */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col items-center gap-1.5 sm:gap-2"
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl bg-${service.color}-500/10 border-2 border-${service.color}-500/30 flex items-center justify-center backdrop-blur-sm transition-all hover:bg-${service.color}-500/20`}>
                      <service.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${service.color}-400`} />
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-300 font-medium text-center">{service.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Floating decoration */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl opacity-20 blur-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Bar - Above the fold */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto w-full mb-8"
        >
          {[
            { value: '150+', label: 'SMBs Protected' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '<2hrs', label: 'Response Time' }
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-xl text-center"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator - Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-4"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* ============ BELOW THE FOLD: ADDITIONAL CONTENT ============ */}
      
      {/* Live Network Visualization */}
      <div className="relative z-10 bg-slate-950/50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-8 text-center"
          >
            Live Data Flow & Monitoring Network
          </motion.h3>
          
          <div ref={networkRef} className="relative w-full h-64 sm:h-80 lg:h-96 max-w-6xl mx-auto">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Network Lines */}
              {[
                { x1: 100, y1: 150, x2: 250, y2: 100, color: '#06b6d4' },
                { x1: 250, y1: 100, x2: 400, y2: 150, color: '#3b82f6' },
                { x1: 400, y1: 150, x2: 600, y2: 100, color: '#8b5cf6' },
                { x1: 600, y1: 100, x2: 750, y2: 150, color: '#10b981' },
                { x1: 750, y1: 150, x2: 900, y2: 150, color: '#f59e0b' }
              ].map((line, i) => (
                <motion.line
                  key={i}
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  stroke={line.color}
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isNetworkInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, delay: i * 0.15 }}
                />
              ))}
              
              {/* Animated Data Packets */}
              {isNetworkInView && [
                { x1: 100, y1: 150, x2: 250, y2: 100, color: '#06b6d4' },
                { x1: 250, y1: 100, x2: 400, y2: 150, color: '#3b82f6' },
                { x1: 400, y1: 150, x2: 600, y2: 100, color: '#8b5cf6' },
                { x1: 600, y1: 100, x2: 750, y2: 150, color: '#10b981' },
                { x1: 750, y1: 150, x2: 900, y2: 150, color: '#f59e0b' }
              ].map((path, i) => (
                <motion.circle
                  key={i}
                  r="6"
                  fill={path.color}
                  filter="url(#glow)"
                  animate={{
                    cx: [path.x1, path.x2, path.x1],
                    cy: [path.y1, path.y2, path.y1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                />
              ))}
            </svg>

            {/* Network Nodes */}
            {networkNodes.map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isNetworkInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: node.x, top: node.y }}
              >
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-${node.color}-500/20 border-2 border-${node.color}-500 flex items-center justify-center backdrop-blur-sm`}
                >
                  <node.Icon className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-${node.color}-400`} />
                </motion.div>
                <p className={`mt-2 text-xs sm:text-sm font-semibold text-${node.color}-300 bg-slate-900/80 px-2 py-1 rounded-full whitespace-nowrap`}>
                  {node.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Transformation Journey */}
      <div className="relative z-10 py-12 lg:py-16">
        <div ref={timelineRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-10 text-center"
          >
            Your IT Transformation Journey
          </motion.h3>
          
          <div className="relative flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Connecting Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" viewBox="0 0 1000 200">
              <motion.path 
                d="M 150,100 Q 350,50 500,100 T 850,100" 
                fill="none"
                stroke="rgb(6, 182, 212)"
                strokeWidth="3"
                strokeOpacity="0.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isTimelineInView ? { pathLength: 1 } : {}}
                transition={{ duration: 3 }}
              />
            </svg>

            {[
              { Icon: AlertTriangle, label: 'IT Fires & Risks', color: 'red' },
              { Icon: Phone, label: 'Free Assessment', color: 'blue' },
              { Icon: Shield, label: 'Proactive Security', color: 'cyan' },
              { Icon: TrendingUp, label: 'Reliable Growth', color: 'green' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={isTimelineInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.4, type: "spring", stiffness: 100 }}
                className="z-10 flex flex-col items-center"
              >
                <div className={`p-5 sm:p-6 rounded-2xl bg-${step.color}-500/20 border-2 border-${step.color}-500`}>
                  <step.Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-${step.color}-400" />
                </div>
                <p className="mt-3 text-sm sm:text-base font-semibold text-white text-center">{step.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Animation */}
      <div className="relative z-10 bg-slate-950/50 py-12 lg:py-16">
        <div ref={terminalRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-5 sm:p-6 lg:p-8 bg-slate-900/90 rounded-2xl border border-cyan-500/30 backdrop-blur-xl font-mono overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 ml-2 text-xs sm:text-sm">terminal@shakilit.au — transformation.sh</span>
            </div>

            <motion.div 
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {terminalLines.map((line, i) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < terminalStep ? 1 : 0 }}
                className={`mb-2 text-xs sm:text-sm lg:text-base ${line.color}`}
              >
                {line.text}
              </motion.p>
            ))}
            
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 sm:h-5 bg-green-400 ml-1"
            />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="relative z-10 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { label: 'Average Revenue Saved', value: 85, color: 'cyan' },
              { label: 'Guaranteed Uptime', value: 99.9, color: 'blue' },
              { label: 'Risk Reduction', value: 95, color: 'green' }
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-5 sm:p-6 lg:p-8 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-xl"
              >
                <p className={`text-${metric.color}-400 text-sm sm:text-base font-semibold mb-3`}>{metric.label}</p>
                <div className="relative h-10 sm:h-12 bg-slate-800 rounded-full overflow-hidden mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 rounded-full`}
                  />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">{metric.value}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 text-center py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 text-sm sm:text-base lg:text-lg mb-6"
          >
            ⭐ Trusted by 150+ Victorian & Tasmanian businesses
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <RouterLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-2xl hover:shadow-blue-500/50 transition-all"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </RouterLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCTASection;





// // src/components/cta/CTASection.jsx - FIXED VERSION
// import React, { useEffect, useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { motion, useInView, AnimatePresence } from 'framer-motion';

// import { 
//   AlertTriangle, Phone, Shield, Zap, TrendingUp, ArrowRight, 
//   CheckCircle, Clock, Server, Lock, Activity, Database, 
//   Cloud, Cpu, HardDrive, Layers, Code, Boxes
// } from 'lucide-react';

// const HeroCTASection = () => {
//   const sectionRef = useRef(null);
//   const timelineRef = useRef(null);
//   const terminalRef = useRef(null);
//   const networkRef = useRef(null);
//   const logosRef = useRef(null);

//   const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
//   const isTerminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
//   const isNetworkInView = useInView(networkRef, { once: true, margin: "-100px" });
//   const isLogosInView = useInView(logosRef, { once: true, margin: "-100px" });

//   const rotatingTexts = [
//     { 
//       text: 'Turn IT chaos into reliable growth.',
//       style: 'text-xl sm:text-2xl lg:text-3xl font-serif italic tracking-wide'
//     },
//     { 
//       text: 'Eliminate ransomware fears forever.',
//       style: 'text-lg sm:text-xl lg:text-2xl font-bold tracking-tight uppercase'
//     },
//     { 
//       text: 'Stop losing revenue to downtime.',
//       style: 'text-xl sm:text-2xl lg:text-3xl font-mono tracking-wider'
//     },
//     { 
//       text: 'Build unbreakable trust in your IT.',
//       style: 'text-lg sm:text-xl lg:text-2xl font-sans italic font-light tracking-wide'
//     }
//   ];

//   const [currentText, setCurrentText] = useState(0);
//   const [terminalStep, setTerminalStep] = useState(0);

//   // Rotate transformative texts every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentText(prev => (prev + 1) % rotatingTexts.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Terminal typing animation
//   useEffect(() => {
//     if (isTerminalInView) {
//       const interval = setInterval(() => {
//         setTerminalStep(prev => (prev < 5 ? prev + 1 : prev));
//       }, 1200);
//       return () => clearInterval(interval);
//     }
//   }, [isTerminalInView]);

//   const terminalLines = [
//     { text: '> Scanning systems for vulnerabilities...', color: 'text-red-400' },
//     { text: '> Deploying zero-trust security protocols...', color: 'text-orange-400' },
//     { text: '> Optimising performance & cloud resources...', color: 'text-blue-400' },
//     { text: '> Enabling proactive 24/7 monitoring...', color: 'text-purple-400' },
//     { text: '> Transformation complete. Growth unlocked.', color: 'text-green-400' }
//   ];

//   const services = [
//     { icon: Cloud, label: 'Cloud', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
//     { icon: Activity, label: 'Networking', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
//     { icon: Boxes, label: 'M365', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
//     { icon: Server, label: 'Azure', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
//     { icon: Shield, label: 'Security', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
//     { icon: Code, label: 'Software', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
//     { icon: Cpu, label: 'Hardware', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
//     { icon: HardDrive, label: 'Infrastructure', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' }
//   ];

//   const networkNodes = [
//     { Icon: Server, label: 'Edge Server', position: 'left-[10%]', top: '50%', color: 'cyan' },
//     { Icon: Shield, label: 'Firewall', position: 'left-[25%]', top: '30%', color: 'blue' },
//     { Icon: Activity, label: 'Monitoring', position: 'left-[40%]', top: '50%', color: 'purple' },
//     { Icon: Database, label: 'Database', position: 'left-[60%]', top: '30%', color: 'green' },
//     { Icon: Cloud, label: 'Cloud Storage', position: 'left-[75%]', top: '50%', color: 'orange' },
//     { Icon: Cpu, label: 'AI Engine', position: 'left-[90%]', top: '50%', color: 'cyan' }
//   ];

//   return (
//     <section ref={sectionRef} className="relative py-12 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
//       {/* Background orbs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <motion.div 
//           animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" 
//         />
//         <motion.div 
//           animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
//           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//           className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl" 
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         {/* Badge */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 rounded-full text-white text-sm sm:text-base font-medium mb-6 sm:mb-8 backdrop-blur-sm border border-white/20"
//         >
//           🇦🇺 Limited-Time Free IT Transformation Assessment
//         </motion.div>

//         {/* Headline */}
//         <motion.h2 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight mb-4 sm:mb-6"
//         >
//           <div className="mb-2">
//             Transform Your Victorian SMB IT Risks
//           </div>
//           <div className="bg-gradient-to-r from-cyan-400 via-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//             Into Reliable Business Growth
//           </div>
//         </motion.h2>

//         <motion.p 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3 }}
//           className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-12"
//         >
//           Australian SMBs trust us to eliminate downtime, defeat cyber threats, and unlock growth — 
//           with transparent pricing and proven results.
//         </motion.p>

//         {/* Rotating Text */}
//         <div className="relative h-20 sm:h-24 lg:h-28 mb-8 sm:mb-12 flex items-center justify-center px-4">
//           <AnimatePresence mode="wait">
//             <motion.p
//               key={currentText}
//               initial={{ opacity: 0, y: 20, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -20, scale: 0.95 }}
//               transition={{ duration: 0.5 }}
//               className={`absolute inset-0 flex items-center justify-center text-cyan-300 ${rotatingTexts[currentText].style}`}
//             >
//               {rotatingTexts[currentText].text}
//             </motion.p>
//           </AnimatePresence>
//         </div>

//         {/* RESPONSIVE LAYOUT CONTAINER */}
//         <div className="mb-12 sm:mb-16 lg:mb-20">
//           {/* Desktop: Side by side | Mobile/Tablet: Stacked */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
//             {/* COMPREHENSIVE IT SOLUTIONS - Vertical on desktop, horizontal on mobile */}
//             <div ref={logosRef} className="order-1">
//               <motion.h3 
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8"
//               >
//                 Comprehensive IT Solutions
//               </motion.h3>
              
//               {/* Desktop: 2 columns vertical | Mobile: Horizontal scroll */}
//               <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6">
//                 {services.map((service, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, scale: 0.5, y: 30 }}
//                     whileInView={{ opacity: 1, scale: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
//                     whileHover={{ scale: 1.1, y: -8 }}
//                     className="flex flex-col items-center gap-2"
//                   >
//                     <motion.div 
//                       animate={{ y: [-5, 5, -5] }}
//                       transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }}
//                       className={`w-16 h-16 xl:w-20 xl:h-20 rounded-xl ${service.color} border-2 flex items-center justify-center backdrop-blur-sm`}
//                     >
//                       <service.icon className={`w-8 h-8 xl:w-10 xl:h-10 ${service.color.split(' ')[0]}`} />
//                     </motion.div>
//                     <p className="text-sm text-slate-300 font-medium">{service.label}</p>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Mobile/Tablet: Horizontal scroll */}
//               <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
//                 <div className="flex gap-4 min-w-max">
//                   {services.map((service, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, scale: 0.5 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: i * 0.05 }}
//                       className="flex flex-col items-center gap-2 flex-shrink-0"
//                     >
//                       <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${service.color} border-2 flex items-center justify-center backdrop-blur-sm`}>
//                         <service.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${service.color.split(' ')[0]}`} />
//                       </div>
//                       <p className="text-xs sm:text-sm text-slate-300 font-medium whitespace-nowrap">{service.label}</p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* LIVE DATA FLOW NETWORK - Horizontal always */}
//             <div ref={networkRef} className="order-2">
//               <motion.h3 
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8"
//               >
//                 Live Data Flow & Monitoring Network
//               </motion.h3>
              
//               <div className="relative w-full h-48 sm:h-64 lg:h-80">
//                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid meet">
//                   <defs>
//                     <filter id="glow">
//                       <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                       <feMerge>
//                         <feMergeNode in="coloredBlur"/>
//                         <feMergeNode in="SourceGraphic"/>
//                       </feMerge>
//                     </filter>
//                   </defs>
                  
//                   {/* Network Lines */}
//                   {[
//                     { x1: 100, y1: 150, x2: 250, y2: 100, color: '#06b6d4' },
//                     { x1: 250, y1: 100, x2: 400, y2: 150, color: '#3b82f6' },
//                     { x1: 400, y1: 150, x2: 600, y2: 100, color: '#8b5cf6' },
//                     { x1: 600, y1: 100, x2: 750, y2: 150, color: '#10b981' },
//                     { x1: 750, y1: 150, x2: 900, y2: 150, color: '#f59e0b' }
//                   ].map((line, i) => (
//                     <motion.line
//                       key={i}
//                       x1={line.x1} y1={line.y1}
//                       x2={line.x2} y2={line.y2}
//                       stroke={line.color}
//                       strokeWidth="2"
//                       initial={{ pathLength: 0, opacity: 0 }}
//                       animate={isNetworkInView ? { pathLength: 1, opacity: 1 } : {}}
//                       transition={{ duration: 2, delay: i * 0.15 }}
//                     />
//                   ))}
                  
//                   {/* Animated Data Packets */}
//                   {isNetworkInView && [
//                     { x1: 100, y1: 150, x2: 250, y2: 100, color: '#06b6d4' },
//                     { x1: 250, y1: 100, x2: 400, y2: 150, color: '#3b82f6' },
//                     { x1: 400, y1: 150, x2: 600, y2: 100, color: '#8b5cf6' },
//                     { x1: 600, y1: 100, x2: 750, y2: 150, color: '#10b981' },
//                     { x1: 750, y1: 150, x2: 900, y2: 150, color: '#f59e0b' }
//                   ].map((path, i) => (
//                     <motion.circle
//                       key={i}
//                       r="6"
//                       fill={path.color}
//                       filter="url(#glow)"
//                       animate={{
//                         cx: [path.x1, path.x2, path.x1],
//                         cy: [path.y1, path.y2, path.y1],
//                       }}
//                       transition={{
//                         duration: 3,
//                         repeat: Infinity,
//                         delay: i * 0.5,
//                         ease: "linear"
//                       }}
//                     />
//                   ))}
//                 </svg>

//                 {/* Network Nodes */}
//                 {networkNodes.map((node, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={isNetworkInView ? { opacity: 1, scale: 1 } : {}}
//                     transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
//                     className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${node.position}`}
//                     style={{ top: node.top }}
//                   >
//                     <motion.div 
//                       animate={{ scale: [1, 1.1, 1] }}
//                       transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
//                       className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-${node.color}-500/20 border-2 sm:border-3 border-${node.color}-500 flex items-center justify-center backdrop-blur-sm`}
//                     >
//                       <node.Icon className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-${node.color}-400`} />
//                     </motion.div>
//                     <motion.p 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={isNetworkInView ? { opacity: 1, y: 0 } : {}}
//                       transition={{ delay: 2 + i * 0.15 }}
//                       className={`mt-2 text-xs sm:text-sm font-semibold text-${node.color}-300 bg-slate-900/80 px-2 py-1 rounded-full whitespace-nowrap`}
//                     >
//                       {node.label}
//                     </motion.p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* WORKFLOW TIMELINE */}
//         <div ref={timelineRef} className="relative mb-12 sm:mb-16 lg:mb-20">
//           <motion.h3 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-8 sm:mb-12"
//           >
//             Your IT Transformation Journey
//           </motion.h3>
          
//           <div className="relative flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 max-w-5xl mx-auto">
//             {/* Connecting Path - Desktop only */}
//             <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" viewBox="0 0 1000 200">
//               <motion.path 
//                 d="M 150,100 Q 350,50 500,100 T 850,100" 
//                 fill="none"
//                 stroke="rgb(6, 182, 212)"
//                 strokeWidth="3"
//                 strokeOpacity="0.5"
//                 strokeLinecap="round"
//                 initial={{ pathLength: 0 }}
//                 animate={isTimelineInView ? { pathLength: 1 } : {}}
//                 transition={{ duration: 3 }}
//               />
//             </svg>

//             {[
//               { Icon: AlertTriangle, label: 'IT Fires & Risks', color: 'red', rotate: 12 },
//               { Icon: Phone, label: 'Free Assessment', color: 'blue', rotate: -6 },
//               { Icon: Shield, label: 'Proactive Security', color: 'cyan', rotate: 6 },
//               { Icon: TrendingUp, label: 'Reliable Growth', color: 'green', rotate: -12 }
//             ].map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 50, scale: 0.5, rotate: step.rotate * 2 }}
//                 animate={isTimelineInView ? { 
//                   opacity: 1, 
//                   y: 0, 
//                   scale: 1, 
//                   rotate: 0 
//                 } : {}}
//                 transition={{ 
//                   delay: i * 0.4,
//                   type: "spring",
//                   stiffness: 100,
//                   damping: 10
//                 }}
//                 className="z-10"
//               >
//                 <motion.div 
//                   animate={i === 3 && isTimelineInView ? { scale: [1, 1.2, 1] } : {}}
//                   transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
//                   className={`p-4 sm:p-6 rounded-2xl bg-${step.color}-500/20 text-${step.color}-400 border-2 border-${step.color}-500`}
//                 >
//                   <step.Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
//                 </motion.div>
//                 <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-semibold text-white text-center">{step.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* TERMINAL ANIMATION */}
//         <div ref={terminalRef} className="max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
//           <div className="relative p-4 sm:p-6 lg:p-8 bg-slate-900/90 rounded-2xl border border-cyan-500/30 backdrop-blur-xl text-left font-mono overflow-hidden shadow-2xl">
//             <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
//               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
//               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
//               <span className="text-slate-400 ml-2 text-xs sm:text-sm">terminal@shakilit.au — transformation.sh</span>
//             </div>

//             <motion.div 
//               className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none"
//               animate={{ y: ['0%', '100%'] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             />

//             {terminalLines.map((line, i) => (
//               <motion.p 
//                 key={i}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: i < terminalStep ? 1 : 0 }}
//                 className={`mb-2 text-xs sm:text-sm lg:text-lg ${line.color}`}
//               >
//                 {line.text}
//               </motion.p>
//             ))}
            
//             <motion.span 
//               animate={{ opacity: [1, 0, 1] }}
//               transition={{ duration: 0.8, repeat: Infinity }}
//               className="inline-block w-1.5 h-4 sm:w-2 sm:h-5 bg-green-400 ml-1"
//             />
//           </div>
//         </div>

//         {/* METRICS */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
//           {[
//             { label: 'Average Revenue Saved', value: 85, color: 'cyan' },
//             { label: 'Guaranteed Uptime', value: 99.9, color: 'blue' },
//             { label: 'Risk Reduction', value: 95, color: 'green' }
//           ].map((metric, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//               whileHover={{ scale: 1.02 }}
//               className="relative p-4 sm:p-6 lg:p-8 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden group transition-all"
//             >
//               <p className={`text-${metric.color}-400 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 font-semibold`}>{metric.label}</p>
//               <div className="relative h-8 sm:h-10 lg:h-12 bg-slate-800 rounded-full overflow-hidden mb-3 sm:mb-4">
//                 <motion.div 
//                   initial={{ width: 0 }}
//                   whileInView={{ width: `${metric.value}%` }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
//                   className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 rounded-full shadow-lg shadow-${metric.color}-500/50`}
//                 />
//               </div>
//               <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
//                 {metric.value}%
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* BENEFITS */}
//         <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16">
//           {[
//             { Icon: CheckCircle, text: 'Free in-depth security & performance assessment', color: 'green' },
//             { Icon: Clock, text: 'Clear report within 48 hours', color: 'blue' },
//             { Icon: Zap, text: 'No obligation — just actionable insights', color: 'cyan' }
//           ].map((benefit, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15 }}
//               whileHover={{ scale: 1.05, y: -2 }}
//               className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-white text-xs sm:text-sm lg:text-base backdrop-blur-sm bg-white/5 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl border border-white/10"
//             >
//               <benefit.Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-${benefit.color}-400 flex-shrink-0`} />
//               <span className="leading-tight">{benefit.text}</span>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTAs */}
//         <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6">
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <RouterLink
//               to="/contact"
//               className="relative group inline-flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-2xl overflow-hidden transition-all"
//             >
//               <span className="relative z-10">Book Your Free Assessment</span>
//               <ArrowRight className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 group-hover:translate-x-3 transition-transform" />
//               <motion.span 
//                 className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               />
//             </RouterLink>
//           </motion.div>

//           <motion.a
//             href="tel:1300XXXXXX"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-cyan-300 rounded-2xl border-2 border-cyan-500/60 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 hover:border-cyan-400 transition-all"
//           >
//             <Phone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
//             <span className="hidden sm:inline">Call 1300 XXX XXX Now</span>
//             <span className="sm:hidden">Call Now</span>
//           </motion.a>
//         </div>

//         <motion.p 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="mt-8 sm:mt-12 text-slate-400 text-sm sm:text-base lg:text-lg"
//         >
//           ⭐ Trusted by 150+ Victorian & Tasmanian businesses
//         </motion.p>
//       </div>
//     </section>
//   );
// };

// export default HeroCTASection;





// // src/components/cta/CTASection.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { motion, useInView, AnimatePresence } from 'framer-motion';

// import { 
//   AlertTriangle, Phone, Shield, Zap, TrendingUp, ArrowRight, 
//   CheckCircle, Clock, Server, Lock, Activity, Database, 
//   Cloud, Cpu, HardDrive, Layers, Code, Boxes
// } from 'lucide-react';

// const HeroCTASection = () => {
//   const sectionRef = useRef(null);
//   const timelineRef = useRef(null);
//   const terminalRef = useRef(null);
//   const networkRef = useRef(null);
//   const logosRef = useRef(null);

//   const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
//   const isTerminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
//   const isNetworkInView = useInView(networkRef, { once: true, margin: "-100px" });
//   const isLogosInView = useInView(logosRef, { once: true, margin: "-100px" });

//   const rotatingTexts = [
//     { 
//       text: 'Turn IT chaos into reliable growth.',
//       style: 'font-sans italic text-xl lg:text-2xl font-light tracking-wide'
//     },
//     { 
//       text: 'Eliminate ransomware fears forever.',
//       style: 'font-sans italic text-xl lg:text-2xl font-light tracking-wide'
//     },
//     { 
//       text: 'Stop losing revenue to downtime.',
//       style: 'font-sans italic text-xl lg:text-2xl font-light tracking-wide'
//     },
//     { 
//       text: 'Build unbreakable trust in your IT.',
//       style: 'font-sans italic text-xl lg:text-2xl font-light tracking-wide'
//     }
//   ];

//   const [currentText, setCurrentText] = useState(0);
//   const [terminalStep, setTerminalStep] = useState(0);

//   // Rotate transformative texts every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentText(prev => (prev + 1) % rotatingTexts.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Terminal typing animation
//   useEffect(() => {
//     if (isTerminalInView) {
//       const interval = setInterval(() => {
//         setTerminalStep(prev => (prev < 5 ? prev + 1 : prev));
//       }, 1200);
//       return () => clearInterval(interval);
//     }
//   }, [isTerminalInView]);

//   const terminalLines = [
//     { text: '> Scanning systems for vulnerabilities...', color: 'text-red-400' },
//     { text: '> Deploying zero-trust security protocols...', color: 'text-orange-400' },
//     { text: '> Optimising performance & cloud resources...', color: 'text-blue-400' },
//     { text: '> Enabling proactive 24/7 monitoring...', color: 'text-purple-400' },
//     { text: '> Transformation complete. Growth unlocked.', color: 'text-green-400' }
//   ];

//   return (
//     <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
//       {/* Background orbs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <motion.div 
//           animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" 
//         />
//         <motion.div 
//           animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
//           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//           className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" 
//         />
//         <motion.div 
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" 
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         {/* Badge */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="inline-block px-6 py-3 bg-white/10 rounded-full text-white font-medium mb-8 backdrop-blur-sm border border-white/20"
//         >
//           🇦🇺 Limited-Time Free IT Transformation Assessment
//         </motion.div>

//         {/* Headline */}
//         <motion.h2 
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
//         >
//           <div className="mb-2">
//             Transform Your Victorian SMB IT Risks
//           </div>
//           <div 
//             className="bg-gradient-to-r from-cyan-400 via-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
//             style={{ backgroundSize: '200% 100%' }}
//           >
//             Into Reliable Business Growth
//           </div>
//         </motion.h2>

//         <motion.p 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3 }}
//           className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12"
//         >
//           Australian SMBs trust us to eliminate downtime, defeat cyber threats, and unlock growth — 
//           with transparent pricing and proven results.
//         </motion.p>

//         {/* Rotating Text */}
//         <div className="relative h-16 sm:h-20 mb-12 flex items-center justify-center">
//           <AnimatePresence mode="wait">
//             <motion.p
//               key={currentText}
//               initial={{ opacity: 0, y: 20, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -20, scale: 0.95 }}
//               transition={{ duration: 0.5 }}
//               className={`absolute inset-0 flex items-center justify-center font-bold text-cyan-300 ${rotatingTexts[currentText].style}`}
//             >
//               {rotatingTexts[currentText].text}
//             </motion.p>
//           </AnimatePresence>
//         </div>

//         {/* LOGO SHOWCASE - Horizontal Single Row */}
//         <div ref={logosRef} className="mb-16">
//           <motion.h3 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-xl sm:text-2xl font-bold text-white mb-8"
//           >
//             Comprehensive IT Solutions
//           </motion.h3>
//           <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
//             {[
//               { icon: Cloud, label: 'Cloud', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
//               { icon: Activity, label: 'Networking', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
//               { icon: Boxes, label: 'M365', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
//               { icon: Server, label: 'Azure', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
//               { icon: Shield, label: 'Security', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
//               { icon: Code, label: 'Software', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
//               { icon: Cpu, label: 'Hardware', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
//               { icon: HardDrive, label: 'Infrastructure', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' }
//             ].map((service, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.5, y: 30 }}
//                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
//                 whileHover={{ scale: 1.15, y: -8 }}
//                 className="flex flex-col items-center gap-2"
//               >
//                 <motion.div 
//                   animate={{ y: [-5, 5, -5] }}
//                   transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }}
//                   className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${service.color} border-2 flex items-center justify-center backdrop-blur-sm`}
//                 >
//                   <service.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${service.color.split(' ')[0]}`} />
//                 </motion.div>
//                 <p className="text-xs sm:text-sm text-slate-300 font-medium">{service.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* LIVE DATA FLOW NETWORK */}
//         <div ref={networkRef} className="relative mb-20 h-64 sm:h-80 max-w-6xl mx-auto">
//           <motion.h3 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-xl sm:text-2xl font-bold text-white mb-8"
//           >
//             Live Data Flow & Monitoring Network
//           </motion.h3>
          
//           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300">
//             <defs>
//               <filter id="glow">
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                 <feMerge>
//                   <feMergeNode in="coloredBlur"/>
//                   <feMergeNode in="SourceGraphic"/>
//                 </feMerge>
//               </filter>
//             </defs>
            
//             {/* Network Lines */}
//             {[
//               { x1: 120, y1: 150, x2: 280, y2: 100, color: 'cyan' },
//               { x1: 280, y1: 100, x2: 440, y2: 150, color: 'blue' },
//               { x1: 440, y1: 150, x2: 600, y2: 100, color: 'purple' },
//               { x1: 600, y1: 100, x2: 760, y2: 150, color: 'green' },
//               { x1: 760, y1: 150, x2: 880, y2: 150, color: 'orange' }
//             ].map((line, i) => (
//               <motion.line
//                 key={i}
//                 x1={line.x1} y1={line.y1}
//                 x2={line.x2} y2={line.y2}
//                 stroke={`var(--color-${line.color})`}
//                 strokeWidth="2"
//                 className={`stroke-${line.color}-500`}
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={isNetworkInView ? { pathLength: 1, opacity: 1 } : {}}
//                 transition={{ duration: 2, delay: i * 0.15 }}
//               />
//             ))}
            
//             {/* Animated Data Packets */}
//             {isNetworkInView && [
//               { x1: 120, y1: 150, x2: 280, y2: 100, color: '#06b6d4' },
//               { x1: 280, y1: 100, x2: 440, y2: 150, color: '#3b82f6' },
//               { x1: 440, y1: 150, x2: 600, y2: 100, color: '#8b5cf6' },
//               { x1: 600, y1: 100, x2: 760, y2: 150, color: '#10b981' },
//               { x1: 760, y1: 150, x2: 880, y2: 150, color: '#f59e0b' }
//             ].map((path, i) => (
//               <motion.circle
//                 key={i}
//                 r="6"
//                 fill={path.color}
//                 filter="url(#glow)"
//                 animate={{
//                   cx: [path.x1, path.x2, path.x1],
//                   cy: [path.y1, path.y2, path.y1],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   delay: i * 0.5,
//                   ease: "linear"
//                 }}
//               />
//             ))}
//           </svg>

//           {/* Network Nodes */}
//           {[
//             { Icon: Server, label: 'Edge Server', left: '12%', top: '50%', color: 'cyan' },
//             { Icon: Shield, label: 'Firewall', left: '28%', top: '33%', color: 'blue' },
//             { Icon: Activity, label: 'Monitoring', left: '44%', top: '50%', color: 'purple' },
//             { Icon: Database, label: 'Database', left: '60%', top: '33%', color: 'green' },
//             { Icon: Cloud, label: 'Cloud Storage', left: '76%', top: '50%', color: 'orange' },
//             { Icon: Cpu, label: 'AI Engine', right: '12%', top: '50%', color: 'cyan' }
//           ].map((node, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={isNetworkInView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
//               className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
//               style={{ 
//                 left: node.left || 'auto', 
//                 right: node.right || 'auto',
//                 top: node.top 
//               }}
//             >
//               <motion.div 
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
//                 className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-${node.color}-500/20 border-3 border-${node.color}-500 flex items-center justify-center backdrop-blur-sm`}
//               >
//                 <node.Icon className={`w-8 h-8 sm:w-10 sm:h-10 text-${node.color}-400`} />
//               </motion.div>
//               <motion.p 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={isNetworkInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: 2 + i * 0.15 }}
//                 className={`mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-${node.color}-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap`}
//               >
//                 {node.label}
//               </motion.p>
//             </motion.div>
//           ))}
//         </div>

//         {/* WORKFLOW TIMELINE */}
//         <div ref={timelineRef} className="relative mb-20">
//           <motion.h3 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="text-2xl sm:text-3xl font-bold text-white mb-12"
//           >
//             Your IT Transformation Journey
//           </motion.h3>
          
//           <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
//             {/* Connecting Path */}
//             <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1000 200">
//               <motion.path 
//                 d="M 150,100 Q 350,50 500,100 T 850,100" 
//                 fill="none"
//                 stroke="rgb(6, 182, 212)"
//                 strokeWidth="3"
//                 strokeOpacity="0.5"
//                 strokeLinecap="round"
//                 initial={{ pathLength: 0 }}
//                 animate={isTimelineInView ? { pathLength: 1 } : {}}
//                 transition={{ duration: 3 }}
//               />
//             </svg>

//             {[
//               { Icon: AlertTriangle, label: 'IT Fires & Risks', color: 'red', rotate: 12 },
//               { Icon: Phone, label: 'Free Assessment', color: 'blue', rotate: -6 },
//               { Icon: Shield, label: 'Proactive Security', color: 'cyan', rotate: 6 },
//               { Icon: TrendingUp, label: 'Reliable Growth', color: 'green', rotate: -12 }
//             ].map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 50, scale: 0.5, rotate: step.rotate * 2 }}
//                 animate={isTimelineInView ? { 
//                   opacity: 1, 
//                   y: 0, 
//                   scale: 1, 
//                   rotate: 0 
//                 } : {}}
//                 transition={{ 
//                   delay: i * 0.4,
//                   type: "spring",
//                   stiffness: 100,
//                   damping: 10
//                 }}
//                 className="z-10"
//               >
//                 <motion.div 
//                   animate={i === 3 && isTimelineInView ? { scale: [1, 1.2, 1] } : {}}
//                   transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
//                   className={`p-6 rounded-2xl bg-${step.color}-500/20 text-${step.color}-400 border-2 border-${step.color}-500`}
//                 >
//                   <step.Icon className="w-12 h-12 sm:w-16 sm:h-16" />
//                 </motion.div>
//                 <p className="mt-4 text-base sm:text-lg font-semibold text-white">{step.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* TERMINAL ANIMATION */}
//         <div ref={terminalRef} className="max-w-4xl mx-auto mb-20">
//           <div className="relative p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-cyan-500/30 backdrop-blur-xl text-left font-mono overflow-hidden shadow-2xl">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-3 h-3 rounded-full bg-red-500" />
//               <div className="w-3 h-3 rounded-full bg-yellow-500" />
//               <div className="w-3 h-3 rounded-full bg-green-500" />
//               <span className="text-slate-400 ml-2 text-xs sm:text-sm">terminal@shakilit.au — transformation.sh</span>
//             </div>

//             {/* Scanline effect */}
//             <motion.div 
//               className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none"
//               animate={{ y: ['0%', '100%'] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             />

//             {terminalLines.map((line, i) => (
//               <motion.p 
//                 key={i}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: i < terminalStep ? 1 : 0 }}
//                 className={`mb-2 text-sm sm:text-lg ${line.color}`}
//               >
//                 {line.text}
//               </motion.p>
//             ))}
            
//             <motion.span 
//               animate={{ opacity: [1, 0, 1] }}
//               transition={{ duration: 0.8, repeat: Infinity }}
//               className="inline-block w-2 h-5 bg-green-400 ml-1"
//             />
//           </div>
//         </div>

//         {/* METRICS */}
//         <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16">
//           {[
//             { label: 'Average Revenue Saved', value: 85, color: 'cyan' },
//             { label: 'Guaranteed Uptime', value: 99.9, color: 'blue' },
//             { label: 'Risk Reduction', value: 95, color: 'green' }
//           ].map((metric, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//               whileHover={{ borderColor: `rgb(var(--color-${metric.color}))`, scale: 1.02 }}
//               className="relative p-6 sm:p-8 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden group transition-all"
//             >
//               <motion.div 
//                 animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: i }}
//                 className={`absolute top-4 right-4 w-8 h-8 bg-${metric.color}-400 rounded-full blur-md`}
//               />
//               <p className={`text-${metric.color}-400 text-base sm:text-lg mb-4 font-semibold`}>{metric.label}</p>
//               <div className="relative h-10 sm:h-12 bg-slate-800 rounded-full overflow-hidden mb-4">
//                 <motion.div 
//                   initial={{ width: 0 }}
//                   whileInView={{ width: `${metric.value}%` }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
//                   className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 rounded-full shadow-lg shadow-${metric.color}-500/50`}
//                 />
//               </div>
//               <motion.p 
//                 initial={{ textContent: 0 }}
//                 whileInView={{ textContent: metric.value }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 2.5, delay: 0.5 }}
//                 className="text-4xl sm:text-5xl font-black text-white"
//               >
//                 {metric.value}%
//               </motion.p>
//             </motion.div>
//           ))}
//         </div>

//         {/* BENEFITS */}
//         <div className="benefits-grid flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-16">
//           {[
//             { Icon: CheckCircle, text: 'Free in-depth security & performance assessment', color: 'green' },
//             { Icon: Clock, text: 'Clear report within 48 hours', color: 'blue' },
//             { Icon: Zap, text: 'No obligation — just actionable insights', color: 'cyan' }
//           ].map((benefit, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15 }}
//               whileHover={{ scale: 1.05, y: -2 }}
//               className="flex items-center gap-3 sm:gap-4 text-white text-sm sm:text-base lg:text-lg backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/10"
//             >
//               <benefit.Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${benefit.color}-400 flex-shrink-0`} />
//               <span>{benefit.text}</span>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTAs */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <RouterLink
//               to="/contact"
//               className="relative group inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl lg:text-2xl font-bold text-white rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-2xl overflow-hidden transition-all"
//             >
//               <span className="relative z-10">Book Your Free Assessment</span>
//               <ArrowRight className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform" />
//               <motion.span 
//                 className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
//                 initial={{ opacity: 0 }}
//                 whileHover={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               />
//             </RouterLink>
//           </motion.div>

//           <motion.a
//             href="tel:1300XXXXXX"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl lg:text-2xl font-bold text-cyan-300 rounded-2xl border-2 sm:border-3 border-cyan-500/60 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 hover:border-cyan-400 transition-all"
//           >
//             <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
//             <span className="hidden sm:inline">Call 1300 XXX XXX Now</span>
//             <span className="sm:hidden">Call Now</span>
//           </motion.a>
//         </div>

//         <motion.p 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="mt-12 text-slate-400 text-base sm:text-lg"
//         >
//           ⭐ Trusted by 150+ Victorian & Tasmanian businesses
//         </motion.p>
//       </div>
//     </section>
//   );
// };

// export default HeroCTASection;
