// src/components/hero/AnimatedLogoShowcase.jsx
// Vivus stroke-draw + Framer Motion phase animations
// Zero overlap — panels laid out in CSS grid around the logo
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

/* ─────────────────────────────────────────────
   Vivus-style hook: animates stroke-dashoffset
   to draw an SVG path progressively
   ───────────────────────────────────────────── */
function useVivus(ref, duration = 2000, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll('path, circle, ellipse, line, polyline, polygon');
    paths.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 1000;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.transition = 'none';
    });
    const timer = setTimeout(() => {
      paths.forEach((p, i) => {
        p.style.transition = `stroke-dashoffset ${duration}ms ease ${i * 120}ms`;
        p.style.strokeDashoffset = '0';
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [ref, duration, delay]);
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
const AnimatedLogoShowcase = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase]         = useState(0);
  const [log, setLog]             = useState([]);
  const svgRef                    = useRef(null);
  const mouseX                    = useMotionValue(0);
  const mouseY                    = useMotionValue(0);

  // Vivus draw on mount
  useVivus(svgRef, 2200, 300);

  // Soft mouse parallax for the SVG only
  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left - r.width  / 2) / r.width)  * 14);
    mouseY.set(((e.clientY - r.top  - r.height / 2) / r.height) * 14);
  };
  const rotateX = useTransform(mouseY, [-14, 14], [-5, 5]);
  const rotateY = useTransform(mouseX, [-14, 14], [ 5,-5]);

  // Phase cycling
  const phases = [
    { label: 'Scanning Infrastructure', color: '#22e6b8', status: 'Detecting',  icon: '🔍', msg: '> Probing network nodes...'       },
    { label: 'Identifying Issues',       color: '#f59e0b', status: 'Issues Found',icon: '⚠️', msg: '> Latency anomaly detected...'    },
    { label: 'Applying Fixes',           color: '#8b5cf6', status: 'Patching',   icon: '⚡', msg: '> Optimising cloud routes...'     },
    { label: 'Verifying Uptime',         color: '#1d9bf0', status: 'Verifying',  icon: '🔒', msg: '> Running integrity checks...'   },
    { label: 'All Systems Optimal',      color: '#10b981', status: '99.9% ↑',    icon: '✅', msg: '> All systems operational ✓'     },
  ];

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % phases.length), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setLog(prev => [...prev.slice(-4), phases[phase].msg]);
  }, [phase]);

  const pc = phases[phase];

  // SVG paths — 2000×2000 viewBox, translate(-359.41 -41.199)
  const RING  = "m1348.6 139.09a716.14 902.21 0 0 0-33.309 1.6113 716.14 902.21 0 0 0-670.67 955.94 716.14 902.21 0 0 0 127.25 460.4 57.536 1208.3 45.498 0 1 111.44-117.23 530.69 902.3 0 0 1-53.592-343.17 530.69 902.3 0 0 1 497-956.03 530.69 902.3 0 0 1 21.883-1.5275zm21.622 0a530.69 902.3 0 0 1 430.54 401.06 57.536 1208.3 45.498 0 1 99.256-90.671 716.14 902.21 0 0 0-529.79-310.39zm576.73 386.27a57.536 1208.3 45.498 0 1-111.44 117.23 530.69 902.3 0 0 1 53.581 342.88 530.69 902.3 0 0 1-496.82 956.3l-0.3306 0.035a530.69 902.3 0 0 1-21.718 1.5089 716.14 902.21 0 0 0 33.083-1.595l0.4493-0.035a716.14 902.21 0 0 0 670.43-956.2 716.14 902.21 0 0 0-127.23-460.12zm-1028.9 1016.9a57.536 1208.3 45.498 0 1-99.256 90.671 716.14 902.21 0 0 0 529.79 310.39 530.69 902.3 0 0 1-430.54-401.06z";
  const SLASH = "m659.19 1732.6a25.427 985.88 45.455 0 1 639.24-666.97 25.427 985.88 45.455 0 1 761.18-715.78 25.427 985.88 45.455 0 1-639 666.74 25.427 985.88 45.455 0 1-761.38 715.99";

  return (
    /* ── OUTER WRAPPER — full right-column height, no overflow ── */
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-3 select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── PHASE PILL — top, centred, never overlaps logo ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm text-xs font-semibold"
          style={{ borderColor: `${pc.color}50`, color: pc.color, background: `${pc.color}12` }}
        >
          <span>{pc.icon}</span>
          <span>{pc.label}</span>
          {/* pulse dot */}
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: pc.color }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── MIDDLE ROW: stat left | logo centre | log right ── */}
      <div className="flex items-center justify-center gap-4 w-full px-2">

        {/* LEFT STAT STACK */}
        <div className="flex flex-col gap-2 w-[110px] shrink-0">
          {[
            { label: 'Uptime',    value: '99.9%' },
            { label: 'Response',  value: '<2hr'  },
            { label: 'Clients',   value: '150+'  },
          ].map(({ label, value }) => (
            <motion.div
              key={label}
              className="rounded-lg border backdrop-blur-sm px-2.5 py-1.5 text-center"
              style={{ borderColor: `${pc.color}40`, background: `${pc.color}0d` }}
              animate={{ borderColor: [`${pc.color}30`, `${pc.color}70`, `${pc.color}30`] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div className="text-[9px] text-slate-400 uppercase tracking-wider">{label}</div>
              <motion.div
                className="text-sm font-bold mt-0.5"
                animate={{ color: pc.color }}
                transition={{ duration: 0.8 }}
              >{value}</motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── SVG LOGO ── */}
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 900 }}
          className="flex-shrink-0"
          /* gentle float */
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Ambient glow behind logo */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
            animate={{ background: `radial-gradient(circle, ${pc.color}22 0%, transparent 70%)` }}
            transition={{ duration: 1.2 }}
          />

          <svg
            ref={svgRef}
            viewBox="0 0 2000 2000"
            className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] drop-shadow-2xl"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* ── Original gradient, exact from your SVG ── */}
              <linearGradient
                id="slashGrad"
                x1="177" x2="1408.5" y1="1399.7" y2="194.47"
                gradientTransform="matrix(1.1256 0 0 1.1256 458.95 140.74)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#0a1a2f" />
                <stop offset="1" stopColor="#0077ff" />
              </linearGradient>

              {/* Phase colour overlay gradient */}
              <linearGradient id="phaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <motion.stop
                  offset="0%"
                  animate={{ stopColor: pc.color, stopOpacity: 0.28 }}
                  transition={{ duration: 1 }}
                />
                <motion.stop
                  offset="100%"
                  animate={{ stopColor: phases[(phase + 1) % phases.length].color, stopOpacity: 0.28 }}
                  transition={{ duration: 1 }}
                />
              </linearGradient>

              {/* Glow filter */}
              <filter id="logoGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation={isHovered ? 9 : 5} result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>

              {/* Clip so inner pulses never spill outside logo bounds */}
              <clipPath id="logoClip">
                <rect x="0" y="0" width="2000" height="2000" />
              </clipPath>
            </defs>

            {/* Outer ring — Vivus draws this via stroke-dashoffset */}
            <path
              d={RING}
              transform="translate(-359.41 -41.199)"
              fill="#0077ff"
              fillRule="evenodd"
              filter="url(#logoGlow)"
            />

            {/* Slash — base gradient (original) */}
            <path
              d={SLASH}
              transform="translate(-359.41 -41.199)"
              fill="url(#slashGrad)"
              fillRule="evenodd"
              filter="url(#logoGlow)"
            />

            {/* Slash — phase colour overlay (subtle) */}
            <path
              d={SLASH}
              transform="translate(-359.41 -41.199)"
              fill="url(#phaseGrad)"
              fillRule="evenodd"
            />

            {/* ── All inner animations clipped to logo bounds ── */}
            <g clipPath="url(#logoClip)">
              {/* Centre pulse ring — tight, stays in the gap */}
              {[0, 1].map(i => (
                <motion.circle
                  key={`pulse-${i}`}
                  cx={1000} cy={1000}
                  r={0}
                  fill="none"
                  stroke={pc.color}
                  strokeWidth="6"
                  animate={{ r: [60, 200], strokeOpacity: [0.7, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
                />
              ))}

              {/* Orbiting data particles — max r=180, well inside gap */}
              {[0, 1, 2, 3, 4, 5].map(i => {
                const a = (i * 60 * Math.PI) / 180;
                const ox = 1000 + 160 * Math.cos(a);
                const oy = 1000 + 160 * Math.sin(a);
                return (
                  <motion.circle
                    key={`dot-${i}`}
                    r="7"
                    fill={pc.color}
                    filter="url(#logoGlow)"
                    animate={{ cx: [ox, 1000, ox], cy: [oy, 1000, oy], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.47, ease: 'easeInOut' }}
                  />
                );
              })}

              {/* Tiny node markers at 4 cardinal inner points */}
              {[0, 90, 180, 270].map((deg, i) => {
                const a = (deg * Math.PI) / 180;
                const nx = 1000 + 145 * Math.cos(a);
                const ny = 1000 + 145 * Math.sin(a);
                return (
                  <motion.circle
                    key={`node-${i}`}
                    cx={nx} cy={ny} r="12"
                    fill={phase >= i ? pc.color : '#334155'}
                    fillOpacity={0.5}
                    animate={{ scale: phase >= i ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
                  />
                );
              })}
            </g>
          </svg>
        </motion.div>

        {/* RIGHT LOG PANEL */}
        <div className="w-[110px] shrink-0 rounded-lg border backdrop-blur-sm p-2 font-mono"
          style={{ borderColor: `${pc.color}40`, background: '#020617cc' }}
        >
          <div className="flex items-center gap-1 mb-1.5 border-b border-slate-700/60 pb-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: pc.color }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-[8px] text-slate-400 uppercase tracking-wide">Sys Log</span>
          </div>
          <div className="space-y-1 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {log.slice(-4).map((m, i) => (
                <motion.div
                  key={m + i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[8px] leading-snug"
                  style={{ color: pc.color }}
                >
                  {m}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── BOTTOM STATUS BAR — sits below the logo row ── */}
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: pc.color }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs font-semibold"
            style={{ color: pc.color }}
          >
            {pc.status}
          </motion.span>
        </AnimatePresence>
        <span className="text-slate-600 text-xs">·</span>
        <span className="text-slate-400 text-xs">Syncline IT Solutions</span>
      </div>
    </div>
  );
};

export default AnimatedLogoShowcase;