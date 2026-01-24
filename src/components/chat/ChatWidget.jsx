import React, { useReducer, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { MessageCircle, X, Zap, Calendar, Phone, Clock, Shield, User, MapPin, MessageSquare } from "lucide-react";

import { chatReducer, initialState } from "./chatReducer";
import chatKnowledge from "./data/chatKnowledge.json";

const quickOptions = [
  { icon: Zap, text: "IT Support Pricing", value: "pricing" },
  { icon: Calendar, text: "Book Free Assessment", value: "assessment" },
  { icon: Phone, text: "Emergency Support", value: "emergency" },
  { icon: Clock, text: "Response Times", value: "response" },
  { icon: Shield, text: "Cybersecurity Solutions", value: "security" },
  { icon: User, text: "About Shakil IT", value: "about" },
  { icon: MapPin, text: "Service Coverage Areas", value: "coverage" },
  { icon: MessageSquare, text: "Custom IT Solutions", value: "custom" },
];

const ChatWidget = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { messages, showNamePrompt, userName, showContactPrompt, userEmailOrPhone, isTyping } = state;
  const [isOpen, setIsOpen] = useState(false); // control widget open/close
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleAddMessage = (type, text, delay = 0) => {
    dispatch({ type: "SET_TYPING", payload: type === "bot" });
    setTimeout(() => {
      dispatch({ type: type === "bot" ? "BOT_MESSAGE" : "USER_MESSAGE", payload: text });
      dispatch({ type: "SET_TYPING", payload: false });
    }, delay);
  };

  const handleQuickOption = (value) => {
    const option = quickOptions.find((o) => o.value === value);
    if (!option) return;
    handleAddMessage("user", option.text);
    const response = chatKnowledge[value] || chatKnowledge.fallback;
    handleAddMessage("bot", response, 1200);
  };

  // Validate Australian phone number
  const isValidPhone = (phone) => {
    const regex = /^(?:\+?61|0)[2-478]\d{8}$/;
    return regex.test(phone.replace(/\s+/g, ""));
  };

  // Validate email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      dispatch({ type: "SET_USER_NAME", payload: userName.trim() });
      handleAddMessage("bot", `Nice to meet you, ${userName}! Can I have your email or Australian phone number for follow-up?`, 800);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!userEmailOrPhone.trim()) return;

    if (!isValidEmail(userEmailOrPhone.trim()) && !isValidPhone(userEmailOrPhone.trim())) {
      handleAddMessage("bot", "Please enter a valid email or Australian phone number.", 500);
      return;
    }

    dispatch({ type: "SET_USER_CONTACT", payload: userEmailOrPhone.trim() });
    handleAddMessage("bot", "Great! How can I help you today?", 800);
  };

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="fixed bottom-5 right-5 z-[10000]">
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          onClick={handleToggle}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 w-[350px] sm:w-[400px] max-h-[75vh] bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-cyan-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-white font-semibold">Shakil IT Support</h3>
                  <p className="text-xs text-white/80">Online • Instant replies</p>
                </div>
              </div>
              <button onClick={handleClose}>
                <X className="w-5 h-5 text-white hover:text-white/80" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.type === "user"
                        ? "bg-gradient-to-br from-blue-600/90 to-cyan-600/90 text-white"
                        : "bg-slate-800/85 text-slate-100"
                    }`}
                  >
                    {msg.text}
                    <span className="block text-[0.68rem] opacity-70 mt-1 text-right">{msg.timestamp}</span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Options */}
            {!showNamePrompt && !showContactPrompt && (
              <div className="p-3 border-t border-white/10 bg-slate-900/70 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickOptions.map((opt, idx) => (
                  <button
                    key={`${opt.value}-${idx}`}
                    onClick={() => handleQuickOption(opt.value)}
                    className="flex items-center gap-2 p-2.5 rounded-xl text-xs bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 text-slate-200 hover:text-white transition-colors"
                  >
                    <opt.icon className="w-4 h-4 text-blue-400" />
                    {opt.text}
                  </button>
                ))}
              </div>
            )}

            {/* Name Prompt */}
            {showNamePrompt && (
              <div className="p-4 bg-slate-800/70 border-t border-white/10">
                <form onSubmit={handleNameSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => dispatch({ type: "SET_USER_NAME_INPUT", payload: e.target.value })}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 bg-slate-800/70 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none"
                    autoFocus
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl">Next</button>
                </form>
              </div>
            )}

            {/* Email/Phone Prompt */}
            {showContactPrompt && (
              <div className="p-4 bg-slate-800/70 border-t border-white/10">
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={userEmailOrPhone}
                    onChange={(e) => dispatch({ type: "SET_USER_CONTACT_INPUT", payload: e.target.value })}
                    placeholder="Enter your email or contact number..."
                    className="w-full px-4 py-3 bg-slate-800/70 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none"
                    autoFocus
                  />
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl">Start Chat</button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;





// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   MessageCircle,
//   X,
//   Send,
//   Shield,
//   Zap,
//   Calendar,
//   Phone,
//   Clock,
//   User,
//   MessageSquare,
//   MapPin
// } from 'lucide-react';

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       text: "Hi 👋 I'm your IT assistant. How can I help today?",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//   ]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const quickOptions = [
//     { icon: Zap, label: 'IT Support Pricing' },
//     { icon: Calendar, label: 'Book Free Assessment' },
//     { icon: Shield, label: 'Cybersecurity' },
//     { icon: Phone, label: 'Emergency Support' },
//     { icon: Clock, label: 'Response Times' },
//     { icon: MapPin, label: 'Service Areas' },
//     { icon: MessageSquare, label: 'Custom Solutions' },
//     { icon: User, label: 'About Shakil IT' }
//   ];

//   /* ------------------ helpers ------------------ */

//   const addMessage = (type, text) => {
//     setMessages(prev => [
//       ...prev,
//       {
//         id: Date.now(),
//         type,
//         text,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }
//     ]);
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   /* ------------------ effects ------------------ */

//   useEffect(scrollToBottom, [messages]);

//   useEffect(() => {
//     if (isOpen) inputRef.current?.focus();
//   }, [isOpen]);

//   /* ------------------ handlers ------------------ */

//   const handleSend = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!input.trim()) return;

//     addMessage('user', input);
//     setInput('');
//     setIsTyping(true);

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage(
//         'bot',
//         "Thanks! One of our engineers will follow up shortly. For urgent issues, call 1300 XXX XXX."
//       );
//     }, 1200);
//   };

//   const handleQuick = (label) => {
//     addMessage('user', label);
//     setIsTyping(true);

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage(
//         'bot',
//         "Great question. I can help with that — would you like to continue here or book a free consult?"
//       );
//     }, 1000);
//   };

//   /* ------------------ render ------------------ */

//   return (
//     <>
//       {/* Floating launcher — always right, never overlapping */}
//       <motion.button
//         type="button"
//         onClick={() => setIsOpen(v => !v)}
//         whileHover={{ scale: 1.08 }}
//         whileTap={{ scale: 0.96 }}
//         className="
//           fixed bottom-6 right-6 z-[10000]
//           w-14 h-14 rounded-full
//           bg-gradient-to-r from-blue-600 to-cyan-600
//           text-white shadow-2xl
//           flex items-center justify-center
//         "
//         aria-label="Open chat support"
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
//       </motion.button>

//       {/* Chat panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.aside
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 30, scale: 0.95 }}
//             transition={{ duration: 0.25, ease: 'easeOut' }}
//             className="
//               fixed bottom-24 right-6 z-[9999]
//               w-[360px] max-w-[calc(100vw-3rem)]
//               h-[520px] max-h-[70vh]
//               bg-slate-900/95 backdrop-blur-xl
//               border border-white/10 rounded-2xl
//               shadow-2xl flex flex-col overflow-hidden
//             "
//             role="dialog"
//             aria-label="Live chat support"
//           >
//             {/* Header */}
//             <div className="px-4 py-3 bg-gradient-to-r from-blue-700 to-cyan-700 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
//                   <Shield className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-white font-semibold text-sm">Shakil IT Support</p>
//                   <p className="text-xs text-white/80">Online • Instant replies</p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 className="text-white/80 hover:text-white"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
//               {messages.map(m => (
//                 <div
//                   key={m.id}
//                   className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`
//                       max-w-[80%] px-4 py-2 rounded-2xl text-sm
//                       ${m.type === 'user'
//                         ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
//                         : 'bg-slate-800 text-slate-100'}
//                     `}
//                   >
//                     {m.text}
//                     <div className="text-[10px] opacity-60 text-right mt-1">{m.time}</div>
//                   </div>
//                 </div>
//               ))}

