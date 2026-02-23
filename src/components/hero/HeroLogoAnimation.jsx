/**
 * HeroLogoAnimation.jsx — Syncline IT Solutions
 *
 * Animation sequence:
 *   Phase 1 (0.08s)   Ring: opacity 0→1, scale 0.94→1 (filled shape looks best this way)
 *   Phase 2 (0.68s)   Slash: stroke-dashoffset draws the needle bottom-left → top-right
 *   Phase 3 (1.9s)    Slash fill fades in, stroke fades out
 *   Phase 4 (2.1s)    Ambient glow softens in
 *   Phase 5 (2.4s)    Service info panel rises up, idle ring animations begin
 *
 * Logo fidelity:
 *   viewBox 0 0 1600 1600, group translate(-175.55 -43.311)
 *   Ring fill: #0077ff (exact match to PNG)
 *   Slash fill: gradient #0a1a2f → #0077ff (exact match to PNG)
 *   Gradient coords from source — net gradientTransform = 0
 *   vector-effect="non-scaling-stroke" keeps stroke consistent at any size
 *
 * Services shown — honest, solo Victorian MSP, no exaggeration:
 *   Managed IT | Microsoft 365 | Business Security | Backup & Recovery | IT Help
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './HeroLogoAnimation.css';

const RING_D =
  'M966.49 86.621a600.7 756.78 0 0 0-27.939 1.3516 600.7 756.78 0 0 0-562.55 801.84 600.7 756.78 0 0 0 106.73 386.18 48.261 1013.5 45.498 0 1 93.479-98.332 445.14 756.85 0 0 1-44.953-287.85 445.14 756.85 0 0 1 416.88-801.92 445.14 756.85 0 0 1 18.355-1.2812zm18.137 0a445.14 756.85 0 0 1 361.13 336.41 48.261 1013.5 45.498 0 1 83.256-76.055 600.7 756.78 0 0 0-444.39-260.35zm483.76 324a48.261 1013.5 45.498 0 1-93.476 98.332 445.14 756.85 0 0 1 44.943 287.61 445.14 756.85 0 0 1-416.73 802.14l-0.2773 0.029a445.14 756.85 0 0 1-18.217 1.2657 600.7 756.78 0 0 0 27.75-1.3379l0.3769-0.029a600.7 756.78 0 0 0 562.36-802.06 600.7 756.78 0 0 0-106.72-385.95zm-863.03 852.97a48.261 1013.5 45.498 0 1-83.256 76.055 600.7 756.78 0 0 0 444.39 260.35 445.14 756.85 0 0 1-361.13-336.41z';

const SLASH_D =
  'M353.46 1457.6a22.59 875.89 45.455 0 1 567.92-592.55 22.59 875.89 45.455 0 1 676.26-635.92 22.59 875.89 45.455 0 1-567.71 592.36 22.59 875.89 45.455 0 1-676.44 636.11';

/* Honest services — solo Victorian MSP, no 24/7 claims, no buzzwords */
const SERVICES = [
  {
    id: 'managed',
    label: 'Managed IT Support',
    detail: 'Reliable IT management for your whole business',
    color: '#3b82f6',
    kpis: ['Proactive monitoring', 'Fast remote help', 'Monthly check-ins'],
    log: 'Keeping your systems running smoothly',
  },
  {
    id: 'm365',
    label: 'Microsoft 365',
    detail: 'Setup, migration and ongoing M365 support',
    color: '#06b6d4',
    kpis: ['Email & Teams setup', 'SharePoint & OneDrive', 'User management'],
    log: 'Your M365 environment, properly configured',
  },
  {
    id: 'security',
    label: 'Business Security',
    detail: 'Practical Microsoft-based security for SMBs',
    color: '#8b5cf6',
    kpis: ['MFA & access controls', 'Security baselines', 'Staff guidance'],
    log: 'Sensible security, without the jargon',
  },
  {
    id: 'backup',
    label: 'Backup & Recovery',
    detail: 'Reliable backups so you can recover quickly',
    color: '#f59e0b',
    kpis: ['Automated backups', 'Cloud & local copies', 'Recovery planning'],
    log: 'Your data protected and recoverable',
  },
  {
    id: 'helpdesk',
    label: 'IT Help & Advice',
    detail: 'A real person to call when things go wrong',
    color: '#10b981',
    kpis: ['Remote support', 'Clear explanations', 'Device & network help'],
    log: 'Friendly help from someone who knows your setup',
  },
];

