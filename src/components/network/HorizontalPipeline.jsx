// src/components/network/HorizontalPipeline.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Activity,
  Boxes,
  Server,
  HardDrive,
  Code,
  Cpu,
  Database,
} from "lucide-react";

const services = [
  { label: "Cloud", Icon: Cloud, color: "cyan" },
  { label: "Network", Icon: Activity, color: "blue" },
  { label: "M365", Icon: Boxes, color: "orange" },
  { label: "Azure", Icon: Server, color: "purple" },
  { label: "Backup", Icon: HardDrive, color: "red" },
  { label: "Software", Icon: Code, color: "green" },
  { label: "Hardware", Icon: Cpu, color: "indigo" },
  { label: "Systems", Icon: Database, color: "pink" },
];

const HorizontalPipeline = () => {
  return (
    <div className="w-full py-6">
      <h3 className="text-center text-white text-sm sm:text-base font-bold mb-4">
        Live Service Pipeline & Traffic Flow
      </h3>

      <div className="relative w-full max-w-5xl mx-auto flex items-center justify-between px-4">
        {/* Background line */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40 rounded-full top-1/2 -translate-y-1/2" />

        {/* Animated traffic dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_3px_rgba(34,211,238,0.6)]"
            animate={{ left: ["0%", "100%"] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Service nodes */}
        {services.map((service, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-${service.color}-500/20 border border-${service.color}-500/40 flex items-center justify-center backdrop-blur-md`}
            >
              <service.Icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${service.color}-400`} />
            </div>
            <p className={`mt-2 text-[10px] sm:text-xs font-semibold text-${service.color}-300`}>
              {service.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalPipeline;
