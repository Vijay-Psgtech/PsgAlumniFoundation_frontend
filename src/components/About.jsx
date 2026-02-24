// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const About = () => {
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

//   const imageVariants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.7, ease: "easeOut" },
//     },
//   };

//   return (
//     <section className="px-6 py-16 md:py-28 bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10" />

//       <div className="mx-auto max-w-7xl">
//         {/* Centered Top Section */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-20"
//         >
//           {/* Badge */}
//           <motion.div variants={itemVariants}>
//             <span className="inline-block px-4 py-2 mb-6 bg-blue-100 border border-blue-300 rounded-full text-sm font-semibold text-blue-700">
//               ✨ About Us
//             </span>
//           </motion.div>

//           <motion.h2
//             variants={itemVariants}
//             className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
//           >
//             "PSG TECH ALUMNI{" "}
//             <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
//               FOUNDATION
//             </span>
//             "
//           </motion.h2>
//           <motion.p
//             variants={itemVariants}
//             className="text-lg md:text-xl text-slate-600 font-medium italic"
//           >
//             Come Curious. Leave Connected.
//           </motion.p>
//         </motion.div>

//         {/* Two-column layout: Image left, Content right */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center"
//         >
//           {/* Left: Image Card */}
//           <motion.div
//             variants={imageVariants}
//             className="flex justify-center order-2 md:order-1"
//           >
//             <motion.div
//               whileHover={{ y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="relative w-full max-w-md lg:max-w-xl"
//             >
//               {/* Decorative border frame */}
//               <div className="absolute -inset-4 bg-linear-to-br from-blue-400 to-purple-400 rounded-2xl blur opacity-25 -z-10" />

//               <div className="relative border-2 border-slate-200 rounded-2xl overflow-hidden shadow-2xl bg-white">
//                 <img
//                   src="/about.webp"
//                   alt="PSG Tech Alumni Foundation"
//                   className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
//                 />
//                 {/* Overlay gradient on hover */}
//                 <div className="absolute inset-0 bg-linear-to-tr from-blue-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Right: Content */}
//           <motion.div
//             variants={itemVariants}
//             className="text-left order-1 md:order-2 space-y-6"
//           >
//             <div>
//               <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
//                 ABOUT THE{" "}
//                 <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
//                   FOUNDATION
//                 </span>
//               </h3>
//             </div>

//             <div className="space-y-4">
//               <p className="text-slate-700 text-base md:text-lg leading-relaxed">
//                 The PSG TECH Alumni Foundation, a long felt need for a financial
//                 arm of PSG Tech Alumni Association, was registered on{" "}
//                 <span className="font-semibold text-slate-900">
//                   19th October 2016
//                 </span>{" "}
//                 as a not-for-profit Trust under the laws of the State of Tamil
//                 Nadu.
//               </p>

//               <p className="text-slate-700 text-base md:text-lg leading-relaxed">
//                 Our mission is to strengthen the bonds between alumni, foster
//                 lifelong connections, and create meaningful opportunities for
//                 professional and personal growth within our vibrant community.
//               </p>
//             </div>

//             <motion.p
//               variants={itemVariants}
//               className="text-lg font-semibold text-slate-900 pt-4 border-t-2 border-slate-200"
//             >
//               Join our active network of alumni and make a lasting impact.
//             </motion.p>

//             <motion.a
//               href="/about"
//               whileHover={{ x: 5 }}
//               className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 mt-4"
//             >
//               Learn More
//               <ArrowRight size={20} />
//             </motion.a>
//           </motion.div>
//         </motion.div>

//         {/* Stats Section */}
//         {/* <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 pt-16 border-t-2 border-slate-200"
//         >
//           {[
//             { number: "5K+", label: "Active Alumni" },
//             { number: "50+", label: "Chapters" },
//             { number: "2016", label: "Since" },
//           ].map((stat, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ y: -5 }}
//               className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
//             >
//               <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
//                 {stat.number}
//               </p>
//               <p className="text-sm md:text-base text-slate-600 font-medium">
//                 {stat.label}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div> */}
//       </div>
//     </section>
//   );
// };