export default function HeroLogoAnimation() {
  const [svcIdx,    setSvcIdx]    = useState(0);
  const [isLive,    setIsLive]    = useState(false);   // true once draw completes
  const [infoReady, setInfoReady] = useState(false);   // true once info should show

  const ringRef    = useRef(null);
  const slashRef   = useRef(null);
  const glowRef    = useRef(null);
  const cycleRef   = useRef(null);

  const svc = SERVICES[svcIdx];

  /* ── DRAW SEQUENCE ── */
  useEffect(() => {
    const ring  = ringRef.current;
    const slash = slashRef.current;
    if (!ring || !slash) return;

    /* ----- Initial state ----- */
    /* Ring: opacity/scale for a filled shape (cleaner than stroke-draw on complex paths) */
    ring.style.opacity          = '0';
    ring.style.transform        = 'scale(0.94)';
    ring.style.transformOrigin  = '50% 50%';
    ring.style.transition       = 'none';

    /* Slash: stroke-dashoffset — thin needle is perfect for stroke-draw */
    const sl = slash.getTotalLength();
    slash.style.strokeDasharray  = sl;
    slash.style.strokeDashoffset = sl;
    slash.style.fillOpacity      = '0';
    slash.style.strokeOpacity    = '0.85';
    slash.style.transition       = 'none';

    if (glowRef.current) {
      glowRef.current.style.opacity    = '0';
      glowRef.current.style.transition = 'none';
    }

    void ring.getBoundingClientRect(); // force reflow before transitions

    /* P1: Ring materialises — ease-out for a smooth landing */
    const t1 = setTimeout(() => {
      ring.style.transition = [
        'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
        'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
      ].join(', ');
      ring.style.opacity   = '1';
      ring.style.transform = 'scale(1)';
    }, 80);

    /* P2: Slash strokes in — starts at 60% of ring animation */
    const t2 = setTimeout(() => {
      slash.style.transition      = 'stroke-dashoffset 1300ms cubic-bezier(0.45, 0, 0.55, 1)';
      slash.style.strokeDashoffset = '0';
    }, 680);

    /* P3: Slash fill fades in, guide stroke fades out */
    const t3 = setTimeout(() => {
      slash.style.transition    = 'fill-opacity 700ms ease, stroke-opacity 600ms ease';
      slash.style.fillOpacity   = '1';
      slash.style.strokeOpacity = '0';
    }, 1900);

    /* P4: Glow breathes in */
    const t4 = setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.transition = 'opacity 900ms ease';
        glowRef.current.style.opacity    = '1';
      }
    }, 2100);

    /* P5: Info panel + idle animations activate */
    const t5 = setTimeout(() => {
      setIsLive(true);
      setInfoReady(true);
    }, 2400);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  /* ── SERVICE CYCLE (starts after draw) ── */
  useEffect(() => {
    if (!isLive) return;
    cycleRef.current = setInterval(() => {
      setSvcIdx(i => (i + 1) % SERVICES.length);
    }, 4200);
    return () => clearInterval(cycleRef.current);
  }, [isLive]);

  /* ── MANUAL NAV ── */
  const goTo = useCallback((idx) => {
    clearInterval(cycleRef.current);
    setSvcIdx(idx);
    cycleRef.current = setInterval(() => {
      setSvcIdx(i => (i + 1) % SERVICES.length);
    }, 4200);
  }, []);

  return (
    <div className="sl-root" aria-label="Syncline IT Solutions services">

      {/* ── SERVICE BADGE ── */}
      <div
        className={`sl-badge${infoReady ? ' sl-badge--vis' : ''}`}
        style={{ borderColor: `${svc.color}40`, background: `${svc.color}0f` }}
      >
        <span className="sl-badge-dot" style={{ background: svc.color }} />
        <span className="sl-badge-label" style={{ color: svc.color }}>
          {svc.label}
        </span>
      </div>

      {/* ── LOGO STAGE ── */}
      <div className="sl-logo-wrap">

        {/* Single soft ambient glow — brand blue, no distractions */}
        <div ref={glowRef} className="sl-glow" />

        {/*
          SVG LOGO — exact source geometry
          ─────────────────────────────────────────────────
          viewBox:   0 0 1600 1600
          <g>:       translate(-175.55 -43.311)
          Ring:      fill #0077ff  →  matches PNG solid blue ring
          Slash:     fill gradient #0a1a2f→#0077ff  →  matches PNG dark-to-blue needle
          Gradient:  no gradientTransform (source had translate(175.55,43.31)
                     which cancels the group translate, net = identity)
          Stroke:    #0077ff during draw only, fades to 0 on slash after fill appears
          Glow filt: gentle, not cartoonish
          ─────────────────────────────────────────────────
        */}
        <svg
          className="sl-svg"
          viewBox="0 0 1600 1600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* EXACT slash gradient — matches the PNG dark-navy-to-blue look */}
            <linearGradient
              id="sl-slash-fill"
              x1="177"    y1="1399.7"
              x2="1408.5" y2="194.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0"    stopColor="#0a1a2f" />
              <stop offset="0.42" stopColor="#0d2a50" />
              <stop offset="1"    stopColor="#0077ff" />
            </linearGradient>

            {/* Stroke gradient matches fill so the draw looks like the shape appearing */}
            <linearGradient
              id="sl-slash-stroke"
              x1="177"    y1="1399.7"
              x2="1408.5" y2="194.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#0a1a2f" />
              <stop offset="1" stopColor="#0077ff" />
            </linearGradient>

            {/* Ring glow — very subtle, adds depth without distorting shape */}
            <filter id="sl-ring-glow" x="-6%" y="-6%" width="112%" height="112%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Slash glow — slightly more pronounced for the thin needle */}
            <filter id="sl-slash-glow" x="-18%" y="-18%" width="136%" height="136%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Clip for idle animations */}
            <clipPath id="sl-clip">
              <rect x="0" y="0" width="1600" height="1600" />
            </clipPath>
          </defs>

          {/* GROUP — exact transform from source SVG */}
          <g transform="translate(-175.55 -43.311)" fillRule="evenodd">

            {/*
              RING
              Filled solid #0077ff. Animated by opacity + scale (JS).
              filter adds a faint glow halo that matches the PNG's appearance.
            */}
            <path
              ref={ringRef}
              d={RING_D}
              fill="#0077ff"
              filter="url(#sl-ring-glow)"
              style={{ willChange: 'opacity, transform' }}
            />

            {/*
              SLASH
              Thin needle shape. Stroke draws first (dashoffset), then:
              - fill url(#sl-slash-fill) fades in  → dark navy bottom, blue top
              - stroke opacity → 0
              stroke uses same gradient so the draw animation colour matches final fill.
              vectorEffect keeps stroke width consistent when SVG scales.
            */}
            <path
              ref={slashRef}
              d={SLASH_D}
              fill="url(#sl-slash-fill)"
              fillOpacity="0"
              stroke="url(#sl-slash-stroke)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              filter="url(#sl-slash-glow)"
              style={{ willChange: 'stroke-dashoffset, fill-opacity, stroke-opacity' }}
            />
          </g>

          {/* IDLE INNER ANIMATIONS — very subtle, only after draw */}
          {isLive && (
            <g clipPath="url(#sl-clip)">
              {/*
                Two faint breath rings emanate from the logo centre.
                These are the only "live" inner elements — subtle, professional.
                cx/cy ≈ logo centre in viewBox space (accounting for group transform).
              */}
              <circle
                cx="800" cy="820"
                fill="none"
                stroke="#0077ff"
                strokeWidth="1.2"
                className="sl-breathe-0"
              />
              <circle
                cx="800" cy="820"
                fill="none"
                stroke="#0077ff"
                strokeWidth="0.8"
                className="sl-breathe-1"
              />
            </g>
          )}
        </svg>
      </div>

      {/* ── INFO PANEL ── */}
      <div className={`sl-info${infoReady ? ' sl-info--vis' : ''}`}>

        {/* Service detail — one line, honest language */}
        <p className="sl-detail" style={{ color: `${svc.color}cc` }}>
          {svc.detail}
        </p>

        {/* Three KPI chips per service */}
        <div className="sl-kpis">
          {svc.kpis.map(k => (
            <span
              key={k}
              className="sl-kpi"
              style={{
                color:       svc.color,
                borderColor: `${svc.color}35`,
                background:  `${svc.color}0d`,
              }}
            >
              {k}
            </span>
          ))}
        </div>

        {/* Status log — one calm line, real language */}
        <div className="sl-log" style={{ borderColor: `${svc.color}28` }}>
          <span className="sl-log-dot" style={{ background: svc.color }} />
          <span className="sl-log-text" style={{ color: `${svc.color}b0` }}>
            {svc.log}
          </span>
        </div>

        {/* Nav dots — manual service selection */}
        <nav className="sl-nav" aria-label="Browse services">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              className={`sl-nav-dot${i === svcIdx ? ' sl-nav-dot--active' : ''}`}
              style={{
                background: i === svcIdx ? s.color : 'rgba(100,116,139,0.3)',
                width:      i === svcIdx ? '20px' : '6px',
              }}
              onClick={() => goTo(i)}
              aria-label={`Show ${s.label}`}
              aria-current={i === svcIdx ? 'true' : undefined}
            />
          ))}
        </nav>

        {/* Brand footer */}
        <p className="sl-brand">Syncline IT Solutions · Victoria, Australia</p>
      </div>

    </div>
  );
}





