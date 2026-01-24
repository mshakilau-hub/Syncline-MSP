// src/components/monitoring/MonitoringDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const MotionLink = motion.create(Link);

// Individual Lucide icon imports (tree-shake friendly + alias)
import Shield from '@lucide/shield';
import { AnimatePresence } from 'framer-motion';
import Zap from '@lucide/zap';
import TrendingUp from '@lucide/trending-up';
import Users from '@lucide/users';
import ArrowUp from '@lucide/arrow-up';
import ArrowDown from '@lucide/arrow-down';
import Activity from '@lucide/activity';
import Server from '@lucide/server';
import Wifi from '@lucide/wifi';
import CheckCircle from '@lucide/check-circle';

import GlassCard from '../ui/GlassCard';

const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState({
    threats: 3,
    uptime: 99.94,
    response: 1.8,
    protected: 147
  });

  const [activity, setActivity] = useState([
    { time: 'Just now', event: 'Security scan completed', status: 'success' },
    { time: '2m ago', event: 'Backup verified', status: 'success' },
    { time: '5m ago', event: 'Phishing attempt blocked', status: 'warning' },
    { time: '12m ago', event: 'System update applied', status: 'success' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        threats: Math.max(0, prev.threats + Math.floor(Math.random() * 3 - 1)),
        uptime: Math.min(100, Math.max(99.5, prev.uptime + (Math.random() * 0.1 - 0.05))),
        response: Math.max(1, Math.min(3, prev.response + (Math.random() * 0.4 - 0.2))),
        protected: prev.protected + Math.floor(Math.random() * 2)
      }));

      // Occasionally add new activity (simulated live feed)
      if (Math.random() > 0.7) {
        setActivity(prev => [
          {
            time: 'Just now',
            event: ['Threat blocked', 'Scan completed', 'Backup successful'][Math.floor(Math.random() * 3)],
            status: Math.random() > 0.2 ? 'success' : 'warning'
          },
          ...prev.slice(0, 5) // Keep only last 6 items
        ]);
      }
    }, 8000); // Slower interval = better performance

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: 'Threats Blocked Today', 
      value: metrics.threats, 
      icon: Shield, 
      color: 'from-red-500 to-orange-500',
      trend: 'neutral',
      detail: 'Real-time protection'
    },
    { 
      label: 'System Uptime', 
      value: `${metrics.uptime.toFixed(2)}%`, 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-500',
      trend: 'up',
      detail: 'Last 30 days'
    },
    { 
      label: 'Avg Response Time', 
      value: `${metrics.response.toFixed(1)} hrs`, 
      icon: Zap, 
      color: 'from-blue-500 to-cyan-500',
      trend: 'down',
      detail: 'Target: < 2 hours'
    },
    { 
      label: 'Businesses Protected', 
      value: metrics.protected, 
      icon: Users, 
      color: 'from-purple-500 to-pink-500',
      trend: 'up',
      detail: 'Across Victoria'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header – responsive typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs sm:text-sm font-medium mb-4">
            Live Dashboard
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 lg:mb-6 leading-tight text-balance">
            Real-Time{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Protection
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
            See how we monitor and protect Victorian SMBs around the clock.
          </p>
        </motion.div>

        {/* Stats Grid – responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <GlassCard className="p-5 sm:p-6 lg:p-7 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {stat.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-400" />}
                    {stat.trend === 'down' && <ArrowDown className="w-4 h-4 text-green-400" />}
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-500 hidden sm:inline">Live</span>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm sm:text-base font-medium text-slate-300 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.detail}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Activity Feed & Systems Status – responsive grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6 lg:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white">Recent Activity</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Live feed</span>
                </div>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {activity.map((item, i) => (
                    <motion.div
                      key={`${item.event}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className={`flex items-start gap-4 p-4 rounded-xl ${
                        item.status === 'success' ? 'bg-green-900/10' : 'bg-amber-900/10'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg ${
                        item.status === 'success' ? 'bg-green-500/20' : 'bg-amber-500/20'
                      }`}>
                        <CheckCircle className={`w-5 h-5 ${
                          item.status === 'success' ? 'text-green-400' : 'text-amber-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.event}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </GlassCard>
          </motion.div>

          {/* Systems Status */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6 lg:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white">Systems Status</h3>
                <span className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
                  All Systems Operational
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Cloud Infrastructure', icon: Server, status: 'operational', uptime: '99.99%' },
                  { name: 'Security Gateway', icon: Shield, status: 'operational', uptime: '100%' },
                  { name: 'Backup Systems', icon: Activity, status: 'operational', uptime: '99.97%' },
                  { name: 'VPN Network', icon: Wifi, status: 'operational', uptime: '99.95%' }
                ].map((system, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <system.icon className="w-5 h-5 text-slate-400" />
                      <span className="text-white font-medium text-sm lg:text-base">{system.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm text-slate-400">{system.uptime}</span>
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center mt-20">
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative inline-flex items-center gap-4 px-12 py-5
              font-bold text-xl text-white rounded-2xl
              bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
              shadow-[0_0_35px_rgba(6,182,212,0.45)]
              hover:shadow-[0_0_55px_rgba(6,182,212,0.75)]
              transition-all duration-300
              overflow-hidden group
            "
          >
            {/* Text */}
            <span className="relative z-10 flex items-center gap-3">
              Book Your Monitoring Demo
              <ArrowUp className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>

            {/* Animated Glow Layer */}
            <span
              className="
                absolute inset-0 rounded-2xl opacity-70 blur-2xl
                bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
                animate-pulse
              "
            ></span>

            {/* Subtle Border */}
            <span
              className="
                absolute inset-0 rounded-2xl border border-white/20
                group-hover:border-white/40 transition-all
              "
            ></span>
          </MotionLink>
        </div>
    </section>
    
  );
};

export default MonitoringDashboard;



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Shield, Zap, TrendingUp, Users, ArrowUp, ArrowDown,
//   Activity, Server, Wifi, CheckCircle
// } from 'lucide-react';
// import GlassCard from '../ui/GlassCard';

// const MonitoringDashboard = () => {
//   const [metrics, setMetrics] = useState({
//     threats: 3,
//     uptime: 99.94,
//     response: 1.8,
//     protected: 147
//   });

//   const [activity, setActivity] = useState([
//     { time: 'Just now', event: 'Security scan completed', status: 'success' },
//     { time: '2m ago', event: 'Backup verified', status: 'success' },
//     { time: '5m ago', event: 'Phishing attempt blocked', status: 'warning' },
//     { time: '12m ago', event: 'System update applied', status: 'success' }
//   ]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMetrics(prev => ({
//         threats: Math.max(0, prev.threats + Math.floor(Math.random() * 3 - 1)),
//         uptime: Math.min(100, Math.max(99.5, prev.uptime + (Math.random() * 0.1 - 0.05))),
//         response: Math.max(1, Math.min(3, prev.response + (Math.random() * 0.4 - 0.2))),
//         protected: prev.protected + Math.floor(Math.random() * 2)
//       }));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const stats = [
//     { 
//       label: 'Threats Blocked Today', 
//       value: metrics.threats, 
//       icon: Shield, 
//       color: 'from-red-500 to-orange-500',
//       trend: 'neutral',
//       detail: 'Real-time protection'
//     },
//     { 
//       label: 'System Uptime', 
//       value: `${metrics.uptime.toFixed(2)}%`, 
//       icon: TrendingUp, 
//       color: 'from-green-500 to-emerald-500',
//       trend: 'up',
//       detail: 'Last 30 days'
//     },
//     { 
//       label: 'Avg Response Time', 
//       value: `${metrics.response.toFixed(1)}h`, 
//       icon: Zap, 
//       color: 'from-blue-500 to-cyan-500',
//       trend: 'down',
//       detail: 'Target: < 2 hours'
//     },
//     { 
//       label: 'Businesses Protected', 
//       value: metrics.protected, 
//       icon: Users, 
//       color: 'from-purple-500 to-pink-500',
//       trend: 'up',
//       detail: 'Across Victoria'
//     }
//   ];

//   return (
//     <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center max-w-3xl mx-auto mb-16"
//         >
//           <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-4">
//             Live Dashboard
//           </span>
//           <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
//             Real-Time{' '}
//             <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
//               Protection
//             </span>
//           </h2>
//           <p className="text-lg text-slate-400">
//             See how we monitor and protect Victorian SMBs around the clock.
//           </p>
//         </motion.div>

//         {/* Stats Grid */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {stats.map((stat, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//             >
//               <GlassCard className="p-6 group">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
//                     <stat.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div className="flex items-center gap-1">
//                     {stat.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-400" />}
//                     {stat.trend === 'down' && <ArrowDown className="w-4 h-4 text-green-400" />}
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                     <span className="text-xs text-slate-500">Live</span>
//                   </div>
//                 </div>
//                 <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
//                 <div className="text-slate-400 font-medium mb-1">{stat.label}</div>
//                 <div className="text-xs text-slate-500">{stat.detail}</div>
//               </GlassCard>
//             </motion.div>
//           ))}
//         </div>

//         {/* Activity Feed & Systems Status */}
//         <div className="grid lg:grid-cols-2 gap-6">
//           {/* Activity Feed */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <GlassCard className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-bold text-white">Recent Activity</h3>
//                 <div className="flex items-center gap-2">
//                   <Activity className="w-4 h-4 text-green-400" />
//                   <span className="text-sm text-slate-400">Live feed</span>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 {activity.map((item, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.1 }}
//                     className="flex items-start gap-4 p-3 bg-white/5 rounded-xl"
//                   >
//                     <div className={`p-2 rounded-lg ${
//                       item.status === 'success' ? 'bg-green-500/10' : 'bg-amber-500/10'
//                     }`}>
//                       <CheckCircle className={`w-4 h-4 ${
//                         item.status === 'success' ? 'text-green-400' : 'text-amber-400'
//                       }`} />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-white font-medium">{item.event}</p>
//                       <p className="text-xs text-slate-500">{item.time}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </GlassCard>
//           </motion.div>

//           {/* Systems Status */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <GlassCard className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-bold text-white">Systems Status</h3>
//                 <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
//                   All Systems Operational
//                 </span>
//               </div>
//               <div className="space-y-4">
//                 {[
//                   { name: 'Cloud Infrastructure', icon: Server, status: 'operational', uptime: '99.99%' },
//                   { name: 'Security Gateway', icon: Shield, status: 'operational', uptime: '100%' },
//                   { name: 'Backup Systems', icon: Activity, status: 'operational', uptime: '99.97%' },
//                   { name: 'VPN Network', icon: Wifi, status: 'operational', uptime: '99.95%' }
//                 ].map((system, i) => (
//                   <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
//                     <div className="flex items-center gap-3">
//                       <system.icon className="w-5 h-5 text-slate-400" />
//                       <span className="text-white font-medium">{system.name}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className="text-sm text-slate-400">{system.uptime}</span>
//                       <div className="w-2 h-2 bg-green-500 rounded-full" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MonitoringDashboard;