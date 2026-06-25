import { useState } from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛', color: '#61DAFB', rarity: 'LEGENDARY', desc: '+50% UI Speed', enchanted: true },
      { name: 'Next.js', icon: '▲', color: '#ffffff', rarity: 'LEGENDARY', desc: '+45% Performance', enchanted: true },
      { name: 'HTML', icon: '🌐', color: '#E34F26', rarity: 'COMMON', desc: '+20% Structure Base', enchanted: false },
      { name: 'CSS', icon: '🌈', color: '#1572B6', rarity: 'COMMON', desc: '+20% Visual Charm', enchanted: false },
      { name: 'Tailwind CSS', icon: '🎨', color: '#38bdf8', rarity: 'RARE', desc: '+30% Styling Speed', enchanted: false },
      { name: 'JavaScript', icon: '📜', color: '#F7DF1E', rarity: 'LEGENDARY', desc: '+50% Logic Core', enchanted: true },
      { name: 'TypeScript', icon: '🔷', color: '#3178c6', rarity: 'EPIC', desc: '+35% Type Safety', enchanted: false },
      { name: 'Framer Motion', icon: '✨', color: '#E902B6', rarity: 'EPIC', desc: '+40% Animation', enchanted: true },
      { name: 'Anime.js', icon: '🎬', color: '#FF4B4B', rarity: 'RARE', desc: '+30% Timelines', enchanted: false },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢', color: '#339933', rarity: 'EPIC', desc: '+40% Backend Power', enchanted: true },
      { name: 'Express', icon: '🚂', color: '#ffffff', rarity: 'RARE', desc: '+30% Routing', enchanted: false },
      { name: 'REST API', icon: '🔌', color: '#009688', rarity: 'COMMON', desc: '+25% Connectivity', enchanted: false },
      { name: 'JWT', icon: '🔑', color: '#ffd700', rarity: 'EPIC', desc: '+35% Security', enchanted: true },
      { name: 'Postman', icon: '🛂', color: '#34E27A', rarity: 'RARE', desc: '+30% Auth', enchanted: false },
      { name: 'Socket.IO', icon: '⚡', color: '#ffffff', rarity: 'EPIC', desc: '+45% Real-time', enchanted: true },
    ]
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', icon: '🍃', color: '#47A248', rarity: 'RARE', desc: '+25% Data Agility', enchanted: false },
      { name: 'MySQL', icon: '🐬', color: '#4479A1', rarity: 'COMMON', desc: '+20% Relational DB', enchanted: false },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791', rarity: 'EPIC', desc: '+40% Advanced Data', enchanted: true },
    ]
  },
  {
    title: 'DevOps',
    skills: [
      { name: 'Docker', icon: '🐳', color: '#2496ED', rarity: 'RARE', desc: '+25% Deployment', enchanted: false },
      { name: 'Git', icon: '📦', color: '#F05032', rarity: 'COMMON', desc: '+20% Versioning', enchanted: false },
      { name: 'GitHub', icon: '🐙', color: '#ffffff', rarity: 'COMMON', desc: '+20% Collaboration', enchanted: false },
      { name: 'Linux', icon: '🐧', color: '#FCC624', rarity: 'EPIC', desc: '+40% OS Mastery', enchanted: true },
      { name: 'Vercel', icon: '▲', color: '#ffffff', rarity: 'RARE', desc: '+30% Hosting', enchanted: false },
      { name: 'Render', icon: '☁️', color: '#46E3B7', rarity: 'COMMON', desc: '+25% Cloud', enchanted: false },
    ]
  },
  {
    title: 'Tools',
    skills: [
      { name: 'VS Code', icon: '💻', color: '#007ACC', rarity: 'COMMON', desc: '+20% Editing', enchanted: false },
      { name: 'AI', icon: '🤖', color: '#10A37F', rarity: 'EPIC', desc: '+30% Automation', enchanted: true },
      { name: 'Figma', icon: '🎯', color: '#F24E1E', rarity: 'RARE', desc: '+30% Design Vision', enchanted: false },
      { name: 'Firebase', icon: '🔥', color: '#FFCA28', rarity: 'EPIC', desc: '+40% BaaS', enchanted: true },
      { name: 'Cloudinary', icon: '☁️', color: '#3448C5', rarity: 'RARE', desc: '+25% Media', enchanted: false },
    ]
  }
];

const rarityColors = {
  COMMON: '#AAAAAA',
  RARE: '#5555FF',
  EPIC: '#AA00AA',
  LEGENDARY: '#FFAA00',
};