// /**
//  * HeroLogoAnimation.jsx — Syncline Brand FINAL
//  *
//  * ✅ Exact SVG paths from master file (viewBox 0 0 1600 1600)
//  * ✅ Ring fill: #0077ff (matches PNG exactly)
//  * ✅ Slash fill: gradient #0a1a2f → #0077ff (matches PNG exactly)
//  * ✅ Transparent background
//  * ✅ GSAP stroke-draw → fill fade, no layout shift
//  * ✅ MSP service cycling — readable font sizes, no overlap
//  * ✅ Fits HeroCTASection right column (420–460px wide)
//  */

// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import gsap from 'gsap';

// /* ─────────────────────────────────────────────────────────────────
//    SVG PATH DATA — verbatim from Syncline_Master SVG
//    viewBox: 0 0 1600 1600
//    Group transform: translate(-175.55 -43.311)
//    Gradient net transform = zero (175.55 − 175.55 = 0)
// ───────────────────────────────────────────────────────────────── */
// const RING_D = `M966.49 86.621a600.7 756.78 0 0 0-27.939 1.3516 600.7 756.78 0 0 0-562.55 801.84 600.7 756.78 0 0 0 106.73 386.18 48.261 1013.5 45.498 0 1 93.479-98.332 445.14 756.85 0 0 1-44.953-287.85 445.14 756.85 0 0 1 416.88-801.92 445.14 756.85 0 0 1 18.355-1.2812zm18.137 0a445.14 756.85 0 0 1 361.13 336.41 48.261 1013.5 45.498 0 1 83.256-76.055 600.7 756.78 0 0 0-444.39-260.35zm483.76 324a48.261 1013.5 45.498 0 1-93.476 98.332 445.14 756.85 0 0 1 44.943 287.61 445.14 756.85 0 0 1-416.73 802.14l-0.2773 0.029a445.14 756.85 0 0 1-18.217 1.2657 600.7 756.78 0 0 0 27.75-1.3379l0.3769-0.029a600.7 756.78 0 0 0 562.36-802.06 600.7 756.78 0 0 0-106.72-385.95zm-863.03 852.97a48.261 1013.5 45.498 0 1-83.256 76.055 600.7 756.78 0 0 0 444.39 260.35 445.14 756.85 0 0 1-361.13-336.41z`;