//               {isTyping && (
//                 <div className="bg-slate-800 px-4 py-2 rounded-2xl text-xs text-slate-400 w-fit">
//                   Typing…
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Quick actions */}
//             <div className="px-3 py-2 border-t border-white/10 grid grid-cols-2 gap-2">
//               {quickOptions.map(opt => (
//                 <button
//                   key={opt.label}
//                   type="button"
//                   onClick={() => handleQuick(opt.label)}
//                   className="
//                     flex items-center gap-2 px-3 py-2
//                     bg-white/5 hover:bg-white/10
//                     border border-white/10 rounded-xl
//                     text-xs text-slate-200 transition
//                   "
//                 >
//                   <opt.icon className="w-4 h-4 text-blue-400" />
//                   {opt.label}
//                 </button>
//               ))}
//             </div>

//             {/* Input */}
//             <form
//               onSubmit={handleSend}
//               onSubmitCapture={e => e.stopPropagation()}
//               className="p-3 border-t border-white/10 flex gap-2"
//             >
//               <input
//                 ref={inputRef}
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder="Type your message…"
//                 className="
//                   flex-1 px-4 py-2 rounded-xl
//                   bg-slate-800 border border-white/10
//                   text-sm text-white placeholder-slate-500
//                   focus:outline-none focus:ring-2 focus:ring-blue-500
//                 "
//               />
//               <button
//                 type="submit"
//                 disabled={!input.trim()}
//                 className="
//                   px-4 py-2 rounded-xl
//                   bg-gradient-to-r from-blue-600 to-cyan-600
//                   text-white disabled:opacity-50
//                 "
//               >
//                 <Send className="w-4 h-4" />
//               </button>
//             </form>
//           </motion.aside>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatWidget;



// // src/components/chat/ChatWidget.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { saveChatSession, loadChatSession } from './chatStorage';
// // Import Lucide icons one by one (only what's actually used)
// import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
// import X from 'lucide-react/dist/esm/icons/x';
// import Send from 'lucide-react/dist/esm/icons/send';
// import Phone from 'lucide-react/dist/esm/icons/phone';
// import Mail from 'lucide-react/dist/esm/icons/mail';
// import Calendar from 'lucide-react/dist/esm/icons/calendar';
// import Clock from 'lucide-react/dist/esm/icons/clock';
// import User from 'lucide-react/dist/esm/icons/user';
// import Zap from 'lucide-react/dist/esm/icons/zap';
// import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
// import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
// import Shield from 'lucide-react/dist/esm/icons/shield';
// import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
// import MapPin from 'lucide-react/dist/esm/icons/map-pin';       // ← added here (was missing)

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       text: "Hi! 👋 I'm here to help. How can we assist your business today?",
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [userName, setUserName] = useState('');
//   const [showNamePrompt, setShowNamePrompt] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const quickOptions = [
//     { icon: Zap, text: 'IT Support Pricing', value: 'pricing' },
//     { icon: Calendar, text: 'Book Free Assessment', value: 'assessment' },
//     { icon: Phone, text: 'Emergency Support', value: 'emergency' },
//     { icon: Clock, text: 'Response Times', value: 'response' },
//     { icon: Shield, text: 'Cybersecurity Solutions', value: 'security' },
//     { icon: User, text: 'About Shakil IT', value: 'about' },
//     { icon: MapPin, text: 'Service Coverage Areas', value: 'areas' }, // ← now properly imported
//     { icon: MessageSquare, text: 'Custom IT Solutions', value: 'custom' }
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && !showNamePrompt && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen, showNamePrompt]);

//   // Lock body scroll when chat is open (mobile keyboard fix)
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [isOpen]);

