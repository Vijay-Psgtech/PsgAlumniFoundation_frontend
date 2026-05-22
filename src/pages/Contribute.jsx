import React from "react";
import { motion } from "framer-motion";

const DonatePage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .donate-hero {
          background: linear-gradient(165deg, #0a0e1f 0%, #0d1428 100%);
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 20px;
          font-family: 'Outfit', sans-serif;
        }

        .donate-inner {
          width: 100%;
          max-width: 900px;
        }

        .info-card {
          padding: 60px 50px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .info-card h4 {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 700;
          color:white;
          margin-bottom: 24px;
        }

        .info-card p {
          font-size: 18px;
          line-height: 1.9;
          color: rgba(220, 230, 245, 0.82);
          margin: 0;
        }

        @media (max-width: 768px) {
          .info-card {
            padding: 40px 24px;
          }

          .info-card h4 {
            font-size: 28px;
          }

          .info-card p {
            font-size: 16px;
          }
        }
      `}</style>

      <section className="donate-hero">
        <div className="donate-inner">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h4>🌐 Donate</h4>

            <p>
              Online payment gateway will be provided. The payment
              policies will be laid and statutory norms will be followed
              
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DonatePage;