// const SLASH_D = `M353.46 1457.6a22.59 875.89 45.455 0 1 567.92-592.55 22.59 875.89 45.455 0 1 676.26-635.92 22.59 875.89 45.455 0 1-567.71 592.36 22.59 875.89 45.455 0 1-676.44 636.11`;

// /* ─────────────────────────────────────────────────────────────────
//    MSP SERVICE DATA — 5 real Syncline offerings
// ───────────────────────────────────────────────────────────────── */
// const SERVICES = [
//   {
//     id: 'noc',
//     label: '24/7 NOC',
//     detail: 'Proactive monitoring — 99.97% uptime',
//     status: 'LIVE',
//     color: '#22d3ee',   // cyan-400
//     dot: '#00ff88',
//     kpis: ['99.97% uptime', '< 18 min MTTR', '24/7 coverage'],
//     log: '> All endpoints nominal — 0 alerts',
//   },
//   {
//     id: 'cyber',
//     label: 'Cybersecurity',
//     detail: 'XDR · Zero-trust · Threat response',
//     status: 'PROTECTED',
//     color: '#f87171',   // red-400
//     dot: '#ff6b35',
//     kpis: ['99.8% detection', '512 endpoints', '0 breaches'],
//     log: '> Threat feed updated — all clear',
//   },
//   {
//     id: 'cloud',
//     label: 'Cloud & M365',
//     detail: 'Azure · Microsoft 365 · Hybrid',
//     status: 'OPTIMISED',
//     color: '#a78bfa',   // violet-400
//     dot: '#c4b5fd',
//     kpis: ['31% cost saved', '99.99% avail.', '27 tenants'],
//     log: '> Azure scaling +20% — costs nominal',
//   },
//   {
//     id: 'bdr',
//     label: 'Backup & DR',
//     detail: 'Immutable · Air-gap · < 1hr RPO',
//     status: 'VERIFIED',
//     color: '#fbbf24',   // amber-400
//     dot: '#fde68a',
//     kpis: ['142 TB protected', 'RPO < 1 hr', 'RTO < 4 hr'],
//     log: '> Recovery test passed in 3m 12s',
//   },
//   {
//     id: 'helpdesk',
//     label: 'Help Desk',
//     detail: 'Level 1–3 · On-site · Remote',
//     status: 'RESPONDING',
//     color: '#34d399',   // emerald-400
//     dot: '#6ee7b7',
//     kpis: ['97% CSAT', '84% first call', '< 2hr response'],
//     log: '> Ticket #4821 resolved — SLA met ✓',
//   },
// ];

// /* ─────────────────────────────────────────────────────────────────
//    COMPONENT
// ───────────────────────────────────────────────────────────────── */
// export default function HeroLogoAnimation() {
//   const [svcIdx, setSvcIdx]     = useState(0);
//   const [logoReady, setLogoReady] = useState(false);

//   const ringPathRef  = useRef(null);
//   const slashPathRef = useRef(null);
//   const overlayRef   = useRef(null);
//   const glowRef      = useRef(null);
//   const labelRef     = useRef(null);

//   const svc = SERVICES[svcIdx];

//   /* ── Draw animation (runs once on mount) ── */
//   useEffect(() => {
//     const ring  = ringPathRef.current;
//     const slash = slashPathRef.current;
//     if (!ring || !slash) return;

//     const rl = ring.getTotalLength();
//     const sl = slash.getTotalLength();

//     // Set up hidden state
//     gsap.set(ring,  { strokeDasharray: rl, strokeDashoffset: rl, fillOpacity: 0, strokeOpacity: 1 });
//     gsap.set(slash, { strokeDasharray: sl, strokeDashoffset: sl, fillOpacity: 0, strokeOpacity: 0.85 });
//     gsap.set(glowRef.current,   { opacity: 0 });
//     gsap.set(labelRef.current,  { opacity: 0, y: 10 });
//     gsap.set(overlayRef.current, { opacity: 0 });

