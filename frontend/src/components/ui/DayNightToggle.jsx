import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DayNightToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-28 right-6 z-[100] w-14 h-14 mc-block flex items-center justify-center cursor-pointer"
      style={{ backgroundColor: isDark ? '#191970' : '#7EC8E3' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isDark ? 'Switch to Day' : 'Switch to Night'}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            className="text-2xl"
          >
            🌙
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            className="text-2xl"
          >
            ☀️
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default DayNightToggle;
