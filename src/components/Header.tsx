import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { format } from 'date-fns';

export const Header = () => (
  <motion.header 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="w-full max-w-md flex justify-between items-center mb-12"
  >
    <div className="flex items-center gap-2">
      <div className="p-2 bg-zinc-900 dark:bg-zinc-100 rounded-xl">
        <Moon className="w-5 h-5 text-zinc-100 dark:text-zinc-900" />
      </div>
      <h1 className="text-lg font-semibold tracking-tight italic">Ramazan Clock</h1>
    </div>
    <div className="text-right">
      <p className="text-xs uppercase tracking-widest opacity-40 font-bold">Ramazan 2026</p>
      <p className="text-sm font-medium">{format(new Date(), 'EEEE, do MMMM')}</p>
    </div>
  </motion.header>
);
