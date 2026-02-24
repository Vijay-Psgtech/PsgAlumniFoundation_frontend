// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Users,
//   FileCheck,
//   ShieldCheck,
//   UploadCloud,
//   Heart,
// } from "lucide-react";
// import { Card, CardContent } from "../components/ui/card";
// import { Button } from "../components/ui/button";

// export default function DonationGate() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     pan: "",
//     mobile: "",
//     email: "",
//     purpose: "",
//   });

//   const [files, setFiles] = useState({
//     aadhaar: null,
//     pan: null,
//     consent: null,
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [verified, setVerified] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileUpload = (key) => (e) => {
//     setFiles({ ...files, [key]: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSubmitted(true);

//     setTimeout(() => {
//       setVerified(true);
//       setLoading(false);
//     }, 2500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
//       {/* Decorative Background Elements */}
//       <div className="fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* HEADER SECTION */}
//         <motion.div
//           className="mb-12 text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="inline-flex items-center justify-center gap-3 mb-6">
//             <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
//               <Heart size={32} className="text-white" />
//             </div>
//           </div>
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
//             Support PSG Tech
//           </h1>
//           <p className="text-lg text-gray-300">Alumni Philanthropy Gateway</p>
//         </motion.div>

//         {/* PROGRESS STEPS */}
//         <div className="mb-10">
//           <div className="grid grid-cols-3 gap-4 text-center">
//             {[
//               { number: 1, label: "Donor KYC", completed: submitted },
//               { number: 2, label: "Review", completed: verified },
//               { number: 3, label: "Donate", completed: verified },
//             ].map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1, duration: 0.5 }}
//               >
//                 <div
//                   className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
//                     step.completed
//                       ? "bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30"
//                       : submitted && idx !== 0
//                       ? "bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-blue-500/30"
//                       : "bg-white/5 border border-white/10"
//                   }`}
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
//                       step.completed
//                         ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
//                         : submitted && idx !== 0
//                         ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
//                         : "bg-white/10 text-gray-400"
//                     }`}
//                   >
//                     {step.completed ? "✓" : step.number}
//                   </div>
//                   <span
//                     className={`text-xs sm:text-sm font-semibold transition-all duration-300 ${
//                       step.completed
//                         ? "text-green-400"
//                         : submitted && idx !== 0
//                         ? "text-blue-300"
//                         : "text-gray-400"
//                     }`}
//                   >
//                     {step.label}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* MAIN CARD */}
//         <motion.div
//           className="relative group"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Gradient Border Effect */}
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

//           <Card className="relative bg-slate-800/50 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
//             <CardContent className="p-8 sm:p-10 md:p-12">
//               {/* FORM */}
//               {!submitted && (
//                 <motion.form
//                   onSubmit={handleSubmit}
//                   className="space-y-8"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {/* SECTION TITLE - DONOR INFO */}
//                   <div>
//                     <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                       <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
//                       Donor Information
//                     </h2>

//                     {/* Full Name */}
//                     <div className="grid gap-2 mb-6">
//                       <label className="text-gray-300 text-sm font-semibold">
//                         Full Name <span className="text-red-400">*</span>
//                       </label>
//                       <input
//                         name="fullName"
//                         placeholder="Enter full name as per records"
//                         className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-all duration-300"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     {/* Residential Address */}
//                     <div className="grid gap-2 mb-6">
//                       <label className="text-gray-300 text-sm font-semibold">
//                         Residential Address{" "}
//                         <span className="text-red-400">*</span>
//                       </label>
//                       <input
//                         name="address"
//                         placeholder="Address for 80G compliance"
//                         className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-all duration-300"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     {/* PAN Number */}
//                     <div className="grid gap-2 mb-6">
//                       <label className="text-gray-300 text-sm font-semibold">
//                         PAN Number <span className="text-red-400">*</span>
//                       </label>
//                       <input
//                         name="pan"
//                         placeholder="ABCDE1234F"
//                         className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-all duration-300"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     {/* Mobile & Email - Two Column */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//                       <div className="grid gap-2">
//                         <label className="text-gray-300 text-sm font-semibold">
//                           Mobile Number <span className="text-red-400">*</span>
//                         </label>
//                         <input
//                           name="mobile"
//                           placeholder="10-digit mobile for verification"
//                           className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-all duration-300"
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="grid gap-2">
//                         <label className="text-gray-300 text-sm font-semibold">
//                           Email ID <span className="text-red-400">*</span>
//                         </label>
//                         <input
//                           name="email"
//                           type="email"
//                           placeholder="Official email for receipts"
//                           className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-all duration-300"
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* DIVIDER */}
//                   <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//                   {/* SECTION TITLE - KYC DOCUMENTS */}
//                   <div>
//                     <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                       <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
//                       KYC Documents
//                     </h2>

