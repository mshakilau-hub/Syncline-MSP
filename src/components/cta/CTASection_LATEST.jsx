import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, CheckCircle, Shield, Zap, Clock } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    { icon: Shield, text: 'Free security assessment included' },
    { icon: Clock, text: 'Results within 48 hours' },
    { icon: Zap, text: 'No obligation, no pressure' }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600">
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        {/* Animated orbs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
            Limited Time Offer
          </span>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6">
            Get Your Free IT Health Check
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Discover vulnerabilities, inefficiencies, and opportunities in your current IT setup. 
            No cost, no obligation – just clarity.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <benefit.icon className="w-5 h-5" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
            >
              Book Free Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="tel:1300000000"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call 1300 XXX XXX
            </motion.a>
          </div>

          {/* Trust indicator */}
          <p className="mt-8 text-white/60 text-sm">
            Trusted by 150+ Victorian businesses
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;