//   // Close on Escape
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape' && isOpen) setIsOpen(false);
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isOpen]);

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (userName.trim()) {
//       setShowNamePrompt(false);
//       addMessage('bot', `Great to meet you, ${userName}! How can I help you today?`);
//     }
//   };

//   const addMessage = (type, text, delay = 0) => {
//     setTimeout(() => {
//       const newMessage = {
//         id: Date.now(),
//         type,
//         text,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
//       setMessages(prev => [...prev, newMessage]);
//     }, delay);
//   };

//   const handleQuickOption = (value) => {
//     const option = quickOptions.find(q => q.value === value);
//     if (!option) return;

//     addMessage('user', option.text);
//     setIsTyping(true);

//     const responses = {
//       pricing: "Our plans start from $199/month for SMBs (24/7 monitoring + remote support). Enterprise from $599/month. Need a custom quote?",
//       assessment: "Free IT audit: security scan, performance check, recommendations. 2–3 hrs, no obligation. Preferred date?",
//       emergency: "Urgent? Call 1300 XXX XXX (24/7). <2hr critical response. What's happening right now?",
//       response: "Metro <2hrs, Regional <4hrs, Remote <30min. 99.9% SLA. Your area?",
//       security: "Zero-trust + custom VPN + endpoint protection. Interested in a security review?",
//       about: "Shakil IT: 10+ yrs, 150+ VIC clients, Microsoft certified. Proactive & transparent. Want to talk to Shakil?",
//       areas: "Full VIC coverage: Melbourne same-day, Geelong next-day, Ballarat/Bendigo scheduled. Remote AUS-wide. Where are you?",
//       custom: "Custom scripts, migrations, portals. What's the challenge you're facing?"
//     };

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', responses[value] || "Thanks for your question! Let me get more details...");
//     }, 1200);
//   };

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     addMessage('user', inputValue);
//     setInputValue('');
//     setIsTyping(true);

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', "Thanks for your message! Our team will reply soon. Urgent? Call 1300 XXX XXX.");
//     }, 1500);
//   };

//   const handleContactAction = (type) => {
//     if (type === 'email') {
//       window.location.href = 'mailto:info@shakilit.com.au';
//     } else if (type === 'phone') {
//       window.location.href = 'tel:1300000000';
//     } else if (type === 'contact') {
//       setIsOpen(false);
//       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-5 right-5 z-[10000] w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-700 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
//         aria-label={isOpen ? "Close chat" : "Open support chat"}
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
//       </motion.button>

//       {/* Chat Panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.92, y: 40 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.92, y: 40 }}
//             transition={{ duration: 0.25, ease: 'easeOut' }}
//             className="
//               fixed inset-x-3 bottom-20 z-[9999]
//               sm:inset-x-6 sm:bottom-24
//               lg:inset-x-8 lg:bottom-28
//               w-auto max-w-md sm:max-w-lg lg:max-w-xl
//               h-[70vh] sm:h-[75vh] max-h-[85vh]
//               bg-slate-900/92 backdrop-blur-lg
//               border border-white/10 rounded-2xl
//               shadow-2xl overflow-hidden flex flex-col
//             "
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-700 to-cyan-700 p-4 flex items-center justify-between shrink-0">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                     <Shield className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
//                 </div>
//                 <div>
//                   <h3 className="text-white font-semibold text-base">Shakil IT Support</h3>
//                   <p className="text-xs text-white/85 flex items-center gap-1.5">
//                     <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                     Online • Instant replies
//                   </p>
//                 </div>
//               </div>
//               <button onClick={() => setIsOpen(false)} aria-label="Close chat">
//                 <X className="w-5 h-5 text-white hover:text-white/80 transition" />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
//               {messages.map(msg => (
//                 <motion.div
//                   key={msg.id}
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`
//                     max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
//                     ${msg.type === 'user' 
//                       ? 'bg-gradient-to-br from-blue-600/90 to-cyan-600/90 text-white' 
//                       : 'bg-slate-800/85 text-slate-100'}
//                   `}>
//                     {msg.text}
//                     <span className="text-[0.68rem] opacity-70 mt-1 block text-right">
//                       {msg.timestamp}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}

//               {isTyping && (
//                 <div className="flex justify-start">
//                   <div className="bg-slate-800/80 px-4 py-3 rounded-2xl">
//                     <div className="flex gap-1.5">
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
//                       <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Quick Options – always visible */}
//             <div className="p-3 border-t border-white/10 bg-slate-900/70">
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                 {quickOptions.map(opt => (
//                   <button
//                     key={opt.value}
//                     onClick={() => handleQuickOption(opt.value)}
//                     className="
//                       flex items-center gap-2 p-2.5 rounded-xl text-xs
//                       bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30
//                       text-slate-200 hover:text-white transition-colors
//                     "
//                   >
//                     <opt.icon className="w-4 h-4 text-blue-400" />
//                     {opt.text}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Input */}
//             {!showNamePrompt && (
//               <div className="p-4 border-t border-white/10 bg-slate-900/90">
//                 <form onSubmit={handleSend} className="flex gap-2">
//                   <input
//                     ref={inputRef}
//                     value={inputValue}
//                     onChange={e => setInputValue(e.target.value)}
//                     placeholder="Type your message..."
//                     className="
//                       flex-1 px-4 py-3 bg-slate-800/70 border border-white/10 rounded-xl
//                       text-sm text-white placeholder-slate-500
//                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
//                     "
//                   />
//                   <button
//                     type="submit"
//                     disabled={!inputValue.trim()}
//                     className="
//                       px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600
//                       rounded-xl text-white disabled:opacity-50
//                     "
//                   >
//                     <Send className="w-5 h-5" />
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Name Prompt */}
//             {showNamePrompt && (
//               <div className="p-4 bg-slate-800/70 border-t border-white/10">
//                 <form onSubmit={handleNameSubmit} className="space-y-3">
//                   <div>
//                     <label className="text-xs text-slate-400 block mb-1.5">Your name</label>
//                     <input
//                       type="text"
//                       value={userName}
//                       onChange={e => setUserName(e.target.value)}
//                       placeholder="Enter your name..."
//                       className="
//                         w-full px-4 py-3 bg-slate-800/70 border border-white/10 rounded-xl
//                         text-sm text-white placeholder-slate-500
//                         focus:outline-none focus:border-blue-500
//                       "
//                       autoFocus
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="
//                       w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600
//                       text-white font-medium rounded-xl hover:shadow-lg transition
//                     "
//                   >
//                     Start Chat
//                   </button>
//                 </form>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatWidget;



// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MessageCircle, X, Send, Phone, Mail, Calendar,
//   Clock, User, Zap, ChevronDown, CheckCircle, Shield, MessageSquare
// } from 'lucide-react';

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       text: "Hi! 👋 I'm here to help. How can we assist your business today?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [userName, setUserName] = useState('');
//   const [showNamePrompt, setShowNamePrompt] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const quickOptions = [
//     { icon: Zap, text: 'IT Support Pricing', value: 'pricing' },
//     { icon: Calendar, text: 'Book Free Assessment', value: 'assessment' },
//     { icon: Phone, text: 'Emergency Support', value: 'emergency' },
//     { icon: Clock, text: 'Response Times', value: 'response' },
//     { icon: Shield, text: 'Cybersecurity Solutions', value: 'security' },
//     { icon: User, text: 'About Shakil IT', value: 'about' },
//     { icon: CheckCircle, text: 'Service Coverage Areas', value: 'areas' },
//     { icon: MessageSquare, text: 'Custom IT Solutions', value: 'custom' }
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && !showNamePrompt && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen, showNamePrompt]);