//                     {/* FILE UPLOADS */}
//                     <div className="space-y-4 mb-6">
//                       {[
//                         {
//                           key: "aadhaar",
//                           label: "Aadhaar Card Copy",
//                           icon: ShieldCheck,
//                         },
//                         {
//                           key: "pan",
//                           label: "PAN Card Copy",
//                           icon: ShieldCheck,
//                         },
//                         {
//                           key: "consent",
//                           label: "Contribution Consent Letter",
//                           icon: FileCheck,
//                         },
//                       ].map((doc) => (
//                         <motion.div
//                           key={doc.key}
//                           whileHover={{ scale: 1.02 }}
//                           className="relative group/file"
//                         >
//                           <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
//                             {/* Background gradient on hover */}
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover/file:from-blue-500/5 group-hover/file:to-purple-500/5 transition-all duration-300" />

//                             <label className="relative flex items-center gap-3 cursor-pointer">
//                               <UploadCloud
//                                 size={20}
//                                 className="text-blue-400 flex-shrink-0"
//                               />
//                               <div className="flex-1">
//                                 <div className="text-white font-semibold text-sm">
//                                   {doc.label}{" "}
//                                   <span className="text-red-400">*</span>
//                                 </div>
//                                 <div className="text-gray-500 text-xs mt-1">
//                                   {files[doc.key]
//                                     ? `✓ ${files[doc.key].name}`
//                                     : "Click to upload or drag and drop"}
//                                 </div>
//                               </div>
//                               {files[doc.key] && (
//                                 <ShieldCheck
//                                   size={20}
//                                   className="text-green-400 flex-shrink-0"
//                                 />
//                               )}
//                               <input
//                                 type="file"
//                                 accept=".pdf,.jpg,.jpeg,.png"
//                                 onChange={handleFileUpload(doc.key)}
//                                 required
//                                 className="hidden"
//                               />
//                             </label>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* DIVIDER */}
//                   <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//                   {/* PURPOSE */}
//                   <div>
//                     <label className="text-gray-300 text-sm font-semibold block mb-2">
//                       Donation Purpose <span className="text-red-400">*</span>
//                     </label>
//                     <textarea
//                       name="purpose"
//                       placeholder="Optional note for the alumni committee"
//                       className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10 focus:outline-none transition-all duration-300 h-24 resize-none"
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* SUBMIT BUTTON */}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
//                   >
//                     Submit for Verification
//                   </motion.button>
//                 </motion.form>
//               )}

//               {/* VERIFICATION LOADING */}
//               {submitted && !verified && (
//                 <motion.div
//                   className="text-center py-16 space-y-6"
//                   initial={{ opacity: 0.3 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <div className="flex justify-center">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                     >
//                       <UploadCloud size={48} className="text-blue-400" />
//                     </motion.div>
//                   </div>
//                   <div>
//                     <h2 className="text-3xl font-bold text-white mb-2">
//                       {loading ? "Validating for Compliance…" : "Under Review"}
//                     </h2>
//                     <p className="text-gray-400">
//                       Your KYC documents are being processed
//                     </p>
//                   </div>
//                 </motion.div>
//               )}

//               {/* VERIFIED */}
//               {verified && (
//                 <motion.div
//                   className="space-y-8 py-6"
//                   initial={{ scale: 0.95, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {/* Success Header */}
//                   <div className="text-center space-y-3">
//                     <motion.div
//                       animate={{ scale: [1, 1.1, 1] }}
//                       transition={{ duration: 0.6 }}
//                     >
//                       <FileCheck size={48} className="mx-auto text-green-400" />
//                     </motion.div>
//                     <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
//                       KYC Approved!
//                     </h2>
//                     <p className="text-gray-300">
//                       Your verification is complete
//                     </p>
//                   </div>

//                   {/* SUMMARY */}
//                   <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6 rounded-2xl border border-green-500/30">
//                     <div className="flex items-center gap-2 text-green-400 font-bold text-sm mb-4">
//                       <ShieldCheck size={18} />
//                       Verified Donor Profile
//                     </div>
//                     <div className="space-y-3 text-sm text-gray-300">
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">Name:</span>
//                         <span className="text-white font-medium">
//                           {formData.fullName}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">PAN:</span>
//                         <span className="text-white font-medium">
//                           {formData.pan}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">Mobile:</span>
//                         <span className="text-white font-medium">
//                           {formData.mobile}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">Email:</span>
//                         <span className="text-white font-medium truncate">
//                           {formData.email}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* PROCEED BUTTON */}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => alert("Redirecting to payment gateway")}
//                     className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/50"
//                   >
//                     Proceed to Payment
//                   </motion.button>

