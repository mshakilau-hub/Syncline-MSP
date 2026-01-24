// src/components/navbar/MegaMenu.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom'; // ← must import this

import {
  Server, Cloud, Shield, Zap, Database, Users, MapPin, FileCheck,
  Monitor, Phone, BookOpen, ArrowRight, CheckCircle
} from 'lucide-react';

const MegaMenu = ({ type, isOpen, onClose }) => {
  const servicesContent = {
    title: 'Our Services',
    description: 'Enterprise-grade IT solutions tailored for Victorian SMBs',
    items: [
      {
        icon: Server,
        title: 'Managed IT Support',
        description: '24/7 monitoring, helpdesk, and proactive maintenance',
        to: '/managed-it',  // ← changed to real route
        features: ['Remote & Onsite Support', 'System Monitoring', 'Patch Management']
      },
      {
        icon: Cloud,
        title: 'Cloud Solutions',
        description: 'Azure Virtual Desktop, Microsoft 365, and cloud migrations',
        to: '/cloud',       // ← real route
        features: ['Azure AVD Setup', 'M365 Administration', 'Cloud Backup']
      },
      {
        icon: Shield,
        title: 'Cybersecurity',
        description: 'Zero-trust security, VPN, and threat protection',
        to: '/security',    // ← real route
        features: ['Custom VPN System', 'Endpoint Protection', 'Security Audits']
      },
      {
        icon: Zap,
        title: 'Automation & AI',
        description: 'Python scripting, workflow automation, and custom tools',
        to: '/automation',
        features: ['Process Automation', 'Custom Integrations', 'AI Solutions']
      }
    ],
    cta: {
      title: 'Not sure what you need?',
      description: 'Get a free IT assessment and custom recommendation',
      buttonText: 'Book Free Consultation',
      to: '/contact'      // ← also changed to real route
    }
  };

  const resourcesContent = {
    title: 'Resources',
    description: 'Learn more about our approach and coverage',
    items: [
      {
        icon: BookOpen,
        title: 'Case Studies',
        description: 'Real results from Victorian businesses',
        to: '/case-studies'
      },
      {
        icon: MapPin,
        title: 'Service Areas',
        description: 'Melbourne, Geelong, Ballarat, Bendigo & more',
        to: '/areas'
      },
      {
        icon: FileCheck,
        title: 'IT Health Check',
        description: 'Free assessment of your current IT setup',
        to: '/it-health-check'
      },

      {
        icon: Monitor, // or any icon you prefer
        title: 'Monitoring Dashboard',
        description: 'Real‑time system visibility & alerts',
        to: '/monitoring-dashboard'
      },
      {
        icon: Users,
        title: 'About Shakil',
        description: 'Meet your dedicated IT partner',
        to: '/about-shakil'
      }
    ],
    highlight: {
      title: 'Customer Portal',
      description: 'Access your tickets, documents, and IT status anytime',
      icon: Database,
      to: '/customer-portal'
    }
  };


  const content = type === 'services' ? servicesContent : resourcesContent;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            w-full
            bg-gradient-to-b from-slate-950 to-slate-900
            border-t-4 border-blue-600/70
            shadow-2xl shadow-black/60
            rounded-b-2xl
            overflow-hidden
            relative z-[9999]
          "
          role="menu"
          aria-label={`${type} mega menu`}
          onMouseLeave={onClose}
        >
          <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                {content.title}
              </h3>
              <p className="mt-2 text-lg text-slate-300 max-w-3xl">
                {content.description}
              </p>
            </div>

            {/* Services Layout */}
            {type === 'services' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {content.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={onClose}
                        className={({ isActive }) => `
                          group relative block p-6 rounded-2xl
                          bg-gradient-to-br from-slate-900/90 to-slate-950/90
                          border border-slate-800
                          hover:border-blue-600/60
                          hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-900
                          transition-all duration-300
                          hover:shadow-xl hover:shadow-blue-900/30
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
                          ${isActive ? 'border-blue-600 bg-blue-950/30' : ''}
                        `}
                        role="menuitem"
                      >
                        <div className="flex items-start gap-5">
                          <div className="
                            p-3.5 rounded-xl
                            bg-gradient-to-br from-blue-950/70 to-cyan-950/70
                            group-hover:from-blue-900/80 group-hover:to-cyan-900/80
                            transition-all flex-shrink-0
                          ">
                            <item.icon className="w-7 h-7 text-blue-400" />
                          </div>

                          <div className="flex-1">
                            <h4 className="
                              font-semibold text-xl text-white
                              group-hover:text-blue-300 transition-colors mb-2
                              flex items-center gap-2
                            ">
                              {item.title}
                              <ArrowRight className="
                                w-5 h-5 opacity-0 -translate-x-2
                                group-hover:opacity-100 group-hover:translate-x-0
                                transition-all duration-300
                              " />
                            </h4>

                            <p className="text-slate-300 mb-4 leading-relaxed">
                              {item.description}
                            </p>

                            <ul className="space-y-2">
                              {item.features.map((feature, fi) => (
                                <li key={fi} className="text-sm text-slate-400 flex items-center gap-2.5">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                {content.cta && (
                  <div className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border border-blue-900/40">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {content.cta.title}
                        </h4>
                        <p className="text-slate-300 text-lg">
                          {content.cta.description}
                        </p>
                      </div>
                      <NavLink
                        to={content.cta.to}
                        onClick={onClose}
                        className="
                          inline-flex items-center justify-center px-8 py-4
                          bg-gradient-to-r from-blue-600 to-cyan-600
                          hover:from-blue-500 hover:to-cyan-500
                          text-white font-semibold text-lg rounded-xl
                          shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-700/40
                          transition-all duration-300 transform hover:scale-[1.02]
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950
                        "
                        aria-label={content.cta.buttonText}
                      >
                        {content.cta.buttonText}
                      </NavLink>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Resources – using NavLink too */
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {content.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <NavLink
                        to={item.to}
                        onClick={onClose}
                        className={({ isActive }) => `
                          group flex items-start gap-5 p-6 rounded-2xl
                          bg-gradient-to-br from-slate-900/90 to-slate-950/90
                          border border-slate-800
                          hover:border-blue-600/60 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-900
                          transition-all duration-300
                          hover:shadow-xl hover:shadow-blue-900/30
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
                          ${isActive ? 'border-blue-600 bg-blue-950/30' : ''}
                        `}
                        role="menuitem"
                      >
                        <div className="
                          p-3.5 rounded-xl bg-slate-800/70
                          group-hover:bg-gradient-to-br group-hover:from-blue-950/70 group-hover:to-cyan-950/70
                          transition-all flex-shrink-0
                        ">
                          <item.icon className="w-7 h-7 text-slate-300 group-hover:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-xl text-white group-hover:text-blue-300 transition-colors mb-2">
                            {item.title}
                          </h4>
                          <p className="text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                {/* Highlight card */}
                <div className="lg:col-span-2">
                  <div className="
                    h-full p-8 rounded-2xl
                    bg-gradient-to-br from-blue-950/60 to-cyan-950/60
                    border border-blue-900/50
                    flex flex-col justify-center
                    hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-300
                  ">
                    <content.highlight.icon className="w-12 h-12 text-blue-400 mb-6" />
                    <h4 className="text-2xl font-bold text-white mb-3">
                      {content.highlight.title}
                    </h4>
                    <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                      {content.highlight.description}
                    </p>
                    <NavLink
                      to={content.highlight.to}
                      onClick={onClose}
                      className="
                        inline-flex items-center gap-2
                        text-blue-300 hover:text-blue-200 font-semibold text-lg
                        transition-colors
                      "
                    >
                      Learn More <ArrowRight className="w-5 h-5" />
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;











// // src/components/navbar/MegaMenu.jsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Server, Cloud, Shield, Zap, Database, Users, MapPin, FileCheck,
//   Phone, BookOpen, ArrowRight, CheckCircle
// } from 'lucide-react';

// const MegaMenu = ({ type, isOpen, onClose }) => {
//   const servicesContent = {
//     title: 'Our Services',
//     description: 'Enterprise-grade IT solutions tailored for Victorian SMBs',
//     items: [
//       {
//         icon: Server,
//         title: 'Managed IT Support',
//         description: '24/7 monitoring, helpdesk, and proactive maintenance',
//         href: '#managed-it',
//         features: ['Remote & Onsite Support', 'System Monitoring', 'Patch Management']
//       },
//       {
//         icon: Cloud,
//         title: 'Cloud Solutions',
//         description: 'Azure Virtual Desktop, Microsoft 365, and cloud migrations',
//         href: '#cloud',
//         features: ['Azure AVD Setup', 'M365 Administration', 'Cloud Backup']
//       },
//       {
//         icon: Shield,
//         title: 'Cybersecurity',
//         description: 'Zero-trust security, VPN, and threat protection',
//         href: '#security',
//         features: ['Custom VPN System', 'Endpoint Protection', 'Security Audits']
//       },
//       {
//         icon: Zap,
//         title: 'Automation & AI',
//         description: 'Python scripting, workflow automation, and custom tools',
//         href: '#automation',
//         features: ['Process Automation', 'Custom Integrations', 'AI Solutions']
//       }
//     ],
//     cta: {
//       title: 'Not sure what you need?',
//       description: 'Get a free IT assessment and custom recommendation',
//       buttonText: 'Book Free Consultation',
//       href: '#contact'
//     }
//   };

//   const resourcesContent = {
//     title: 'Resources',
//     description: 'Learn more about our approach and coverage',
//     items: [
//       {
//         icon: BookOpen,
//         title: 'Case Studies',
//         description: 'Real results from Victorian businesses',
//         href: '/case-studies'
//       },
//       {
//         icon: MapPin,
//         title: 'Service Areas',
//         description: 'Melbourne, Geelong, Ballarat, Bendigo & more',
//         href: '/service-areas'
//       },
//       {
//         icon: FileCheck,
//         title: 'IT Health Check',
//         description: 'Free assessment of your current IT setup',
//         href: '/health-check'
//       },
//       {
//         icon: Users,
//         title: 'About Shakil',
//         description: 'Meet your dedicated IT partner',
//         href: '/about'
//       }
//     ],
//     highlight: {
//       title: 'Customer Portal',
//       description: 'Access your tickets, documents, and IT status anytime',
//       icon: Database
//     }
//   };

//   const content = type === 'services' ? servicesContent : resourcesContent;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//           className="
//             w-full
//             bg-gradient-to-b from-slate-950 to-slate-900     /* subtle vertical gradient – premium feel */
//             border-t-4 border-blue-600/70                   /* strong accent border-top */
//             shadow-2xl shadow-black/60                      /* deep, modern shadow */
//             rounded-b-2xl
//             overflow-hidden
//             relative z-[9999]
//           "
//           role="menu"
//           aria-label={`${type} mega menu`}
//           onMouseLeave={onClose}
//         >
//           <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
//             {/* Header */}
//             <div className="mb-8">
//               <h3 className="text-3xl font-bold text-white tracking-tight">
//                 {content.title}
//               </h3>
//               <p className="mt-2 text-lg text-slate-300 max-w-3xl">
//                 {content.description}
//               </p>
//             </div>

//             {/* Services Layout */}
//             {type === 'services' ? (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//                   {content.items.map((item, i) => (
//                     <motion.a
//                       key={i}
//                       href={item.href}
//                       onClick={onClose}
//                       initial={{ opacity: 0, y: 12 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05, duration: 0.4 }}
//                       className="
//                         group relative
//                         p-6 rounded-2xl
//                         bg-gradient-to-br from-slate-900/90 to-slate-950/90   /* subtle card gradient */
//                         border border-slate-800
//                         hover:border-blue-600/60
//                         hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-900
//                         transition-all duration-300
//                         hover:shadow-xl hover:shadow-blue-900/30
//                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
//                       "
//                       role="menuitem"
//                     >
//                       <div className="flex items-start gap-5">
//                         <div className="
//                           p-3.5 rounded-xl
//                           bg-gradient-to-br from-blue-950/70 to-cyan-950/70
//                           group-hover:from-blue-900/80 group-hover:to-cyan-900/80
//                           transition-all flex-shrink-0
//                         ">
//                           <item.icon className="w-7 h-7 text-blue-400" />
//                         </div>

//                         <div className="flex-1">
//                           <h4 className="
//                             font-semibold text-xl text-white
//                             group-hover:text-blue-300 transition-colors mb-2
//                             flex items-center gap-2
//                           ">
//                             {item.title}
//                             <ArrowRight className="
//                               w-5 h-5 opacity-0 -translate-x-2
//                               group-hover:opacity-100 group-hover:translate-x-0
//                               transition-all duration-300
//                             " />
//                           </h4>

//                           <p className="text-slate-300 mb-4 leading-relaxed">
//                             {item.description}
//                           </p>

//                           <ul className="space-y-2">
//                             {item.features.map((feature, fi) => (
//                               <li key={fi} className="text-sm text-slate-400 flex items-center gap-2.5">
//                                 <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                                 <span>{feature}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>

//                 {/* CTA */}
//                 {content.cta && (
//                   <div className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border border-blue-900/40">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
//                       <div>
//                         <h4 className="text-2xl font-bold text-white mb-2">
//                           {content.cta.title}
//                         </h4>
//                         <p className="text-slate-300 text-lg">
//                           {content.cta.description}
//                         </p>
//                       </div>
//                       <a
//                         href={content.cta.href}
//                         onClick={onClose}
//                         className="
//                           inline-flex items-center justify-center px-8 py-4
//                           bg-gradient-to-r from-blue-600 to-cyan-600
//                           hover:from-blue-500 hover:to-cyan-500
//                           text-white font-semibold text-lg rounded-xl
//                           shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-700/40
//                           transition-all duration-300 transform hover:scale-[1.02]
//                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950
//                         "
//                         aria-label={content.cta.buttonText}
//                       >
//                         {content.cta.buttonText}
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               /* Resources – similar polish with gradients */
//               <div className="grid lg:grid-cols-5 gap-8">
//                 <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   {content.items.map((item, i) => (
//                     <motion.a
//                       key={i}
//                       href={item.href}
//                       onClick={onClose}
//                       initial={{ opacity: 0, y: 12 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05, duration: 0.4 }}
//                       className="
//                         group flex items-start gap-5 p-6 rounded-2xl
//                         bg-gradient-to-br from-slate-900/90 to-slate-950/90
//                         border border-slate-800
//                         hover:border-blue-600/60 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-900
//                         transition-all duration-300
//                         hover:shadow-xl hover:shadow-blue-900/30
//                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
//                       "
//                       role="menuitem"
//                     >
//                       <div className="
//                         p-3.5 rounded-xl bg-slate-800/70
//                         group-hover:bg-gradient-to-br group-hover:from-blue-950/70 group-hover:to-cyan-950/70
//                         transition-all flex-shrink-0
//                       ">
//                         <item.icon className="w-7 h-7 text-slate-300 group-hover:text-blue-400" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-xl text-white group-hover:text-blue-300 transition-colors mb-2">
//                           {item.title}
//                         </h4>
//                         <p className="text-slate-300 leading-relaxed">
//                           {item.description}
//                         </p>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>

//                 {/* Highlight card */}
//                 <div className="lg:col-span-2">
//                   <div className="
//                     h-full p-8 rounded-2xl
//                     bg-gradient-to-br from-blue-950/60 to-cyan-950/60
//                     border border-blue-900/50
//                     flex flex-col justify-center
//                     hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-300
//                   ">
//                     <content.highlight.icon className="w-12 h-12 text-blue-400 mb-6" />
//                     <h4 className="text-2xl font-bold text-white mb-3">
//                       {content.highlight.title}
//                     </h4>
//                     <p className="text-slate-300 text-lg mb-6 leading-relaxed">
//                       {content.highlight.description}
//                     </p>
//                     <a
//                       href="#portal"
//                       onClick={onClose}
//                       className="
//                         inline-flex items-center gap-2
//                         text-blue-300 hover:text-blue-200 font-semibold text-lg
//                         transition-colors
//                       "
//                     >
//                       Learn More <ArrowRight className="w-5 h-5" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MegaMenu;




// // src/components/navbar/MegaMenu.jsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Server, Cloud, Shield, Zap, Database, Users, MapPin, FileCheck,
//   Phone, BookOpen, ArrowRight, CheckCircle
// } from 'lucide-react';

// const MegaMenu = ({ type, isOpen, onClose }) => {
//   const servicesContent = {
//     title: 'Our Services',
//     description: 'Enterprise-grade IT solutions tailored for Victorian SMBs',
//     items: [
//       {
//         icon: Server,
//         title: 'Managed IT Support',
//         description: '24/7 monitoring, helpdesk, and proactive maintenance',
//         href: '#managed-it',
//         features: ['Remote & Onsite Support', 'System Monitoring', 'Patch Management']
//       },
//       {
//         icon: Cloud,
//         title: 'Cloud Solutions',
//         description: 'Azure Virtual Desktop, Microsoft 365, and cloud migrations',
//         href: '#cloud',
//         features: ['Azure AVD Setup', 'M365 Administration', 'Cloud Backup']
//       },
//       {
//         icon: Shield,
//         title: 'Cybersecurity',
//         description: 'Zero-trust security, VPN, and threat protection',
//         href: '#security',
//         features: ['Custom VPN System', 'Endpoint Protection', 'Security Audits']
//       },
//       {
//         icon: Zap,
//         title: 'Automation & AI',
//         description: 'Python scripting, workflow automation, and custom tools',
//         href: '#automation',
//         features: ['Process Automation', 'Custom Integrations', 'AI Solutions']
//       }
//     ],
//     cta: {
//       title: 'Not sure what you need?',
//       description: 'Get a free IT assessment and custom recommendation',
//       buttonText: 'Book Free Consultation',
//       href: '#contact'
//     }
//   };

//   const resourcesContent = {
//     title: 'Resources',
//     description: 'Learn more about our approach and coverage',
//     items: [
//       {
//         icon: BookOpen,
//         title: 'Case Studies',
//         description: 'Real results from Victorian businesses',
//         href: '#cases'
//       },
//       {
//         icon: MapPin,
//         title: 'Service Areas',
//         description: 'Melbourne, Geelong, Ballarat, Bendigo & more',
//         href: '#areas'
//       },
//       {
//         icon: FileCheck,
//         title: 'IT Health Check',
//         description: 'Free assessment of your current IT setup',
//         href: '#health-check'
//       },
//       {
//         icon: Users,
//         title: 'About Shakil',
//         description: 'Meet your dedicated IT partner',
//         href: '#about'
//       }
//     ],
//     highlight: {
//       title: 'Customer Portal',
//       description: 'Access your tickets, documents, and IT status anytime',
//       icon: Database
//     }
//   };

//   const content = type === 'services' ? servicesContent : resourcesContent;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//           className="
//             w-full
//             bg-slate-950
//             border-t-2 border-slate-700
//             shadow-2xl
//             rounded-b-2xl
//             overflow-hidden
//             relative z-[9999]
//           "
//           role="menu"
//           aria-label={`${type} mega menu`}
//           onMouseLeave={onClose}
//         >
//           <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
//             {/* Header */}
//             <div className="mb-8">
//               <h3 className="text-3xl font-bold text-white tracking-tight">
//                 {content.title}
//               </h3>
//               <p className="mt-2 text-lg text-slate-300 max-w-3xl">
//                 {content.description}
//               </p>
//             </div>

//             {/* Content – Services vs Resources */}
//             {type === 'services' ? (
//               <>
//                 {/* Services Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//                   {content.items.map((item, i) => (
//                     <motion.a
//                       key={i}
//                       href={item.href}
//                       onClick={onClose}
//                       initial={{ opacity: 0, y: 12 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05, duration: 0.4 }}
//                       className="
//                         group relative
//                         p-6 rounded-2xl
//                         bg-slate-900/80
//                         border border-slate-800
//                         hover:border-blue-600/50
//                         hover:bg-slate-900
//                         transition-all duration-300
//                         hover:shadow-xl hover:shadow-blue-900/20
//                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
//                       "
//                       role="menuitem"
//                     >
//                       <div className="flex items-start gap-5">
//                         <div className="
//                           p-3.5 rounded-xl
//                           bg-gradient-to-br from-blue-950/60 to-cyan-950/60
//                           group-hover:from-blue-900/70 group-hover:to-cyan-900/70
//                           transition-colors flex-shrink-0
//                         ">
//                           <item.icon className="w-7 h-7 text-blue-400" />
//                         </div>

//                         <div className="flex-1">
//                           <h4 className="
//                             font-semibold text-xl text-white
//                             group-hover:text-blue-300 transition-colors mb-2
//                             flex items-center gap-2
//                           ">
//                             {item.title}
//                             <ArrowRight className="
//                               w-5 h-5 opacity-0 -translate-x-2
//                               group-hover:opacity-100 group-hover:translate-x-0
//                               transition-all duration-300
//                             " />
//                           </h4>

//                           <p className="text-slate-300 mb-4 leading-relaxed">
//                             {item.description}
//                           </p>

//                           <ul className="space-y-2">
//                             {item.features.map((feature, fi) => (
//                               <li key={fi} className="text-sm text-slate-400 flex items-center gap-2.5">
//                                 <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                                 <span>{feature}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>

//                 {/* CTA at bottom */}
//                 {content.cta && (
//                   <div className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-blue-900/30">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
//                       <div>
//                         <h4 className="text-2xl font-bold text-white mb-2">
//                           {content.cta.title}
//                         </h4>
//                         <p className="text-slate-300 text-lg">
//                           {content.cta.description}
//                         </p>
//                       </div>
//                       <a
//                         href={content.cta.href}
//                         onClick={onClose}
//                         className="
//                           inline-flex items-center justify-center
//                           px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600
//                           hover:from-blue-500 hover:to-cyan-500
//                           text-white font-semibold text-lg rounded-xl
//                           shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-700/40
//                           transition-all duration-300 transform hover:scale-[1.02]
//                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950
//                         "
//                         aria-label={content.cta.buttonText}
//                       >
//                         {content.cta.buttonText}
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               /* Resources layout – similar polish */
//               <div className="grid lg:grid-cols-5 gap-8">
//                 <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   {content.items.map((item, i) => (
//                     <motion.a
//                       key={i}
//                       href={item.href}
//                       onClick={onClose}
//                       initial={{ opacity: 0, y: 12 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05, duration: 0.4 }}
//                       className="
//                         group flex items-start gap-5 p-6 rounded-2xl
//                         bg-slate-900/80 border border-slate-800
//                         hover:border-blue-600/50 hover:bg-slate-900
//                         transition-all duration-300
//                         hover:shadow-xl hover:shadow-blue-900/20
//                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
//                       "
//                       role="menuitem"
//                     >
//                       <div className="
//                         p-3.5 rounded-xl bg-slate-800/70
//                         group-hover:bg-blue-950/60 transition-colors flex-shrink-0
//                       ">
//                         <item.icon className="w-7 h-7 text-slate-300 group-hover:text-blue-400" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-xl text-white group-hover:text-blue-300 transition-colors mb-2">
//                           {item.title}
//                         </h4>
//                         <p className="text-slate-300 leading-relaxed">
//                           {item.description}
//                         </p>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>

//                 {/* Highlight box */}
//                 <div className="lg:col-span-2">
//                   <div className="
//                     h-full p-8 rounded-2xl
//                     bg-gradient-to-br from-blue-950/50 to-cyan-950/50
//                     border border-blue-900/40
//                     flex flex-col justify-center
//                   ">
//                     <content.highlight.icon className="w-12 h-12 text-blue-400 mb-6" />
//                     <h4 className="text-2xl font-bold text-white mb-3">
//                       {content.highlight.title}
//                     </h4>
//                     <p className="text-slate-300 text-lg mb-6 leading-relaxed">
//                       {content.highlight.description}
//                     </p>
//                     <a
//                       href="#portal"
//                       onClick={onClose}
//                       className="
//                         inline-flex items-center gap-2
//                         text-blue-300 hover:text-blue-200 font-semibold text-lg
//                         transition-colors
//                       "
//                     >
//                       Learn More <ArrowRight className="w-5 h-5" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MegaMenu;



// // src/components/navbar/MegaMenu.jsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Server, Cloud, Shield, Zap, Database, Users, MapPin, FileCheck,
//   Phone, BookOpen, ArrowRight, CheckCircle
// } from 'lucide-react';

// const MegaMenu = ({ type, isOpen, onClose }) => {
//   const servicesContent = {
//     title: 'Our Services',
//     description: 'Enterprise-grade IT solutions tailored for Victorian SMBs',
//     items: [
//       {
//         icon: Server,
//         title: 'Managed IT Support',
//         description: '24/7 monitoring, helpdesk, and proactive maintenance',
//         href: '#managed-it',
//         features: ['Remote & Onsite Support', 'System Monitoring', 'Patch Management']
//       },
//       {
//         icon: Cloud,
//         title: 'Cloud Solutions',
//         description: 'Azure Virtual Desktop, Microsoft 365, and cloud migrations',
//         href: '#cloud',
//         features: ['Azure AVD Setup', 'M365 Administration', 'Cloud Backup']
//       },
//       {
//         icon: Shield,
//         title: 'Cybersecurity',
//         description: 'Zero-trust security, VPN, and threat protection',
//         href: '#security',
//         features: ['Custom VPN System', 'Endpoint Protection', 'Security Audits']
//       },
//       {
//         icon: Zap,
//         title: 'Automation & AI',
//         description: 'Python scripting, workflow automation, and custom tools',
//         href: '#automation',
//         features: ['Process Automation', 'Custom Integrations', 'AI Solutions']
//       }
//     ],
//     cta: {
//       title: 'Not sure what you need?',
//       description: 'Get a free IT assessment and custom recommendation',
//       buttonText: 'Book Free Consultation',
//       href: '#contact'
//     }
//   };

//   const resourcesContent = {
//     title: 'Resources',
//     description: 'Learn more about our approach and coverage',
//     items: [
//       {
//         icon: BookOpen,
//         title: 'Case Studies',
//         description: 'Real results from Victorian businesses',
//         href: '#cases'
//       },
//       {
//         icon: MapPin,
//         title: 'Service Areas',
//         description: 'Melbourne, Geelong, Ballarat, Bendigo & more',
//         href: '#areas'
//       },
//       {
//         icon: FileCheck,
//         title: 'IT Health Check',
//         description: 'Free assessment of your current IT setup',
//         href: '#health-check'
//       },
//       {
//         icon: Users,
//         title: 'About Shakil',
//         description: 'Meet your dedicated IT partner',
//         href: '#about'
//       }
//     ],
//     highlight: {
//       title: 'Customer Portal',
//       description: 'Access your tickets, documents, and IT status anytime',
//       icon: Database
//     }
//   };

//   const content = type === 'services' ? servicesContent : resourcesContent;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.2, ease: 'easeOut' }}
//           className={`
//             w-full
//             bg-slate-950/98 backdrop-blur-2xl
//             border-t border-white/10
//             shadow-2xl shadow-black/50
//             rounded-b-2xl overflow-hidden
//             relative z-[9999]
//           `}
//           role="menu"
//           aria-label={`${type} menu`}
//           onMouseLeave={onClose}
//         >
//           <div className="max-w-7xl mx-auto px-6 py-8">
//             <div className="mb-6">
//               <h3 className="text-2xl font-bold text-white">{content.title}</h3>
//               <p className="text-slate-300 mt-1">{content.description}</p>
//             </div>

//             {type === 'services' ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {content.items.map((item, i) => (
//                   <motion.a
//                     key={i}
//                     href={item.href}
//                     onClick={onClose}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     className="group p-6 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
//                     role="menuitem"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-600/30 group-hover:from-blue-600/40 group-hover:to-cyan-600/40 transition-all flex-shrink-0">
//                         <item.icon className="w-6 h-6 text-blue-300" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors flex items-center gap-2 mb-2">
//                           {item.title}
//                           <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
//                         </h4>
//                         <p className="text-sm text-slate-300 mb-3 leading-relaxed">{item.description}</p>
//                         <ul className="space-y-1.5">
//                           {item.features.map((feature, fi) => (
//                             <li key={fi} className="text-xs text-slate-400 flex items-center gap-2">
//                               <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
//                               <span>{feature}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </motion.a>
//                 ))}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//                 <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {content.items.map((item, i) => (
//                     <motion.a
//                       key={i}
//                       href={item.href}
//                       onClick={onClose}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/30 hover:border-blue-500/40 transition-all"
//                       role="menuitem"
//                     >
//                       <div className="p-2.5 rounded-lg bg-slate-700/50 group-hover:bg-blue-600/30 transition-all flex-shrink-0">
//                         <item.icon className="w-5 h-5 text-slate-300 group-hover:text-blue-300 transition-colors" />
//                       </div>
//                       <div className="min-w-0">
//                         <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-1">
//                           {item.title}
//                         </h4>
//                         <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>

//                 <div className="lg:col-span-2">
//                   <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 shadow-lg">
//                     <content.highlight.icon className="w-10 h-10 text-blue-300 mb-4" />
//                     <h4 className="text-xl font-bold text-white mb-2">{content.highlight.title}</h4>
//                     <p className="text-slate-300 mb-4 leading-relaxed">{content.highlight.description}</p>
//                     <a href="#portal" onClick={onClose} className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold">
//                       Learn More <ArrowRight className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {type === 'services' && content.cta && (
//               <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div>
//                   <h4 className="font-bold text-lg text-white">{content.cta.title}</h4>
//                   <p className="text-slate-200">{content.cta.description}</p>
//                 </div>
//                 <a
//                   href={content.cta.href}
//                   onClick={onClose}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all whitespace-nowrap"
//                   aria-label={content.cta.buttonText}
//                 >
//                   {content.cta.buttonText}
//                 </a>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MegaMenu;


// // src/components/navbar/MegaMenu.jsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Server, Cloud, Shield, Zap, Database, Users, MapPin, FileCheck,
//   Phone, BookOpen, ArrowRight, CheckCircle
// } from 'lucide-react';

// const MegaMenu = ({ type, isOpen, onClose }) => {
//   const servicesContent = {
//     title: 'Our Services',
//     description: 'Enterprise-grade IT solutions tailored for Victorian SMBs',
//     items: [
//       {
//         icon: Server,
//         title: 'Managed IT Support',
//         description: '24/7 monitoring, helpdesk, and proactive maintenance',
//         href: '#managed-it',
//         features: ['Remote & Onsite Support', 'System Monitoring', 'Patch Management']
//       },
//       {
//         icon: Cloud,
//         title: 'Cloud Solutions',
//         description: 'Azure Virtual Desktop, Microsoft 365, and cloud migrations',
//         href: '#cloud',
//         features: ['Azure AVD Setup', 'M365 Administration', 'Cloud Backup']
//       },
//       {
//         icon: Shield,
//         title: 'Cybersecurity',
//         description: 'Zero-trust security, VPN, and threat protection',
//         href: '#security',
//         features: ['Custom VPN System', 'Endpoint Protection', 'Security Audits']
//       },
//       {
//         icon: Zap,
//         title: 'Automation & AI',
//         description: 'Python scripting, workflow automation, and custom tools',
//         href: '#automation',
//         features: ['Process Automation', 'Custom Integrations', 'AI Solutions']
//       }
//     ],
//     cta: {
//       title: 'Not sure what you need?',
//       description: 'Get a free IT assessment and custom recommendation',
//       buttonText: 'Book Free Consultation',
//       href: '#contact'
//     }
//   };

//   const resourcesContent = {
//     title: 'Resources',
//     description: 'Learn more about our approach and coverage',
//     items: [
//       {
//         icon: BookOpen,
//         title: 'Case Studies',
//         description: 'Real results from Victorian businesses',
//         href: '#cases'
//       },
//       {
//         icon: MapPin,
//         title: 'Service Areas',
//         description: 'Melbourne, Geelong, Ballarat, Bendigo & more',
//         href: '#areas'
//       },
//       {
//         icon: FileCheck,
//         title: 'IT Health Check',
//         description: 'Free assessment of your current IT setup',
//         href: '#health-check'
//       },
//       {
//         icon: Users,
//         title: 'About Shakil',
//         description: 'Meet your dedicated IT partner',
//         href: '#about'
//       }
//     ],
//     highlight: {
//       title: 'Customer Portal',
//       description: 'Access your tickets, documents, and IT status anytime',
//       icon: Database
//     }
//   };

//   const content = type === 'services' ? servicesContent : resourcesContent;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.15 }}
//           className="absolute top-full left-0 w-full bg-slate-900/98 backdrop-blur-xl border-t border-white/10 shadow-2xl z-[999] rounded-b-2xl"
//           role="menu"
//           aria-label={`${type} menu`}
//           onMouseLeave={onClose}
//         >
//           <div className="max-w-7xl mx-auto px-6 py-8">
//             <div className="mb-6">
//               <h3 className="text-2xl font-bold text-white">{content.title}</h3>
//               <p className="text-slate-300 mt-1">{content.description}</p>
//             </div>

//             {type === 'services' ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {content.items.map((item, i) => (
//                   <motion.a
//                     key={i}
//                     href={item.href}
//                     onClick={onClose}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     className="group p-6 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
//                     role="menuitem"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-600/30 group-hover:from-blue-600/40 group-hover:to-cyan-600/40 transition-all flex-shrink-0">
//                         <item.icon className="w-6 h-6 text-blue-300" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors flex items-center gap-2 mb-2">
//                           {item.title}
//                           <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
//                         </h4>
//                         <p className="text-sm text-slate-300 mb-3 leading-relaxed">{item.description}</p>
//                         <ul className="space-y-1.5">
//                           {item.features.map((feature, fi) => (
//                             <li key={fi} className="text-xs text-slate-400 flex items-center gap-2">
//                               <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
//                               <span>{feature}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </motion.a>
//                 ))}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//                 <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {content.items.map((item, i) => (
//                     <motion.a
//                       key={i}
//                       href={item.href}
//                       onClick={onClose}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/30 hover:border-blue-500/40 transition-all"
//                       role="menuitem"
//                     >
//                       <div className="p-2.5 rounded-lg bg-slate-700/50 group-hover:bg-blue-600/30 transition-all flex-shrink-0">
//                         <item.icon className="w-5 h-5 text-slate-300 group-hover:text-blue-300 transition-colors" />
//                       </div>
//                       <div className="min-w-0">
//                         <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-1">
//                           {item.title}
//                         </h4>
//                         <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>
//                 <div className="lg:col-span-2">
//                   <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 shadow-lg">
//                     <content.highlight.icon className="w-10 h-10 text-blue-300 mb-4" />
//                     <h4 className="text-xl font-bold text-white mb-2">{content.highlight.title}</h4>
//                     <p className="text-slate-300 mb-4 leading-relaxed">{content.highlight.description}</p>
//                     <a href="#portal" onClick={onClose} className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold">
//                       Learn More <ArrowRight className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {type === 'services' && content.cta && (
//               <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div>
//                   <h4 className="font-bold text-lg text-white">{content.cta.title}</h4>
//                   <p className="text-slate-200">{content.cta.description}</p>
//                 </div>
//                 <a
//                   href={content.cta.href}
//                   onClick={onClose}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all whitespace-nowrap"
//                   aria-label={content.cta.buttonText}
//                 >
//                   {content.cta.buttonText}
//                 </a>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MegaMenu;


// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Server, Cloud, Shield, Zap, Database, Wifi, 
//   Users, MapPin, FileCheck, Phone, BookOpen,
//   ArrowRight, CheckCircle
// } from 'lucide-react';

// const MegaMenu = ({ type, isOpen, onClose }) => {
//   const servicesContent = {
//     title: 'Our Services',
//     description: 'Enterprise-grade IT solutions tailored for Victorian SMBs',
//     items: [
//       {
//         icon: Server,
//         title: 'Managed IT Support',
//         description: '24/7 monitoring, helpdesk, and proactive maintenance',
//         href: '#managed-it',
//         features: ['Remote & Onsite Support', 'System Monitoring', 'Patch Management']
//       },
//       {
//         icon: Cloud,
//         title: 'Cloud Solutions',
//         description: 'Azure Virtual Desktop, Microsoft 365, and cloud migrations',
//         href: '#cloud',
//         features: ['Azure AVD Setup', 'M365 Administration', 'Cloud Backup']
//       },
//       {
//         icon: Shield,
//         title: 'Cybersecurity',
//         description: 'Zero-trust security, VPN, and threat protection',
//         href: '#security',
//         features: ['Custom VPN System', 'Endpoint Protection', 'Security Audits']
//       },
//       {
//         icon: Zap,
//         title: 'Automation & AI',
//         description: 'Python scripting, workflow automation, and custom tools',
//         href: '#automation',
//         features: ['Process Automation', 'Custom Integrations', 'AI Solutions']
//       }
//     ],
//     cta: {
//       title: 'Not sure what you need?',
//       description: 'Get a free IT assessment and custom recommendation',
//       buttonText: 'Book Free Consultation',
//       href: '#contact'
//     }
//   };

//   const resourcesContent = {
//     title: 'Resources',
//     description: 'Learn more about our approach and coverage',
//     items: [
//       {
//         icon: BookOpen,
//         title: 'Case Studies',
//         description: 'Real results from Victorian businesses',
//         href: '#cases'
//       },
//       {
//         icon: MapPin,
//         title: 'Service Areas',
//         description: 'Melbourne, Geelong, Ballarat, Bendigo & more',
//         href: '#areas'
//       },
//       {
//         icon: FileCheck,
//         title: 'IT Health Check',
//         description: 'Free assessment of your current IT setup',
//         href: '#health-check'
//       },
//       {
//         icon: Users,
//         title: 'About Shakil',
//         description: 'Meet your dedicated IT partner',
//         href: '#about'
//       }
//     ],
//     highlight: {
//       title: 'Customer Portal',
//       description: 'Access your tickets, documents, and IT status anytime',
//       icon: Database
//     }
//   };

//   const content = type === 'services' ? servicesContent : resourcesContent;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.15 }}
//           className="absolute top-full left-0 w-screen bg-slate-900 backdrop-blur-xl border-t border-white/10 shadow-2xl z-50"
//           role="menu"
//           aria-label={`${type} menu`}
//         >
//           <div className="max-w-7xl mx-auto px-6 py-8">
//             <div className="mb-6">
//               <h3 className="text-2xl font-bold text-white">{content.title}</h3>
//               <p className="text-slate-300 mt-1">{content.description}</p>
//             </div>

//             {type === 'services' ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {content.items.map((item, i) => (
//                   <motion.a
//                     key={i}
//                     href={item.href}
//                     onClick={onClose}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     className="group p-6 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
//                     role="menuitem"
//                     aria-label={`${item.title}: ${item.description}`}
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-600/30 group-hover:from-blue-600/40 group-hover:to-cyan-600/40 transition-all flex-shrink-0">
//                         <item.icon className="w-6 h-6 text-blue-300" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors flex items-center gap-2 mb-2">
//                           {item.title}
//                           <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
//                         </h4>
//                         <p className="text-sm text-slate-300 mb-3 leading-relaxed">{item.description}</p>
//                         <ul className="space-y-1.5">
//                           {item.features.map((feature, fi) => (
//                             <li key={fi} className="text-xs text-slate-400 flex items-center gap-2">
//                               <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
//                               <span>{feature}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </motion.a>
//                 ))}
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//                 <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {content.items.map((item, i) => (
//                     <motion.a
//                       key={i}
//                       href={item.href}
//                       onClick={onClose}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/30 hover:border-blue-500/40 transition-all"
//                       role="menuitem"
//                       aria-label={`${item.title}: ${item.description}`}
//                     >
//                       <div className="p-2.5 rounded-lg bg-slate-700/50 group-hover:bg-blue-600/30 transition-all flex-shrink-0">
//                         <item.icon className="w-5 h-5 text-slate-300 group-hover:text-blue-300 transition-colors" />
//                       </div>
//                       <div className="min-w-0">
//                         <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-1">
//                           {item.title}
//                         </h4>
//                         <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>
//                 <div className="lg:col-span-2">
//                   <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 shadow-lg">
//                     <content.highlight.icon className="w-10 h-10 text-blue-300 mb-4" />
//                     <h4 className="text-xl font-bold text-white mb-2">{content.highlight.title}</h4>
//                     <p className="text-slate-300 mb-4 leading-relaxed">{content.highlight.description}</p>
//                     <a href="#portal" onClick={onClose} className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold">
//                       Learn More <ArrowRight className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {type === 'services' && content.cta && (
//               <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
//                 <div>
//                   <h4 className="font-bold text-lg text-white">{content.cta.title}</h4>
//                   <p className="text-slate-200">{content.cta.description}</p>
//                 </div>
//                 <a
//                   href={content.cta.href}
//                   onClick={onClose}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all whitespace-nowrap"
//                   aria-label={content.cta.buttonText}
//                 >
//                   {content.cta.buttonText}
//                 </a>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MegaMenu;