//   // Lock body scroll when chat is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [isOpen]);

//   // Keyboard navigation - close on Escape
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape' && isOpen) setIsOpen(false);
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isOpen]);

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (userName.trim()) {
//       setShowNamePrompt(false);
//       addMessage('bot', `Great to meet you, ${userName}! How can I help you today?`);
//     }
//   };

//   const addMessage = (type, text, delay = 0) => {
//     setTimeout(() => {
//       const newMessage = {
//         id: Date.now(),
//         type,
//         text,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, newMessage]);
//     }, delay);
//   };

//   const handleQuickOption = (option) => {
//     addMessage('user', quickOptions.find(q => q.value === option).text);
    
//     setIsTyping(true);
    
//     const responses = {
//       pricing: "Our IT support plans start from $199/month for small businesses, including 24/7 monitoring, unlimited remote support, and proactive security management. Enterprise packages available from $599/month with dedicated support. Would you like a custom quote based on your specific needs?",
//       assessment: "Perfect! Our free IT health check includes: ✓ Comprehensive security audit ✓ Network performance analysis ✓ Cloud readiness assessment ✓ Custom recommendations. This typically takes 2-3 hours and has no obligations. What's your preferred date?",
//       emergency: "For urgent IT issues, call us immediately at 1300 XXX XXX. Our emergency line is monitored 24/7 for managed clients. We provide <2 hour response for critical incidents. Are you currently experiencing a critical system failure or security breach?",
//       response: "Our response times: Melbourne Metro <2hrs, Regional VIC <4hrs, Remote support <30min. 24/7 emergency support included. Same-day onsite for Melbourne CBD. 99.9% uptime SLA guarantee. Need specific area coverage details?",
//       security: "We offer complete cybersecurity solutions: ✓ Custom VPN system ✓ Zero-trust architecture ✓ Endpoint protection ✓ 24/7 threat monitoring ✓ Security audits & compliance. Plus our proprietary VPN ensures secure remote access for all your team. Interested in a security assessment?",
//       about: "Shakil IT is Victoria's trusted IT partner for SMBs. With 10+ years experience, Microsoft certifications, and 150+ happy clients, we provide enterprise-grade technology without enterprise complexity. We believe in transparency, documentation, and proactive support. Want to meet Shakil?",
//       areas: "We serve all of Victoria: Melbourne (same-day), Geelong (next-day), Ballarat, Bendigo, and remote support Australia-wide. Each area gets 24/7 monitoring, remote helpdesk, and scheduled onsite visits. Which area are you located in?",
//       custom: "We build custom IT solutions including: ✓ Python automation scripts ✓ Cloud migrations (Azure/M365) ✓ Custom portals & ticketing systems ✓ Integration solutions. Everything is documented and built to scale. What challenge are you trying to solve?"
//     };

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', responses[option], 500);
//     }, 1500);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     addMessage('user', inputValue);
//     setInputValue('');
//     setIsTyping(true);

//     // Simulate bot response
//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', "Thanks for your message! A member of our team will respond shortly. For immediate assistance, call us at 1300 XXX XXX or email info@shakilit.com.au");
//     }, 1500);
//   };

//   const handleContactAction = (type) => {
//     if (type === 'email') {
//       window.location.href = 'mailto:info@shakilit.com.au';
//     } else if (type === 'phone') {
//       window.location.href = 'tel:1300000000';
//     } else if (type === 'contact') {
//       setIsOpen(false);
//       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       {/* Chat Panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Mobile backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[47] sm:hidden"
//               onClick={() => setIsOpen(false)}
//               aria-hidden="true"
//             />
//             <motion.div
//               initial={{ opacity: 0, y: 20, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 20, scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//               className="fixed bottom-20 right-4 sm:right-6 lg:right-8 top-auto sm:top-auto sm:bottom-24 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-12rem)] sm:h-[calc(100vh-8rem)] sm:max-h-[700px] bg-slate-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[48] flex flex-col overflow-hidden"
//               role="dialog"
//               aria-labelledby="chat-title"
//               aria-modal="true"
//             >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                     <MessageCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//                 </div>
//                 <div>
//                   <h3 id="chat-title" className="font-bold text-white">Shakil IT Support</h3>
//                   <p className="text-xs text-white/80">Online • Typically replies instantly</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 aria-label="Close chat"
//               >
//                 <X className="w-5 h-5 text-white" aria-hidden="true" />
//               </button>
//             </div>

//             {/* Messages */}
//             <div 
//               className="flex-1 overflow-y-auto p-4 space-y-4"
//               role="log"
//               aria-live="polite"
//               aria-label="Chat messages"
//             >
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                       message.type === 'user'
//                         ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
//                         : 'bg-white/10 text-white'
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed">{message.text}</p>
//                     <span className={`text-xs mt-1 block ${
//                       message.type === 'user' ? 'text-white/70' : 'text-slate-400'
//                     }`}>
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}

//               {/* Typing Indicator */}
//               {isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-white/10 rounded-2xl px-4 py-3">
//                     <div className="flex gap-1">
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Quick Options - Show after name is provided */}
//               {!showNamePrompt && messages.length <= 2 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="space-y-2"
//                 >
//                   <p className="text-xs text-slate-400 text-center mb-3 font-medium">Popular Questions:</p>
//                   <div className="grid grid-cols-1 gap-2">
//                     {quickOptions.map((option, i) => (
//                       <motion.button
//                         key={option.value}
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.3 + i * 0.08 }}
//                         onClick={() => handleQuickOption(option.value)}
//                         className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/50 to-slate-800/30 hover:from-blue-600/20 hover:to-cyan-600/20 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all text-left group"
//                       >
//                         <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                           <option.icon className="w-4 h-4 text-blue-400" />
//                         </div>
//                         <span className="text-sm text-slate-200 group-hover:text-white transition-colors font-medium">
//                           {option.text}
//                         </span>
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Name Prompt */}
//             {showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleNameSubmit} className="space-y-3">
//                   <div>
//                     <label className="text-xs text-slate-400 mb-1 block">Your name</label>
//                     <input
//                       type="text"
//                       value={userName}
//                       onChange={(e) => setUserName(e.target.value)}
//                       placeholder="Enter your name..."
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                       autoFocus
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
//                   >
//                     Start Chat
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Input - Show after name is provided */}
//             {!showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleSendMessage} className="flex gap-2">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                   />
//                   <button
//                     type="submit"
//                     disabled={!inputValue.trim()}
//                     className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                     aria-label="Send message"
//                   >
//                     <Send className="w-5 h-5" aria-hidden="true" />
//                   </button>
//                 </form>