//     const tl = gsap.timeline({ delay: 0.1 });

//     // Phase 1: ring draws (0 → 1.8s)
//     tl.to(ring, {
//       strokeDashoffset: 0,
//       duration: 1.8,
//       ease: 'power2.inOut',
//     }, 0);

//     // Phase 2: slash draws (starts at 60% of ring = 1.08s)
//     tl.to(slash, {
//       strokeDashoffset: 0,
//       duration: 1.5,
//       ease: 'power2.inOut',
//     }, 1.08);

//     // Phase 3: fills fade in, strokes fade out
//     tl.to(ring, {
//       fillOpacity: 1,
//       strokeOpacity: 0,
//       duration: 0.9,
//       ease: 'power2.out',
//     }, 2.7);

//     tl.to(slash, {
//       fillOpacity: 1,
//       strokeOpacity: 0,
//       duration: 0.9,
//       ease: 'power2.out',
//     }, 2.7);

//     // Phase 4: glow + label appear
//     tl.to(glowRef.current, {
//       opacity: 1,
//       duration: 0.6,
//       ease: 'power2.out',
//     }, 3.0);

//     tl.to(labelRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 0.5,
//       ease: 'power2.out',
//     }, 3.2);

//     // Phase 5: overlay tint activates
//     tl.call(() => {
//       setLogoReady(true);
//       gsap.to(overlayRef.current, { opacity: 0.18, duration: 0.8 });
//     }, [], 3.5);

//     return () => tl.kill();
//   }, []);

//   /* ── Service cycling ── */
//   useEffect(() => {
//     const id = setInterval(() => {
//       setSvcIdx(i => (i + 1) % SERVICES.length);
//     }, 4000);
//     return () => clearInterval(id);
//   }, []);

//   /* ── Transition overlay tint on service change ── */
//   useEffect(() => {
//     if (!logoReady || !overlayRef.current) return;
//     gsap.fromTo(overlayRef.current,
//       { opacity: 0 },
//       { opacity: 0.18, duration: 0.6, ease: 'power2.out' }
//     );
//   }, [svcIdx, logoReady]);

//   return (
//     <div className="sl-root">

//       {/* ══ TOP: Service Badge ══ */}
//       <div className="sl-badge" style={{ borderColor: `${svc.color}45`, background: `${svc.color}10` }}>
//         <span className="sl-badge-dot" style={{ background: svc.dot }} />
//         <span className="sl-badge-label" style={{ color: svc.color }}>{svc.label}</span>
//         <span className="sl-badge-status" style={{ color: svc.dot, background: `${svc.dot}18` }}>
//           {svc.status}
//         </span>
//       </div>

//       {/* ══ LOGO ══ */}
//       <div className="sl-logo-wrap">
//         {/* Ambient glow */}
//         <div
//           ref={glowRef}
//           className="sl-glow"
//           style={{ background: `radial-gradient(ellipse 55% 42% at 63% 36%, ${svc.color}28 0%, ${svc.color}08 55%, transparent 100%)` }}
//         />

//         {/* Rotating orbit rings */}
//         <div className="sl-orbit sl-orbit-outer" style={{ borderColor: `${svc.color}22` }} />
//         <div className="sl-orbit sl-orbit-inner" style={{ borderColor: `${svc.color}14` }} />

//         {/*
//           THE LOGO SVG
//           viewBox: 0 0 1600 1600 (source dimensions, NOT 2000×2000)
//           Group transform: translate(-175.55 -43.311)
//           Gradient: net gradientTransform = 0 (they cancel)
//           Ring: #0077ff — matches PNG
//           Slash: #0a1a2f → #0077ff gradient — matches PNG
//         */}
//         <svg
//           className="sl-svg"
//           viewBox="0 0 1600 1600"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-label="Syncline IT Solutions"
//           style={{ filter: `drop-shadow(0 0 14px ${svc.color}40)` }}
//         >
//           <defs>
//             {/* EXACT gradient from master SVG — net transform = identity */}
//             <linearGradient
//               id="slashGradFill"
//               x1="177" y1="1399.7"
//               x2="1408.5" y2="194.47"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop offset="0"  stopColor="#0a1a2f" />
//               <stop offset="1"  stopColor="#0077ff" />
//             </linearGradient>

//             {/* Phase tint — applied as semi-transparent overlay on slash */}
//             <linearGradient id="phaseTint" x1="0%" y1="100%" x2="100%" y2="0%">
//               <stop offset="0%"   stopColor={svc.color} stopOpacity="1" />
//               <stop offset="100%" stopColor={svc.color} stopOpacity="0.4" />
//             </linearGradient>

//             {/* Glow filter */}
//             <filter id="sl-glow-f" x="-20%" y="-20%" width="140%" height="140%">
//               <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
//               <feMerge>
//                 <feMergeNode in="blur" />
//                 <feMergeNode in="SourceGraphic" />
//               </feMerge>
//             </filter>

