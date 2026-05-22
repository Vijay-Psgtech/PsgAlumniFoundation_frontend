import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Microscope, Award, Users, Globe, Heart } from "lucide-react";

const initiativeSections = [
  {
    id: 1,
    section: "3a",
    title: "Academic & Research Excellence",
    icon: Microscope,
    color: "#c9a84c",
    description: "The Foundation actively supports initiatives that strengthen the academic and research ecosystem of PSG College of Technology & Polytechnic College. Through strategic alumni engagement and institutional collaboration, the Foundation contributes toward enhancing the global academic standing and research capabilities of PSG institutions.",
    items: [
      "Centres of Excellence",
      "Research Infrastructure Development",
      "Academic Chairs and Fellowships",
      "Innovation and R&D Initiatives",
      "Industry-Academia Collaboration",
      "International Knowledge Exchange Programmes"
    ]
  },
  {
    id: 2,
    section: "3b",
    title: "Scholarships & Support",
    icon: Award,
    color: "#7eb8f7",
    description: "The Foundation believes that no deserving student should be deprived of quality education due to financial limitations. Through various scholarship initiatives, the Foundation supports students from economically challenged backgrounds by enabling access to quality education, academic resources, and developmental opportunities.",
    items: [
      "Merit-based scholarships",
      "Need-based financial aid",
      "Educational assistance programs",
      "Access to quality education",
      "Academic resources provision",
      "Developmental opportunities"
    ],
    supportSection: {
      title: "The Foundation welcomes support from:",
      donors: [
        "Alumni",
        "Individual Donors",
        "Industries",
        "Corporate CSR Partners"
      ],
      message: "Together, we can empower future leaders, innovators, and change makers."
    }
  },
  {
    id: 3,
    section: "3c",
    title: "Capacity Building",
    icon: Users,
    color: "#7edfa0",
    description: "Capacity Building is a key initiative focused on enhancing the academic, technical, and professional capabilities of students and faculty across PSG College of Technology & PSG Polytechnic College. By bringing together accomplished alumni, industry experts, researchers, and academicians, the Foundation bridges the gap between academic learning and evolving industry expectations.",
    items: [
      "Workshops and Seminars",
      "Faculty Development Programmes",
      "Industrial Visits",
      "Technical Training Sessions",
      "Mentorship Programmes",
      "Leadership Development"
    ]
  }
];