const continuousAnimations = [
  { animate: { y: [0, -6, 0] }, transition: { duration: 2.5, ease: 'easeInOut' } },
  { animate: { rotate: [0, 8, -8, 0] }, transition: { duration: 3, ease: 'linear' } },
  { animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, ease: 'easeInOut' } },
  { animate: { x: [0, 4, -4, 0] }, transition: { duration: 3.5, ease: 'easeInOut' } },
  { animate: { y: [0, -4, 0], rotate: [0, 5, -5, 0] }, transition: { duration: 3, ease: 'easeInOut' } },
  { animate: { scale: [1, 0.9, 1], rotate: [0, 4, 0] }, transition: { duration: 2.5, ease: 'easeInOut' } },
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="skills" className="min-h-screen py-32 px-6 relative overflow-hidden mc-tex-stone">
      <div className="absolute inset-0 mc-texture pointer-events-none opacity-10"></div>

      {/* Embedded ores in stone */}
      <div className="absolute top-[10%] left-[3%] w-8 h-6 bg-[#333] mc-block opacity-30">
        <div className="w-3 h-3 bg-[#111] absolute top-1 left-1"></div>
      </div>
      <div className="absolute top-[60%] right-[5%] w-6 h-8 bg-[#4A4A4A] mc-block opacity-25"></div>
      <div className="absolute bottom-[30%] left-[90%] w-5 h-5 bg-[#555] mc-block opacity-20"></div>

      {/* Iron ore spots */}
      <div className="absolute top-[25%] right-[15%] w-4 h-4 bg-[#D4A574] mc-block opacity-40"></div>
      <div className="absolute bottom-[45%] left-[7%] w-5 h-3 bg-[#D4A574] mc-block opacity-35"></div>

      {/* Depth indicator */}
      <div className="absolute top-6 right-6 bg-[#2C2C2C]/80 mc-block px-4 py-3 z-20">
        <span className="font-pixel text-[10px] text-white/70">Y: 40 — STONE LAYER</span>
      </div>

      <div className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-[var(--mc-diamond)] mc-block flex items-center justify-center">
            <span className="text-black text-2xl">⚒</span>
          </div>
          <h2 className="font-pixel text-xl sm:text-3xl md:text-4xl text-[var(--mc-diamond)]">Inventory</h2>
        </div>
        <p className="text-sm md:text-xl lg:text-2xl text-white/60 mt-2 md:mt-4" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>
          Click items to equip them. Hover to inspect.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="bg-[#555]/80 p-4 mc-block mb-10">
            <div className="bg-[#444] mc-block-inset px-5 py-3 mb-5 flex items-center justify-between">
              <span className="font-pixel text-sm text-white/80">{category.title.toUpperCase()} INVENTORY</span>
              <span className="font-pixel text-[10px] text-white/40">{category.skills.length} ITEMS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {category.skills.map((skill, i) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.03 }}
                    whileHover={{ scale: 1.1, y: -8 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className={`mc-slot p-2 md:p-3 flex flex-col items-center justify-center gap-2 cursor-pointer group relative transition-all duration-200 aspect-square ${isSelected ? 'ring-2 ring-white/80 bg-[#777]' : ''
                      }`}
                    style={skill.enchanted ? {
                      boxShadow: `0 0 15px ${skill.color}40`,
                      animation: 'pulse 3s infinite',
                    } : {}}
                  >
                    <motion.span
                      className="text-5xl md:text-6xl transition-transform"
                      animate={
                        hoveredSkill === skill.name
                          ? { rotate: [0, -15, 15, -15, 0], scale: 1.2 }
                          : continuousAnimations[i % continuousAnimations.length].animate
                      }
                      transition={
                        hoveredSkill === skill.name
                          ? { duration: 0.5 }
                          : { ...continuousAnimations[i % continuousAnimations.length].transition, repeat: Infinity, delay: i * 0.1 }
                      }
                    >
                      {skill.icon}
                    </motion.span>

                    <span className="font-pixel text-[10px] md:text-xs text-center leading-tight text-white/80 group-hover:text-white mt-1">
                      {skill.name}
                    </span>

                    <span className="font-pixel text-[8px] tracking-wider" style={{ color: rarityColors[skill.rarity] }}>
                      {skill.rarity}
                    </span>

                    {/* Tooltip */}
                    <div className={`absolute -top-28 left-1/2 -translate-x-1/2 bg-[#1B0A2E] border-2 rounded px-5 py-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 hidden md:block ${skill.rarity === 'LEGENDARY' ? 'border-[#FFAA00]' : skill.rarity === 'EPIC' ? 'border-[#AA00AA]' : 'border-[#5555FF]'
                      }`}>
                      <p className="font-pixel text-xs mb-1" style={{ color: skill.color }}>{skill.name}</p>
                      <p className="font-pixel text-[8px]" style={{ color: rarityColors[skill.rarity] }}>{skill.rarity}</p>
                      <div className="h-[2px] bg-white/10 my-2"></div>
                      <p className="text-base text-[var(--mc-emerald)]">{skill.desc}</p>
                      {skill.enchanted && <p className="text-base text-[var(--mc-diamond)] mt-1">✨ Enchanted</p>}
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--mc-emerald)] mc-block flex items-center justify-center"
                      >
                        <span className="text-[8px] text-black">✓</span>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}

              {/* Empty Slots to fill the grid up to nearest multiple of 5 */}
              {Array.from({ length: Math.max(0, (5 - (category.skills.length % 5)) % 5) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="mc-slot aspect-square bg-[#333] opacity-60"
                ></div>
              ))}
            </div>
          </div>
        ))}

        {/* Hotbar */}
        <div className="mt-10 flex justify-center sticky bottom-10 z-50">
          <div className="bg-[#555]/80 mc-block p-4 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 text-center md:text-left">
              <span className="font-pixel text-[10px] text-white/50">EQUIPPED:</span>
              {selectedSkill ? (
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl md:text-4xl">{selectedSkill.icon}</span>
                    <span className="font-pixel text-[10px] md:text-[10px]" style={{ color: selectedSkill.color }}>{selectedSkill.name}</span>
                  </div>
                  <span className="text-sm md:text-base text-[var(--mc-emerald)]">{selectedSkill.desc}</span>
                </div>
              ) : (
                <span className="font-pixel text-[10px] text-white/30">Click an item to equip</span>
              )}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Skills;