//             {/* Pulse ring clip */}
//             <clipPath id="sl-clip">
//               <rect x="0" y="0" width="1600" height="1600" />
//             </clipPath>
//           </defs>

//           <g transform="translate(-175.55 -43.311)" fillRule="evenodd">

//             {/* RING — stroke draws, then fill (#0077ff) fades in */}
//             <path
//               ref={ringPathRef}
//               d={RING_D}
//               fill="#0077ff"
//               fillOpacity="0"
//               stroke="#0077ff"
//               strokeWidth="4"
//               strokeOpacity="1"
//               vectorEffect="non-scaling-stroke"
//               filter="url(#sl-glow-f)"
//             />

//             {/* SLASH — gradient fill fades in after stroke draws */}
//             <path
//               ref={slashPathRef}
//               d={SLASH_D}
//               fill="url(#slashGradFill)"
//               fillOpacity="0"
//               stroke="#0077ff"
//               strokeWidth="3"
//               strokeOpacity="0.85"
//               vectorEffect="non-scaling-stroke"
//               filter="url(#sl-glow-f)"
//             />

//             {/* Phase tint overlay (subtle, transitions with service) */}
//             <path
//               ref={overlayRef}
//               d={SLASH_D}
//               fill="url(#phaseTint)"
//               fillOpacity="0"
//             />
//           </g>

//           {/* INNER LIVE ANIMATIONS — clipped */}
//           {logoReady && (
//             <g clipPath="url(#sl-clip)">
//               {/* Pulse rings */}
//               {[0, 1].map(i => (
//                 <circle
//                   key={i}
//                   cx="800" cy="800" r="0"
//                   fill="none"
//                   stroke={svc.color}
//                   strokeWidth="2.5"
//                   className={`sl-pulse sl-pulse-${i}`}
//                 />
//               ))}

//               {/* Cardinal node dots */}
//               {[[955, 800], [800, 962], [645, 800], [800, 638]].map(([nx, ny], i) => (
//                 <circle
//                   key={i}
//                   cx={nx} cy={ny} r="10"
//                   fill={svc.color}
//                   className={`sl-node sl-node-${i}`}
//                 />
//               ))}
//             </g>
//           )}
//         </svg>
//       </div>

//       {/* ══ BOTTOM: KPIs + Log ══ */}
//       <div ref={labelRef} className="sl-info">

//         {/* KPI pills */}
//         <div className="sl-kpis">
//           {svc.kpis.map((k, i) => (
//             <span
//               key={i}
//               className="sl-kpi"
//               style={{ color: svc.color, borderColor: `${svc.color}35`, background: `${svc.color}0d` }}
//             >
//               {k}
//             </span>
//           ))}
//         </div>

//         {/* Log line */}
//         <div className="sl-log" style={{ borderColor: `${svc.color}25` }}>
//           <span className="sl-log-dot" style={{ background: svc.dot }} />
//           <span className="sl-log-text" style={{ color: svc.color }}>{svc.log}</span>
//         </div>

//         {/* Service nav dots */}
//         <div className="sl-nav">
//           {SERVICES.map((s, i) => (
//             <button
//               key={s.id}
//               className={`sl-nav-dot${i === svcIdx ? ' sl-nav-dot--active' : ''}`}
//               style={{ background: i === svcIdx ? s.color : '#1e293b' }}
//               onClick={() => setSvcIdx(i)}
//               aria-label={`View ${s.label}`}
//             />
//           ))}
//         </div>

//         {/* Brand name */}
//         <p className="sl-brand">Syncline IT Solutions · MSP</p>
//       </div>

//     </div>
//   );
// }




// /**
//  * HeroLogoAnimation.jsx — Syncline Brand v5.1
//  * Fully updated to match final Syncline logo geometry + colors.
//  * - Ring stroke: #7FDBFF (navbar-safe)
//  * - Slash stroke: gradient (light cyan → white)
//  * - Stroke widths: 50px
//  * - Filled logo: ring = #7FDBFF, slash = gradient
//  */

// import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';

// /* -----------------------------------------------------------
//    1) OUTLINE SVG (stroke animation)
// ----------------------------------------------------------- */
// const STROKE_SVG = `
// <svg id="sl-stroke" xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 1600 1600" width="100%" height="100%" fill="none"
//   style="display:block;position:absolute;inset:0;width:100%;height:100%;">

//   <defs>
//     <!-- Slash gradient for stroke version -->
//     <linearGradient id="slashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stop-color="#7FDBFF" stop-opacity="1" />
//       <stop offset="100%" stop-color="#FFFFFF" stop-opacity="1" />
//     </linearGradient>
//   </defs>

