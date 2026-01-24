//C:\Projects\Web\shakil-it-solutions\src\components\security\SecuritySection.jsx
// src/components/security/SecuritySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
// Individual Lucide icon imports (recommended for performance)
import Shield from '@lucide/shield';
import Lock from '@lucide/lock';
import Eye from '@lucide/eye';
import AlertTriangle from '@lucide/alert-triangle';
import Server from '@lucide/server';
import Database from '@lucide/database';
import CheckCircle from '@lucide/check-circle';
import FileCheck from '@lucide/file-check';
import Users from '@lucide/users';
import Wifi from '@lucide/wifi';
import ArrowRight from '@lucide/arrow-right';
import GlassCard from '../ui/GlassCard';


const SecuritySection = () => {
  const securityLayers = [
    {
      icon: Lock,
      title: 'Zero-Trust Access',
      description: 'Every access request is verified. No implicit trust, even inside your network.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Shield,
      title: 'Endpoint Protection',
      description: 'Advanced threat detection on every device. Ransomware doesn\'t stand a chance.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: Eye,
      title: '24/7 Monitoring',
      description: 'Our systems watch for threats around the clock. We catch issues before you notice.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      icon: Database,
      title: 'Automated Backups',
      description: 'Multiple backup layers with tested restore procedures. Your data is always safe.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    {
      icon: FileCheck,
      title: 'Compliance Ready',
      description: 'Meet industry standards with documented policies and regular security audits.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      icon: Users,
      title: 'Staff Training',
      description: 'Your team is your first line of defense. We train them to spot threats.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    }
  ];

  const stats = [
    { value: '0', label: 'Ransomware Incidents', sublabel: 'across all clients' },
    { value: '99.9%', label: 'Threat Block Rate', sublabel: 'before reaching endpoints' },
    { value: '< 15min', label: 'Incident Response', sublabel: 'for critical threats' },
    { value: '3-2-1', label: 'Backup Strategy', sublabel: 'copies, locations, offsite' }
  ];

  return (
    <section id="security" className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/5 to-transparent" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-4">
              Security-First Approach
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6" id="security-heading">
              Protection That{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Never Sleeps
              </span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Small businesses are the #1 target for cyber attacks. We build multiple layers of defense around your business, so you can focus on growth instead of worrying about threats.
            </p>

            {/* Alert Banner */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Did you know?</h4>
                <p className="text-sm text-slate-400">
                  43% of cyber attacks target small businesses, and 60% of those attacked go out of business within 6 months.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <GlassCard key={i} className="p-6 text-center" delay={i * 0.1}>
                <div className="text-3xl lg:text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="font-semibold text-slate-300 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sublabel}</div>
              </GlassCard>
            ))}
          </motion.div>
        </div>

        {/* Security Layers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityLayers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-6 h-full group">
                <div className={`w-12 h-12 rounded-xl ${layer.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <layer.icon className={`w-6 h-6 ${layer.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
                <p className="text-slate-400">{layer.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* VPN Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 lg:p-12" gradient>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 rounded-full mb-4">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Custom Built Solution</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  Enterprise VPN, Without the Complexity
                </h3>
                <p className="text-lg text-slate-400 mb-6">
                  Our custom VPN system gives your team secure access from anywhere, without the steep learning curve or licensing costs of enterprise VPN solutions.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'One-click connection for your team',
                    'Works on all devices - Windows, Mac, iOS, Android',
                    'Split tunneling for optimal performance',
                    'Detailed access logs and reporting'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all group"
                >
                  Get a Security Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* VPN Visual */}
              <div className="relative">
                <div className="relative bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 font-medium">VPN Connected</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-400">Status</span>
                      <span className="text-white font-medium">Protected</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-400">Encryption</span>
                      <span className="text-white font-medium">AES-256</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-400">Location</span>
                      <span className="text-white font-medium">Melbourne, VIC</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-400">Devices</span>
                      <span className="text-white font-medium">12 Connected</span>
                    </div>
                  </div>
                </div>

                {/* Floating Security Icons */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 p-3 bg-blue-600 rounded-xl shadow-lg"
                >
                  <Lock className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 p-3 bg-green-600 rounded-xl shadow-lg"
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;