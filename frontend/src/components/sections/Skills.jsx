import { useState } from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  { name: 'React', icon: '⚛', color: '#61DAFB', rarity: 'LEGENDARY', desc: '+50% UI Speed', enchanted: true },
  { name: 'Node.js', icon: '🟢', color: '#339933', rarity: 'EPIC', desc: '+40% Backend Power', enchanted: true },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6', rarity: 'EPIC', desc: '+35% Type Safety', enchanted: false },
  { name: 'Tailwind', icon: '🎨', color: '#38bdf8', rarity: 'RARE', desc: '+30% Styling Speed', enchanted: false },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', rarity: 'RARE', desc: '+25% Data Agility', enchanted: false },
  { name: 'Next.js', icon: '▲', color: '#fff', rarity: 'LEGENDARY', desc: '+45% Performance', enchanted: true },
  { name: 'Git', icon: '📦', color: '#F05032', rarity: 'COMMON', desc: '+20% Collaboration', enchanted: false },
  { name: 'Figma', icon: '🎯', color: '#F24E1E', rarity: 'RARE', desc: '+30% Design Vision', enchanted: false },
  { name: 'Python', icon: '🐍', color: '#3776AB', rarity: 'EPIC', desc: '+35% Versatility', enchanted: false },
  { name: 'Docker', icon: '🐳', color: '#2496ED', rarity: 'RARE', desc: '+25% Deployment', enchanted: false },
  { name: 'Java', icon: '☕', color: '#ED8B00', rarity: 'EPIC', desc: '+40% Enterprise Strength', enchanted: false },
  { name: 'C', icon: 'Ⓒ', color: '#A8B9CC', rarity: 'RARE', desc: '+30% Low-level Control', enchanted: false },
  { name: 'C++', icon: '➕', color: '#00599C', rarity: 'EPIC', desc: '+45% High Performance', enchanted: false },
  { name: 'Oracle', icon: '🗄️', color: '#F80000', rarity: 'RARE', desc: '+25% Enterprise Data', enchanted: false },
  { name: 'CSS', icon: '🌈', color: '#1572B6', rarity: 'COMMON', desc: '+20% Visual Charm', enchanted: false },
  { name: 'HTML', icon: '🌐', color: '#E34F26', rarity: 'COMMON', desc: '+20% Structure Base', enchanted: false },
  { name: 'JavaScript', icon: '📜', color: '#F7DF1E', rarity: 'LEGENDARY', desc: '+50% Logic Core', enchanted: true },
  { name: 'AI Agents', icon: '🤖', color: '#A855F7', rarity: 'LEGENDARY', desc: '+60% Automation IQ', enchanted: true },
];

const rarityColors = {
  COMMON: '#AAAAAA',
  RARE: '#5555FF',
  EPIC: '#AA00AA',
  LEGENDARY: '#FFAA00',
};

const Skills = () => {
  const [hovered, setHovered] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

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
      <div className="absolute top-6 right-6 bg-[#2C2C2C]/80 mc-block px-3 py-2 z-20">
        <span className="font-pixel text-[7px] text-white/70">Y: 40 — STONE LAYER</span>
      </div>

      <div className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 bg-[var(--mc-diamond)] mc-block flex items-center justify-center">
            <span className="text-black text-lg">⚒</span>
          </div>
          <h2 className="font-pixel text-lg md:text-2xl text-[var(--mc-diamond)]">Inventory</h2>
        </div>
        <p className="text-xl text-white/60 mt-2" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>
          Click items to equip them. Hover to inspect.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#555]/80 p-4 mc-block">
          <div className="bg-[#444] mc-block-inset px-4 py-2 mb-4 flex items-center justify-between">
            <span className="font-pixel text-[10px] text-white/80">SKILLS INVENTORY</span>
            <span className="font-pixel text-[8px] text-white/40">{skillsData.length} ITEMS</span>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {skillsData.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, delay: i * 0.08 }}
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedSlot(selectedSlot === i ? null : i)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className={`mc-slot p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group relative transition-all duration-200 aspect-square ${
                  selectedSlot === i ? 'ring-2 ring-white/80 bg-[#777]' : ''
                }`}
                style={skill.enchanted ? { 
                  boxShadow: `0 0 15px ${skill.color}40`,
                  animation: 'pulse 3s infinite',
                } : {}}
              >
                <motion.span 
                  className="text-3xl md:text-4xl transition-transform"
                  animate={hovered === i ? { rotate: [0, -10, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.span>
                
                <span className="font-pixel text-[7px] md:text-[8px] text-center leading-tight text-white/80 group-hover:text-white">
                  {skill.name}
                </span>

                <span className="font-pixel text-[6px] tracking-wider" style={{ color: rarityColors[skill.rarity] }}>
                  {skill.rarity}
                </span>

                {/* Tooltip */}
                <div className={`absolute -top-24 left-1/2 -translate-x-1/2 bg-[#1B0A2E] border-2 rounded px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 ${
                  skill.rarity === 'LEGENDARY' ? 'border-[#FFAA00]' : skill.rarity === 'EPIC' ? 'border-[#AA00AA]' : 'border-[#5555FF]'
                }`}>
                  <p className="font-pixel text-[9px] mb-1" style={{ color: skill.color }}>{skill.name}</p>
                  <p className="font-pixel text-[6px]" style={{ color: rarityColors[skill.rarity] }}>{skill.rarity}</p>
                  <div className="h-[1px] bg-white/10 my-2"></div>
                  <p className="text-sm text-[var(--mc-emerald)]">{skill.desc}</p>
                  {skill.enchanted && <p className="text-sm text-[var(--mc-diamond)] mt-1">✨ Enchanted</p>}
                </div>

                {selectedSlot === i && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--mc-emerald)] mc-block flex items-center justify-center"
                  >
                    <span className="text-[8px] text-black">✓</span>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Empty Slots to fill the grid up to 20 */}
            {Array.from({ length: Math.max(0, 20 - skillsData.length) }).map((_, i) => (
              <div 
                key={`empty-${i}`} 
                className="mc-slot aspect-square bg-[#333] opacity-60"
              ></div>
            ))}
          </div>
        </div>

        {/* Hotbar */}
        <div className="mt-8 flex justify-center">
          <div className="bg-[#555]/80 mc-block p-3">
            <div className="flex items-center gap-4">
              <span className="font-pixel text-[7px] text-white/50">EQUIPPED:</span>
              {selectedSlot !== null ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{skillsData[selectedSlot].icon}</span>
                  <span className="font-pixel text-[8px]" style={{ color: skillsData[selectedSlot].color }}>{skillsData[selectedSlot].name}</span>
                  <span className="text-sm text-[var(--mc-emerald)]">{skillsData[selectedSlot].desc}</span>
                </div>
              ) : (
                <span className="font-pixel text-[7px] text-white/30">Click an item to equip</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transition to cave */}
      <div className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #3A3A3A 100%)' }}
      ></div>
    </section>
  );
};

export default Skills;
