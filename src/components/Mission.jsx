// import React from "react";
// import { motion } from "framer-motion";
// import { Compass, Users, DollarSign, Briefcase, Building2 } from "lucide-react";

// const Mission = () => {
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

//   const missionPoints = [
//     {
//       icon: Users,
//       title: "Foster Active Interest",
//       description:
//         "Stimulate and foster active interest among alumni and friends to volunteer in support of PSG Tech.",
//     },
//     {
//       icon: DollarSign,
//       title: "Consistent Fund Flow",
//       description:
//         "Create and maintain a consistent flow of funds to achieve the Vision and support institutional growth.",
//     },
//     {
//       icon: Briefcase,
//       title: "Secure & Manage Funds",
//       description:
//         "Secure, manage, and disburse private funds strategically to meet organizational objectives.",
//     },
//   ];

//   const majorProjects = [
//     {
//       icon: Users,
//       title: "Scholarship Augmentation",
//       description:
//         "Enhance and expand scholarship programs to support deserving students in pursuing excellence.",
//     },
//     {
//       icon: Building2,
//       title: "GRD Science & Technology Museum",
//       description:
//         "Establish and develop a comprehensive Science and Technology Museum showcasing innovation.",
//     },
//     {
//       icon: Briefcase,
//       title: "Research Centre",
//       description:
//         "Set up a dedicated Research Centre to foster groundbreaking research and development initiatives.",
//     },
//   ];

//   return (
//     <section className="px-6 py-16 md:py-28 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl -z-10" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -z-10" />

//       <div className="mx-auto max-w-6xl">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="space-y-20"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants} className="text-center mb-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mb-6 shadow-lg">
//               <Compass size={32} className="text-white" />
//             </div>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
//               Our{" "}
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
//                 Mission
//               </span>
//             </h2>
//             <p className="text-lg text-slate-600">How we will make an impact</p>
//           </motion.div>

//           {/* Mission Points */}
//           <motion.div variants={containerVariants} className="space-y-8">
//             <motion.h3
//               variants={itemVariants}
//               className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3"
//             >
//               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500" />
//               <span>The Trust Will</span>
//             </motion.h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {missionPoints.map((point, index) => {
//                 const Icon = point.icon;
//                 return (
//                   <motion.div
//                     key={index}
//                     variants={itemVariants}
//                     whileHover={{ y: -5 }}
//                     className="group"
//                   >
//                     <div className="h-full rounded-xl p-6 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
//                       {/* Accent Line */}
//                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300" />

//                       {/* Step Number */}
//                       <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
//                         {index + 1}
//                       </div>

//                       <Icon
//                         size={32}
//                         className="text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300"
//                       />
//                       <h4 className="text-lg font-bold text-slate-900 mb-3">
//                         {point.title}
//                       </h4>
//                       <p className="text-slate-700 leading-relaxed">
//                         {point.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* Divider */}
//           <motion.div
//             variants={itemVariants}
//             className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
//           />

//           {/* Major Projects Section */}
//           <motion.div variants={containerVariants} className="space-y-8">
//             <motion.h3
//               variants={itemVariants}
//               className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3"
//             >
//               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500" />
//               <span>Major Projects to Begin With</span>
//             </motion.h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {majorProjects.map((project, index) => {
//                 const Icon = project.icon;
//                 return (
//                   <motion.div
//                     key={index}
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.03 }}
//                     className="group"
//                   >
//                     <div className="h-full rounded-2xl p-8 bg-white border-2 border-slate-200 hover:border-teal-400 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
//                       {/* Background Gradient on Hover */}
//                       <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

//                       {/* Icon Container */}
//                       <motion.div
//                         whileHover={{ rotate: 12 }}
//                         className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
//                       >
//                         <Icon size={32} className="text-white" />
//                       </motion.div>

//                       {/* Content */}
//                       <h4 className="text-xl font-bold text-slate-900 mb-3">
//                         {project.title}
//                       </h4>
//                       <p className="text-slate-700 leading-relaxed mb-6">
//                         {project.description}
//                       </p>

//                       {/* Learn More Link */}
//                       <motion.div
//                         whileHover={{ x: 5 }}
//                         className="inline-flex items-center text-green-600 font-semibold hover:text-teal-600 transition-colors duration-300"
//                       >
//                         Explore More <span className="ml-2">→</span>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* Call to Action */}
//           <motion.div
//             variants={itemVariants}
//             className="mt-12 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 text-white text-center"
//           >
//             <h3 className="text-2xl md:text-3xl font-bold mb-4">
//               Join Our Mission
//             </h3>
//             <p className="text-lg opacity-95 mb-6">
//               Be part of our collective effort to support PSG Tech's growth and
//               excellence
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-slate-50 transition-colors duration-300 shadow-lg"
//             >
//               Get Involved Today
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Mission;

import React from "react";
import { motion } from "framer-motion";
import { Compass, Users, DollarSign, Briefcase, Building2 } from "lucide-react";

const pillars = [
  {Icon:Users,n:"01",title:"Foster Active Interest",desc:"Stimulate and foster active interest among alumni and friends to volunteer in support of PSG Tech."},
  {Icon:DollarSign,n:"02",title:"Consistent Fund Flow",desc:"Create and maintain a consistent flow of funds to achieve the Vision and support institutional growth."},
  {Icon:Briefcase,n:"03",title:"Secure & Manage Funds",desc:"Secure, manage, and disburse private funds strategically to meet organizational objectives."},
];
const projects = [
  {Icon:Users,title:"Scholarship Augmentation",desc:"Enhance and expand scholarship programs to support deserving students in pursuing excellence.",emoji:"🎓"},
  {Icon:Building2,title:"GRD Science & Technology Museum",desc:"Establish a comprehensive Science and Technology Museum showcasing innovation.",emoji:"🏛️"},
  {Icon:Briefcase,title:"Research Centre",desc:"Set up a dedicated Research Centre to foster groundbreaking research and development initiatives.",emoji:"🔬"},
];

