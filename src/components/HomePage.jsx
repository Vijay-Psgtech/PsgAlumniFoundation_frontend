// import React from "react";
// import { Link } from "react-router-dom";
// import Banner from "./Banner";
// import About from "./About";
// import Vision from "./Vision";
// import Values from "./Values";
// import Mission from "./Mission";

// const HomePage = () => {
//   const user = JSON.parse(localStorage.getItem("alumniUser"));

//   return (
//     <>
//       <Banner />
//       <About />
      
//       {/* Alumni CTA Section */}
//       <section className="py-16 px-6 bg-linear-to-r from-blue-900/20 to-purple-900/20 border-y border-blue-500/20">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             {/* Left Content */}
//             <div>
//               <h2 className="text-4xl font-bold text-white mb-4">
//                 Connect with Alumni
//               </h2>
//               <p className="text-gray-300 text-lg mb-6">
//                 Join our thriving alumni network. Register, update your profile, and connect with graduates from around the world.
//               </p>
              
//               <div className="space-y-3">
//                 {user ? (
//                   <>
//                     <p className="text-blue-300 font-semibold text-sm">
//                       Welcome back, {user.firstName}! 👋
//                     </p>
//                     <div className="flex gap-3 flex-wrap">
//                       <Link to="/alumni/profile">
//                         <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
//                           My Profile
//                         </button>
//                       </Link>
//                       <Link to="/alumni/directory">
//                         <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition">
//                           Browse Alumni
//                         </button>
//                       </Link>
//                       <Link to="/alumni/map">
//                         <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">
//                           View Map
//                         </button>
//                       </Link>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex gap-3 flex-wrap">
//                       <Link to="/alumni/register">
//                         <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">
//                           Register Now
//                         </button>
//                       </Link>
//                       <Link to="/alumni/login">
//                         <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
//                           Alumni Login
//                         </button>
//                       </Link>
//                       <Link to="/alumni/directory">
//                         <button className="px-6 py-3 border-2 border-blue-400 text-blue-300 hover:bg-blue-600/10 rounded-lg font-semibold transition">
//                           Browse Alumni
//                         </button>
//                       </Link>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Right Side - Features Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-600/20 transition">
//                 <div className="text-3xl mb-2">👥</div>
//                 <h3 className="font-semibold text-white mb-1">Directory</h3>
//                 <p className="text-sm text-gray-400">
//                   Browse and connect with alumni
//                 </p>
//               </div>
//               <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-600/20 transition">
//                 <div className="text-3xl mb-2">🌍</div>
//                 <h3 className="font-semibold text-white mb-1">World Map</h3>
//                 <p className="text-sm text-gray-400">
//                   See where alumni are located
//                 </p>
//               </div>
//               <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-4 hover:bg-green-600/20 transition">
//                 <div className="text-3xl mb-2">👤</div>
//                 <h3 className="font-semibold text-white mb-1">My Profile</h3>
//                 <p className="text-sm text-gray-400">
//                   Update your information
//                 </p>
//               </div>
//               <div className="bg-pink-600/10 border border-pink-500/30 rounded-lg p-4 hover:bg-pink-600/20 transition">
//                 <div className="text-3xl mb-2">🔐</div>
//                 <h3 className="font-semibold text-white mb-1">Secure</h3>
//                 <p className="text-sm text-gray-400">
//                   Protected authentication
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Vision />
//       <Values />
//       <Mission />
//     </>
//   );
// };

// export default HomePage;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "./Banner";
import About from "./About";
import Vision from "./Vision";
import Values from "./Values";
import Mission from "./Mission";

const features = [
  {emoji:"👥",title:"Alumni Directory",desc:"Browse and connect with global alumni"},
  {emoji:"🌍",title:"World Map",desc:"See where alumni are located worldwide"},
  {emoji:"👤",title:"My Profile",desc:"Keep your information up to date"},
  {emoji:"🔒",title:"Secure Access",desc:"Protected with modern authentication"},
];

