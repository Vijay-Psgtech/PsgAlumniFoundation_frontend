// "use client";
// import React from "react";
// import { motion, useReducedMotion } from "framer-motion";
// import { ArrowRight, Users, Calendar, Banknote, Download } from "lucide-react";
// import AboutImg from "../assets/Images/3c2b2ea4eae14b04a4c38c9e00ae71b9.png";

// /* ============================================================
//    PRO LEVEL: PSG TECH ALUMNI — BLUE & WHITE THEMED About Page
//    - Responsive, accessible, performant
//    - Replace image path if needed
//    ============================================================ */

// /* -------------------------
//    Motion helpers
//    ------------------------- */

// /* -------------------------
//    Small presentational components
//    ------------------------- */
// function Badge({ children }) {
//   return (
//     <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold select-none">
//       <Users size={14} /> <span>{children}</span>
//     </span>
//   );
// }

// function CTAButton({ children, href = "#", className = "" }) {
//   return (
//     <a
//       href={href}
//       className={`inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 text-white px-4 py-3 rounded-lg shadow-md ${className}`}
//     >
//       <span className="font-semibold">{children}</span>
//       <ArrowRight size={18} />
//     </a>
//   );
// }

// /* -------------------------
//    Timeline item (modern)
//    ------------------------- */
// function TimelineItem({ title, subtitle, align = "left", delay = 0 }) {
//   const isLeft = align === "left";
//   const mr = isLeft ? "mr-auto" : "ml-auto";
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.7, delay }}
//       className={`w-full flex ${
//         isLeft ? "justify-start" : "justify-end"
//       } relative`}
//     >
//       <div className={`w-[92%] md:w-1/2 ${mr}`}>
//         <div
//           className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
//           role="article"
//           aria-label={title}
//         >
//           <div className="text-sm text-blue-500 font-semibold">{subtitle}</div>
//           <h4 className="mt-2 text-xl font-bold text-blue-800">{title}</h4>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* -------------------------
//    Trustee card
//    ------------------------- */
// function TrusteeCard({ name, role }) {
//   return (
//     <div className="bg-white/90 border border-blue-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
//       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
//         {name
//           .split(" ")
//           .map((n) => n[0])
//           .slice(0, 2)
//           .join("")}
//       </div>
//       <div>
//         <div className="font-semibold text-blue-800">{name}</div>
//         <div className="text-sm text-gray-600">{role}</div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------
//    Main AboutPage
//    ------------------------- */
// export default function AboutPage() {
//   const shouldReduceMotion = useReducedMotion();

//   // Respect user's reduced motion preferences

//   return (
//     <main className="bg-linear-to-b from-white to-blue-50 min-h-screen text-gray-900">
//       {/* Skip link */}
//       <a
//         href="#main-content"
//         className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:p-2 focus:rounded"
//       >
//         Skip to content
//       </a>

//       {/* Hero */}
//       <section aria-labelledby="about-hero" className="pt-30 pb-12 sm:pb-20">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-10 items-center">
//             <motion.div
//               {...(shouldReduceMotion
//                 ? {}
//                 : {
//                     initial: { opacity: 0, y: 12 },
//                     whileInView: { opacity: 1, y: 0 },
//                   })}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//             >
//               <Badge>PSG Tech Alumni</Badge>
//               <h1
//                 id="about-hero"
//                 className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight"
//               >
//                 PSG Tech Alumni Foundation
//               </h1>
//               <p className="mt-4 text-lg text-slate-700 max-w-2xl">
//                 Celebrating a legacy of excellence — connecting Techians
//                 globally with mentorship, opportunities, and purpose-driven
//                 initiatives.
//               </p>

//               <div className="mt-6 flex flex-wrap gap-3">
//                 <CTAButton href="#donate">Donate</CTAButton>
//                 <a
//                   href="/psg-tech-foundation-brochure.pdf"
//                   className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-blue-100 text-blue-700 hover:bg-blue-50 focus-visible:ring-4 focus-visible:ring-blue-200"
//                 >
//                   <Download size={16} /> Brochure
//                 </a>
//               </div>
//             </motion.div>