//   <!-- RING (stroke only) -->
//   <path id="sl-ring"
//     d="M 966.48648,86.621036 A 600.69684,756.77533 0 0 0 938.54703,87.972598
//        A 600.69684,756.77533 0 0 0 375.99234,889.8144
//        A 600.69684,756.77533 0 0 0 482.72672,1275.998
//        A 48.261112,1013.4834 45.498038 0 1 576.20523,1177.666
//        A 445.145,756.84612 0 0 1 531.25211,889.8183
//        A 445.145,756.84612 0 0 1 948.13101,87.901986
//        A 445.145,756.84612 0 0 1 966.48648,86.621036 Z
//        M 984.6232,86.621036 A 445.145,756.84612 0 0 1 1345.758,423.02924
//        A 48.261112,1013.4834 45.498038 0 1 1429.0139,346.97455
//        A 600.69684,756.77533 0 0 0 984.6232,86.621036 Z
//        M 1468.383,410.62299 A 48.261112,1013.4834 45.498038 0 1 1374.9065,508.95502
//        A 445.145,756.84612 0 0 1 1419.8498,796.5644
//        A 445.145,756.84612 0 0 1 1003.1173,1598.705 L 1002.84,1598.734
//        A 445.145,756.84612 0 0 1 984.6232,1600
//        A 600.69684,756.77533 0 0 0 1012.3732,1598.6621 L 1012.7501,1598.6331
//        A 600.69684,756.77533 0 0 0 1575.1057,796.57026
//        A 600.69684,756.77533 0 0 0 1468.383,410.62299 Z
//        M 605.35172,1263.5917 A 48.261112,1013.4834 45.498038 0 1 522.09586,1339.6464
//        A 600.69684,756.77533 0 0 0 966.48648,1600
//        A 445.145,756.84612 0 0 1 605.35172,1263.5917 Z"
//     fill="none"
//     stroke="#7FDBFF"
//     stroke-width="50"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   />

//   <!-- SLASH (stroke only, gradient) -->
//   <path id="sl-slash"
//     d="M 353.45575,1457.5514 A 22.590307,875.88788 45.45491 0 1 921.37809,864.99673
//        A 22.590307,875.88788 45.45491 0 1 1597.6369,229.07631
//        A 22.590307,875.88788 45.45491 0 1 1029.9263,821.43188
//        A 22.590307,875.88788 45.45491 0 1 353.48972,1457.5377"
//     fill="none"
//     stroke="url(#slashGrad)"
//     stroke-width="50"
//     stroke-linecap="round"
//     stroke-linejoin="round"
//   />
// </svg>
// `;

// /* -----------------------------------------------------------
//    2) FILLED SVG (final logo fade-in)
// ----------------------------------------------------------- */
// const FILLED_SVG = `
// <svg id="sl-filled" xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 1600 1600" width="100%" height="100%"
//   style="display:block;position:absolute;inset:0;width:100%;height:100%;opacity:0;">

//   <defs>
//     <!-- Slash gradient for filled version -->
//     <linearGradient id="slashFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stop-color="#7FDBFF" stop-opacity="1" />
//       <stop offset="100%" stop-color="#FFFFFF" stop-opacity="1" />
//     </linearGradient>
//   </defs>

//   <!-- RING (filled) -->
//   <path fill="#7FDBFF" fill-rule="evenodd"
//     d="M 966.48648,86.621036 A 600.69684,756.77533 0 0 0 938.54703,87.972598
//        A 600.69684,756.77533 0 0 0 375.99234,889.8144
//        A 600.69684,756.77533 0 0 0 482.72672,1275.998
//        A 48.261112,1013.4834 45.498038 0 1 576.20523,1177.666
//        A 445.145,756.84612 0 0 1 531.25211,889.8183
//        A 445.145,756.84612 0 0 1 948.13101,87.901986
//        A 445.145,756.84612 0 0 1 966.48648,86.621036 Z
//        M 984.6232,86.621036 A 445.145,756.84612 0 0 1 1345.758,423.02924
//        A 48.261112,1013.4834 45.498038 0 1 1429.0139,346.97455
//        A 600.69684,756.77533 0 0 0 984.6232,86.621036 Z
//        M 1468.383,410.62299 A 48.261112,1013.4834 45.498038 0 1 1374.9065,508.95502
//        A 445.145,756.84612 0 0 1 1419.8498,796.5644
//        A 445.145,756.84612 0 0 1 1003.1173,1598.705 L 1002.84,1598.734
//        A 445.145,756.84612 0 0 1 984.6232,1600
//        A 600.69684,756.77533 0 0 0 1012.3732,1598.6621 L 1012.7501,1598.6331
//        A 600.69684,756.77533 0 0 0 1575.1057,796.57026
//        A 600.69684,756.77533 0 0 0 1468.383,410.62299 Z
//        M 605.35172,1263.5917 A 48.261112,1013.4834 45.498038 0 1 522.09586,1339.6464
//        A 600.69684,756.77533 0 0 0 966.48648,1600
//        A 445.145,756.84612 0 0 1 605.35172,1263.5917 Z"/>