// export default About;

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const About = () => {
  const fade = (d=0) => ({
    hidden:{opacity:0,y:36,filter:"blur(4px)"},
    visible:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:0.85,delay:d,ease:[0.22,1,0.36,1]}}
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600&display=swap');
        .about-s{background:linear-gradient(165deg,#f8f5ee 0%,#fdfcf9 45%,#f2f4fa 100%);padding:110px 24px;position:relative;overflow:hidden;font-family:'Outfit',sans-serif;}
        .about-s::before{content:'';position:absolute;top:-180px;right:-180px;width:500px;height:500px;background:radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 68%);pointer-events:none;}
        .about-s::after{content:'';position:absolute;bottom:-120px;left:-120px;width:400px;height:400px;background:radial-gradient(circle,rgba(80,110,220,.04) 0%,transparent 65%);pointer-events:none;}
        .about-inner{max-width:1240px;margin:0 auto;}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .section-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#a87630;margin-bottom:22px;}
        .section-eyebrow::before{content:'';width:28px;height:1.5px;background:linear-gradient(90deg,#b8882a,#e8c560);}
        .about-h2{font-family:'Playfair Display',serif;font-size:clamp(36px,4.5vw,58px);font-weight:800;color:#0c0e1a;line-height:1.03;margin-bottom:30px;letter-spacing:-.025em;}
        .about-h2 em{font-style:italic;background:linear-gradient(130deg,#a87630,#e0bc55);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .about-p{font-size:16px;font-weight:300;line-height:1.88;color:#464e66;margin-bottom:20px;}
        .about-hl{font-weight:600;color:#0c0e1a;}
        .about-quote-wrap{margin:28px 0;padding:20px 0 20px 24px;border-left:2.5px solid #c9a84c;}
        .about-quote{font-family:'Playfair Display',serif;font-size:19px;font-style:italic;color:#6b5920;line-height:1.5;}
        .about-cta{display:inline-flex;align-items:center;gap:10px;margin-top:36px;padding:13px 30px;background:#0c0e1a;color:#e8c560;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;border-radius:7px;text-decoration:none;border:1px solid rgba(201,168,76,.25);transition:all .35s ease;}
        .about-cta:hover{background:linear-gradient(135deg,#b8882a,#e0bc55);color:#07080e;border-color:transparent;transform:translateY(-2px);box-shadow:0 10px 32px rgba(201,168,76,.3);}
        .img-wrap{position:relative;}
        .img-frame{position:relative;border-radius:3px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.15);}
        .img-frame img{display:block;width:100%;height:480px;object-fit:cover;filter:saturate(.88) contrast(1.06);transition:transform .7s ease,filter .5s ease;}
        .img-frame:hover img{transform:scale(1.05);filter:saturate(1) contrast(1.06);}
        .corner{position:absolute;width:56px;height:56px;border-color:#c9a84c;border-style:solid;}
        .c-tl{top:-10px;left:-10px;border-width:2px 0 0 2px;}
        .c-br{bottom:-10px;right:-10px;border-width:0 2px 2px 0;}
        .img-badge{position:absolute;bottom:-22px;left:28px;background:#0c0e1a;border:1px solid rgba(201,168,76,.28);border-radius:10px;padding:14px 22px;z-index:5;}
        .badge-yr{font-family:'Playfair Display',serif;font-size:34px;font-weight:700;background:linear-gradient(135deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;}
        .badge-txt{font-size:9.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,215,240,.42);margin-top:3px;}
        @media(max-width:820px){.about-grid{grid-template-columns:1fr;gap:56px;}.img-frame img{height:300px;}.img-badge{left:16px;}}
      `}</style>
      <section className="about-s">
        <div className="about-inner">
          <div className="about-grid">
            <motion.div className="img-wrap" variants={fade(0)} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-80px"}}>
              <div className="img-frame">
                <img src="/about.webp" alt="PSG Tech Alumni Foundation"/>
              </div>
              <div className="corner c-tl"/><div className="corner c-br"/>
              <div className="img-badge">
                <div className="badge-yr">2016</div>
                <div className="badge-txt">Year Founded</div>
              </div>
            </motion.div>
            <div>
              <motion.div variants={fade(.12)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                <div className="section-eyebrow">About Us</div>
              </motion.div>
              <motion.h2 className="about-h2" variants={fade(.22)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                PSG Tech Alumni <em>Foundation</em>
              </motion.h2>
              <motion.p className="about-p" variants={fade(.32)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                The PSG TECH Alumni Foundation, a long-felt need for a financial arm of PSG Tech Alumni Association, was registered on <span className="about-hl">19th October 2016</span> as a not-for-profit Trust under the laws of the State of Tamil Nadu.
              </motion.p>
              <motion.p className="about-p" variants={fade(.4)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                Our mission is to strengthen the bonds between alumni, foster lifelong connections, and create meaningful opportunities for professional and personal growth within our vibrant community.
              </motion.p>
              <motion.div className="about-quote-wrap" variants={fade(.48)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                <div className="about-quote">"Come Curious. Leave Connected."</div>
              </motion.div>
              <motion.div variants={fade(.56)} initial="hidden" whileInView="visible" viewport={{once:true}}>
                <a href="/about" className="about-cta">
                  Learn More <ArrowRight size={15}/>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default About;
