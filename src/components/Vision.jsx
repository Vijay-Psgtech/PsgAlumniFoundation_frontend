// import React from "react";
// import { motion } from "framer-motion";
// import { Target } from "lucide-react";

// const Vision = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2, delayChildren: 0.1 },
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

//   return (
//     <section className="px-6 py-16 md:py-28 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl -z-10" />

//       <div className="mx-auto max-w-5xl">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="space-y-8"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-lg">
//               <Target size={32} className="text-white" />
//             </div>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
//               Our{" "}
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
//                 Vision
//               </span>
//             </h2>
//             <p className="text-lg text-slate-600">What we aspire to achieve</p>
//           </motion.div>

//           {/* Main Content Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             className="relative group"
//           >
//             {/* Background Gradient Border */}
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500 -z-10" />

//             <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-xl">
//               {/* Decorative Top Accent */}
//               <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-transparent rounded-b-full" />

//               <motion.p
//                 variants={itemVariants}
//                 className="text-lg md:text-2xl leading-relaxed text-slate-800 font-medium"
//               >
//                 To strive to be the{" "}
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 font-bold">
//                   major support for PSG Tech's
//                 </span>{" "}
//                 commitment to provide the{" "}
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 font-bold">
//                   best learning environment
//                 </span>
//                 .
//               </motion.p>

//               {/* Bottom Accent */}
//               <div className="mt-8 pt-8 border-t-2 border-blue-100 flex items-center gap-3">
//                 <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
//                 <p className="text-sm text-slate-600 font-semibold uppercase tracking-wider">
//                   Foundation Goal
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Stats Highlight */}
//           <motion.div
//             variants={itemVariants}
//             className="grid grid-cols-2 gap-4 mt-12"
//           >
//             {[
//               { label: "Excellence", value: "First Priority" },
//               { label: "Impact", value: "Sustainable" },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05 }}
//                 className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-400 transition-all duration-300 text-center"
//               >
//                 <p className="text-xs md:text-sm text-blue-600 font-semibold uppercase tracking-wider mb-1">
//                   {stat.label}
//                 </p>
//                 <p className="text-sm md:text-lg font-bold text-slate-900">
//                   {stat.value}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Vision;

import React from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

const Vision = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
      .vision-s{background:#080b18;padding:110px 24px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
      .vision-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
      .vision-inner{max-width:860px;margin:0 auto;text-align:center;position:relative;z-index:2;}
      .vision-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,168,76,.72);margin-bottom:26px;}
      .vision-eyebrow .vline{width:28px;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.65));}
      .vision-h2{font-family:'Playfair Display',serif;font-size:clamp(40px,6vw,70px);font-weight:800;color:#f2ede3;line-height:1.0;margin-bottom:60px;letter-spacing:-.025em;}
      .vision-h2 em{font-style:italic;background:linear-gradient(130deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
      .vision-card{position:relative;background:rgba(255,255,255,.028);border:1px solid rgba(201,168,76,.17);border-radius:14px;padding:56px 60px;text-align:left;overflow:hidden;}
      .vision-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#a86e20,#e8c255,#a86e20);}
      .vision-qmark{font-family:'Playfair Display',serif;font-size:150px;line-height:.75;color:rgba(201,168,76,.07);position:absolute;top:18px;left:32px;font-style:italic;pointer-events:none;user-select:none;}
      .vision-text{font-family:'Playfair Display',serif;font-size:clamp(20px,2.6vw,28px);font-weight:500;color:rgba(232,238,252,.82);line-height:1.62;font-style:italic;position:relative;z-index:2;}
      .vision-text strong{font-style:normal;font-weight:700;background:linear-gradient(130deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
      .vision-divider{width:48px;height:1.5px;background:linear-gradient(90deg,#c9a84c,#f0d870);margin:28px 0 18px;}
      .vision-footer{font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,215,240,.3);}
      .vision-stats{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:30px;}
      .vstat{padding:22px;border:1px solid rgba(201,168,76,.1);border-radius:10px;background:rgba(255,255,255,.018);text-align:center;transition:all .32s ease;}
      .vstat:hover{border-color:rgba(201,168,76,.28);transform:translateY(-3px);}
      .vstat-val{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;background:linear-gradient(135deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;margin-bottom:6px;}
      .vstat-lbl{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,215,240,.32);}
      @media(max-width:600px){.vision-card{padding:36px 24px;}}
    `}</style>
    <section className="vision-s">
      <div className="vision-orb" style={{width:420,height:420,top:-100,right:-100,background:"rgba(201,168,76,.055)"}}/>
      <div className="vision-orb" style={{width:320,height:320,bottom:-80,left:-80,background:"rgba(70,110,220,.045)"}}/>
      <div className="vision-inner">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{duration:.75}} viewport={{once:true}}>
          <div className="vision-eyebrow">
            <div className="vline"/>Our Vision<div className="vline" style={{background:"linear-gradient(90deg,rgba(201,168,76,.65),transparent)"}}/>
          </div>
        </motion.div>
        <motion.h2 className="vision-h2" initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} transition={{duration:.8,delay:.1}} viewport={{once:true}}>
          What We <em>Aspire</em><br/>to Achieve
        </motion.h2>
        <motion.div className="vision-card" initial={{opacity:0,y:38}} whileInView={{opacity:1,y:0}} transition={{duration:.9,delay:.2}} viewport={{once:true}}>
          <div className="vision-qmark">"</div>
          <p className="vision-text">
            To strive to be the <strong>major support for PSG Tech's</strong> commitment to provide the <strong>best learning environment</strong> for every student who walks through its doors.
          </p>
          <div className="vision-divider"/>
          <div className="vision-footer">Foundation Core Goal</div>
          <div className="vision-stats">
            {[{v:"Excellence",l:"First Priority"},{v:"Sustainable",l:"Impact Model"}].map(s=>(
              <div className="vstat" key={s.l}><div className="vstat-val">{s.v}</div><div className="vstat-lbl">{s.l}</div></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  </>
);
export default Vision;