//                   {/* Additional Info */}
//                   <p className="text-center text-gray-400 text-sm">
//                     You'll receive a receipt at your registered email address
//                   </p>
//                 </motion.div>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileCheck, ShieldCheck, UploadCloud, Heart } from "lucide-react";

export default function DonationGate() {
  const [formData, setFormData] = useState({ fullName: "", address: "", pan: "", mobile: "", email: "", purpose: "" });
  const [files, setFiles] = useState({ aadhaar: null, pan: null, consent: null });
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileUpload = (key) => (e) => setFiles({ ...files, [key]: e.target.files[0] });
  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true); setSubmitted(true);
    setTimeout(() => { setVerified(true); setLoading(false); }, 2500);
  };

  const docs = [
    { key: "aadhaar", label: "Aadhaar Card Copy" },
    { key: "pan", label: "PAN Card Copy" },
    { key: "consent", label: "Contribution Consent Letter" },
  ];

  const steps = [
    { n: 1, label: "Donor KYC", done: submitted },
    { n: 2, label: "Review", done: verified },
    { n: 3, label: "Donate", done: verified },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        .dg { min-height: 100vh; background: #080b18; padding: 110px 24px 80px; font-family: "Outfit",sans-serif; position: relative; overflow-x: hidden; }
        .dg-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
        .dg-inner { max-width: 680px; margin: 0 auto; position: relative; z-index: 2; }
        .dg-head { text-align: center; margin-bottom: 44px; }
        .dg-icon { width: 62px; height: 62px; border-radius: 14px; background: linear-gradient(135deg,#b8882a,#e0bc55); display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; }
        .dg-h1 { font-family: "Playfair Display",serif; font-size: clamp(34px,5vw,52px); font-weight: 800; color: #f2ede3; letter-spacing: -.025em; margin-bottom: 8px; }
        .dg-h1 em { font-style: italic; background: linear-gradient(130deg,#c9a84c,#f0d870); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .dg-sub { font-size: 15px; font-weight: 300; color: rgba(200,215,240,.48); }
        /* STEPS */
        .steps-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 36px; }
        .step { padding: 14px 10px; border-radius: 10px; text-align: center; border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.022); transition: all .35s ease; }
        .step.done { border-color: rgba(201,168,76,.3); background: rgba(201,168,76,.07); }
        .step.active { border-color: rgba(201,168,76,.2); background: rgba(201,168,76,.04); }
        .step-num { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; margin: 0 auto 8px; background: rgba(255,255,255,.07); color: rgba(200,215,240,.4); transition: all .35s; }
        .step.done .step-num { background: linear-gradient(135deg,#b8882a,#e0bc55); color: #08090f; }
        .step.active .step-num { background: rgba(201,168,76,.18); color: #c9a84c; border: 1px solid rgba(201,168,76,.3); }
        .step-lbl { font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: rgba(200,215,240,.32); transition: color .3s; }
        .step.done .step-lbl { color: #c9a84c; }
        .step.active .step-lbl { color: rgba(201,168,76,.7); }
        /* CARD */
        .dg-card { background: rgba(255,255,255,.025); border: 1px solid rgba(201,168,76,.15); border-radius: 14px; overflow: hidden; }
        .dg-card::before { content: ""; display: block; height: 2px; background: linear-gradient(90deg,#b8882a,#e8c560,#b8882a); }
        .dg-card-body { padding: 44px; }
        /* FORM */
        .sec-h { font-family: "Playfair Display",serif; font-size: 20px; font-weight: 700; color: #f2ede3; margin-bottom: 22px; display: flex; align-items: center; gap: 12px; }
        .sec-accent { width: 3px; height: 24px; border-radius: 2px; background: linear-gradient(to bottom,#c9a84c,#f0d870); flex-shrink: 0; }
        .fg { margin-bottom: 18px; }
        .fl { display: block; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: rgba(200,215,240,.45); margin-bottom: 7px; }
        .fi { width: 100%; padding: 11px 14px; border: 1.5px solid rgba(255,255,255,.08); border-radius: 8px; font-family: "Outfit",sans-serif; font-size: 14px; color: #e8e0cc; background: rgba(255,255,255,.04); outline: none; transition: all .25s; box-sizing: border-box; }
        .fi:focus { border-color: rgba(201,168,76,.5); background: rgba(201,168,76,.04); box-shadow: 0 0 0 3px rgba(201,168,76,.08); }
        .fi::placeholder { color: rgba(200,215,240,.2); }
        .fg-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent); margin: 28px 0; }
        /* FILE UPLOADS */
        .doc-card { background: rgba(255,255,255,.03); border: 1.5px solid rgba(255,255,255,.07); border-radius: 9px; padding: 16px 18px; cursor: pointer; transition: all .28s ease; margin-bottom: 12px; display: flex; align-items: center; gap: 14px; position: relative; overflow: hidden; }
        .doc-card:hover { border-color: rgba(201,168,76,.3); background: rgba(201,168,76,.04); }
        .doc-card.uploaded { border-color: rgba(201,168,76,.4); background: rgba(201,168,76,.06); }
        .doc-icon { color: #c9a84c; flex-shrink: 0; }
        .doc-label { font-size: 13px; font-weight: 600; color: #e8e0cc; margin-bottom: 2px; }
        .doc-sub { font-size: 11px; color: rgba(200,215,240,.3); }
        .doc-check { margin-left: auto; flex-shrink: 0; }
        .doc-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
        /* SUBMIT */
        .submit-btn { width: 100%; padding: 15px; background: linear-gradient(135deg,#b8882a 0%,#e8c255 50%,#b8882a 100%); background-size: 200% 100%; background-position: right; border: none; border-radius: 9px; font-family: "Outfit",sans-serif; font-size: 14px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #08090f; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all .4s ease; margin-top: 6px; }
        .submit-btn:hover { background-position: left; box-shadow: 0 10px 32px rgba(201,168,76,.32); transform: translateY(-1px); }
        /* LOADING */
        .loading-state { text-align: center; padding: 60px 20px; }
        .spin-icon { animation: spin 2s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-h { font-family: "Playfair Display",serif; font-size: 28px; font-weight: 700; color: #f2ede3; margin: 20px 0 8px; }
        .loading-p { font-size: 14px; font-weight: 300; color: rgba(200,215,240,.42); }
        /* VERIFIED */
        .verified-state { padding: 52px 44px; text-align: center; }
        .ver-badge { font-family: "Playfair Display",serif; font-size: 36px; font-weight: 800; background: linear-gradient(135deg,#c9a84c,#f0d870); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 16px 0 6px; }
        .ver-sub { font-size: 14px; font-weight: 300; color: rgba(200,215,240,.48); margin-bottom: 30px; }
        .ver-summary { background: rgba(201,168,76,.06); border: 1px solid rgba(201,168,76,.18); border-radius: 10px; padding: 22px; text-align: left; margin-bottom: 28px; }
        .ver-sum-lbl { font-size: 10px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .ver-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 10px; }
        .ver-row-k { color: rgba(200,215,240,.42); }
        .ver-row-v { color: #f2ede3; font-weight: 500; }
        .proceed-btn { width: 100%; padding: 15px; background: linear-gradient(135deg,#1a5c2a,#2e8b44,#1a5c2a); background-size: 200% 100%; background-position: right; border: none; border-radius: 9px; font-family: "Outfit",sans-serif; font-size: 14px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #f2ede3; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all .4s ease; }
        .proceed-btn:hover { background-position: left; box-shadow: 0 10px 32px rgba(46,139,68,.35); transform: translateY(-1px); }
        .ver-note { margin-top: 14px; font-size: 12px; color: rgba(200,215,240,.3); }
        @media(max-width:580px) { .dg-card-body { padding: 28px 20px; } .fg-2 { grid-template-columns: 1fr; } }
      `}</style>

      <div className="dg">
        <div className="dg-orb" style={{ width: 480, height: 480, top: -140, right: -140, background: "rgba(201,168,76,.055)" }} />
        <div className="dg-orb" style={{ width: 360, height: 360, bottom: -100, left: -100, background: "rgba(70,110,220,.04)" }} />

        <div className="dg-inner">
          {/* HEADER */}
          <motion.div className="dg-head" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="dg-icon"><Heart size={28} style={{ color: "#08090f" }} /></div>
            <h1 className="dg-h1">Support <em>PSG Tech</em></h1>
            <p className="dg-sub">Alumni Philanthropy Gateway</p>
          </motion.div>

          {/* STEPS */}
          <motion.div className="steps-row" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .1 }}>
            {steps.map((s, i) => (
              <div key={s.label} className={`step${s.done ? " done" : i === 1 && submitted && !verified ? " active" : ""}`}>
                <div className="step-num">{s.done ? "✓" : s.n}</div>
                <div className="step-lbl">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* MAIN CARD */}
          <motion.div className="dg-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .18 }}>

            {/* FORM */}
            {!submitted && (
              <div className="dg-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="sec-h"><div className="sec-accent" />Donor Information</div>

                  <div className="fg">
                    <label className="fl">Full Name <span style={{ color: "#e04444" }}>*</span></label>
                    <input name="fullName" placeholder="Enter full name as per records" className="fi" onChange={handleChange} required />
                  </div>
                  <div className="fg">
                    <label className="fl">Residential Address <span style={{ color: "#e04444" }}>*</span></label>
                    <input name="address" placeholder="Address for 80G compliance" className="fi" onChange={handleChange} required />
                  </div>
                  <div className="fg">
                    <label className="fl">PAN Number <span style={{ color: "#e04444" }}>*</span></label>
                    <input name="pan" placeholder="ABCDE1234F" className="fi" onChange={handleChange} required />
                  </div>
                  <div className="fg-2">
                    <div className="fg">
                      <label className="fl">Mobile Number <span style={{ color: "#e04444" }}>*</span></label>
                      <input name="mobile" placeholder="10-digit mobile" className="fi" onChange={handleChange} required />
                    </div>
                    <div className="fg">
                      <label className="fl">Email ID <span style={{ color: "#e04444" }}>*</span></label>
                      <input name="email" type="email" placeholder="Official email for receipts" className="fi" onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="divider" />

                  <div className="sec-h"><div className="sec-accent" />KYC Documents</div>
                  {docs.map(doc => (
                    <motion.div key={doc.key} className={`doc-card${files[doc.key] ? " uploaded" : ""}`} whileHover={{ scale: 1.01 }}>
                      <UploadCloud size={20} className="doc-icon" />
                      <div>
                        <div className="doc-label">{doc.label} <span style={{ color: "#e04444" }}>*</span></div>
                        <div className="doc-sub">{files[doc.key] ? `✓ ${files[doc.key].name}` : "Click to upload — PDF, JPG, PNG"}</div>
                      </div>
                      {files[doc.key] && <ShieldCheck size={18} style={{ color: "#c9a84c", marginLeft: "auto", flexShrink: 0 }} />}
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload(doc.key)} required className="doc-input" />
                    </motion.div>
                  ))}

                  <div className="divider" />

                  <div className="fg">
                    <label className="fl">Donation Purpose <span style={{ color: "#e04444" }}>*</span></label>
                    <textarea name="purpose" placeholder="Optional note for the alumni committee" className="fi" style={{ height: 90, resize: "none" }} onChange={handleChange} required />
                  </div>

                  <button type="submit" className="submit-btn">Submit for Verification</button>
                </form>
              </div>
            )}

            {/* LOADING */}
            {submitted && !verified && (
              <motion.div className="loading-state" initial={{ opacity: .3 }} animate={{ opacity: 1 }}>
                <UploadCloud size={52} style={{ color: "#c9a84c" }} className="spin-icon" />
                <div className="loading-h">{loading ? "Validating for Compliance…" : "Under Review"}</div>
                <p className="loading-p">Your KYC documents are being processed</p>
              </motion.div>
            )}

            {/* VERIFIED */}
            {verified && (
              <motion.div className="verified-state" initial={{ scale: .95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .5 }}>
                <FileCheck size={52} style={{ color: "#c9a84c" }} />
                <div className="ver-badge">KYC Approved!</div>
                <p className="ver-sub">Your verification is complete — proceed to donate</p>

                <div className="ver-summary">
                  <div className="ver-sum-lbl"><ShieldCheck size={14} /> Verified Donor Profile</div>
                  {[
                    ["Name", formData.fullName],
                    ["PAN", formData.pan],
                    ["Mobile", formData.mobile],
                    ["Email", formData.email],
                  ].map(([k, v]) => (
                    <div className="ver-row" key={k}>
                      <span className="ver-row-k">{k}:</span>
                      <span className="ver-row-v" style={{ maxWidth: "60%", textAlign: "right", overflowWrap: "break-word" }}>{v || "—"}</span>
                    </div>
                  ))}
                </div>

                <motion.button className="proceed-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }}
                  onClick={() => alert("Redirecting to payment gateway")}>
                  Proceed to Payment →
                </motion.button>
                <p className="ver-note">You'll receive a receipt at your registered email address</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
