import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = '',
  hover = true,
  gradient = false,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? {
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
        borderColor: 'rgba(59, 130, 246, 0.3)'
      } : {}}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/10
        transition-all duration-500
        ${gradient ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02]' : ''}
        ${className}
      `}
    >
        {/* Shine effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>     
      {children}
    </motion.div>
  );
};

export default GlassCard;





// import React from 'react';
// import { motion } from 'framer-motion';

// const GlassCard = ({ 
//   children, 
//   className = '', 
//   hover = true,
//   gradient = false,
//   delay = 0 
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay }}
//       whileHover={hover ? { 
//         y: -8, 
//         boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
//         borderColor: 'rgba(59, 130, 246, 0.3)'
//       } : {}}
//       className={`
//         relative overflow-hidden rounded-2xl
//         bg-white/[0.03] backdrop-blur-xl
//         border border-white/10
//         transition-all duration-500
//         ${gradient ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02]' : ''}
//         ${className}
//       `}
//     >
//       {/* Shine effect */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//       </div>
      
//       {children}
//     </motion.div>
//   );
// };

// export default GlassCard;