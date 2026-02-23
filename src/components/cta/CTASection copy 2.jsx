// src/components/cta/CTASection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { 
  AlertTriangle, Phone, Shield, Zap, TrendingUp, ArrowRight, CheckCircle,
  Server, Lock, Activity, Database, Cloud, Cpu, Flame
} from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const rotatingRef = useRef(null);
  const morphRef = useRef(null);
  const networkRef = useRef(null);
  const timelineRef = useRef(null);
  const terminalRef = useRef(null);
  const ctaButtonRef = useRef(null);

  // Rotating texts with Pinyon Script and Story Script alternation + responsive sizes
  const rotatingTexts = [
    {
      text: 'Turn IT chaos into reliable growth.',
      font: 'font-pinyon-script' // Elegant cursive for aspirational feel
    },
    {
      text: 'Eliminate ransomware fears forever.',
      font: 'font-story-script' // Modern script for strong impact
    },
    {
      text: 'Stop losing revenue to downtime.',
      font: 'font-pinyon-script' // Cursive urgency
    },
    {
      text: 'Build unbreakable trust in your IT.',
      font: 'font-story-script' // Clean trust-building script
    },
    {
      text: 'Transform risks into business momentum.',
      font: 'font-pinyon-script' // Final elegant flourish
    }
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % rotatingTexts.length);
    }, 5500); // Slightly longer for readability with script fonts
    return () => clearInterval(interval);
  }, []);

  // Master GSAP Context
  useEffect(() => {
    const ctx = gsap.context((self) => {
      // Smooth whole-text fade entrance (no char stagger – better for script fonts)
      const rotatingBlocks = self.selector('.rotating-block');

      gsap.fromTo(rotatingBlocks,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out'
        }
      );

      // Gentle gradient flow (subtle shine)
      gsap.to('.rotating-headline', {
        backgroundPosition: '200% center',
        duration: 16,
        repeat: -1,
        ease: 'none'
      });

      // Flame → Shield Morph (free approximation)
      const broken = self.selector('.morph-broken');
      const solid = self.selector('.morph-solid');
      gsap.to(broken, { opacity: 0, scale: 0.7, rotation: -45, duration: 1.6, ease: 'power2.in' });
      gsap.to(solid, { opacity: 1, scale: 1.1, rotation: 20, duration: 1.8, delay: 0.8, ease: 'power4.out' });
      gsap.to(solid, { scale: 1, rotation: 0, duration: 1, delay: 1.6 });

      // Pulsing glow
      gsap.to(solid, {
        filter: 'drop-shadow(0 0 40px #10b981)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Data Flow Lines (free strokeDashoffset) + Pulsing Nodes
      const lines = self.selector('.data-line');
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, { strokeDashoffset: 0, duration: 2.8, ease: 'power3.out' });
        gsap.to(line, { opacity: 0.4, repeat: -1, yoyo: true, duration: 2.5, delay: 2.8 });
      });

      const nodes = self.selector('.data-node');
      gsap.to(nodes, { scale: 1.5, duration: 1.5, stagger: 0.4, repeat: -1, yoyo: true, ease: 'power2.inOut' });

      // Terminal Typing
      const termLines = self.selector('.term-line');
      const termTl = gsap.timeline({ repeat: -1, repeatDelay: 6 });
      termLines.forEach((line, i) => {
        const chars = line.querySelectorAll('.term-char');
        termTl.to(chars, { opacity: 1, duration: 0.03, stagger: 0.04 }, i * 1.8);
      });

      // Workflow Timeline
      const steps = self.selector('.timeline-step');
      const path = self.selector('.timeline-path')[0];
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      }

      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 60%',
        onEnter: () => {
          if (path) gsap.to(path, { strokeDashoffset: 0, duration: 3.5, ease: 'power3.out' });
          gsap.to(steps, { opacity: 1, y: 0, scale: 1, stagger: 0.4, duration: 1.6, ease: 'elastic.out(1.2, 0.5)' });
        }
      });

      // Metrics Bars
      ScrollTrigger.create({
        trigger: '.metrics-grid',
        start: 'top 80%',
        onEnter: () => {
          gsap.to('.growth-bar', { width: (i, el) => el.dataset.target + '%', duration: 3.2, stagger: 0.4, ease: 'power4.out' });
          self.selector('.metric-num').forEach(el => {
            gsap.fromTo(el, { textContent: 0 }, {
              textContent: el.dataset.target,
              duration: 3.2,
              ease: 'power2.out',
              snap: { textContent: el.dataset.decimal ? 0.1 : 1 }
            });
          });
        }
      });

      // Benefits
      gsap.from('.benefit-item', { opacity: 0, y: 60, stagger: 0.25, duration: 1.2, scrollTrigger: { trigger: '.benefits-grid', start: 'top 85%' } });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth fade on rotate (no char stagger or glitch – clean & elegant for script fonts)
  useEffect(() => {
    gsap.fromTo('.rotating-block',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out' }
    );
  }, [currentText]);

  // Angular Particle Burst
  const createParticles = () => {
    const btn = ctaButtonRef.current;
    if (!btn) return;

    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
    const count = 45;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'absolute pointer-events-none shadow-2xl';
      const shapes = ['w-4 h-4 rotate-45', 'w-3 h-6', 'w-6 h-3', 'w-5 h-5 diamond'];
      p.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = '50%';
      p.style.top = '50%';
      btn.appendChild(p);

      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.7;
      const dist = 180 + Math.random() * 220;
      const rot = Math.random() * 1000 - 500;

      gsap.to(p, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rotation: rot,
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: 'power4.out',
        onComplete: () => p.remove()
      });
    }
  };

  // Safe timeline data
  const timelineData = [
    { title: 'Current Risks', Icon: AlertTriangle },
    { title: 'Free Assessment', Icon: Phone },
    { title: 'Proactive Security', Icon: Shield },
    { title: 'Reliable Growth', Icon: TrendingUp }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-cyan-950">
      {/* Full-space background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/15 via-purple-500/10 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-500/10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-600/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-conic from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Compact proactive badge */}
        <div className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-white font-bold text-xl mb-12 border-2 border-cyan-400/40 backdrop-blur-md">
          🇦🇺 Free Proactive IT Transformation Assessment — Limited Time
        </div>

        {/* Clean Rotating Headline – Whole text fade, no char stagger (perfect for script fonts) */}
        <h2 ref={headlineRef} className="rotating-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight mb-20 bg-gradient-to-r from-cyan-300 via-emerald-300 to-purple-300 bg-clip-text text-transparent bg-size-200">
          <div ref={rotatingRef} className="relative h-32 lg:h-40">
            {rotatingTexts.map((item, i) => (
              <div
                key={i}
                className={`rotating-block absolute inset-0 transition-opacity duration-800 ${
                  i === currentText ? 'opacity-100' : 'opacity-0'
                } ${item.font}`}
              >
                {item.text}
              </div>
            ))}
          </div>
        </h2>

        <p className="text-2xl lg:text-3xl text-slate-200 max-w-5xl mx-auto mb-24 leading-relaxed font-medium">
          Victorian & Tasmanian SMBs choose our proactive approach to eliminate cyber threats, prevent downtime, and drive sustainable growth with transparent, fixed-price partnerships.
        </p>

        {/* Central Morph + Network - Larger to fill space */}
        <div ref={morphRef} className="relative w-full max-w-5xl mx-auto mb-32 aspect-video">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            <path className="data-line stroke-cyan-400/70 stroke-5" d="M100 250 Q300 100 500 250 T 900 250" />
            <path className="data-line stroke-purple-400/70 stroke-5" d="M200 150 Q500 350 800 150" />
            <path className="data-line stroke-emerald-400/70 stroke-5" d="M150 350 Q500 50 850 350" />
          </svg>

          <Flame className="morph-broken absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 text-red-500/80" />
          <Shield className="morph-solid absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 text-emerald-400 opacity-0" />

          <div className="data-node absolute top-16 left-32 w-32 h-32 rounded-full bg-cyan-500/40 border-6 border-cyan-300">
            <Server className="w-20 h-20 text-cyan-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="data-node absolute bottom-16 right-32 w-32 h-32 rounded-full bg-emerald-500/40 border-6 border-emerald-300">
            <Lock className="w-20 h-20 text-emerald-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="data-node absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-purple-500/40 border-6 border-purple-300">
            <Activity className="w-24 h-24 text-purple-200" />
          </div>
        </div>

        {/* Compact Timeline */}
        <div ref={timelineRef} className="relative mb-32">
          <h3 className="text-4xl lg:text-5xl font-black text-white mb-20 italic">Your Proactive Journey</h3>
          <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-48 pointer-events-none" viewBox="0 0 1400 300">
            <path className="timeline-path stroke-cyan-400/60 stroke-6" d="M100 150 Q400 50 700 150 T 1300 150" fill="none" />
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            {timelineData.map(({ title, Icon }, i) => (
              <div key={i} className="timeline-step opacity-0 translate-y-32">
                <div className="p-12 rounded-3xl bg-gradient-to-br from-slate-800/60 to-transparent border-4 border-white/30">
                  <Icon className="w-32 h-32 text-white mx-auto" />
                </div>
                <p className="mt-8 text-2xl lg:text-3xl font-bold text-white italic">{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal - Larger */}
        <div ref={terminalRef} className="max-w-6xl mx-auto mb-32">
          <div className="p-16 bg-black/80 rounded-3xl border-4 border-cyan-500/70 backdrop-blur-2xl font-mono text-left text-2xl">
            <div className="flex gap-6 mb-12">
              <div className="w-6 h-6 rounded-full bg-red-500" />
              <div className="w-6 h-6 rounded-full bg-yellow-500" />
              <div className="w-6 h-6 rounded-full bg-green-500" />
              <span className="text-slate-200 text-xl">shakilit.au — proactive-mode.sh</span>
            </div>
            {[
              '> Initializing zero-trust...',
              '> Vulnerabilities: NONE',
              '> Proactive monitoring: ACTIVE',
              '> Performance optimized',
              '> Growth unlocked'
            ].map((text, i) => (
              <p key={i} className="term-line mb-6 text-cyan-300">
                {text.split('').map((c, j) => (
                  <span key={j} className="term-char opacity-0 inline-block">{c}</span>
                ))}
              </p>
            ))}
            <span className="inline-block w-4 h-10 bg-cyan-400 animate-pulse ml-2" />
          </div>
        </div>

        {/* Metrics - Full width */}
        <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto mb-32">
          {[
            { label: 'Revenue Protected', target: 92 },
            { label: 'Uptime Guaranteed', target: 99.9, decimal: true },
            { label: 'Risk Eliminated', target: 97 }
          ].map(({ label, target, decimal }, i) => (
            <div key={i} className="p-16 bg-slate-900/80 rounded-3xl border-2 border-white/20 backdrop-blur-xl">
              <p className="text-3xl font-bold text-cyan-300 mb-10">{label}</p>
              <div className="relative h-24 bg-slate-800/70 rounded-2xl overflow-hidden mb-10">
                <div className="growth-bar absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-emerald-500" data-target={target} style={{ width: '0%' }} />
              </div>
              <p className="text-7xl lg:text-8xl font-black text-white metric-num" data-target={target} data-decimal={decimal}>0%</p>
            </div>
          ))}
        </div>

        {/* Benefits - Full width grid */}
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto mb-32">
          {[
            'Free Proactive Assessment',
            '48-Hour Detailed Report',
            'No Obligation — Just Results'
          ].map((text, i) => (
            <div key={i} className="benefit-item p-12 bg-white/10 rounded-3xl border-2 border-white/20 backdrop-blur-xl">
              <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-8" />
              <p className="text-3xl font-bold text-white italic">{text}</p>
            </div>
          ))}
        </div>

        {/* Prominent CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-12">
          <RouterLink
            ref={ctaButtonRef}
            to="/contact"
            onMouseEnter={createParticles}
            className="group relative px-24 py-12 text-4xl lg:text-5xl font-black text-white rounded-3xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-500 shadow-2xl overflow-hidden hover:scale-110 transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-10">
              Start Free Assessment
              <ArrowRight className="w-16 h-16 group-hover:translate-x-12 transition-transform duration-700" />
            </span>
            <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </RouterLink>

          <a 
            href="tel:1300XXXXXX"
            className="px-24 py-12 text-4xl lg:text-5xl font-black text-cyan-200 rounded-3xl border-6 border-cyan-400 bg-slate-900/80 backdrop-blur-xl hover:bg-cyan-900/40 hover:scale-110 hover:border-emerald-300 transition-all duration-500 flex items-center justify-center gap-10"
          >
            <Phone className="w-16 h-16" />
            Call 1300 XXX XXX
          </a>
        </div>

        <p className="mt-24 text-3xl text-slate-300 font-semibold italic">
          Trusted by 150+ Victorian & Tasmanian SMBs
        </p>
      </div>
    </section>
  );
};

export default CTASection;




// // src/components/cta/CTASection.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
// gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// import { 
//   AlertTriangle, Phone, Shield, Zap, TrendingUp, ArrowRight, 
//   CheckCircle, Clock, Server, Lock, Activity, Database, 
//   Cloud, Cpu, HardDrive, Layers, Code, Boxes
// } from 'lucide-react';

// const CTASection = () => {
//   const sectionRef = useRef(null);
//   const timelineRef = useRef(null);
//   const terminalRef = useRef(null);
//   const ctaButtonRef = useRef(null);
//   const headlineRef = useRef(null);
//   const networkRef = useRef(null);
//   const logosRef = useRef(null);

//   const rotatingTexts = [
//     { 
//       text: 'Turn IT chaos into reliable growth.',
//       style: 'font-serif italic text-2xl lg:text-3xl tracking-wide'
//     },
//     { 
//       text: 'Eliminate ransomware fears forever.',
//       style: 'font-bold text-xl lg:text-2xl tracking-tight uppercase'
//     },
//     { 
//       text: 'Stop losing revenue to downtime.',
//       style: 'font-mono text-2xl lg:text-3xl tracking-wider'
//     },
//     { 
//       text: 'Build unbreakable trust in your IT.',
//       style: 'font-sans italic text-xl lg:text-2xl font-light tracking-wide'
//     }
//   ];

//   const [currentText, setCurrentText] = useState(0);

//   // Rotate transformative texts every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentText(prev => (prev + 1) % rotatingTexts.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // GSAP Animations
//   useEffect(() => {
//     const ctx = gsap.context((self) => {
      
//       // ============================================
//       // 1. HEADLINE REVEAL ANIMATION
//       // ============================================
//       const headline = headlineRef.current;
//       if (headline) {
//         gsap.fromTo(headline.querySelectorAll('.word'), 
//           { 
//             opacity: 0,
//             y: 50,
//             rotationX: -45
//           },
//           {
//             opacity: 1,
//             y: 0,
//             rotationX: 0,
//             duration: 1,
//             stagger: 0.08,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: headline,
//               start: 'top 85%'
//             }
//           }
//         );

//         // Gradient animation
//         gsap.to('.gradient-text', {
//           backgroundPosition: '200% center',
//           duration: 4,
//           repeat: -1,
//           ease: 'none'
//         });
//       }

//       // ============================================
//       // 2. LOGO SHOWCASE HORIZONTAL CAROUSEL
//       // ============================================
//       const logoItems = self.selector('.logo-item');
      
//       if (logoItems.length > 0) {
//         ScrollTrigger.create({
//           trigger: logosRef.current,
//           start: 'top 75%',
//           onEnter: () => {
//             // Stagger reveal
//             gsap.fromTo(logoItems,
//               { 
//                 opacity: 0, 
//                 scale: 0.5,
//                 y: 30
//               },
//               {
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//                 duration: 0.6,
//                 stagger: 0.1,
//                 ease: 'back.out(1.5)'
//               }
//             );

//             // Continuous floating animation
//             logoItems.forEach((item, i) => {
//               gsap.to(item, {
//                 y: -10,
//                 duration: 2 + (i % 3) * 0.5,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: 'sine.inOut',
//                 delay: i * 0.2
//               });
//             });

//             // Icon glow pulse
//             gsap.to('.logo-icon', {
//               filter: 'drop-shadow(0 0 8px currentColor)',
//               duration: 1.5,
//               stagger: 0.2,
//               repeat: -1,
//               yoyo: true,
//               ease: 'sine.inOut'
//             });
//           }
//         });
//       }

//       // ============================================
//       // 3. LIVE DATA FLOW NETWORK WITH NAMED NODES
//       // ============================================
//       const networkLines = self.selector('.network-line');
//       const networkNodes = self.selector('.network-node');

//       if (networkLines.length > 0) {
//         networkLines.forEach(line => {
//           gsap.set(line, { drawSVG: '0%' });
//         });

//         ScrollTrigger.create({
//           trigger: networkRef.current,
//           start: 'top 70%',
//           onEnter: () => {
//             // Reveal network lines
//             gsap.to(networkLines, {
//               drawSVG: '100%',
//               duration: 2,
//               stagger: 0.15,
//               ease: 'power2.inOut'
//             });

//             // Animate nodes
//             gsap.to(networkNodes, {
//               scale: 1,
//               opacity: 1,
//               duration: 0.5,
//               stagger: 0.1,
//               ease: 'back.out(2)'
//             });

//             // Continuous node pulse
//             gsap.to(networkNodes, {
//               scale: 1.1,
//               duration: 1.5,
//               repeat: -1,
//               yoyo: true,
//               ease: 'sine.inOut',
//               stagger: {
//                 each: 0.2,
//                 repeat: -1
//               }
//             });

//             // CREATE LIVE DATA PACKETS
//             const networkSvg = networkRef.current.querySelector('svg');
            
//             const createDataPacket = (x1, y1, x2, y2, delay = 0, color = '#06b6d4') => {
//               const packet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
//               packet.setAttribute('r', '5');
//               packet.setAttribute('fill', color);
//               packet.setAttribute('filter', 'url(#packet-glow)');
//               packet.setAttribute('cx', x1);
//               packet.setAttribute('cy', y1);
//               networkSvg.appendChild(packet);

//               gsap.timeline({ 
//                 repeat: -1, 
//                 delay: delay,
//                 repeatDelay: 2
//               })
//               .to(packet, {
//                 attr: { cx: x2, cy: y2 },
//                 duration: 2.5,
//                 ease: 'none',
//                 onUpdate: function() {
//                   const progress = this.progress();
//                   const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.3;
//                   packet.setAttribute('r', 5 * scale);
//                 }
//               })
//               .to(packet, { opacity: 0, duration: 0.3 })
//               .set(packet, { attr: { cx: x1, cy: y1 }, opacity: 1 });
//             };

//             // Define packet paths
//             const packetPaths = [
//               { x1: 120, y1: 150, x2: 280, y2: 100, color: '#06b6d4' },
//               { x1: 280, y1: 100, x2: 440, y2: 150, color: '#3b82f6' },
//               { x1: 440, y1: 150, x2: 600, y2: 100, color: '#8b5cf6' },
//               { x1: 600, y1: 100, x2: 760, y2: 150, color: '#10b981' },
//               { x1: 760, y1: 150, x2: 880, y2: 150, color: '#f59e0b' },
//               { x1: 120, y1: 150, x2: 280, y2: 200, color: '#06b6d4' },
//               { x1: 280, y1: 200, x2: 440, y2: 150, color: '#3b82f6' },
//               { x1: 440, y1: 150, x2: 600, y2: 200, color: '#8b5cf6' },
//               { x1: 600, y1: 200, x2: 760, y2: 150, color: '#10b981' },
//               { x1: 280, y1: 200, x2: 600, y2: 200, color: '#6366f1' },
//               { x1: 440, y1: 150, x2: 760, y2: 150, color: '#ec4899' }
//             ];

//             packetPaths.forEach((path, i) => {
//               for (let j = 0; j < 2; j++) {
//                 createDataPacket(path.x1, path.y1, path.x2, path.y2, i * 0.2 + j * 1, path.color);
//               }
//             });

//             // Animate node labels
//             gsap.from('.node-label', {
//               opacity: 0,
//               y: 10,
//               duration: 0.8,
//               stagger: 0.15,
//               delay: 1,
//               ease: 'power2.out'
//             });
//           }
//         });
//       }

//       // ============================================
//       // 4. TERMINAL TYPING ANIMATION
//       // ============================================
//       const terminalLines = [
//         { text: '> Scanning systems for vulnerabilities...', color: '#ef4444' },
//         { text: '> Deploying zero-trust security protocols...', color: '#f59e0b' },
//         { text: '> Optimising performance & cloud resources...', color: '#3b82f6' },
//         { text: '> Enabling proactive 24/7 monitoring...', color: '#8b5cf6' },
//         { text: '> Transformation complete. Growth unlocked.', color: '#10b981' }
//       ];

//       ScrollTrigger.create({
//         trigger: terminalRef.current,
//         start: 'top 70%',
//         onEnter: () => {
//           const tl = gsap.timeline();
          
//           terminalLines.forEach((line, i) => {
//             const lineElement = self.selector(`.terminal-line-${i}`)[0];
//             if (!lineElement) return;

//             const chars = lineElement.querySelectorAll('.terminal-char');
            
//             tl.to(chars, {
//               opacity: 1,
//               duration: 0.02,
//               stagger: 0.03,
//               ease: 'none',
//               onStart: () => {
//                 lineElement.style.color = line.color;
//               }
//             }, i * 1.2)
//             .to('.terminal-cursor', {
//               opacity: 0,
//               duration: 0.1
//             }, `>`)
//             .to('.terminal-cursor', {
//               opacity: 1,
//               duration: 0.1
//             }, `>`);
//           });

//           // Scan lines effect
//           gsap.to('.terminal-scanline', {
//             y: '100%',
//             duration: 2,
//             repeat: -1,
//             ease: 'none'
//           });
//         }
//       });

//       // ============================================
//       // 5. WORKFLOW TIMELINE
//       // ============================================
//       const timelineSteps = self.selector('.timeline-step');
//       const timelinePath = self.selector('.timeline-path')[0];

//       if (timelinePath) {
//         gsap.set(timelinePath, { drawSVG: '0%' });

//         ScrollTrigger.create({
//           trigger: timelineRef.current,
//           start: 'top 70%',
//           onEnter: () => {
//             gsap.to(timelinePath, {
//               drawSVG: '100%',
//               duration: 3,
//               ease: 'power2.inOut'
//             });

//             gsap.to(timelineSteps, {
//               opacity: 1,
//               y: 0,
//               scale: 1,
//               rotation: 0,
//               stagger: 0.4,
//               duration: 1,
//               ease: 'elastic.out(1, 0.6)'
//             });

//             gsap.to('.step-icon-1', {
//               color: '#10b981',
//               backgroundColor: 'rgba(16, 185, 129, 0.2)',
//               duration: 1.5,
//               delay: 1.5,
//               ease: 'power2.out'
//             });

//             gsap.to('.step-icon-4', {
//               scale: 1.2,
//               duration: 0.8,
//               yoyo: true,
//               repeat: -1,
//               ease: 'power1.inOut',
//               delay: 3
//             });
//           }
//         });
//       }

//       // ============================================
//       // 6. METRICS ANIMATION
//       // ============================================
//       ScrollTrigger.create({
//         trigger: '.metrics-grid',
//         start: 'top 80%',
//         onEnter: () => {
//           gsap.to('.bar-1', { width: '85%', duration: 2, ease: 'power3.out' });
//           gsap.to('.bar-2', { width: '99.9%', duration: 2.2, delay: 0.3, ease: 'power3.out' });
//           gsap.to('.bar-3', { width: '95%', duration: 2.4, delay: 0.6, ease: 'power3.out' });
          
//           gsap.fromTo('.metric-number', 
//             { textContent: 0 }, 
//             {
//               textContent: (i, el) => el.dataset.target,
//               duration: 2.5,
//               ease: 'power2.out',
//               snap: { textContent: 1 },
//               stagger: 0.3,
//               onUpdate: function() {
//                 this.targets().forEach(target => {
//                   const val = parseFloat(target.textContent);
//                   target.textContent = val % 1 === 0 ? val : val.toFixed(1);
//                   target.textContent += target.dataset.suffix || '%';
//                 });
//               }
//             }
//           );

//           const sparkles = self.selector('.metric-sparkle');
//           gsap.to(sparkles, {
//             scale: 1.5,
//             opacity: 0,
//             duration: 1,
//             stagger: 0.2,
//             repeat: -1,
//             repeatDelay: 2
//           });
//         }
//       });

//       // Benefits reveal
//       gsap.from('.benefit-item', {
//         opacity: 0,
//         x: -40,
//         stagger: 0.15,
//         duration: 0.8,
//         scrollTrigger: { trigger: '.benefits-grid', start: 'top 85%' }
//       });

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   // ============================================
//   // PARTICLE BURST ON CTA HOVER
//   // ============================================
//   const createParticles = () => {
//     const button = ctaButtonRef.current;
//     if (!button) return;

//     const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
//     const particleCount = 30;

//     for (let i = 0; i < particleCount; i++) {
//       const particle = document.createElement('div');
//       particle.className = 'absolute pointer-events-none w-2 h-2 rounded-full';
//       particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
//       particle.style.left = '50%';
//       particle.style.top = '50%';

//       button.appendChild(particle);

//       const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.3;
//       const velocity = 80 + Math.random() * 100;

//       gsap.to(particle, {
//         x: Math.cos(angle) * velocity,
//         y: Math.sin(angle) * velocity,
//         opacity: 0,
//         scale: 0,
//         duration: 1.2,
//         ease: 'power3.out',
//         onComplete: () => particle.remove()
//       });
//     }
//   };

//   // Rotating text animation
//   useEffect(() => {
//     gsap.fromTo('.rotating-text', 
//       { opacity: 0, y: 20, scale: 0.95 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
//     );
//   }, [currentText]);

//   return (
//     <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
//       {/* Background orbs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         {/* Badge */}
//         <div className="inline-block px-6 py-3 bg-white/10 rounded-full text-white font-medium mb-8 backdrop-blur-sm border border-white/20">
//           🇦🇺 Limited-Time Free IT Transformation Assessment
//         </div>

//         {/* Headline */}
//         <h2 
//           ref={headlineRef}
//           className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
//         >
//           <div className="mb-2">
//             <span className="word inline-block mr-2">Transform</span>
//             <span className="word inline-block mr-2">Your</span>
//             <span className="word inline-block mr-2">Victorian</span>
//             <span className="word inline-block mr-2">SMB</span>
//             <span className="word inline-block mr-2">IT</span>
//             <span className="word inline-block">Risks</span>
//           </div>
//           <div 
//             className="gradient-text bg-gradient-to-r from-cyan-400 via-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
//             style={{ backgroundSize: '200% 100%' }}
//           >
//             <span className="word inline-block mr-2">Into</span>
//             <span className="word inline-block mr-2">Reliable</span>
//             <span className="word inline-block mr-2">Business</span>
//             <span className="word inline-block">Growth</span>
//           </div>
//         </h2>

//         <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12">
//           Australian SMBs trust us to eliminate downtime, defeat cyber threats, and unlock growth — 
//           with transparent pricing and proven results.
//         </p>

//         {/* Rotating Text */}
//         <div className="relative h-16 sm:h-20 mb-12 flex items-center justify-center">
//           {rotatingTexts.map((item, i) => (
//             <p
//               key={i}
//               className={`rotating-text absolute inset-0 flex items-center justify-center font-bold text-cyan-300 ${
//                 item.style
//               } ${i === currentText ? 'block' : 'hidden'}`}
//             >
//               {item.text}
//             </p>
//           ))}
//         </div>

//         {/* LOGO SHOWCASE - Horizontal Single Row */}
//         <div ref={logosRef} className="mb-16">
//           <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">Comprehensive IT Solutions</h3>
//           <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            
//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Cloud className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-cyan-300 font-medium">Cloud</p>
//             </div>

//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Activity className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-blue-300 font-medium">Networking</p>
//             </div>

//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Boxes className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-orange-300 font-medium">M365</p>
//             </div>

//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Server className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-purple-300 font-medium">Azure</p>
//             </div>

//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Shield className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-red-300 font-medium">Security</p>
//             </div>

//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Code className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-green-300 font-medium">Software</p>
//             </div>

//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Cpu className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-indigo-300 font-medium">Hardware</p>
//             </div>

//             <div className="logo-item opacity-0 flex flex-col items-center gap-2">
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-pink-500/10 border-2 border-pink-500/30 flex items-center justify-center backdrop-blur-sm">
//                 <Layers className="logo-icon w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
//               </div>
//               <p className="text-xs sm:text-sm text-pink-300 font-medium">Infrastructure</p>
//             </div>
//           </div>
//         </div>

//         {/* LIVE DATA FLOW NETWORK */}
//         <div ref={networkRef} className="relative mb-20 h-64 sm:h-80 max-w-6xl mx-auto">
//           <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">Live Data Flow & Monitoring Network</h3>
          
//           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300">
//             <defs>
//               <filter id="packet-glow">
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                 <feMerge>
//                   <feMergeNode in="coloredBlur"/>
//                   <feMergeNode in="SourceGraphic"/>
//                 </feMerge>
//               </filter>
//             </defs>
            
//             {/* Network Lines */}
//             <line className="network-line stroke-cyan-500 stroke-2" x1="120" y1="150" x2="280" y2="100" />
//             <line className="network-line stroke-blue-500 stroke-2" x1="280" y1="100" x2="440" y2="150" />
//             <line className="network-line stroke-purple-500 stroke-2" x1="440" y1="150" x2="600" y2="100" />
//             <line className="network-line stroke-green-500 stroke-2" x1="600" y1="100" x2="760" y2="150" />
//             <line className="network-line stroke-orange-500 stroke-2" x1="760" y1="150" x2="880" y2="150" />
//             <line className="network-line stroke-cyan-500/60 stroke-2" x1="120" y1="150" x2="280" y2="200" />
//             <line className="network-line stroke-blue-500/60 stroke-2" x1="280" y1="200" x2="440" y2="150" />
//             <line className="network-line stroke-purple-500/60 stroke-2" x1="440" y1="150" x2="600" y2="200" />
//             <line className="network-line stroke-green-500/60 stroke-2" x1="600" y1="200" x2="760" y2="150" />
//             <line className="network-line stroke-indigo-500/60 stroke-2" x1="280" y1="200" x2="600" y2="200" />
//             <line className="network-line stroke-pink-500/60 stroke-2" x1="440" y1="150" x2="760" y2="150" />
//           </svg>

//           {/* Network Nodes */}
//           <div className="network-node absolute top-1/2 left-[12%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/20 border-3 border-cyan-500 flex items-center justify-center backdrop-blur-sm">
//               <Server className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
//             </div>
//             <p className="node-label mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-cyan-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full">
//               Edge Server
//             </p>
//           </div>

//           <div className="network-node absolute top-[33%] left-[28%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-500/20 border-3 border-blue-500 flex items-center justify-center backdrop-blur-sm">
//               <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
//             </div>
//             <p className="node-label mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-blue-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
//               Firewall
//             </p>
//           </div>

//           <div className="network-node absolute top-1/2 left-[44%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-500/20 border-3 border-purple-500 flex items-center justify-center backdrop-blur-sm">
//               <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
//             </div>
//             <p className="node-label mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-purple-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
//               Monitoring Hub
//             </p>
//           </div>

//           <div className="network-node absolute top-[33%] left-[60%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-500/20 border-3 border-green-500 flex items-center justify-center backdrop-blur-sm">
//               <Database className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
//             </div>
//             <p className="node-label mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-green-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
//               Database
//             </p>
//           </div>

//           <div className="network-node absolute top-1/2 left-[76%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-500/20 border-3 border-orange-500 flex items-center justify-center backdrop-blur-sm">
//               <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
//             </div>
//             <p className="node-label mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-orange-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
//               Cloud Storage
//             </p>
//           </div>

//           <div className="network-node absolute top-1/2 right-[12%] translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/20 border-3 border-cyan-500 flex items-center justify-center backdrop-blur-sm">
//               <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
//             </div>
//             <p className="node-label mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-cyan-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
//               AI Engine
//             </p>
//           </div>

//           <div className="network-node absolute top-[67%] left-[28%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-center backdrop-blur-sm">
//               <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
//             </div>
//             <p className="node-label mt-1 sm:mt-2 text-xs font-semibold text-indigo-300 bg-slate-900/80 px-2 py-1 rounded-full">
//               Encryption
//             </p>
//           </div>

//           <div className="network-node absolute top-[67%] left-[60%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex flex-col items-center">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-pink-500/20 border-2 border-pink-500 flex items-center justify-center backdrop-blur-sm">
//               <HardDrive className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
//             </div>
//             <p className="node-label mt-1 sm:mt-2 text-xs font-semibold text-pink-300 bg-slate-900/80 px-2 py-1 rounded-full">
//               Backup
//             </p>
//           </div>
//         </div>

//         {/* WORKFLOW TIMELINE */}
//         <div ref={timelineRef} className="relative mb-20">
//           <h3 className="text-2xl sm:text-3xl font-bold text-white mb-12">Your IT Transformation Journey</h3>
//           <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
//             <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1000 200">
//               <path 
//                 className="timeline-path stroke-cyan-500/50 stroke-[3]" 
//                 d="M 150,100 Q 350,50 500,100 T 850,100" 
//                 fill="none"
//                 strokeLinecap="round"
//               />
//             </svg>

//             <div className="timeline-step opacity-0 translate-y-10 scale-75 rotate-12 z-10">
//               <div className="step-icon-1 p-6 rounded-2xl bg-red-500/20 text-red-400 border-2 border-red-500 transition-all duration-1000">
//                 <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16" />
//               </div>
//               <p className="mt-4 text-base sm:text-lg font-semibold text-white">IT Fires & Risks</p>
//             </div>

//             <div className="timeline-step opacity-0 translate-y-10 scale-75 -rotate-6 z-10">
//               <div className="p-6 rounded-2xl bg-blue-500/20 text-blue-400 border-2 border-blue-500">
//                 <Phone className="w-12 h-12 sm:w-16 sm:h-16" />
//               </div>
//               <p className="mt-4 text-base sm:text-lg font-semibold text-white">Free Assessment</p>
//             </div>

//             <div className="timeline-step opacity-0 translate-y-10 scale-75 rotate-6 z-10">
//               <div className="p-6 rounded-2xl bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500">
//                 <Shield className="w-12 h-12 sm:w-16 sm:h-16" />
//               </div>
//               <p className="mt-4 text-base sm:text-lg font-semibold text-white">Proactive Security</p>
//             </div>

//             <div className="timeline-step opacity-0 translate-y-10 scale-75 -rotate-12 z-10">
//               <div className="step-icon-4 p-6 rounded-2xl bg-green-500/20 text-green-400 border-2 border-green-500">
//                 <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16" />
//               </div>
//               <p className="mt-4 text-base sm:text-lg font-semibold text-white">Reliable Growth</p>
//             </div>
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

//             <div className="terminal-scanline absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

//             {[
//               { text: '> Scanning systems for vulnerabilities...', color: '#ef4444' },
//               { text: '> Deploying zero-trust security protocols...', color: '#f59e0b' },
//               { text: '> Optimising performance & cloud resources...', color: '#3b82f6' },
//               { text: '> Enabling proactive 24/7 monitoring...', color: '#8b5cf6' },
//               { text: '> Transformation complete. Growth unlocked.', color: '#10b981' }
//             ].map((line, i) => (
//               <p key={i} className={`terminal-line-${i} mb-2 text-sm sm:text-lg`} style={{ color: '#94a3b8' }}>
//                 {line.text.split('').map((char, j) => (
//                   <span key={j} className="terminal-char opacity-0">{char}</span>
//                 ))}
//               </p>
//             ))}
            
//             <span className="terminal-cursor inline-block w-2 h-5 bg-green-400 ml-1" />
//           </div>
//         </div>

//         {/* METRICS */}
//         <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16">
//           <div className="relative p-6 sm:p-8 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden group hover:border-cyan-500/50 transition-all">
//             <div className="metric-sparkle absolute top-4 right-4 w-8 h-8 bg-cyan-400 rounded-full blur-md opacity-50" />
//             <p className="text-cyan-400 text-base sm:text-lg mb-4 font-semibold">Average Revenue Saved</p>
//             <div className="relative h-10 sm:h-12 bg-slate-800 rounded-full overflow-hidden mb-4">
//               <div className="bar-1 absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 w-0 rounded-full shadow-lg shadow-cyan-500/50" />
//             </div>
//             <p className="text-4xl sm:text-5xl font-black text-white metric-number" data-target="85" data-suffix="%">0%</p>
//           </div>

//           <div className="relative p-6 sm:p-8 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden group hover:border-blue-500/50 transition-all">
//             <div className="metric-sparkle absolute top-4 right-4 w-8 h-8 bg-blue-400 rounded-full blur-md opacity-50" />
//             <p className="text-blue-400 text-base sm:text-lg mb-4 font-semibold">Guaranteed Uptime</p>
//             <div className="relative h-10 sm:h-12 bg-slate-800 rounded-full overflow-hidden mb-4">
//               <div className="bar-2 absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 w-0 rounded-full shadow-lg shadow-blue-500/50" />
//             </div>
//             <p className="text-4xl sm:text-5xl font-black text-white metric-number" data-target="99.9" data-suffix="%">0%</p>
//           </div>

//           <div className="relative p-6 sm:p-8 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden group hover:border-green-500/50 transition-all">
//             <div className="metric-sparkle absolute top-4 right-4 w-8 h-8 bg-green-400 rounded-full blur-md opacity-50" />
//             <p className="text-green-400 text-base sm:text-lg mb-4 font-semibold">Risk Reduction</p>
//             <div className="relative h-10 sm:h-12 bg-slate-800 rounded-full overflow-hidden mb-4">
//               <div className="bar-3 absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 w-0 rounded-full shadow-lg shadow-green-500/50" />
//             </div>
//             <p className="text-4xl sm:text-5xl font-black text-white metric-number" data-target="95" data-suffix="%">0%</p>
//           </div>
//         </div>

//         {/* BENEFITS */}
//         <div className="benefits-grid flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-16">
//           <div className="benefit-item flex items-center gap-3 sm:gap-4 text-white text-sm sm:text-base lg:text-lg backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/10">
//             <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
//             <span>Free in-depth security & performance assessment</span>
//           </div>
//           <div className="benefit-item flex items-center gap-3 sm:gap-4 text-white text-sm sm:text-base lg:text-lg backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/10">
//             <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
//             <span>Clear report within 48 hours</span>
//           </div>
//           <div className="benefit-item flex items-center gap-3 sm:gap-4 text-white text-sm sm:text-base lg:text-lg backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/10">
//             <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 flex-shrink-0" />
//             <span>No obligation — just actionable insights</span>
//           </div>
//         </div>

//         {/* CTAs */}
//         <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
//           <RouterLink
//             ref={ctaButtonRef}
//             to="/contact"
//             onMouseEnter={createParticles}
//             className="relative group inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl lg:text-2xl font-bold text-white rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-cyan-500/50"
//           >
//             <span className="relative z-10">Book Your Free Assessment</span>
//             <ArrowRight className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform" />
//             <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//           </RouterLink>

//           <a
//             href="tel:1300XXXXXX"
//             className="inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl lg:text-2xl font-bold text-cyan-300 rounded-2xl border-2 sm:border-3 border-cyan-500/60 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 hover:border-cyan-400 transition-all hover:scale-105"
//           >
//             <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
//             <span className="hidden sm:inline">Call 1300 XXX XXX Now</span>
//             <span className="sm:hidden">Call Now</span>
//           </a>
//         </div>

//         <p className="mt-12 text-slate-400 text-base sm:text-lg">
//           ⭐ Trusted by 150+ Victorian & Tasmanian businesses
//         </p>
//       </div>
//     </section>
//   );
// };

// export default CTASection;




// // src/components/cta/CTASection.jsx
// import React, { useState, useEffect, useRef } from 'react';

// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence, useInView } from 'framer-motion';
// const MotionLink = motion.create(Link);

// import { ArrowRight, Phone, Shield, Clock, Zap } from 'lucide-react';
// //import LottieAnimation from '../ui/LottieAnimation';

// const CTASection = () => {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

//   const benefits = [
//     { icon: Shield, text: 'Free security assessment included' },
//     { icon: Clock, text: 'Results within 48 hours' },
//     { icon: Zap, text: 'No obligation, no pressure' }
//   ];

//   const rotatingTexts = [
//     'Stop fearing ransomware attacks.',
//     'Stop losing revenue to IT downtime.',
//     'Stop wasting time on IT fires.',
//     'Stop settling for slow support.',
//   ];

//   const metrics = [
//     { end: 150, suffix: '+', label: 'Victorian businesses' },
//     { end: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
//     { end: 98, suffix: '%', label: 'Customer satisfaction' },
//   ];

//   const lotties = [
//     '/assets/lottie/animation1_IsometricDataAnalysis.json',
//     '/assets/lottie/animation2_CloudService.json',
//     '/assets/lottie/animation3_CyberSecurity.json',
//   ];

//   const [currentText, setCurrentText] = useState(0);
//   const [currentLottie, setCurrentLottie] = useState(0);

//   // Rotate rotating text
//   useEffect(() => {
//     if (isInView) {
//       const interval = setInterval(() => {
//         setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
//       }, 4000);
//       return () => clearInterval(interval);
//     }
//   }, [isInView]);

//   // Rotate Lottie
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentLottie((prev) => (prev + 1) % lotties.length);
//     }, 7000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600">
//         <div 
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//           }}
//         />
//         {/* Orbs */}
//         <motion.div
//           animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
//           transition={{ duration: 20, repeat: Infinity }}
//           className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
//           transition={{ duration: 25, repeat: Infinity }}
//           className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
//         />
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Badge */}
//           <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
//             Limited Time Offer
//           </span>



// <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//   <Link to="/contact" className="cta-button">
//     Book Free Assessment
//   </Link>
// </motion.div>



//           {/* Subheadline */}
//           <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
//             Discover vulnerabilities, inefficiencies, and opportunities in your current IT setup. 
//             No cost, no obligation – just clarity.
//           </p>

//           {/* Rotating text – simple fade, no Typed.js */}
//           <AnimatePresence mode="wait">
//             <motion.p
//               key={currentText}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.5 }}
//               className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed"
//             >
//               <span className="text-blue-400 font-medium">
//                 {rotatingTexts[currentText]}
//               </span>
//             </motion.p>
//           </AnimatePresence>

//           {/* Metrics – CountUp only when in view */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//             {metrics.map((metric, i) => (
//               <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
//                 <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-1">
//                   {isInView ? (
//                     <CountUp 
//                       start={0}
//                       end={metric.end}
//                       duration={2.5}
//                       decimals={metric.decimals || 0}
//                       suffix={metric.suffix}
//                       delay={0.3 + i * 0.4}
//                     />
//                   ) : (
//                     '0' + (metric.suffix || '')
//                   )}
//                 </div>
//                 <div className="text-sm sm:text-base text-slate-400 leading-tight">
//                   {metric.label}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Lottie – zoomed out */}
//           <div className="
//             relative w-full aspect-[4/3] max-h-[380px] lg:max-h-[440px] mx-auto
//             overflow-hidden rounded-2xl border border-white/10 shadow-2xl
//             bg-slate-900/70 p-6 lg:p-10 mb-10
//           ">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentLottie}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 1.2, ease: 'easeInOut' }}
//                 className="w-full h-full flex items-center justify-center"
//               >

//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Benefits */}
//           <div className="flex flex-wrap justify-center gap-6 mb-10">
//             {benefits.map((benefit, i) => (
//               <div key={i} className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
//                 <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6" />
//                 <span>{benefit.text}</span>
//               </div>
//             ))}
//           </div>

//           {/* CTAs */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

//             {/* Primary CTA – MotionLink */}
//             <MotionLink
//               to="/contact"
//               whileHover={{ scale: 1.06, y: -3 }}
//               whileTap={{ scale: 0.97 }}
//               className="
//                 relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4
//                 font-bold text-lg text-white rounded-2xl transition-all
//                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
//                 shadow-[0_0_25px_rgba(139,92,246,0.45)]
//                 hover:shadow-[0_0_45px_rgba(236,72,153,0.65)]
//                 hover:brightness-110
//                 overflow-hidden group
//               "
//             >
//               {/* Text + Icon */}
//               <span className="relative z-10 flex items-center gap-3">
//                 Book Free Assessment
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </span>

//               {/* Glow aura */}
//               <span
//                 className="
//                   absolute inset-0 rounded-2xl opacity-60 blur-xl
//                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
//                   animate-pulse
//                 "
//               ></span>

//               {/* Border ring */}
//               <span
//                 className="
//                   absolute inset-0 rounded-2xl border border-white/20
//                   group-hover:border-white/40 transition-all
//                 "
//               ></span>
//             </MotionLink>

//             {/* Secondary CTA – Phone */}
//             <motion.a
//               href="tel:1300000000"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.97 }}
//               className="
//                 relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4
//                 font-bold text-lg text-white rounded-2xl transition-all
//                 bg-white/10 border border-white/20
//                 hover:bg-white/20 hover:border-white/30
//                 shadow-[0_0_20px_rgba(255,255,255,0.15)]
//                 overflow-hidden
//               "
//             >
//               <Phone className="w-5 h-5" />
//               Call 1300 XXX XXX

//               {/* Soft glow */}
//               <span
//                 className="
//                   absolute inset-0 rounded-2xl opacity-40 blur-xl
//                   bg-white/20
//                 "
//               ></span>
//             </motion.a>

//           </div>


//           {/* Trust */}
//           <p className="mt-8 text-white/60 text-sm">
//             Trusted by 150+ Victorian businesses
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CTASection;