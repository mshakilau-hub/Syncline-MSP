// src/components/ui/AnimatedBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ variant = 'hero' }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated gradient orbs - CSS based, no WebGL */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
          top: '-20%',
          left: '-10%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
          bottom: '-10%',
          right: '-5%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles - Pure CSS */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className="absolute w-64 h-64 border border-blue-500/10 rounded-full"
        style={{ top: '10%', right: '10%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute w-96 h-96 border border-cyan-500/10 rounded-full"
        style={{ bottom: '5%', left: '5%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />

      {/* Glow lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0%"
          y1="30%"
          x2="100%"
          y2="30%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.line
          x1="0%"
          y1="70%"
          x2="100%"
          y2="70%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, delay: 1 }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;







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