//             {/* Right-side hero image */}
//             <motion.figure
//               {...(shouldReduceMotion
//                 ? {}
//                 : {
//                     initial: { opacity: 0, scale: 0.98 },
//                     whileInView: { opacity: 1, scale: 1 },
//                   })}
//               transition={{ duration: 0.9 }}
//               className="rounded-2xl overflow-hidden shadow-xl border border-blue-100 bg-white"
//               aria-hidden="true"
//             >
//               <img
//                 src={AboutImg}
//                 alt="PSG Tech Alumni collage"
//                 loading="lazy"
//                 className="w-full h-64 object-cover sm:h-72 md:h-64 lg:h-72"
//               />
//             </motion.figure>
//           </div>
//         </div>
//       </section>

//       {/* Main content */}
//       <section
//         id="main-content"
//         className="max-w-7xl mx-auto px-6 lg:px-8 pb-20"
//       >
//         <div className="grid lg:grid-cols-3 gap-10">
//           {/* Left column: Timeline */}
//           <article className="lg:col-span-2">
//             <header className="mb-8">
//               <h2 className="text-2xl font-bold text-blue-800">Our Journey</h2>
//               <p className="mt-2 text-gray-600">
//                 A concise timeline showing the evolution of our alumni network
//                 and Foundation.
//               </p>
//             </header>

//             <div className="relative">
//               {/* vertical center line */}
//               <div
//                 className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-blue-200 to-blue-300 opacity-70"
//                 aria-hidden="true"
//               />
//               <div className="flex flex-col gap-6">
//                 <TimelineItem
//                   title="Heritage of Excellence"
//                   subtitle="Since foundation"
//                   align="left"
//                   delay={0.05}
//                 />
//                 <TimelineItem
//                   title="Global Chapters"
//                   subtitle="Global network expansion"
//                   align="right"
//                   delay={0.1}
//                 />
//                 <TimelineItem
//                   title="Education & Outreach"
//                   subtitle="Scholarships & programs"
//                   align="left"
//                   delay={0.15}
//                 />
//               </div>
//             </div>

//             {/* Foundation content — YOUR EXACT CONTENT (cleaned for UI) */}
//             <section
//               aria-labelledby="foundation-heading"
//               className="mt-12 bg-white border border-blue-50 rounded-2xl p-6 shadow-sm"
//             >
//               <h3
//                 id="foundation-heading"
//                 className="text-xl font-semibold text-blue-700"
//               >
//                 PSG TECH Alumni Foundation
//               </h3>

//               <div className="mt-4 text-gray-700 space-y-4">
//                 <p>
//                   The PSG TECH Alumni Foundation, a long felt need for a
//                   financial arm of PSG Tech Alumni Association, was registered
//                   on <strong>19th October 2016</strong> as a not-for-profit
//                   Trust under the laws of the State of Tamil Nadu.
//                 </p>

//                 <p>
//                   The Foundation was established to provide an avenue through
//                   which alumni and well-wishers of the PSG College of Technology
//                   and PSG Polytechnic College (PSG Tech) may contribute
//                   financially of PSG Tech Alumni Association in the form of
//                   gifts, grants, and bequests to the Foundation to benefit
//                   present and future students by providing scholarship
//                   assistance and the funding of special projects like PSG-GRD
//                   Science &amp; Technology Museum and Research Centre.
//                 </p>

//                 <p>
//                   The Foundation’s purpose is to receive gifts for the College /
//                   Alumni Association and to hold these contributed funds in
//                   perpetual endowment. Only the accrued interest and / or income
//                   from the funds is expended unless otherwise designated.
//                 </p>