//                 {/* Quick Actions */}
//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => handleContactAction('phone')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                     aria-label="Call us at 1300 XXX XXX"
//                   >
//                     <Phone className="w-3 h-3" aria-hidden="true" />
//                     Call Now
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('email')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                     aria-label="Email us at info@shakilit.com.au"
//                   >
//                     <Mail className="w-3 h-3" aria-hidden="true" />
//                     Email Us
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('contact')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                     aria-label="Book a consultation call"
//                   >
//                     <Calendar className="w-3 h-3" aria-hidden="true" />
//                     Book Call
//                   </button>
//                 </div>
//               </div>
//             )}
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Floating Button */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-6 right-4 sm:right-6 lg:right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl shadow-blue-500/25 flex items-center justify-center z-[51] group hover:shadow-blue-500/40 transition-all"
//         aria-label={isOpen ? "Close chat" : "Open chat support"}
//         aria-expanded={isOpen}
//       >
//         <AnimatePresence mode="wait">
//           {isOpen ? (
//             <motion.div
//               key="close"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ChevronDown className="w-6 h-6 text-white" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="open"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="relative"
//             >
//               <MessageCircle className="w-6 h-6 text-white" />
//               {/* Notification Badge */}
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pulse Ring */}
//         {!isOpen && (
//           <motion.div
//             className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"
//             animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         )}
//       </motion.button>

//       {/* Tooltip - Only show when closed */}
//       <AnimatePresence>
//         {!isOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: 10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 10 }}
//             transition={{ delay: 2 }}
//             className="fixed bottom-6 right-20 sm:right-24 lg:right-28 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap z-40 hidden sm:block"
//           >
//             Need help? Chat with us!
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rotate-45" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatWidget;



// // src/components/chat/ChatWidget.jsx (full fixed version)
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MessageCircle, X, Send, Phone, Mail, Calendar,
//   Clock, User, Zap, ChevronDown, CheckCircle,
//   Shield, MessageSquare
// } from 'lucide-react';

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       text: "Hi! 👋 I'm here to help. How can we assist your business today?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [userName, setUserName] = useState('');
//   const [showNamePrompt, setShowNamePrompt] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const quickOptions = [
//     { icon: Zap, text: 'IT Support Pricing', value: 'pricing' },
//     { icon: Calendar, text: 'Book Free Assessment', value: 'assessment' },
//     { icon: Phone, text: 'Emergency Support', value: 'emergency' },
//     { icon: Clock, text: 'Response Times', value: 'response' },
//     { icon: Shield, text: 'Cybersecurity Solutions', value: 'security' },
//     { icon: User, text: 'About Shakil IT', value: 'about' },
//     { icon: CheckCircle, text: 'Service Coverage Areas', value: 'areas' },
//     { icon: MessageSquare, text: 'Custom IT Solutions', value: 'custom' }
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && !showNamePrompt && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen, showNamePrompt]);

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (userName.trim()) {
//       setShowNamePrompt(false);
//       addMessage('bot', `Great to meet you, ${userName}! How can I help you today?`);
//     }
//   };

//   const addMessage = (type, text, delay = 0) => {
//     setTimeout(() => {
//       const newMessage = {
//         id: Date.now(),
//         type,
//         text,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, newMessage]);
//     }, delay);
//   };

//   const handleQuickOption = (option) => {
//     addMessage('user', quickOptions.find(q => q.value === option).text);
    
//     setIsTyping(true);
    
//     const responses = {
//       pricing: "Our IT support plans start from $199/month for small businesses, including 24/7 monitoring, unlimited remote support, and proactive security management. Enterprise packages available from $599/month with dedicated support. Would you like a custom quote based on your specific needs?",
//       assessment: "Perfect! Our free IT health check includes: ✓ Comprehensive security audit ✓ Network performance analysis ✓ Cloud readiness assessment ✓ Custom recommendations. This typically takes 2-3 hours and has no obligations. What's your preferred date?",
//       emergency: "For urgent IT issues, call us immediately at 1300 XXX XXX. Our emergency line is monitored 24/7 for managed clients. We provide <2 hour response for critical incidents. Are you currently experiencing a critical system failure or security breach?",
//       response: "Our response times: Melbourne Metro <2hrs, Regional VIC <4hrs, Remote support <30min. 24/7 emergency support included. Same-day onsite for Melbourne CBD. 99.9% uptime SLA guarantee. Need specific area coverage details?",
//       security: "We offer complete cybersecurity solutions: ✓ Custom VPN system ✓ Zero-trust architecture ✓ Endpoint protection ✓ 24/7 threat monitoring ✓ Security audits & compliance. Plus our proprietary VPN ensures secure remote access for all your team. Interested in a security assessment?",
//       about: "Shakil IT is Victoria's trusted IT partner for SMBs. With 10+ years experience, Microsoft certifications, and 150+ happy clients, we provide enterprise-grade technology without enterprise complexity. We believe in transparency, documentation, and proactive support. Want to meet Shakil?",
//       areas: "We serve all of Victoria: Melbourne (same-day), Geelong (next-day), Ballarat, Bendigo, and remote support Australia-wide. Each area gets 24/7 monitoring, remote helpdesk, and scheduled onsite visits. Which area are you located in?",
//       custom: "We build custom IT solutions including: ✓ Python automation scripts ✓ Cloud migrations (Azure/M365) ✓ Custom portals & ticketing systems ✓ Integration solutions. Everything is documented and built to scale. What challenge are you trying to solve?"
//     };

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', responses[option], 500);
//     }, 1500);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     addMessage('user', inputValue);
//     setInputValue('');
//     setIsTyping(true);

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', "Thanks for your message! A member of our team will respond shortly. For immediate assistance, call us at 1300 XXX XXX or email info@shakilit.com.au");
//     }, 1500);
//   };

//   const handleContactAction = (type) => {
//     if (type === 'email') {
//       window.location.href = 'mailto:info@shakilit.com.au';
//     } else if (type === 'phone') {
//       window.location.href = 'tel:1300000000';
//     } else if (type === 'contact') {
//       setIsOpen(false);
//       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       {/* Floating Button - Perfect Positioning */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl shadow-blue-500/40 flex items-center justify-center group hover:shadow-blue-500/50 transition-all"
//       >
//         <AnimatePresence mode="wait">
//           {isOpen ? (
//             <motion.div
//               key="close"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <X className="w-6 h-6 text-white" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="open"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="relative"
//             >
//               <MessageCircle className="w-6 h-6 text-white" />
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {!isOpen && (
//           <motion.div
//             className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-50"
//             animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0.5] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         )}
//       </motion.button>

//       {/* Chat Panel - Full width on mobile, fixed on desktop, no overlap */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-x-4 bottom-24 sm:inset-x-6 lg:inset-x-8 lg:bottom-28 z-[9998] w-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-slate-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
//             style={{ maxHeight: 'calc(100vh - 140px)' }} // Ensures it never overflows viewport
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                     <MessageCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-white">Shakil IT Support</h3>
//                   <p className="text-xs text-white/80">Online • Typically replies instantly</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 aria-label="Close chat"
//               >
//                 <X className="w-6 h-6 text-white" />
//               </button>
//             </div>

//             {/* Messages - Scrollable */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {/* Your existing messages rendering logic */}
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                       message.type === 'user'
//                         ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
//                         : 'bg-white/10 text-white'
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed">{message.text}</p>
//                     <span className={`text-xs mt-1 block ${
//                       message.type === 'user' ? 'text-white/70' : 'text-slate-400'
//                     }`}>
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}

//               {isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-white/10 rounded-2xl px-4 py-3">
//                     <div className="flex gap-1">
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Quick Options */}
//               {!showNamePrompt && messages.length <= 2 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="space-y-2"
//                 >
//                   <p className="text-xs text-slate-400 text-center mb-3 font-medium">Popular Questions:</p>
//                   <div className="grid grid-cols-1 gap-2">
//                     {quickOptions.map((option, i) => (
//                       <motion.button
//                         key={option.value}
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.3 + i * 0.08 }}
//                         onClick={() => handleQuickOption(option.value)}
//                         className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/50 to-slate-800/30 hover:from-blue-600/20 hover:to-cyan-600/20 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all text-left group"
//                       >
//                         <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                           <option.icon className="w-4 h-4 text-blue-400" />
//                         </div>
//                         <span className="text-sm text-slate-200 group-hover:text-white transition-colors font-medium">
//                           {option.text}
//                         </span>
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Name Prompt */}
//             {showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleNameSubmit} className="space-y-3">
//                   <div>
//                     <label className="text-xs text-slate-400 mb-1 block">Your name</label>
//                     <input
//                       type="text"
//                       value={userName}
//                       onChange={(e) => setUserName(e.target.value)}
//                       placeholder="Enter your name..."
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                       autoFocus
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
//                   >
//                     Start Chat
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Input */}
//             {!showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleSendMessage} className="flex gap-2">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                   />
//                   <button
//                     type="submit"
//                     disabled={!inputValue.trim()}
//                     className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Send className="w-5 h-5" />
//                   </button>
//                 </form>

