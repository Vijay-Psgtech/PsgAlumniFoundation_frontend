import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Vision from "./Vision";
import ObjectivesPage from "../pages/Objectives";
import AboutImg from "/about.webp";

// Board of Trustees Data
const trustees = [
  { name: "Dr. S. Senior", role: "Managing Trustee" },
  { name: "Prof. A. Principal", role: "Principal (Ex-officio)" },
  { name: "Mr. P. President", role: "President, Alumni Association (Ex-official)" },
];

// Trustee Card Component
function TCard({ name, role }) {
  const ini = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 0",
        borderBottom: "1px solid rgba(201,168,76,.1)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#b8882a,#e0bc55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Playfair Display',serif",
          fontWeight: 700,
          fontSize: 13,
          color: "#08090f",
          flexShrink: 0,
        }}
      >
        {ini}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#f2ede3",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: "rgba(200,215,240,.56)",
            marginTop: 3,
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const fade = (d = 0, x = 0) => ({
    hidden: {
      opacity: 0,
      y: x ? 0 : 28,
      x,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.85,
        delay: d,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .ap {
          background: linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 50%, #f2f4fb 100%);
          min-height: 100vh;
          font-family: "Outfit", sans-serif;
          padding-top: 90px;
        }
        
        .ap-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
        }
        
        .ap-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
          padding: 72px 0 80px;
        }
        
        .ap-ey {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a87630;
          margin-bottom: 22px;
        }
        
        .ap-ey::before {
          content: "";
          width: 24px;
          height: 1.5px;
          background: linear-gradient(90deg, #b8882a, #e8c560);
        }
        
        .ap-h1 {
          font-family: "Playfair Display", serif;
          font-size: clamp(40px, 4.5vw, 60px);
          font-weight: 800;
          color: #0c0e1a;
          line-height: 1.04;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
        }
        
        .ap-h1 em {
          font-style: italic;
          background: linear-gradient(130deg, #a87630, #e0bc55);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .ap-lead {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.8;
          color: #505868;
          margin-bottom: 32px;
        }
        
        .ap-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        
        .btn-g {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          background: #0c0e1a;
          color: #e8c560;
          font-family: "Outfit", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 7px;
          text-decoration: none;
          border: 1px solid rgba(201, 168, 76, 0.24);
          transition: all 0.32s ease;
          cursor: pointer;
        }
        
        .btn-g:hover {
          background: linear-gradient(135deg, #b8882a, #e0bc55);
          color: #07080e;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(201, 168, 76, 0.28);
        }
        
        .btn-gh {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: transparent;
          color: #a87630;
          font-family: "Outfit", sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 7px;
          border: 1px solid rgba(201, 168, 76, 0.3);
          text-decoration: none;
          transition: all 0.28s ease;
          cursor: pointer;
        }
        
        .btn-gh:hover {
          background: rgba(201, 168, 76, 0.07);
          border-color: rgba(201, 168, 76, 0.55);
          color: #b8882a;
        }
        
        .hero-iw {
          position: relative;
        }
        
        .hero-if {
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.14);
        }
        
        .hero-if img {
          display: block;
          width: 100%;
          height: 420px;
          object-fit: cover;
          filter: saturate(0.88) contrast(1.05);
          transition: transform 0.7s ease;
        }
        
        .hero-if:hover img {
          transform: scale(1.04);
        }
        
        .hc {
          position: absolute;
          width: 52px;
          height: 52px;
          border-color: #c9a84c;
          border-style: solid;
        }
        
        .hc-tl {
          top: -10px;
          left: -10px;
          border-width: 2px 0 0 2px;
        }
        
        .hc-br {
          bottom: -10px;
          right: -10px;
          border-width: 0 2px 2px 0;
        }

        /* Content Sections */
        .ap-section {
          margin-bottom: 72px;
          padding: 60px 40px;
          background: rgba(8, 11, 24, 0.4);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 12px;
        }
        
        .ap-section::before {
          content: "";
          display: block;
          height: 2px;
          background: linear-gradient(
            90deg,
            #b8882a,
            #e8c560,
            #b8882a
          );
          border-radius: 2px;
          margin-bottom: 20px;
        }

        /* Light Background Sections */
        .ap-intro-section {
          margin-bottom: 72px;
          padding: 60px 40px;
          background: linear-gradient(
            165deg,
            rgba(200, 215, 240, 0.04) 0%,
            rgba(201, 168, 76, 0.03) 100%
          );
          border: 1px solid rgba(201, 168, 76, 0.1);
          border-radius: 12px;
        }
        
        .ap-intro-section::before {
          content: "";
          display: block;
          height: 2px;
          background: linear-gradient(
            90deg,
            #c9a84c,
            #f0d870,
            #c9a84c
          );
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .sl {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a87630;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }
        
        .sl::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(201, 168, 76, 0.3),
            transparent
          );
        }
        
        .ap-h2 {
          font-family: "Playfair Display", serif;
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 700;
          color: #0c0e1a;
          letter-spacing: -0.02em;
          margin-bottom: 28px;
          line-height: 1.1;
        }
        
        .ap-h2.dark {
          color: #f2ede3;
        }
        
        .ap-h2 em {
          font-style: italic;
          background: linear-gradient(130deg, #c9a84c, #f0d870);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .ap-p {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.88;
          color: #464e66;
          margin-bottom: 20px;
        }
        
        .ap-p.light {
          color: rgba(200, 215, 240, 0.78);
        }
        
        .ap-p strong {
          font-weight: 600;
          color: #0c0e1a;
        }
        
        .ap-p.light strong {
          color: #f2ede3;
        }

        /* Trustees Sidebar */
        .sidebar {
          background: #0c0e1a;
          border: 1px solid rgba(201, 168, 76, 0.18);
          border-radius: 12px;
          padding: 28px;
          margin-top: 40px;
        }
        
        .sidebar::before {
          content: "";
          display: block;
          height: 2px;
          background: linear-gradient(
            90deg,
            #b8882a,
            #e8c560,
            #b8882a
          );
          border-radius: 2px;
          margin-bottom: 20px;
        }
        
        .sidebar-title {
          font-family: "Playfair Display", serif;
          font-size: 20px;
          font-weight: 700;
          color: #f2ede3;
          margin-bottom: 8px;
        }
        
        .sidebar-subtitle {
          font-size: 12px;
          font-weight: 300;
          color: rgba(200, 215, 240, 0.56);
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }
        
        .sidebar-buttons {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }
        
        .sidebar-buttons a {
          flex: 1;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .ap-hero {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .ap-section {
            padding: 40px 24px;
          }

          .ap-intro-section {
            padding: 40px 24px;
          }

          .hero-if img {
            height: 300px;
          }
        }

        @media (max-width: 600px) {
          .ap-btns {
            flex-direction: column;
          }

          .btn-g,
          .btn-gh {
            width: 100%;
            justify-content: center;
          }

          .ap-hero {
            padding: 40px 0 60px;
          }

          .ap-h1 {
            font-size: clamp(32px, 5vw, 48px);
            margin-bottom: 20px;
          }

          .ap-lead {
            font-size: 15px;
            margin-bottom: 24px;
          }

          .hero-if img {
            height: 240px;
          }
        }
      `}</style>

      <main className="ap">
        {/* HERO SECTION */}
        <div className="ap-inner">
          <div className="ap-hero">
            <motion.div
              variants={fade(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="ap-ey">PSG Tech Alumni Foundation</div>
              <h1 className="ap-h1">
                About <em>Our Foundation</em>
              </h1>
              <p className="ap-lead">
                Connecting alumni globally with mentorship, opportunities, and purpose-driven initiatives since 2016.
              </p>
              <div className="ap-btns">
                <a href="/donate" className="btn-g">
                  Donate <ArrowRight size={15} />
                </a>
                <a href="#" className="btn-gh">
                  <Download size={13} /> Brochure
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-iw"
              variants={fade(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="hero-if">
                <img src={AboutImg} alt="PSG Tech Alumni Foundation" />
              </div>
              <div className="hc hc-tl" />
              <div className="hc hc-br" />
            </motion.div>
          </div>
        </div>

        {/* INTRODUCTION SECTION */}
        <div className="ap-inner">
          <motion.div
            className="ap-intro-section"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
          >
            <div className="sl">Introduction</div>
            <h2 className="ap-h2">
              A <em>Philanthropic Initiative</em>
            </h2>

            <p className="ap-p">
              The PSG Tech Alumni Foundation is a philanthropic initiative established by alumni of PSG College of Technology & Polytechnic College to strengthen education, innovation, research, and student development.
            </p>

            <p className="ap-p">
              Driven by a collective desire of the Alumni towards the alma mater, the Foundation supports transformative initiatives that create academic and societal impact. Through scholarships, institutional development, experiential learning initiatives, and capacity-building programmes, the Foundation continues to uphold the legacy of excellence associated with PSG College of Technology & Polytechnic College.
            </p>
          </motion.div>
        </div>

        {/* 2a. ABOUT THE FOUNDATION */}
        <div className="ap-inner">
          <motion.div
            className="ap-section"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="sl">2a. About the Foundation</div>
            <h2 className="ap-h2 dark">
              Our <em>Foundation</em>
            </h2>

            <p className="ap-p light">
              The PSG Tech Alumni Foundation, registered as a non-profit trust on <strong>19th October 2016</strong> under Indian Trust Act 1882, is a dedicated organization for alumni, corporates, and well-wishers to collaborate and contribute towards the progress of PSG College of Technology & Polytechnic College.
            </p>

            <p className="ap-p light">
              The Foundation enables structured philanthropic engagement for alumni of PSG College of Technology and PSG Polytechnic College. With transparency, accountability, and institutional development at its core, the Foundation actively supports initiatives that strengthen education, research, innovation, and scientific learning within the PSG ecosystem.
            </p>

            <p className="ap-p light">
              The Foundation is governed by Board of Trustees comprising distinguished alumni and institutional leaders.
            </p>
          </motion.div>
        </div>

        {/* 2b & 2c. VISION & MISSION (Imported Component) */}
        <Vision />

        {/* 2d. OBJECTIVES (Imported Component) */}
        <ObjectivesPage />

        {/* 2e. BOARD OF TRUSTEES */}
        <div className="ap-inner">
          <motion.div
            className="ap-section"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="sl">2e. Board of Trustees</div>
            <h2 className="ap-h2 dark">
              Foundation <em>Leadership</em>
            </h2>

            <p className="ap-p light">
              The Foundation is managed by a Board of Trustees comprising distinguished alumni and institutional leaders. The Board provides direction for major functions necessary to carry out the mission of the Foundation.
            </p>

            <div className="sidebar">
              <div className="sidebar-title">Board of Trustees</div>
              <div className="sidebar-subtitle">
                Present trustees and ex-officio members
              </div>
              {trustees.map((t) => (
                <TCard key={t.name} {...t} />
              ))}
              <div className="sidebar-buttons">
                <a href="/donate" className="btn-g">
                  Support
                </a>
                <a href="/contact" className="btn-gh">
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}