const Mission = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
      .miss-s{background:#080b18;padding:110px 24px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
      .miss-inner{max-width:1240px;margin:0 auto;position:relative;z-index:2;}
      .miss-header{text-align:center;margin-bottom:80px;}
      .miss-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,168,76,.68);margin-bottom:24px;}
      .miss-h2{font-family:'Playfair Display',serif;font-size:clamp(38px,5vw,66px);font-weight:800;color:#f2ede3;letter-spacing:-.025em;line-height:1.0;margin-bottom:16px;}
      .miss-h2 em{font-style:italic;background:linear-gradient(130deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
      .miss-sub{font-size:15px;font-weight:300;color:rgba(200,215,240,.42);letter-spacing:.02em;}
      .miss-section-lbl{font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,168,76,.48);margin-bottom:28px;display:flex;align-items:center;gap:16px;}
      .miss-section-lbl::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,.28),transparent);}
      .pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.1);border-radius:8px;overflow:hidden;margin-bottom:80px;}
      .pillar{background:rgba(255,255,255,.022);padding:40px 32px;transition:background .3s;}
      .pillar:hover{background:rgba(201,168,76,.048);}
      .pillar-n{font-family:'Playfair Display',serif;font-size:52px;font-weight:800;background:linear-gradient(135deg,rgba(201,168,76,.32),rgba(240,208,128,.18));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;margin-bottom:22px;}
      .pillar-title{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:#f2ede3;margin-bottom:12px;line-height:1.2;}
      .pillar-desc{font-size:14px;font-weight:300;line-height:1.72;color:rgba(200,215,240,.44);}
      .proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
      .proj-card{padding:36px 28px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.055);border-radius:12px;transition:all .38s ease;position:relative;overflow:hidden;}
      .proj-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.35),transparent);opacity:0;transition:opacity .35s;}
      .proj-card:hover{border-color:rgba(201,168,76,.24);transform:translateY(-4px);box-shadow:0 18px 52px rgba(0,0,0,.42);}
      .proj-card:hover::after{opacity:1;}
      .proj-emoji{font-size:38px;margin-bottom:20px;display:block;}
      .proj-title{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:#f2ede3;margin-bottom:12px;line-height:1.2;}
      .proj-desc{font-size:14px;font-weight:300;line-height:1.72;color:rgba(200,215,240,.44);margin-bottom:24px;}
      .proj-link{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9a84c;display:flex;align-items:center;gap:8px;}
      .miss-cta{margin-top:72px;text-align:center;padding:60px;border:1px solid rgba(201,168,76,.17);border-radius:14px;background:rgba(201,168,76,.025);position:relative;}
      .miss-cta::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent);}
      .miss-cta-h{font-family:'Playfair Display',serif;font-size:clamp(26px,3.5vw,40px);font-weight:700;color:#f2ede3;margin-bottom:14px;}
      .miss-cta-p{font-size:15px;font-weight:300;color:rgba(200,215,240,.48);max-width:450px;margin:0 auto 30px;line-height:1.72;}
      .miss-cta-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 36px;background:linear-gradient(135deg,#b8882a,#e8c255);color:#07080e;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:none;border-radius:7px;cursor:pointer;transition:all .35s ease;}
      .miss-cta-btn:hover{box-shadow:0 8px 30px rgba(201,168,76,.4);transform:translateY(-2px);}
      @media(max-width:820px){.pillars-grid{grid-template-columns:1fr;}.proj-grid{grid-template-columns:1fr;}.miss-cta{padding:36px 20px;}}
    `}</style>
    <section className="miss-s">
      <div style={{position:"absolute",top:-180,right:-180,width:560,height:560,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 68%)",pointerEvents:"none"}}/>
      <div className="miss-inner">
        <motion.div className="miss-header" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} transition={{duration:.8}} viewport={{once:true}}>
          <div className="miss-eyebrow">Our Mission</div>
          <h2 className="miss-h2">How We Make an <em>Impact</em></h2>
          <p className="miss-sub">The strategic pillars that drive our work forward</p>
        </motion.div>
        <div className="miss-section-lbl">The Trust Will</div>
        <motion.div className="pillars-grid" initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} transition={{duration:.8,delay:.1}} viewport={{once:true}}>
          {pillars.map(({n,title,desc})=>(
            <div className="pillar" key={n}><div className="pillar-n">{n}</div><h4 className="pillar-title">{title}</h4><p className="pillar-desc">{desc}</p></div>
          ))}
        </motion.div>
        <div className="miss-section-lbl">Major Projects to Begin With</div>
        <div className="proj-grid">
          {projects.map(({emoji,title,desc},i)=>(
            <motion.div key={title} className="proj-card" initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} transition={{duration:.75,delay:i*.1}} viewport={{once:true}}>
              <span className="proj-emoji">{emoji}</span>
              <h4 className="proj-title">{title}</h4>
              <p className="proj-desc">{desc}</p>
              <div className="proj-link">Explore More →</div>
            </motion.div>
          ))}
        </div>
        <motion.div className="miss-cta" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} transition={{duration:.75}} viewport={{once:true}}>
          <h3 className="miss-cta-h">Join Our Mission</h3>
          <p className="miss-cta-p">Be part of our collective effort to support PSG Tech's growth and excellence for the next generation.</p>
          <button className="miss-cta-btn" onClick={()=>window.location.href="/donate"}>
            Get Involved Today <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </motion.div>
      </div>
    </section>
  </>
);
export default Mission;