const InitiativesPage = () => {
  const [expandedId, setExpandedId] = useState(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .init-hero {
          background: linear-gradient(165deg, #f8f5ee 0%, #fdfcf9 45%, #f2f4fa 100%);
          padding: 100px 24px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .init-hero::before {
          content: '';
          position: absolute;
          top: -150px;
          right: -150px;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.06) 0%, transparent 68%);
          pointer-events: none;
        }
        
        .init-inner {
          max-width: 1240px;
          margin: 0 auto;
        }
        
        .init-header {
          text-align: center;
          margin-bottom: 80px;
          position: relative;
          z-index: 2;
        }
        
        .init-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #a87630;
          margin-bottom: 24px;
        }
        
        .init-eyebrow::before,
        .init-eyebrow::after {
          content: '';
          width: 28px;
          height: 1.5px;
          background: linear-gradient(90deg, #b8882a, #e8c560);
        }
        
        .init-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 800;
          color: #0c0e1a;
          letter-spacing: -0.025em;
          margin-bottom: 20px;
          line-height: 1.05;
        }
        
        .init-h1 em {
          font-style: italic;
          background: linear-gradient(130deg, #a87630, #e0bc55);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .init-sub {
          font-size: 16px;
          font-weight: 300;
          color: #535e78;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.75;
        }
        
        .init-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        
        .init-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.065);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .init-item.active {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border-color: transparent;
        }
        
        .init-item.active .init-item-header {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.04));
        }
        
        .init-item-header {
          padding: 32px 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          transition: background 0.35s;
          position: relative;
          z-index: 2;
        }
        
        .init-item:hover .init-item-header {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.06), rgba(201, 168, 76, 0.02));
        }
        
        .init-item-head-left {
          display: flex;
          align-items: center;
          gap: 18px;
          flex: 1;
        }
        
        .init-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 10px;
          background: var(--icolor);
          opacity: 0.12;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .init-icon-box svg {
          color: var(--icolor);
          width: 26px;
          height: 26px;
        }
        
        .init-head-text h3 {
          font-family: 'Playfair Display', serif;
          font-size: 23px;
          font-weight: 700;
          color: #0c0e1a;
          margin-bottom: 6px;
          line-height: 1.2;
        }
        
        .init-head-text .init-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a87630;
          margin-bottom: 6px;
          display: block;
        }
        
        .init-head-text p {
          font-size: 14px;
          font-weight: 300;
          color: #8b94aa;
          line-height: 1.55;
        }
        
        .init-chevron {
          width: 22px;
          height: 22px;
          color: #c9a84c;
          transition: transform 0.35s;
          flex-shrink: 0;
        }
        
        .init-item.active .init-chevron {
          transform: rotate(180deg);
        }
        
        .init-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .init-item.active .init-content {
          max-height: 600px;
        }
        
        .init-content-inner {
          padding: 0 32px 32px;
          border-top: 1px solid rgba(201, 168, 76, 0.15);
        }
        
        .init-content-text {
          font-size: 15px;
          font-weight: 300;
          color: #535e78;
          line-height: 1.8;
          margin-bottom: 26px;
        }
        
        .init-items-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
          margin-bottom: 26px;
        }
        
        .init-list-item {
          padding: 14px 18px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.05), rgba(201, 168, 76, 0.02));
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #0c0e1a;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .init-list-item::before {
          content: '✓';
          color: #c9a84c;
          font-weight: 700;
          width: 18px;
          flex-shrink: 0;
          font-size: 16px;
        }
        
        /* Support Section Styles */
        .init-support-section {
          padding: 24px;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.03));
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .init-support-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #0c0e1a;
          margin-bottom: 14px;
        }
        
        .init-donors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          margin-bottom: 18px;
        }
        
        .init-donor-item {
          padding: 12px 14px;
          background: white;
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #0c0e1a;
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: center;
          justify-content: center;
        }
        
        .init-donor-item::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #c9a84c;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        .init-support-message {
          font-size: 14px;
          font-weight: 300;
          color: #535e78;
          line-height: 1.7;
          font-style: italic;
        }
        
        /* Science Outreach Section */
        .init-outreach-section {
          margin-top: 80px;
          padding: 60px 40px;
          background: #080b18;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .init-outreach-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.05) 0%, transparent 68%);
          pointer-events: none;
        }
        
        .init-outreach-content {
          position: relative;
          z-index: 2;
          color: #f2ede3;
        }
        
        .init-outreach-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.72);
          margin-bottom: 20px;
        }
        
        .init-outreach-eyebrow::before {
          content: '';
          width: 24px;
          height: 1.5px;
          background: rgba(201, 168, 76, 0.5);
        }
        
        .init-outreach-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          color: #f2ede3;
          margin-bottom: 24px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        
        .init-outreach-text {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(200, 215, 240, 0.78);
          margin-bottom: 22px;
        }
        
        .init-museum-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 18px;
          margin-top: 32px;
          margin-bottom: 28px;
        }
        
        .init-museum-card {
          padding: 22px;
          background: rgba(201, 168, 76, 0.08);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .init-museum-card:hover {
          background: rgba(201, 168, 76, 0.12);
          border-color: rgba(201, 168, 76, 0.35);
          transform: translateY(-2px);
        }
        
        .init-museum-card strong {
          color: #c9a84c;
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .init-museum-card p {
          font-size: 13px;
          color: rgba(200, 215, 240, 0.68);
          line-height: 1.6;
        }
        
        .init-outreach-link {
          font-size: 13px;
          color: rgba(200, 215, 240, 0.56);
          line-height: 1.6;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(201, 168, 76, 0.15);
        }
        
        .init-outreach-link strong {
          color: #c9a84c;
          font-weight: 600;
        }
        
        @media (max-width: 820px) {
          .init-item-header {
            padding: 24px 20px;
          }
          
          .init-content-inner {
            padding: 0 20px 24px;
          }
          
          .init-outreach-section {
            padding: 40px 24px;
          }
          
          .init-items-list {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 600px) {
          .init-item-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .init-chevron {
            align-self: flex-end;
            margin-top: -28px;
          }
          
          .init-museum-grid {
            grid-template-columns: 1fr;
          }
          
          .init-donors-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="init-hero">
        <div className="init-inner">
          <motion.div
            className="init-header"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="init-eyebrow">Initiatives</div>
            <h1 className="init-h1">
              Our Strategic <em>Programs</em>
            </h1>
            <p className="init-sub">
              Through transformative initiatives, we create academic and societal impact by strengthening education, innovation, research, and student development.
            </p>
          </motion.div>

          {/* Initiatives List */}
          <motion.div
            className="init-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {initiativeSections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  className={`init-item ${
                    expandedId === section.id ? "active" : ""
                  }`}
                  style={{ "--icolor": section.color }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="init-item-header"
                    onClick={() =>
                      setExpandedId(
                        expandedId === section.id ? null : section.id
                      )
                    }
                  >
                    <div className="init-item-head-left">
                      <div className="init-icon-box">
                        <Icon />
                      </div>
                      <div className="init-head-text">
                        <span className="init-section-label">
                          {section.section}
                        </span>
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                      </div>
                    </div>
                    <ChevronDown className="init-chevron" />
                  </div>

                  <AnimatePresence>
                    {expandedId === section.id && (
                      <motion.div
                        className="init-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="init-content-inner">
                          <div className="init-items-list">
                            {section.items.map((item, i) => (
                              <motion.div
                                key={i}
                                className="init-list-item"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                {item}
                              </motion.div>
                            ))}
                          </div>

                          {section.supportSection && (
                            <div className="init-support-section">
                              <div className="init-support-title">
                                {section.supportSection.title}
                              </div>
                              <div className="init-donors-grid">
                                {section.supportSection.donors.map(
                                  (donor, i) => (
                                    <motion.div
                                      key={i}
                                      className="init-donor-item"
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: i * 0.06 }}
                                    >
                                      {donor}
                                    </motion.div>
                                  )
                                )}
                              </div>
                              <p className="init-support-message">
                                {section.supportSection.message}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Science Outreach & Experiential Learning Section */}
          <motion.div
            className="init-outreach-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="init-outreach-content">
              <div className="init-outreach-eyebrow">3d. Science Outreach</div>
              <h2 className="init-outreach-title">
                🏛️ PSG GRD Museum of Science & Technology
              </h2>

              <p className="init-outreach-text">
                The PSG GRD Museum of Science & Technology is a landmark initiative jointly established by PSG & Sons' Charities and the PSG Tech Alumni Foundation. Dedicated to the memory of Dr. G.R. Damodaran, the visionary architect of PSG institutions, the museum promotes scientific curiosity, experiential learning, and public engagement through immersive exhibits and technology-driven educational experiences.
              </p>

              <p className="init-outreach-text">
                Spread across over 30,000 square feet with exhibits in Science & Technology, the museum serves as a vibrant learning destination for students, educators, researchers, and visitors of all age groups.
              </p>

              <div className="init-museum-grid">
                <motion.div
                  className="init-museum-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <strong>30,000+ sq ft</strong>
                  <p>State-of-the-art facility with cutting-edge design</p>
                </motion.div>

                <motion.div
                  className="init-museum-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <strong>Interactive Exhibits</strong>
                  <p>Science & Technology focused immersive experiences</p>
                </motion.div>

                <motion.div
                  className="init-museum-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <strong>Public Engagement</strong>
                  <p>Educational programs for all age groups</p>
                </motion.div>

                <motion.div
                  className="init-museum-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  viewport={{ once: true }}
                >
                  <strong>Learning Destination</strong>
                  <p>Serving students, educators, and researchers</p>
                </motion.div>
              </div>

              <div className="init-outreach-link">
                For further information, visit{" "}
                <strong>https://thepsggrdmuseum.com/</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default InitiativesPage;