const HomePage = () => {
  let user = null;
  try { user = JSON.parse(localStorage.getItem("alumniUser")); } catch {}

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        .alumni-cta-s{background:linear-gradient(165deg,#09101f 0%,#0d1428 100%);padding:100px 24px;font-family:'Outfit',sans-serif;position:relative;overflow:hidden;}
        .alumni-cta-s::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:350px;background:radial-gradient(ellipse,rgba(201,168,76,.042) 0%,transparent 68%);pointer-events:none;}
        .cta-inner{max-width:1240px;margin:0 auto;position:relative;z-index:2;}
        .cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
        .cta-eyebrow{font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,168,76,.58);margin-bottom:20px;display:flex;align-items:center;gap:10px;}
        .cta-eyebrow::before{content:'';width:24px;height:1.5px;background:rgba(201,168,76,.5);}
        .cta-h2{font-family:'Playfair Display',serif;font-size:clamp(34px,4vw,52px);font-weight:800;color:#f2ede3;line-height:1.08;letter-spacing:-.025em;margin-bottom:20px;}
        .cta-h2 em{font-style:italic;background:linear-gradient(130deg,#c9a84c,#f0d870);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
        .cta-desc{font-size:15px;font-weight:300;line-height:1.82;color:rgba(200,215,240,.46);margin-bottom:36px;}
        .cta-btns{display:flex;gap:11px;flex-wrap:wrap;}
        .cta-btn-gold{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:linear-gradient(135deg,#b8882a,#e0bc55);color:#07080e;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:7px;border:none;cursor:pointer;text-decoration:none;transition:all .3s ease;}
        .cta-btn-gold:hover{box-shadow:0 8px 26px rgba(201,168,76,.3);transform:translateY(-2px);}
        .cta-btn-ghost{display:inline-flex;align-items:center;gap:8px;padding:11px 24px;background:transparent;color:rgba(200,220,248,.62);font-family:'Outfit',sans-serif;font-size:12px;font-weight:400;letter-spacing:.1em;text-transform:uppercase;border-radius:7px;border:1px solid rgba(200,220,248,.11);cursor:pointer;text-decoration:none;transition:all .28s ease;}
        .cta-btn-ghost:hover{border-color:rgba(201,168,76,.35);color:#e8c560;}
        .feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .feat-tile{padding:26px 22px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.052);border-radius:11px;transition:all .32s ease;}
        .feat-tile:hover{background:rgba(201,168,76,.038);border-color:rgba(201,168,76,.17);transform:translateY(-3px);}
        .feat-emoji{font-size:30px;margin-bottom:12px;display:block;}
        .feat-title{font-size:14px;font-weight:600;color:rgba(228,235,252,.8);margin-bottom:5px;}
        .feat-desc{font-size:12px;font-weight:300;color:rgba(200,215,240,.33);line-height:1.55;}
        @media(max-width:820px){.cta-grid{grid-template-columns:1fr;gap:44px;}}
      `}</style>
      <Banner/>
      <About/>
      <section className="alumni-cta-s">
        <div className="cta-inner">
          <div className="cta-grid">
            <motion.div initial={{opacity:0,x:-28}} whileInView={{opacity:1,x:0}} transition={{duration:.8}} viewport={{once:true}}>
              <div className="cta-eyebrow">Alumni Network</div>
              <h2 className="cta-h2">
                {user?<>Welcome Back,<br/><em>{user.firstName}</em></>:<>Connect with <em>Alumni</em></>}
              </h2>
              <p className="cta-desc">
                {user?"Continue building your legacy with PSG Tech's global community of changemakers.":"Join our thriving alumni network. Register, update your profile, and connect with graduates from around the world."}
              </p>
              <div className="cta-btns">
                {user?(
                  <>
                    <Link to="/alumni/profile" className="cta-btn-gold">My Profile</Link>
                    <Link to="/alumni/directory" className="cta-btn-ghost">Browse Alumni</Link>
                    <Link to="/alumni/map" className="cta-btn-ghost">World Map</Link>
                  </>
                ):(
                  <>
                    <Link to="/alumni/register" className="cta-btn-gold">Register Now</Link>
                    <Link to="/alumni/login" className="cta-btn-ghost">Sign In</Link>
                    <Link to="/alumni/directory" className="cta-btn-ghost">Browse Alumni</Link>
                  </>
                )}
              </div>
            </motion.div>
            <motion.div className="feat-grid" initial={{opacity:0,x:28}} whileInView={{opacity:1,x:0}} transition={{duration:.8,delay:.1}} viewport={{once:true}}>
              {features.map(f=>(
                <div className="feat-tile" key={f.title}>
                  <span className="feat-emoji">{f.emoji}</span>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <Vision/><Values/><Mission/>
    </>
  );
};
export default HomePage;