//                 {/* Quick Actions */}
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   <button
//                     onClick={() => handleContactAction('phone')}
//                     className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Phone className="w-4 h-4" />
//                     Call Now
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('email')}
//                     className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Mail className="w-4 h-4" />
//                     Email Us
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('contact')}
//                     className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Calendar className="w-4 h-4" />
//                     Book Call
//                   </button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatWidget;



// import React, { useState, useEffect, useRef } from 'react';



// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MessageCircle, X, Send, Phone, Mail, Calendar,
//   Clock, User, Zap, ChevronDown, CheckCircle,
//   Shield, MessageSquare
// } from 'lucide-react';




// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       text: "Hi! 👋 I'm here to help. How can we assist your business today?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [userName, setUserName] = useState('');
//   const [showNamePrompt, setShowNamePrompt] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const quickOptions = [
//     { icon: Zap, text: 'IT Support Pricing', value: 'pricing' },
//     { icon: Calendar, text: 'Book Free Assessment', value: 'assessment' },
//     { icon: Phone, text: 'Emergency Support', value: 'emergency' },
//     { icon: Clock, text: 'Response Times', value: 'response' },
//     { icon: Shield, text: 'Cybersecurity Solutions', value: 'security' },
//     { icon: User, text: 'About Shakil IT', value: 'about' },
//     { icon: CheckCircle, text: 'Service Coverage Areas', value: 'areas' },
//     { icon: MessageSquare, text: 'Custom IT Solutions', value: 'custom' }
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && !showNamePrompt && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen, showNamePrompt]);

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (userName.trim()) {
//       setShowNamePrompt(false);
//       addMessage('bot', `Great to meet you, ${userName}! How can I help you today?`);
//     }
//   };

//   const addMessage = (type, text, delay = 0) => {
//     setTimeout(() => {
//       const newMessage = {
//         id: Date.now(),
//         type,
//         text,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, newMessage]);
//     }, delay);
//   };

//   const handleQuickOption = (option) => {
//     addMessage('user', quickOptions.find(q => q.value === option).text);
    
//     setIsTyping(true);
    
//     const responses = {
//       pricing: "Our IT support plans start from $199/month for small businesses, including 24/7 monitoring, unlimited remote support, and proactive security management. Enterprise packages available from $599/month with dedicated support. Would you like a custom quote based on your specific needs?",
//       assessment: "Perfect! Our free IT health check includes: ✓ Comprehensive security audit ✓ Network performance analysis ✓ Cloud readiness assessment ✓ Custom recommendations. This typically takes 2-3 hours and has no obligations. What's your preferred date?",
//       emergency: "For urgent IT issues, call us immediately at 1300 XXX XXX. Our emergency line is monitored 24/7 for managed clients. We provide <2 hour response for critical incidents. Are you currently experiencing a critical system failure or security breach?",
//       response: "Our response times: Melbourne Metro <2hrs, Regional VIC <4hrs, Remote support <30min. 24/7 emergency support included. Same-day onsite for Melbourne CBD. 99.9% uptime SLA guarantee. Need specific area coverage details?",
//       security: "We offer complete cybersecurity solutions: ✓ Custom VPN system ✓ Zero-trust architecture ✓ Endpoint protection ✓ 24/7 threat monitoring ✓ Security audits & compliance. Plus our proprietary VPN ensures secure remote access for all your team. Interested in a security assessment?",
//       about: "Shakil IT is Victoria's trusted IT partner for SMBs. With 10+ years experience, Microsoft certifications, and 150+ happy clients, we provide enterprise-grade technology without enterprise complexity. We believe in transparency, documentation, and proactive support. Want to meet Shakil?",
//       areas: "We serve all of Victoria: Melbourne (same-day), Geelong (next-day), Ballarat, Bendigo, and remote support Australia-wide. Each area gets 24/7 monitoring, remote helpdesk, and scheduled onsite visits. Which area are you located in?",
//       custom: "We build custom IT solutions including: ✓ Python automation scripts ✓ Cloud migrations (Azure/M365) ✓ Custom portals & ticketing systems ✓ Integration solutions. Everything is documented and built to scale. What challenge are you trying to solve?"
//     };

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', responses[option], 500);
//     }, 1500);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     addMessage('user', inputValue);
//     setInputValue('');
//     setIsTyping(true);

//     // Simulate bot response
//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', "Thanks for your message! A member of our team will respond shortly. For immediate assistance, call us at 1300 XXX XXX or email info@shakilit.com.au");
//     }, 1500);
//   };

//   const handleContactAction = (type) => {
//     if (type === 'email') {
//       window.location.href = 'mailto:info@shakilit.com.au';
//     } else if (type === 'phone') {
//       window.location.href = 'tel:1300000000';
//     } else if (type === 'contact') {
//       setIsOpen(false);
//       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       {/* Chat Panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="fixed bottom-20 right-4 sm:right-6 lg:right-8 top-20 sm:top-auto sm:bottom-24 w-[calc(100vw-2rem)] sm:w-96 sm:h-[calc(100vh-7rem)] sm:max-h-[700px] bg-slate-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                     <MessageCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-white">Shakil IT Support</h3>
//                   <p className="text-xs text-white/80">Online • Typically replies instantly</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-white" />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                       message.type === 'user'
//                         ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
//                         : 'bg-white/10 text-white'
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed">{message.text}</p>
//                     <span className={`text-xs mt-1 block ${
//                       message.type === 'user' ? 'text-white/70' : 'text-slate-400'
//                     }`}>
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}

//               {/* Typing Indicator */}
//               {isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-white/10 rounded-2xl px-4 py-3">
//                     <div className="flex gap-1">
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Quick Options - Show after name is provided */}
//               {!showNamePrompt && messages.length <= 2 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="space-y-2"
//                 >
//                   <p className="text-xs text-slate-400 text-center mb-3 font-medium">Popular Questions:</p>
//                   <div className="grid grid-cols-1 gap-2">
//                     {quickOptions.map((option, i) => (
//                       <motion.button
//                         key={option.value}
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.3 + i * 0.08 }}
//                         onClick={() => handleQuickOption(option.value)}
//                         className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/50 to-slate-800/30 hover:from-blue-600/20 hover:to-cyan-600/20 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all text-left group"
//                       >
//                         <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                           <option.icon className="w-4 h-4 text-blue-400" />
//                         </div>
//                         <span className="text-sm text-slate-200 group-hover:text-white transition-colors font-medium">
//                           {option.text}
//                         </span>
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Name Prompt */}
//             {showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleNameSubmit} className="space-y-3">
//                   <div>
//                     <label className="text-xs text-slate-400 mb-1 block">Your name</label>
//                     <input
//                       type="text"
//                       value={userName}
//                       onChange={(e) => setUserName(e.target.value)}
//                       placeholder="Enter your name..."
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                       autoFocus
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
//                   >
//                     Start Chat
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Input - Show after name is provided */}
//             {!showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleSendMessage} className="flex gap-2">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                   />
//                   <button
//                     type="submit"
//                     disabled={!inputValue.trim()}
//                     className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Send className="w-5 h-5" />
//                   </button>
//                 </form>

//                 {/* Quick Actions */}
//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => handleContactAction('phone')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Phone className="w-3 h-3" />
//                     Call Now
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('email')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Mail className="w-3 h-3" />
//                     Email Us
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('contact')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Calendar className="w-3 h-3" />
//                     Book Call
//                   </button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Button */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-6 right-4 sm:right-6 lg:right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl shadow-blue-500/25 flex items-center justify-center z-50 group hover:shadow-blue-500/40 transition-all"
//       >
//         <AnimatePresence mode="wait">
//           {isOpen ? (
//             <motion.div
//               key="close"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ChevronDown className="w-6 h-6 text-white" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="open"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="relative"
//             >
//               <MessageCircle className="w-6 h-6 text-white" />
//               {/* Notification Badge */}
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pulse Ring */}
//         {!isOpen && (
//           <motion.div
//             className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"
//             animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         )}
//       </motion.button>

//       {/* Tooltip - Only show when closed */}
//       <AnimatePresence>
//         {!isOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: 10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 10 }}
//             transition={{ delay: 2 }}
//             className="fixed bottom-6 right-20 sm:right-24 lg:right-28 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap z-40 hidden sm:block"
//           >
//             Need help? Chat with us!
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rotate-45" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatWidget;


// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MessageCircle, X, Send, Phone, Mail, Calendar,
//   Clock, User, Zap, ChevronDown, CheckCircle, 
//   Shield, MessageSquare  // Add these two
// } from 'lucide-react';

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       text: "Hi! 👋 I'm here to help. How can we assist your business today?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [userName, setUserName] = useState('');
//   const [showNamePrompt, setShowNamePrompt] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const quickOptions = [
//     { icon: Zap, text: 'IT Support Pricing', value: 'pricing' },
//     { icon: Calendar, text: 'Book Free Assessment', value: 'assessment' },
//     { icon: Phone, text: 'Emergency Support', value: 'emergency' },
//     { icon: Clock, text: 'Response Times', value: 'response' },
//     { icon: Shield, text: 'Cybersecurity Solutions', value: 'security' },
//     { icon: User, text: 'About Shakil IT', value: 'about' },
//     { icon: CheckCircle, text: 'Service Coverage Areas', value: 'areas' },
//     { icon: MessageSquare, text: 'Custom IT Solutions', value: 'custom' }
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && !showNamePrompt && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen, showNamePrompt]);

//   const handleNameSubmit = (e) => {
//     e.preventDefault();
//     if (userName.trim()) {
//       setShowNamePrompt(false);
//       addMessage('bot', `Great to meet you, ${userName}! How can I help you today?`);
//     }
//   };

//   const addMessage = (type, text, delay = 0) => {
//     setTimeout(() => {
//       const newMessage = {
//         id: Date.now(),
//         type,
//         text,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, newMessage]);
//     }, delay);
//   };

//   const handleQuickOption = (option) => {
//     addMessage('user', quickOptions.find(q => q.value === option).text);
    
//     setIsTyping(true);
    
//     const responses = {
//       pricing: "Our IT support plans start from $199/month for small businesses, including 24/7 monitoring, unlimited remote support, and proactive security management. Enterprise packages available from $599/month with dedicated support. Would you like a custom quote based on your specific needs?",
//       assessment: "Perfect! Our free IT health check includes: ✓ Comprehensive security audit ✓ Network performance analysis ✓ Cloud readiness assessment ✓ Custom recommendations. This typically takes 2-3 hours and has no obligations. What's your preferred date?",
//       emergency: "For urgent IT issues, call us immediately at 1300 XXX XXX. Our emergency line is monitored 24/7 for managed clients. We provide <2 hour response for critical incidents. Are you currently experiencing a critical system failure or security breach?",
//       response: "Our response times: Melbourne Metro <2hrs, Regional VIC <4hrs, Remote support <30min. 24/7 emergency support included. Same-day onsite for Melbourne CBD. 99.9% uptime SLA guarantee. Need specific area coverage details?",
//       security: "We offer complete cybersecurity solutions: ✓ Custom VPN system ✓ Zero-trust architecture ✓ Endpoint protection ✓ 24/7 threat monitoring ✓ Security audits & compliance. Plus our proprietary VPN ensures secure remote access for all your team. Interested in a security assessment?",
//       about: "Shakil IT is Victoria's trusted IT partner for SMBs. With 10+ years experience, Microsoft certifications, and 150+ happy clients, we provide enterprise-grade technology without enterprise complexity. We believe in transparency, documentation, and proactive support. Want to meet Shakil?",
//       areas: "We serve all of Victoria: Melbourne (same-day), Geelong (next-day), Ballarat, Bendigo, and remote support Australia-wide. Each area gets 24/7 monitoring, remote helpdesk, and scheduled onsite visits. Which area are you located in?",
//       custom: "We build custom IT solutions including: ✓ Python automation scripts ✓ Cloud migrations (Azure/M365) ✓ Custom portals & ticketing systems ✓ Integration solutions. Everything is documented and built to scale. What challenge are you trying to solve?"
//     };

//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', responses[option], 500);
//     }, 1500);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     addMessage('user', inputValue);
//     setInputValue('');
//     setIsTyping(true);

//     // Simulate bot response
//     setTimeout(() => {
//       setIsTyping(false);
//       addMessage('bot', "Thanks for your message! A member of our team will respond shortly. For immediate assistance, call us at 1300 XXX XXX or email info@shakilit.com.au");
//     }, 1500);
//   };

//   const handleContactAction = (type) => {
//     if (type === 'email') {
//       window.location.href = 'mailto:info@shakilit.com.au';
//     } else if (type === 'phone') {
//       window.location.href = 'tel:1300000000';
//     } else if (type === 'contact') {
//       setIsOpen(false);
//       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       {/* Chat Panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//             className="fixed bottom-20 right-4 sm:right-6 lg:right-8 top-20 sm:top-auto sm:bottom-24 w-[calc(100vw-2rem)] sm:w-96 sm:h-[calc(100vh-7rem)] sm:max-h-[700px] bg-slate-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
//           >
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                     <MessageCircle className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-white">Shakil IT Support</h3>
//                   <p className="text-xs text-white/80">Online • Typically replies instantly</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-white" />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                       message.type === 'user'
//                         ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
//                         : 'bg-white/10 text-white'
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed">{message.text}</p>
//                     <span className={`text-xs mt-1 block ${
//                       message.type === 'user' ? 'text-white/70' : 'text-slate-400'
//                     }`}>
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}

//               {/* Typing Indicator */}
//               {isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-white/10 rounded-2xl px-4 py-3">
//                     <div className="flex gap-1">
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
//                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Quick Options - Show after name is provided */}
//               {!showNamePrompt && messages.length <= 2 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="space-y-2"
//                 >
//                   <p className="text-xs text-slate-400 text-center mb-3 font-medium">Popular Questions:</p>
//                   <div className="grid grid-cols-1 gap-2">
//                     {quickOptions.map((option, i) => (
//                       <motion.button
//                         key={option.value}
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.3 + i * 0.08 }}
//                         onClick={() => handleQuickOption(option.value)}
//                         className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/50 to-slate-800/30 hover:from-blue-600/20 hover:to-cyan-600/20 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all text-left group"
//                       >
//                         <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
//                           <option.icon className="w-4 h-4 text-blue-400" />
//                         </div>
//                         <span className="text-sm text-slate-200 group-hover:text-white transition-colors font-medium">
//                           {option.text}
//                         </span>
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Name Prompt */}
//             {showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleNameSubmit} className="space-y-3">
//                   <div>
//                     <label className="text-xs text-slate-400 mb-1 block">Your name</label>
//                     <input
//                       type="text"
//                       value={userName}
//                       onChange={(e) => setUserName(e.target.value)}
//                       placeholder="Enter your name..."
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                       autoFocus
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm"
//                   >
//                     Start Chat
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Input - Show after name is provided */}
//             {!showNamePrompt && (
//               <div className="p-4 bg-slate-800/50 border-t border-white/10">
//                 <form onSubmit={handleSendMessage} className="flex gap-2">
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
//                   />
//                   <button
//                     type="submit"
//                     disabled={!inputValue.trim()}
//                     className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Send className="w-5 h-5" />
//                   </button>
//                 </form>

//                 {/* Quick Actions */}
//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => handleContactAction('phone')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Phone className="w-3 h-3" />
//                     Call Now
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('email')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Mail className="w-3 h-3" />
//                     Email Us
//                   </button>
//                   <button
//                     onClick={() => handleContactAction('contact')}
//                     className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors"
//                   >
//                     <Calendar className="w-3 h-3" />
//                     Book Call
//                   </button>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Floating Button */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-6 right-4 sm:right-6 lg:right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl shadow-blue-500/25 flex items-center justify-center z-50 group hover:shadow-blue-500/40 transition-all"
//       >
//         <AnimatePresence mode="wait">
//           {isOpen ? (
//             <motion.div
//               key="close"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ChevronDown className="w-6 h-6 text-white" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="open"
//               initial={{ rotate: -90, opacity: 0 }}
//               animate={{ rotate: 0, opacity: 1 }}
//               exit={{ rotate: 90, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="relative"
//             >
//               <MessageCircle className="w-6 h-6 text-white" />
//               {/* Notification Badge */}
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pulse Ring */}
//         {!isOpen && (
//           <motion.div
//             className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"
//             animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         )}
//       </motion.button>

//       {/* Tooltip - Only show when closed */}
//       <AnimatePresence>
//         {!isOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: 10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 10 }}
//             transition={{ delay: 2 }}
//             className="fixed bottom-6 right-20 sm:right-24 lg:right-28 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap z-40 hidden sm:block"
//           >
//             Need help? Chat with us!
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rotate-45" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ChatWidget;