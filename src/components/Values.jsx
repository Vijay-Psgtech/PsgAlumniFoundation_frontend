// import React from "react";
// import { motion } from "framer-motion";
// import { Heart, Zap, Leaf } from "lucide-react";

// const Values = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15, delayChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5, ease: "easeOut" },
//     },
//   };

//   const values = [
//     {
//       icon: Heart,
//       title: "Integrity",
//       description:
//         "We conduct ourselves with honesty, transparency, and ethical principles in all our endeavors.",
//       color: "from-red-500 to-pink-500",
//       lightColor: "from-red-50 to-pink-50",
//       borderColor: "border-red-200",
//     },
//     {
//       icon: Zap,
//       title: "Support & Commitment",
//       description:
//         "We make every effort to garner support for the benefit of PSG Tech and its stakeholders.",
//       color: "from-amber-500 to-orange-500",
//       lightColor: "from-amber-50 to-orange-50",
//       borderColor: "border-amber-200",
//     },
//     {
//       icon: Leaf,
//       title: "Passion & Growth",
//       description:
//         "We work passionately for the sustainable development and continuous growth of PSG Tech.",
//       color: "from-green-500 to-emerald-500",
//       lightColor: "from-green-50 to-emerald-50",
//       borderColor: "border-green-200",
//     },
//   ];

//   return (
//     <section className="px-6 py-16 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute top-10 right-10 w-72 h-72 bg-red-100/20 rounded-full blur-3xl -z-10" />
//       <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-100/20 rounded-full blur-3xl -z-10" />

//       <div className="mx-auto max-w-6xl">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="space-y-16"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
//               <Heart size={32} className="text-white" />
//             </div>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
//               Our{" "}
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
//                 Values
//               </span>
//             </h2>
//             <p className="text-lg text-slate-600">
//               The principles that guide us
//             </p>
//           </motion.div>

//           {/* Values Grid */}
//           <motion.div
//             variants={containerVariants}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//           >
//             {values.map((value, index) => {
//               const Icon = value.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   variants={cardVariants}
//                   whileHover={{ y: -10 }}
//                   className="group"
//                 >
//                   {/* Card */}
//                   <div
//                     className={`relative h-full rounded-2xl p-8 bg-gradient-to-br ${value.lightColor} border-2 ${value.borderColor} hover:shadow-xl transition-all duration-500 overflow-hidden`}
//                   >
//                     {/* Animated Background Gradient */}
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
//                     />

//                     {/* Content */}
//                     <div className="relative z-10 space-y-4">
//                       {/* Icon */}
//                       <motion.div
//                         whileHover={{ rotate: 10, scale: 1.1 }}
//                         className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
//                       >
//                         <Icon size={28} className="text-white" />
//                       </motion.div>

//                       {/* Title */}
//                       <h3
//                         className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${value.color}`}
//                       >
//                         {value.title}
//                       </h3>

//                       {/* Description */}
//                       <p className="text-slate-700 leading-relaxed text-base">
//                         {value.description}
//                       </p>

//                       {/* Bottom Accent */}
//                       <div className="pt-4 mt-6 border-t-2 border-slate-200 group-hover:border-slate-300 transition-colors duration-300">
//                         <div
//                           className={`w-8 h-1 rounded-full bg-gradient-to-r ${value.color}`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           {/* Summary Section */}
//           <motion.div
//             variants={itemVariants}
//             className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border-2 border-purple-200 text-center"
//           >
//             <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
//               These core values form the foundation of everything we do,
//               ensuring that our
//               <span className="font-bold text-slate-900">
//                 {" "}
//                 actions align with our mission{" "}
//               </span>
//               to support PSG Tech's excellence and development.
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Values;

import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, Leaf } from "lucide-react";

const vals = [
  {Icon:Heart,title:"Integrity",desc:"We conduct ourselves with honesty, transparency, and ethical principles in all our endeavors — building trust across generations.",accent:"#c9a84c",bg:"rgba(201,168,76,.05)"},
  {Icon:Zap,title:"Support & Commitment",desc:"We make every effort to garner support for the benefit of PSG Tech and its stakeholders, standing firm in our commitments.",accent:"#7eb8f7",bg:"rgba(126,184,247,.05)"},
  {Icon:Leaf,title:"Passion & Growth",desc:"We work passionately for the sustainable development and continuous growth of PSG Tech, inspiring alumni to contribute meaningfully.",accent:"#7edfa0",bg:"rgba(126,223,160,.05)"},
];

