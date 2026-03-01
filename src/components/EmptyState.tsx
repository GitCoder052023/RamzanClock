import { motion } from 'framer-motion';

export const EmptyState = () => (
  <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-4"
    >
      <div className="text-4xl animate-pulse">🌙</div>
      <p className="font-light tracking-widest uppercase text-xs opacity-50">Ramadan hasn't started yet</p>
    </motion.div>
  </div>
);
