import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const Projects = () => {
  const projects = [
    { _id: '1', title: 'Media Toolkit', description: 'A comprehensive web application for processing and manipulating media files effortlessly.', image: '/mediatoolkit.png', technologies: ['React', 'Next.js', 'Tailwind', 'Docker', 'Vercel', 'MongoDB', 'Render', 'GitHub', 'Anime.js'], url: 'https://mediatoolkit.vercel.app' },
    { _id: '2', title: 'CareSignal AI', description: 'A comprehensive AI-powered health and wellness platform for patient monitoring.', image: '/caresignal_custom.png', technologies: ['React', 'Next.js', 'AI'], url: 'https://mycaresignal.vercel.app' },
    { _id: '3', title: 'Craft CMS', description: 'A headless content management system for indie game developers.', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', technologies: ['TypeScript', 'PostgreSQL', 'GraphQL'] },
    { _id: '4', title: 'Nether Portal', description: 'An AI-powered search engine for documentation.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', technologies: ['Python', 'FastAPI', 'React'] },
  ];
  const loading = false;

  return (
    <section id="projects" className="min-h-screen py-32 px-6 relative overflow-hidden mc-tex-obsidian">
      {/* Deep underground pixel grid overlay */}
      <div className="absolute inset-0 mc-texture pointer-events-none opacity-20"></div>

      {/* Lava glow from below */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(207, 73, 19, 0.15) 100%)' }}
      ></div>

      {/* Lava pools — small glowing patches */}
      <motion.div
        className="absolute bottom-[5%] left-[15%] w-24 h-4 rounded-sm hidden md:block"
        style={{ backgroundColor: '#CF4913', boxShadow: '0 0 30px rgba(207, 73, 19, 0.5)' }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[8%] right-[20%] w-16 h-3 rounded-sm hidden md:block"
        style={{ backgroundColor: '#CF4913', boxShadow: '0 0 20px rgba(207, 73, 19, 0.4)' }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Depth indicator */}
      <div className="absolute top-6 right-6 bg-[#2C2C2C]/80 mc-block px-3 py-2 z-20">
        <span className="font-pixel text-[7px] text-[var(--mc-lava)]">Y: 8 — DEEP UNDERGROUND</span>
      </div>

      {/* Torches */}
      <div className="absolute top-[20%] left-4 z-10 hidden md:block">
        <motion.div
          className="w-4 h-4 bg-[#FCDB05]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ boxShadow: '0 0 50px 20px rgba(252, 219, 5, 0.25)' }}
        />
        <div className="w-2 h-6 bg-[#6B4226] mx-auto"></div>
      </div>
      <div className="absolute top-[60%] right-4 z-10 hidden md:block">
        <motion.div
          className="w-4 h-4 bg-[#FCDB05]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
          style={{ boxShadow: '0 0 50px 20px rgba(252, 219, 5, 0.25)' }}
        />
        <div className="w-2 h-6 bg-[#6B4226] mx-auto"></div>
      </div>

      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[var(--mc-lava)] mc-block flex items-center justify-center">
            <span className="text-white text-2xl">⚒</span>
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-[var(--mc-redstone)]">Crafted Works</h2>
        </div>
        <p className="text-sm md:text-xl lg:text-2xl text-white/60 mt-2" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>
          Forged in the deepest depths of my workshop.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {loading ? (
          <div className="col-span-2 text-center py-20">
            <span className="font-pixel text-sm text-white/60 animate-pulse">Mining projects...</span>
          </div>
        ) : (
          projects.map((project, i) => (
            <motion.div
              key={project._id || i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-[#1a1a1a] mc-block overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ imageRendering: 'auto' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 w-10 h-10 bg-[var(--mc-gold)] mc-block flex items-center justify-center">
                  <span className="font-pixel text-[10px] text-black">0{i + 1}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-pixel text-[10px] md:text-xs text-white mb-3">{project.title}</h3>
                <p className="text-lg text-white/70 leading-relaxed mb-4" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {(project.technologies || []).map((tech, j) => (
                    <span key={j} className="mc-slot px-3 py-1 font-pixel text-[7px] text-[var(--mc-diamond)]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <motion.a
                    href={project.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="mc-btn !text-[8px] !py-2 w-full !bg-[#555] hover:!bg-[#7B68EE] block text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🔍 INSPECT PROJECT
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Transition to bedrock */}
      <div className="absolute bottom-0 left-0 right-0 h-16"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #1A1A1A 100%)' }}
      ></div>
    </section>
  );
};

export default Projects;