const Values = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
      .vals-s{background:linear-gradient(175deg,#f8f5ee 0%,#fdfcf9 55%);padding:110px 24px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
      .vals-inner{max-width:1240px;margin:0 auto;}
      .vals-header{text-align:center;margin-bottom:72px;}
      .vals-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#a87630;margin-bottom:20px;}
      .vals-eyebrow::before,.vals-eyebrow::after{content:'';width:28px;height:1.5px;background:linear-gradient(90deg,#b8882a,#e8c560);}
      .vals-h2{font-family:'Playfair Display',serif;font-size:clamp(36px,4.5vw,58px);font-weight:800;color:#0c0e1a;letter-spacing:-.025em;line-height:1.05;}
      .vals-h2 em{font-style:italic;background:linear-gradient(130deg,#a87630,#e0bc55);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
      .vals-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;}
      .val-card{position:relative;padding:44px 36px;background:#fff;border:1px solid rgba(0,0,0,.065);border-radius:4px;overflow:hidden;transition:all .4s cubic-bezier(.4,0,.2,1);cursor:default;}
      .val-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:var(--vacc);transform:scaleX(0);transform-origin:left;transition:transform .4s ease;}
      .val-card:hover{transform:translateY(-7px);box-shadow:0 22px 64px rgba(0,0,0,.1);border-color:transparent;}
      .val-card:hover::before{transform:scaleX(1);}
      .val-icon-wrap{width:52px;height:52px;border-radius:12px;background:var(--vbg);border:1px solid var(--vacc);display:flex;align-items:center;justify-content:center;margin-bottom:28px;transition:transform .3s,box-shadow .3s;}
      .val-card:hover .val-icon-wrap{transform:scale(1.1) rotate(4deg);box-shadow:0 8px 24px rgba(0,0,0,.1);}
      .val-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#0c0e1a;margin-bottom:14px;line-height:1.15;}
      .val-desc{font-size:15px;font-weight:300;line-height:1.78;color:#535e78;}
      .val-num{position:absolute;bottom:22px;right:22px;font-family:'Playfair Display',serif;font-size:80px;font-weight:800;color:rgba(0,0,0,.028);line-height:1;pointer-events:none;user-select:none;}
      .vals-footer{margin-top:52px;padding:44px 52px;border:1px solid rgba(201,168,76,.2);border-radius:12px;background:linear-gradient(135deg,rgba(201,168,76,.04),rgba(201,168,76,.02));text-align:center;position:relative;}
      .vals-footer::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent);}
      .vals-footer-text{font-family:'Playfair Display',serif;font-size:clamp(16px,2vw,20px);font-style:italic;color:#6b5920;line-height:1.6;}
      @media(max-width:820px){.vals-grid{grid-template-columns:1fr;}}
    `}</style>
    <section className="vals-s">
      <div className="vals-inner">
        <motion.div className="vals-header" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} transition={{duration:.8}} viewport={{once:true}}>
          <div className="vals-eyebrow">Our Values</div>
          <h2 className="vals-h2">The Principles That <em>Guide Us</em></h2>
        </motion.div>
        <div className="vals-grid">
          {vals.map(({Icon,title,desc,accent,bg},i)=>(
            <motion.div key={title} className="val-card" style={{"--vacc":accent,"--vbg":bg}}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:.75,delay:i*.11}} viewport={{once:true}}>
              <div className="val-icon-wrap"><Icon size={24} style={{color:accent}}/></div>
              <h3 className="val-title">{title}</h3>
              <p className="val-desc">{desc}</p>
              <div className="val-num">0{i+1}</div>
            </motion.div>
          ))}
        </div>
        <motion.div className="vals-footer" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:.75,delay:.2}} viewport={{once:true}}>
          <p className="vals-footer-text">
            "These core values form the foundation of everything we do — ensuring that our <strong>actions align with our mission</strong> to support PSG Tech's excellence and development."
          </p>
        </motion.div>
      </div>
    </section>
  </>
);
export default Values;