//                 <p>
//                   The Foundation is managed at present by a Board of Trustees
//                   comprising six senior alumni and three ex-officio Trustees
//                   (the Managing Trustee of PSG Institutions, Principal of PSG
//                   College of Technology and President of the PSG Tech Alumni
//                   Association). The Board is empowered to nominate six more
//                   Trustees from among the alumni of PSG Tech. The Board provides
//                   direction for the major functions necessary to carry out the
//                   mission of the Foundation.
//                 </p>

//                 <ol className="list-decimal pl-6 space-y-2 text-gray-700">
//                   <li>
//                     Award of Scholarships to the needy and deserving students.
//                   </li>
//                   <li>
//                     Setting up and Managing the PSG-GRD Museum at Neelambur
//                     campus.
//                   </li>
//                   <li>
//                     Any other activity to support PSG Tech to achieve excellence
//                     in education and research like fellowships to faculty and
//                     students to attend conferences / undergo training programs
//                     in India and abroad, financial help to set up centers of
//                     excellence or new programs, to support a new or established
//                     academic or athletic scholarship, cultural and artistic
//                     events on our campus, or to manage funds and special
//                     projects provided to PSG Tech by well-wishers for specific
//                     purposes.
//                   </li>
//                 </ol>

//                 <p>
//                   The foundation abides by rules and regulations followed in the{" "}
//                   <strong>Indian Trusts Act, 1882</strong>.
//                 </p>
//               </div>
//             </section>
//           </article>

//           {/* Right column: Trustee list + CTA */}
//           <aside className="space-y-6">
//             <div className="sticky top-28">
//               <div className="bg-white border border-blue-50 rounded-2xl p-6 shadow-sm">
//                 <h4 className="text-lg font-semibold text-blue-800">
//                   Board of Trustees
//                 </h4>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Current managing trustees and ex-officio members
//                 </p>

//                 <div className="mt-4 grid gap-3">
//                   <TrusteeCard name="Dr. S. Senior" role="Managing Trustee" />
//                   <TrusteeCard
//                     name="Prof. A. Principal"
//                     role="Principal (Ex-officio)"
//                   />
//                   <TrusteeCard
//                     name="Mr. P. President"
//                     role="President, Alumni Association (Ex-officio)"
//                   />
//                 </div>

//                 <div className="mt-6 flex gap-3">
//                   <CTAButton href="#donate">Support Scholarships</CTAButton>
//                   <a
//                     className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-100 text-blue-700 hover:bg-blue-50"
//                     href="#contact"
//                   >
//                     Contact Trustees
//                   </a>
//                 </div>
//               </div>

//               {/* Quick stats / initiatives */}
//               <div className="mt-6 bg-linear-to-br from-white to-blue-50 border border-blue-100 p-4 rounded-2xl shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <Banknote className="text-blue-600" />
//                   <div>
//                     <div className="text-sm text-gray-600">
//                       Endowment (est.)
//                     </div>
//                     <div className="font-semibold text-blue-800">
//                       Confidential
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-3">
//                   <div className="bg-white p-3 rounded-lg border border-blue-50 text-center">
//                     <div className="text-sm text-gray-500">Scholarships</div>
//                     <div className="font-bold text-blue-700">200+</div>
//                   </div>
//                   <div className="bg-white p-3 rounded-lg border border-blue-50 text-center">
//                     <div className="text-sm text-gray-500">Projects</div>
//                     <div className="font-bold text-blue-700">35+</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         {/* Initiatives grid (full width) */}
//         <div className="mt-12">
//           <h3 className="text-2xl font-semibold text-blue-800 mb-4">
//             Key Initiatives
//           </h3>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               "Alumni Day & Young Alumni Meet",
//               "Entrepreneurship & Innovation Programs",
//               "Technical Conferences & Workshops",
//               "Alumni Innovation Exhibitions",
//               "Underprivileged Student Scholarships",
//               "GRD Inter-Collegiate Tamil Debate",
//               "Academic Excellence Awards",
//             ].map((it, idx) => (
//               <motion.div
//                 key={it}
//                 whileHover={{ y: -6 }}
//                 transition={{ duration: 0.18 }}
//                 className="bg-white border border-blue-50 rounded-xl p-4 shadow-sm flex items-start gap-3"
//                 role="region"
//                 aria-labelledby={`initiative-${idx}`}
//               >
//                 <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
//                   <Calendar size={18} />
//                 </div>
//                 <div>
//                   <div
//                     id={`initiative-${idx}`}
//                     className="font-semibold text-blue-800"
//                   >
//                     {it}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Donate anchor + faux form area (CTA) */}
//       <section
//         id="donate"
//         className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-12"
//       >
//         <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h4 className="text-2xl font-bold">Support the Foundation</h4>
//             <p className="mt-2 text-blue-100">
//               Your gift helps transform student lives — scholarships, labs, and
//               more.
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <a
//               href="/donate"
//               className="inline-flex items-center gap-3 bg-white text-blue-700 px-5 py-3 rounded-lg font-semibold shadow-md"
//             >
//               Donate Now <ArrowRight />
//             </a>
//             <a
//               href="/contact"
//               className="inline-flex items-center gap-2 border border-white/30 px-4 py-3 rounded-lg text-white/90"
//             >
//               Contact Us
//             </a>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Download } from "lucide-react";
import AboutImg from "../assets/Images/3c2b2ea4eae14b04a4c38c9e00ae71b9.png";