//   <!-- SLASH (filled gradient) -->
//   <path fill="url(#slashFillGrad)" fill-rule="evenodd"
//     d="M 353.45575,1457.5514 A 22.590307,875.88788 45.45491 0 1 921.37809,864.99673
//        A 22.590307,875.88788 45.45491 0 1 1597.6369,229.07631
//        A 22.590307,875.88788 45.45491 0 1 1029.9263,821.43188
//        A 22.590307,875.88788 45.45491 0 1 353.48972,1457.5377"/>
// </svg>
// `;

// /* -----------------------------------------------------------
//    3) PHASE LABEL COLORS
// ----------------------------------------------------------- */
// const PHASES = [
//   { label: 'Scanning',   color: '#22e6b8' },
//   { label: 'Analyzing',  color: '#1d9bf0' },
//   { label: 'Optimising', color: '#8b5cf6' },
//   { label: 'Verifying',  color: '#10b981' },
// ];

// /* -----------------------------------------------------------
//    4) MAIN COMPONENT
// ----------------------------------------------------------- */
// const HeroLogoAnimation = () => {
//   const strokeRef = useRef(null);
//   const filledRef = useRef(null);
//   const stageRef  = useRef(null);
//   const glowRef   = useRef(null);
//   const labelRef  = useRef(null);
//   const [phase, setPhase] = useState(0);

//   /* Load SVGs */
//   useEffect(() => {
//     if (strokeRef.current) strokeRef.current.innerHTML = STROKE_SVG;
//     if (filledRef.current) filledRef.current.innerHTML = FILLED_SVG;
//   }, []);

//   /* Animation */
//   useEffect(() => {
//     const run = () => {
//       const ring      = strokeRef.current?.querySelector('#sl-ring');
//       const slash     = strokeRef.current?.querySelector('#sl-slash');
//       const filledSvg = filledRef.current?.querySelector('#sl-filled');
//       if (!ring || !slash || !filledSvg) return;

//       const tl = gsap.timeline();

//       /* Ring draw */
//       const rLen = ring.getTotalLength?.() ?? 5000;
//       gsap.set(ring, { strokeDasharray: rLen, strokeDashoffset: rLen });
//       tl.to(ring, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0);

//       /* Slash draw */
//       const sLen = slash.getTotalLength?.() ?? 4000;
//       gsap.set(slash, { strokeDasharray: sLen, strokeDashoffset: sLen });
//       tl.to(slash, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.6);

//       /* Glow */
//       tl.fromTo(glowRef.current,
//         { opacity: 0 }, { opacity: 0.7, duration: 0.6, ease: 'power2.out' }, 1.4);

//       /* Filled logo fade-in */
//       tl.to(filledSvg,
//         { opacity: 1, scale: 1.03, duration: 0.4, ease: 'power2.out', transformOrigin: '50% 50%' }, 1.8);
//       tl.to(filledSvg,
//         { scale: 1, duration: 0.25, ease: 'power1.inOut' }, 2.2);

//       /* Hide stroke version */
//       tl.to(strokeRef.current,
//         { opacity: 0, duration: 0.3 }, 2.1);

//       /* Label fade-in */
//       tl.fromTo(labelRef.current,
//         { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 2.5);
//     };

//     const t = setTimeout(run, 80);
//     return () => {
//       clearTimeout(t);
//       gsap.killTweensOf([stageRef.current, glowRef.current, strokeRef.current]);
//     };
//   }, []);

//   /* Phase cycling */
//   useEffect(() => {
//     const id = setInterval(() => setPhase(p => (p + 1) % PHASES.length), 3500);
//     return () => clearInterval(id);
//   }, []);

//   const ph = PHASES[phase];

//   /* Render */
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
//       <div style={{ position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '1 / 1' }}>
//         <div
//           ref={glowRef}
//           style={{
//             position: 'absolute', inset: 0,
//             borderRadius: '50%',
//             background: 'radial-gradient(ellipse 55% 42% at 63% 36%, rgba(0,119,255,0.30) 0%, rgba(0,119,255,0.08) 55%, transparent 100%)',
//             opacity: 0,
//             pointerEvents: 'none',
//           }}
//         />
//         <div ref={stageRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
//           <div ref={strokeRef} style={{ position: 'absolute', inset: 0 }} />
//           <div ref={filledRef} style={{ position: 'absolute', inset: 0 }} />
//         </div>
//       </div>

//       <div
//         ref={labelRef}
//         style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}
//       >
//         <span style={{
//           width: 8, height: 8, borderRadius: '50%',
//           background: ph.color, display: 'inline-block', flexShrink: 0,
//           animation: 'sl-pulse 2s ease-in-out infinite',
//         }} />
//         <span style={{
//           color: ph.color, fontSize: '0.85rem', fontWeight: 600,
//           fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.02em'
//         }}>
//           {ph.label}
//         </span>
//         <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
//           Syncline IT Solutions
//         </span>
//       </div>

//       <style>{`
//         @keyframes sl-pulse {
//           0%, 100% { transform: scale(1); opacity: 1; }
//           50% { transform: scale(1.4); opacity: 0.7; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroLogoAnimation;