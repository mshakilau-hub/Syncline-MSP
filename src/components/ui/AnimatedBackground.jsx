// src/components/ui/AnimatedBackground.jsx - OPTIMIZED NON-INTRUSIVE VERSION
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ variant = 'default', className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Primary animated orb - Blue */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          top: variant === 'hero' ? '10%' : '20%',
          left: variant === 'hero' ? '5%' : '10%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary animated orb - Cyan */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
          bottom: variant === 'hero' ? '5%' : '10%',
          right: variant === 'hero' ? '10%' : '5%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -70, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Tertiary animated orb - Purple */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
          top: '50%',
          left: '40%',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles - Subtle depth */}
      {[...Array(variant === 'hero' ? 15 : 10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Rotating geometric rings */}
      <motion.div
        className="absolute w-80 h-80 border border-blue-500/5 rounded-full"
        style={{ 
          top: '15%', 
          right: '15%',
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 border border-cyan-500/5 rounded-full"
        style={{ 
          bottom: '10%', 
          left: '10%',
        }}
        animate={{ 
          rotate: -360,
          scale: [1, 1.08, 1],
        }}
        transition={{ 
          rotate: { duration: 100, repeat: Infinity, ease: 'linear' },
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Subtle glow lines - Only on hero variant */}
      {variant === 'hero' && (
        <svg 
          className="absolute inset-0 w-full h-full opacity-10" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          <motion.line
            x1="0%"
            y1="35%"
            x2="100%"
            y2="35%"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.3, 0] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: 'easeInOut'
            }}
          />
          
          <motion.line
            x1="0%"
            y1="65%"
            x2="100%"
            y2="65%"
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.2, 0] 
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              repeatDelay: 4,
              delay: 2,
              ease: 'easeInOut'
            }}
          />
        </svg>
      )}

      {/* Radial gradient vignette - Darkens edges slightly */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.8) 100%)',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;



// // src/components/ui/AnimatedBackground.tsx
// import React from 'react';
// import { motion } from 'framer-motion';

// const AnimatedBackground = ({ variant = 'hero' }) => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {/* Base gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
//       {/* Animated gradient orbs - CSS based, no WebGL */}
//       <motion.div
//         className="absolute w-[800px] h-[800px] rounded-full opacity-30"
//         style={{
//           background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
//           top: '-20%',
//           left: '-10%',
//           filter: 'blur(60px)',
//         }}
//         animate={{
//           x: [0, 100, 0],
//           y: [0, 50, 0],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />
      
//       <motion.div
//         className="absolute w-[600px] h-[600px] rounded-full opacity-25"
//         style={{
//           background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
//           bottom: '-10%',
//           right: '-5%',
//           filter: 'blur(60px)',
//         }}
//         animate={{
//           x: [0, -80, 0],
//           y: [0, -60, 0],
//           scale: [1, 1.2, 1],
//         }}
//         transition={{
//           duration: 25,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />
      
//       <motion.div
//         className="absolute w-[500px] h-[500px] rounded-full opacity-20"
//         style={{
//           background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
//           top: '40%',
//           left: '30%',
//           filter: 'blur(80px)',
//         }}
//         animate={{
//           x: [0, 60, -30, 0],
//           y: [0, -40, 20, 0],
//         }}
//         transition={{
//           duration: 30,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />

//       {/* Grid pattern overlay */}
//       <div 
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '60px 60px',
//         }}
//       />

//       {/* Floating particles - Pure CSS */}
//       {[...Array(20)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 rounded-full bg-blue-400/40"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -30, 0],
//             opacity: [0.2, 0.6, 0.2],
//           }}
//           transition={{
//             duration: 3 + Math.random() * 4,
//             repeat: Infinity,
//             delay: Math.random() * 2,
//             ease: 'easeInOut',
//           }}
//         />
//       ))}

//       {/* Geometric shapes */}
//       <motion.div
//         className="absolute w-64 h-64 border border-blue-500/10 rounded-full"
//         style={{ top: '10%', right: '10%' }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
//       />
      
//       <motion.div
//         className="absolute w-96 h-96 border border-cyan-500/10 rounded-full"
//         style={{ bottom: '5%', left: '5%' }}
//         animate={{ rotate: -360 }}
//         transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
//       />

//       {/* Glow lines */}
//       <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="transparent" />
//             <stop offset="50%" stopColor="#3b82f6" />
//             <stop offset="100%" stopColor="transparent" />
//           </linearGradient>
//         </defs>
//         <motion.line
//           x1="0%"
//           y1="30%"
//           x2="100%"
//           y2="30%"
//           stroke="url(#lineGradient)"
//           strokeWidth="1"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
//           transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
//         />
//         <motion.line
//           x1="0%"
//           y1="70%"
//           x2="100%"
//           y2="70%"
//           stroke="url(#lineGradient)"
//           strokeWidth="1"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
//           transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, delay: 1 }}
//         />
//       </svg>
//     </div>
//   );
// };

// export default AnimatedBackground;







// import React from 'react';
// import { motion } from 'framer-motion';

// const AnimatedBackground = ({ variant = 'hero' }) => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {/* Base gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
//       {/* Animated gradient orbs - CSS based, no WebGL */}
//       <motion.div
//         className="absolute w-[800px] h-[800px] rounded-full opacity-30"
//         style={{
//           background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
//           top: '-20%',
//           left: '-10%',
//           filter: 'blur(60px)',
//         }}
//         animate={{
//           x: [0, 100, 0],
//           y: [0, 50, 0],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />
      
//       <motion.div
//         className="absolute w-[600px] h-[600px] rounded-full opacity-25"
//         style={{
//           background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
//           bottom: '-10%',
//           right: '-5%',
//           filter: 'blur(60px)',
//         }}
//         animate={{
//           x: [0, -80, 0],
//           y: [0, -60, 0],
//           scale: [1, 1.2, 1],
//         }}
//         transition={{
//           duration: 25,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />
      
//       <motion.div
//         className="absolute w-[500px] h-[500px] rounded-full opacity-20"
//         style={{
//           background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
//           top: '40%',
//           left: '30%',
//           filter: 'blur(80px)',
//         }}
//         animate={{
//           x: [0, 60, -30, 0],
//           y: [0, -40, 20, 0],
//         }}
//         transition={{
//           duration: 30,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//       />

//       {/* Grid pattern overlay */}
//       <div 
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '60px 60px',
//         }}
//       />

//       {/* Floating particles - Pure CSS */}
//       {[...Array(20)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 rounded-full bg-blue-400/40"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -30, 0],
//             opacity: [0.2, 0.6, 0.2],
//           }}
//           transition={{
//             duration: 3 + Math.random() * 4,
//             repeat: Infinity,
//             delay: Math.random() * 2,
//             ease: 'easeInOut',
//           }}
//         />
//       ))}

//       {/* Geometric shapes */}
//       <motion.div
//         className="absolute w-64 h-64 border border-blue-500/10 rounded-full"
//         style={{ top: '10%', right: '10%' }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
//       />
      
//       <motion.div
//         className="absolute w-96 h-96 border border-cyan-500/10 rounded-full"
//         style={{ bottom: '5%', left: '5%' }}
//         animate={{ rotate: -360 }}
//         transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
//       />

//       {/* Glow lines */}
//       <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="transparent" />
//             <stop offset="50%" stopColor="#3b82f6" />
//             <stop offset="100%" stopColor="transparent" />
//           </linearGradient>
//         </defs>
//         <motion.line
//           x1="0%"
//           y1="30%"
//           x2="100%"
//           y2="30%"
//           stroke="url(#lineGradient)"
//           strokeWidth="1"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
//           transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
//         />
//         <motion.line
//           x1="0%"
//           y1="70%"
//           x2="100%"
//           y2="70%"
//           stroke="url(#lineGradient)"
//           strokeWidth="1"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
//           transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, delay: 1 }}
//         />
//       </svg>
//     </div>
//   );
// };

// export default AnimatedBackground;