const timelineData = [
  { title: "Heritage of Excellence", sub: "Since foundation", side: "left" },
  { title: "Global Chapters", sub: "Global network expansion", side: "right" },
  { title: "Foundation Registered", sub: "19th October 2016", side: "left" },
  { title: "First Scholarships", sub: "Recipients awarded", side: "right" },
  { title: "GRD Museum Initiative", sub: "Major projects launched", side: "left" },
];
const trustees = [
  { name: "Dr. S. Senior", role: "Managing Trustee" },
  { name: "Prof. A. Principal", role: "Principal (Ex-officio)" },
  { name: "Mr. P. President", role: "President, Alumni Association (Ex-officio)" },
];
const initiatives = [
  "Alumni Day & Young Alumni Meet", "Entrepreneurship & Innovation Programs",
  "Technical Conferences & Workshops", "Alumni Innovation Exhibitions",
  "Underprivileged Student Scholarships", "GRD Inter-Collegiate Tamil Debate", "Academic Excellence Awards",
];

function TCard({ name, role }) {
  const ini = name.split(" ").map(n => n[0]).slice(0, 2).join("");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: "1px solid rgba(201,168,76,.1)" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#b8882a,#e0bc55)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14, color: "#08090f", flexShrink: 0 }}>{ini}</div>
      <div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, color: "#f2ede3" }}>{name}</div>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 300, fontSize: 11, color: "rgba(200,215,240,.42)", marginTop: 2 }}>{role}</div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const fade = (d = 0, x = 0) => ({ hidden: { opacity: 0, y: x ? 0 : 28, x }, visible: { opacity: 1, y: 0, x: 0, transition: { duration: .85, delay: d, ease: [0.22, 1, 0.36, 1] } } });
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        .ap { background: linear-gradient(165deg,#f8f5ee 0%,#fdfcf9 50%,#f2f4fb 100%); min-height: 100vh; font-family: "Outfit",sans-serif; padding-top: 90px; }
        .ap-inner { max-width: 1280px; margin: 0 auto; padding: 0 28px; }
        .ap-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; padding: 72px 0 80px; }
        .ap-ey { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: #a87630; margin-bottom: 22px; }
        .ap-ey::before { content: ""; width: 24px; height: 1.5px; background: linear-gradient(90deg,#b8882a,#e8c560); }
        .ap-h1 { font-family: "Playfair Display",serif; font-size: clamp(36px,4.5vw,58px); font-weight: 800; color: #0c0e1a; line-height: 1.04; letter-spacing: -.025em; margin-bottom: 22px; }
        .ap-h1 em { font-style: italic; background: linear-gradient(130deg,#a87630,#e0bc55); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ap-lead { font-size: 17px; font-weight: 300; line-height: 1.82; color: #505868; margin-bottom: 32px; }
        .ap-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-g { display: inline-flex; align-items: center; gap: 9px; padding: 13px 28px; background: #0c0e1a; color: #e8c560; font-family: "Outfit",sans-serif; font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; border-radius: 7px; text-decoration: none; border: 1px solid rgba(201,168,76,.24); transition: all .32s ease; }
        .btn-g:hover { background: linear-gradient(135deg,#b8882a,#e0bc55); color: #07080e; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201,168,76,.28); }
        .btn-gh { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; background: transparent; color: #a87630; font-family: "Outfit",sans-serif; font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; border-radius: 7px; border: 1px solid rgba(201,168,76,.3); text-decoration: none; transition: all .28s ease; }
        .btn-gh:hover { background: rgba(201,168,76,.07); border-color: rgba(201,168,76,.55); }
        .hero-iw { position: relative; }
        .hero-if { border-radius: 4px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.14); }
        .hero-if img { display: block; width: 100%; height: 420px; object-fit: cover; filter: saturate(.88) contrast(1.05); transition: transform .7s ease; }
        .hero-if:hover img { transform: scale(1.04); }
        .hc { position: absolute; width: 52px; height: 52px; border-color: #c9a84c; border-style: solid; }
        .hc-tl { top: -10px; left: -10px; border-width: 2px 0 0 2px; }
        .hc-br { bottom: -10px; right: -10px; border-width: 0 2px 2px 0; }
        .cg { display: grid; grid-template-columns: 1fr 340px; gap: 52px; margin-bottom: 72px; }
        .sl { font-size: 10px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: #a87630; display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
        .sl::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg,rgba(201,168,76,.3),transparent); }
        .ap-h2 { font-family: "Playfair Display",serif; font-size: clamp(26px,3vw,36px); font-weight: 700; color: #0c0e1a; letter-spacing: -.02em; margin-bottom: 24px; line-height: 1.1; }
        .ap-h2 em { font-style: italic; background: linear-gradient(130deg,#a87630,#e0bc55); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ap-p { font-size: 15px; font-weight: 300; line-height: 1.88; color: #505868; margin-bottom: 18px; }
        .ap-ol { font-size: 15px; font-weight: 300; line-height: 1.88; color: #505868; padding-left: 22px; }
        .ap-ol li { margin-bottom: 10px; }
        .tl-wrap { position: relative; margin-top: 44px; }
        .tl-line { position: absolute; left: 50%; transform: translateX(-50%); top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom,rgba(201,168,76,.45),rgba(201,168,76,.08)); }
        .tl-items { display: flex; flex-direction: column; gap: 22px; }
        .tl-r { display: flex; width: 100%; }
        .tl-r.l { justify-content: flex-start; }
        .tl-r.r { justify-content: flex-end; }
        .tl-c { width: 46%; background: #fff; border: 1px solid rgba(201,168,76,.14); border-radius: 10px; padding: 16px 20px; box-shadow: 0 4px 20px rgba(0,0,0,.055); position: relative; }
        .tl-r.l .tl-c::after { content: ""; position: absolute; right: -26px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #c9a84c; border-radius: 50%; }
        .tl-r.r .tl-c::after { content: ""; position: absolute; left: -26px; top: 50%; transform: translateY(-50%); width: 8px; height: 8px; background: #c9a84c; border-radius: 50%; }
        .tl-s { font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: #c9a84c; margin-bottom: 5px; }
        .tl-t { font-family: "Playfair Display",serif; font-size: 16px; font-weight: 700; color: #0c0e1a; }
        .sc { background: #0c0e1a; border: 1px solid rgba(201,168,76,.18); border-radius: 12px; padding: 26px; margin-bottom: 18px; }
        .sc::before { content: ""; display: block; height: 2px; background: linear-gradient(90deg,#b8882a,#e8c560,#b8882a); border-radius: 2px; margin-bottom: 20px; }
        .sc-ti { font-family: "Playfair Display",serif; font-size: 19px; font-weight: 700; color: #f2ede3; margin-bottom: 4px; }
        .sc-su { font-size: 11px; font-weight: 300; color: rgba(200,215,240,.4); margin-bottom: 18px; letter-spacing: .02em; }
        .sc-sv { font-family: "Playfair Display",serif; font-size: 28px; font-weight: 700; background: linear-gradient(135deg,#c9a84c,#f0d870); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 4px; }
        .sc-sl { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: rgba(200,215,240,.33); }
        .ig { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-top: 48px; }
        .ic { background: #fff; border: 1px solid rgba(0,0,0,.07); border-radius: 8px; padding: 18px 16px; transition: all .32s ease; position: relative; overflow: hidden; }
        .ic::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#b8882a,#e8c560); transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }
        .ic:hover { transform: translateY(-5px); box-shadow: 0 16px 44px rgba(0,0,0,.09); }
        .ic:hover::before { transform: scaleX(1); }
        .ii { width: 36px; height: 36px; border-radius: 7px; background: rgba(201,168,76,.07); border: 1px solid rgba(201,168,76,.18); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .it { font-size: 12.5px; font-weight: 600; color: #0c0e1a; line-height: 1.4; }
        .cb { background: #0c0e1a; border: 1px solid rgba(201,168,76,.17); border-radius: 14px; padding: 52px 60px; display: flex; justify-content: space-between; align-items: center; gap: 32px; margin: 72px 0; position: relative; overflow: hidden; }
        .cb::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#b8882a,#e8c560,#b8882a); }
        .cb-h { font-family: "Playfair Display",serif; font-size: 26px; font-weight: 700; color: #f2ede3; margin-bottom: 8px; }
        .cb-p { font-size: 14px; font-weight: 300; color: rgba(200,215,240,.48); }
        @media(max-width:900px) {
          .ap-hero { grid-template-columns: 1fr; gap: 40px; }
          .cg { grid-template-columns: 1fr; }
          .ig { grid-template-columns: 1fr 1fr; }
          .cb { flex-direction: column; text-align: center; padding: 36px 24px; }
          .hero-if img { height: 280px; }
          .tl-line,.tl-r.l .tl-c::after,.tl-r.r .tl-c::after { display: none; }
          .tl-r { justify-content: flex-start !important; }
          .tl-c { width: 100%; }
        }
      `}</style>
      <main className="ap">
        <div className="ap-inner">
          <div className="ap-hero">
            <motion.div variants={fade(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="ap-ey">PSG Tech Alumni Foundation</div>
              <h1 className="ap-h1">Connecting <em>Techians</em><br />Across the Globe</h1>
              <p className="ap-lead">Celebrating a legacy of excellence — connecting alumni globally with mentorship, opportunities, and purpose-driven initiatives since 2016.</p>
              <div className="ap-btns">
                <a href="/donate" className="btn-g">Donate <ArrowRight size={15} /></a>
                <a href="/psg-tech-foundation-brochure.pdf" className="btn-gh"><Download size={13} /> Brochure</a>
              </div>
            </motion.div>
            <motion.div className="hero-iw" variants={fade(.12)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="hero-if"><img src={AboutImg} alt="PSG Tech Alumni Foundation" /></div>
              <div className="hc hc-tl" /><div className="hc hc-br" />
            </motion.div>
          </div>

          <div className="cg">
            <article>
              <div className="sl">Our Story</div>
              <h2 className="ap-h2">Built on <em>Legacy</em>, Driven by Purpose</h2>
              <p className="ap-p">The PSG TECH Alumni Foundation, a long felt need for a financial arm of PSG Tech Alumni Association, was registered on <strong>19th October 2016</strong> as a not-for-profit Trust under the laws of the State of Tamil Nadu.</p>
              <p className="ap-p">The Foundation was established to provide an avenue through which alumni and well-wishers may contribute financially through gifts, grants, and bequests to benefit present and future students — providing scholarship assistance and funding special projects like PSG-GRD Science & Technology Museum and Research Centre.</p>
              <p className="ap-p">The Foundation's purpose is to receive gifts for the College / Alumni Association and to hold these contributed funds in perpetual endowment. Only the accrued interest and/or income from the funds is expended unless otherwise designated.</p>
              <p className="ap-p">The Foundation is managed by a Board of Trustees comprising six senior alumni and three ex-officio Trustees. The Board provides direction for major functions necessary to carry out the mission of the Foundation.</p>
              <ol className="ap-ol">
                <li>Award of Scholarships to the needy and deserving students.</li>
                <li>Setting up and Managing the PSG-GRD Museum at Neelambur campus.</li>
                <li>Any other activity to support PSG Tech to achieve excellence in education and research including fellowships, centers of excellence, new programs, and special projects.</li>
              </ol>
              <p className="ap-p" style={{ marginTop: 18 }}>The foundation abides by rules and regulations followed in the <strong>Indian Trusts Act, 1882</strong>.</p>

              <div className="sl" style={{ marginTop: 48 }}>Our Journey</div>
              <div className="tl-wrap">
                <div className="tl-line" />
                <div className="tl-items">
                  {timelineData.map((t, i) => (
                    <motion.div key={t.title} className={`tl-r ${t.side === "left" ? "l" : "r"}`}
                      initial={{ opacity: 0, x: t.side === "left" ? -28 : 28 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: i * .08 }} viewport={{ once: true }}>
                      <div className="tl-c"><div className="tl-s">{t.sub}</div><div className="tl-t">{t.title}</div></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </article>

            <aside>
              <motion.div className="sc" variants={fade(.18)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="sc-ti">Board of Trustees</div>
                <div className="sc-su">Current managing trustees and ex-officio members</div>
                {trustees.map(t => <TCard key={t.name} {...t} />)}
                <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                  <a href="/donate" className="btn-g" style={{ flex: 1, justifyContent: "center", fontSize: 11 }}>Support</a>
                  <a href="/contact" className="btn-gh" style={{ flex: 1, justifyContent: "center", fontSize: 11 }}>Contact</a>
                </div>
              </motion.div>
              <motion.div className="sc" variants={fade(.28)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="sc-ti" style={{ marginBottom: 16 }}>Impact Numbers</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[{ v: "200+", l: "Scholarships" }, { v: "35+", l: "Projects" }].map(s => (
                    <div key={s.l} style={{ background: "rgba(201,168,76,.06)", border: "1px solid rgba(201,168,76,.13)", borderRadius: 8, padding: 14, textAlign: "center" }}>
                      <div className="sc-sv">{s.v}</div><div className="sc-sl">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(201,168,76,.04)", border: "1px solid rgba(201,168,76,.1)", borderRadius: 8 }}>
                  <div style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(200,215,240,.3)", marginBottom: 4 }}>Endowment</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(200,215,240,.55)" }}>Confidential</div>
                </div>
              </motion.div>
            </aside>
          </div>

          <div className="sl">Key Initiatives</div>
          <div className="ig">
            {initiatives.map((it, i) => (
              <motion.div key={it} className="ic" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: i * .055 }} viewport={{ once: true }}>
                <div className="ii"><Calendar size={15} style={{ color: "#c9a84c" }} /></div>
                <div className="it">{it}</div>
              </motion.div>
            ))}
          </div>

          <motion.div className="cb" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .75 }} viewport={{ once: true }}>
            <div><div className="cb-h">Support the Foundation</div><div className="cb-p">Your gift helps transform student lives — scholarships, labs, and more.</div></div>
            <div className="ap-btns">
              <a href="/donate" className="btn-g">Donate Now <ArrowRight size={15} /></a>
              <a href="/contact" className="btn-gh">Contact Us</a>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}