import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const signY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const signOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden mc-tex-dirt"
    >
      {/* Pixel grid overlay for extra crunch */}
      <div className="absolute inset-0 mc-texture pointer-events-none opacity-15"></div>

      {/* Depth indicator */}
      <div className="absolute top-6 right-6 bg-[#2C2C2C]/80 mc-block px-3 py-2 z-20">
        <span className="font-pixel text-[7px] text-[var(--mc-gold)]">Y: 56 — DIRT LAYER</span>
      </div>

      {/* Embedded ores / roots */}
      <div className="absolute top-[15%] left-[5%] w-6 h-6 bg-[#6B4226] mc-block opacity-40 rotate-12"></div>
      <div className="absolute top-[40%] right-[8%] w-4 h-8 bg-[#4A2F12] opacity-30 rotate-[-20deg]"></div>
      <div className="absolute bottom-[20%] left-[12%] w-8 h-4 bg-[#4A2F12] opacity-30 rotate-[15deg]"></div>

      {/* Section Label */}
      <div className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[var(--mc-gold)] mc-block flex items-center justify-center">
            <span className="text-black text-2xl">?</span>
          </div>
          <h2 className="font-pixel text-3xl md:text-4xl text-[var(--mc-gold)]">About Me</h2>
        </div>
      </div>

      {/* Oak Sign Post */}
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        style={{ y: signY, opacity: signOpacity }}
      >
        <div className="bg-[#9C6B30] mc-block p-8 md:p-12 relative">
          <div className="absolute inset-0 mc-texture opacity-30 pointer-events-none"></div>
          <div className="relative z-10">
            <p className="text-xl md:text-2xl text-white leading-relaxed" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>
              Hey there! I turn ideas into high-performance digital experiences. As a <span className="text-[var(--mc-diamond)]">Full Stack Developer</span>, I specialize in designing responsive user interfaces, developing scalable backend systems, and building complete web applications from concept to deployment.
            </p>
            <div className="mt-6 h-1 bg-[var(--mc-wood)]"></div>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>
              I love working with React, Next.js, Node.js, Express, MongoDB, TypeScript, Tailwind CSS, and modern animation libraries to create applications that are both powerful and visually impressive. I'm always exploring new technologies, currently focusing on <span className="text-[var(--mc-emerald)]">AI integration, cloud infrastructure, Docker, Kubernetes</span>, and advanced web performance optimization to build the next generation of web applications.
            </p>
          </div>
        </div>
        <div className="mx-auto w-6 h-24 bg-[#6B4226] mc-block"></div>
      </motion.div>

      {/* Stats blocks */}
      <div className="max-w-3xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        {[
          { label: 'PROJECTS', value: '3+', color: 'var(--mc-diamond)' },
          { label: 'EXPERIENCE', value: '2 YRS', color: 'var(--mc-gold)' },
          { label: 'COMMITS', value: '2K+', color: 'var(--mc-redstone)' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: i * 0.1 }}
            className="bg-[#6B4226] mc-slot p-6 text-center hover:bg-[#7A5E3E] transition-colors"
          >
            <div className="font-pixel text-xl md:text-3xl mb-2" style={{ color: stat.color, textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
              {stat.value}
            </div>
            <div className="font-pixel text-[8px] text-white/60 tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Torches */}
      <div className="absolute top-1/4 left-8 w-4 h-8 hidden md:block z-10">
        <div className="w-4 h-4 bg-[#FCDB05] animate-pulse" style={{ boxShadow: '0 0 30px rgba(252, 219, 5, 0.6)' }}></div>
        <div className="w-2 h-4 bg-[#6B4226] mx-auto"></div>
      </div>
      <div className="absolute top-1/4 right-8 w-4 h-8 hidden md:block z-10">
        <div className="w-4 h-4 bg-[#FCDB05] animate-pulse" style={{ boxShadow: '0 0 30px rgba(252, 219, 5, 0.6)' }}></div>
        <div className="w-2 h-4 bg-[#6B4226] mx-auto"></div>
      </div>

      {/* Transition to stone: bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #7F7F7F 100%)' }}
      ></div>
    </section>
  );
};

export default About;
