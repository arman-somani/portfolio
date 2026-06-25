import { motion, AnimatePresence } from 'framer-motion';

const DayNightToggle = ({ isDark, onToggle }) => {
  return (
    <div className="fixed bottom-8 right-6 z-[100]">
      <motion.button
        onClick={onToggle}
        className="mc-btn !text-[8px] !py-2 !px-3 mb-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isDark ? 'Switch to Day' : 'Switch to Night'}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ☀️ DAY
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              🌙 NIGHT
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default DayNightToggle;
