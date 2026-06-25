import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await api.get('/experience');
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences, using fallback data', error);
        setExperiences([
          { _id: '1', title: 'Senior Developer', company: 'Creative Agency Co.', startDate: '2023', endDate: 'Present', current: true, description: 'Leading the architecture and development of enterprise-grade web applications.' },
          { _id: '2', title: 'Frontend Engineer', company: 'Tech Startup Inc.', startDate: '2020', endDate: '2023', current: false, description: 'Built pixel-perfect, accessible React components and designed micro-interactions.' },
          { _id: '3', title: 'Junior Developer', company: 'Digital Solutions LLC', startDate: '2018', endDate: '2020', current: false, description: 'Started my coding journey building responsive websites and learning the MERN stack.' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="min-h-screen py-32 px-6 relative overflow-hidden mc-tex-deepslate">
      {/* ===== HOLLOW CAVE STRUCTURE ===== */}

      {/* Stalactites hanging from top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-[1]">
        <svg width="100%" height="120" viewBox="0 0 1920 120" preserveAspectRatio="none" className="block">
          <rect width="1920" height="120" fill="#3A3A3A" />
          {/* Cave ceiling cutout */}
          <ellipse cx="300" cy="120" rx="180" ry="90" fill="#2a2a2a" />
          <ellipse cx="960" cy="120" rx="350" ry="110" fill="#2a2a2a" />
          <ellipse cx="1500" cy="120" rx="200" ry="80" fill="#2a2a2a" />
          <ellipse cx="600" cy="120" rx="120" ry="60" fill="#2a2a2a" />
          <ellipse cx="1200" cy="120" rx="100" ry="50" fill="#2a2a2a" />
          {/* Stalactites */}
          <polygon points="150,0 160,55 140,55" fill="#4a4a4a" />
          <polygon points="400,0 415,70 385,70" fill="#444" />
          <polygon points="700,0 712,45 688,45" fill="#4a4a4a" />
          <polygon points="850,0 858,35 842,35" fill="#444" />
          <polygon points="1100,0 1115,80 1085,80" fill="#4a4a4a" />
          <polygon points="1350,0 1360,50 1340,50" fill="#444" />
          <polygon points="1600,0 1612,65 1588,65" fill="#4a4a4a" />
          <polygon points="1800,0 1810,40 1790,40" fill="#444" />
          <polygon points="50,0 56,30 44,30" fill="#555" />
          <polygon points="530,0 540,55 520,55" fill="#555" />
          <polygon points="1750,0 1758,48 1742,48" fill="#555" />
        </svg>
      </div>

      {/* Stalagmites growing from bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]">
        <svg width="100%" height="100" viewBox="0 0 1920 100" preserveAspectRatio="none" className="block">
          <rect width="1920" height="100" fill="#3A3A3A" />
          {/* Cave floor cutout */}
          <ellipse cx="400" cy="0" rx="250" ry="70" fill="#2a2a2a" />
          <ellipse cx="960" cy="0" rx="400" ry="90" fill="#2a2a2a" />
          <ellipse cx="1550" cy="0" rx="200" ry="60" fill="#2a2a2a" />
          {/* Stalagmites */}
          <polygon points="200,100 215,30 185,30" fill="#4a4a4a" />
          <polygon points="500,100 510,50 490,50" fill="#444" />
          <polygon points="780,100 790,40 770,40" fill="#4a4a4a" />
          <polygon points="1050,100 1060,55 1040,55" fill="#444" />
          <polygon points="1300,100 1312,35 1288,35" fill="#4a4a4a" />
          <polygon points="1650,100 1658,60 1642,60" fill="#444" />
          <polygon points="1850,100 1858,45 1842,45" fill="#555" />
          <polygon points="100,100 108,65 92,65" fill="#555" />
        </svg>
      </div>

      {/* Cave wall openings on sides */}
      <div className="absolute top-[20%] left-0 w-32 h-48 pointer-events-none z-[1] hidden md:block"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, #111 0%, #1a1a1a 30%, transparent 70%)' }}
      ></div>
      <div className="absolute top-[55%] right-0 w-40 h-56 pointer-events-none z-[1] hidden md:block"
        style={{ background: 'radial-gradient(ellipse at 100% 50%, #111 0%, #1a1a1a 30%, transparent 70%)' }}
      ></div>
      <div className="absolute top-[75%] left-0 w-24 h-36 pointer-events-none z-[1] hidden md:block"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, #0d0d0d 0%, #1a1a1a 25%, transparent 65%)' }}
      ></div>

      {/* Cave ambient — glowing ores */}
      {/* Diamond ore */}
      <motion.div 
        className="absolute top-[15%] left-[4%] w-6 h-6 bg-[#4AEDD9] mc-block hidden md:block"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ boxShadow: '0 0 20px rgba(74, 237, 217, 0.4)' }}
      />
      {/* Gold ore */}
      <motion.div 
        className="absolute top-[55%] right-[6%] w-5 h-5 bg-[#FCDB05] mc-block hidden md:block"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        style={{ boxShadow: '0 0 15px rgba(252, 219, 5, 0.3)' }}
      />
      {/* Redstone ore */}
      <motion.div 
        className="absolute bottom-[25%] left-[8%] w-5 h-5 bg-[#FF0000] mc-block hidden md:block"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        style={{ boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)' }}
      />
      {/* Emerald ore */}
      <motion.div 
        className="absolute top-[35%] right-[12%] w-4 h-4 bg-[#17DD62] mc-block hidden md:block"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
        style={{ boxShadow: '0 0 15px rgba(23, 221, 98, 0.3)' }}
      />
      {/* Lapis ore */}
      <motion.div 
        className="absolute bottom-[60%] right-[3%] w-4 h-6 bg-[#345EC3] mc-block hidden md:block"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
        style={{ boxShadow: '0 0 12px rgba(52, 94, 195, 0.3)' }}
      />

      {/* Depth indicator */}
      <div className="absolute top-6 right-6 bg-[#2C2C2C]/80 mc-block px-3 py-2 z-20">
        <span className="font-pixel text-[7px] text-[var(--mc-diamond)]">Y: 20 — CAVE LAYER</span>
      </div>

      {/* Torch ambient lights */}
      <div className="absolute top-[20%] left-6 z-10 hidden md:block">
        <motion.div 
          className="w-4 h-4 bg-[#FCDB05]"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ boxShadow: '0 0 40px 15px rgba(252, 219, 5, 0.3)' }}
        />
        <div className="w-2 h-6 bg-[#6B4226] mx-auto"></div>
      </div>
      <div className="absolute top-[50%] right-6 z-10 hidden md:block">
        <motion.div 
          className="w-4 h-4 bg-[#FCDB05]"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
          style={{ boxShadow: '0 0 40px 15px rgba(252, 219, 5, 0.3)' }}
        />
        <div className="w-2 h-6 bg-[#6B4226] mx-auto"></div>
      </div>

      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[var(--mc-emerald)] mc-block flex items-center justify-center">
            <span className="text-black text-2xl">📜</span>
          </div>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--mc-emerald)]">Achievements</h2>
        </div>
        <p className="text-2xl text-white/60 mt-2" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>
          Deep in the cave, discover my journey.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Vertical rail */}
        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-2 bg-[#6B4226]"
          style={{ borderLeft: '2px solid #999', borderRight: '2px solid #999' }}
        ></div>

        {loading ? (
          <div className="text-center py-20">
            <span className="font-pixel text-sm text-white/60 animate-pulse">Loading achievements...</span>
          </div>
        ) : (
          experiences.map((exp, i) => (
            <motion.div
              key={exp._id || i}
              initial={{ opacity: 0, y: -300 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: 'spring', 
                stiffness: 120, 
                damping: 8,
                mass: 1.2,
                delay: 0.15 
              }}
              className={`relative flex items-start mb-16 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-row`}
            >
              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-[var(--mc-gold)] mc-block z-10 flex items-center justify-center">
                <span className="text-sm text-black font-bold">{i + 1}</span>
              </div>

              <div className={`ml-16 md:ml-0 ${i % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'} md:w-[45%] w-full`}>


                <motion.div
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className="bg-[#2C2C2C] mc-block p-8 relative group origin-top"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">🏆</span>
                    <div className="font-pixel text-[10px] text-[var(--mc-gold)] bg-[var(--mc-gold)]/10 px-3 py-2 mc-block-inset">
                      ACHIEVEMENT UNLOCKED!
                    </div>
                  </div>

                  <h3 className="font-pixel text-sm md:text-base text-white mb-3">{exp.title}</h3>
                  <p className="font-pixel text-[10px] text-[var(--mc-diamond)] mb-5">{exp.company}</p>
                  
                  <p className="text-2xl text-white/70 leading-relaxed mb-6" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>
                    {exp.description}
                  </p>

                  <div className="flex items-center gap-3 mt-5">
                    <div className="mc-slot px-4 py-2">
                      <span className="font-pixel text-[10px] text-white/60">
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.current && (
                      <div className="bg-[var(--mc-emerald)]/20 border-2 border-[var(--mc-emerald)] px-4 py-2">
                        <span className="font-pixel text-[10px] text-[var(--mc-emerald)]">ACTIVE</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Transition to deep cave / projects */}
      <div className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #2A1A0E 100%)' }}
      ></div>
    </section>
  );
};

export default Experience;
