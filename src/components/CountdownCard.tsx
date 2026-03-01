import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { formatTime, formatSeconds } from '@/utils/time';
import type { RamadanDay, RamadanEvent } from '@/types/ramadan';

interface CountdownCardProps {
  today: RamadanDay;
  nextEvent: RamadanEvent;
}

export const CountdownCard = ({ today, nextEvent }: CountdownCardProps) => {
  const { h, m, s } = formatSeconds(nextEvent.remainingSeconds);

  return (
    <motion.main 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 mb-8 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-40">
            Remaining for {nextEvent.type}
          </p>
        </div>
        
        <div className="flex items-baseline gap-2 mb-8">
          <motion.span 
            key={h}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-light tabular-nums"
          >
            {h}
          </motion.span>
          <span className="text-5xl font-extralight opacity-20">:</span>
          <motion.span 
            key={m}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-light tabular-nums"
          >
            {m}
          </motion.span>
          <span className="text-5xl font-extralight opacity-20">:</span>
          <motion.span 
            key={s}
            className="text-7xl font-light tabular-nums opacity-60"
          >
            {s}
          </motion.span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-50 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 opacity-40">
              <Sun className="w-3 h-3" />
              <p className="text-[10px] uppercase font-bold tracking-widest">Sehri Ends</p>
            </div>
            <p className="text-xl font-medium">{formatTime(today.sehri)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 opacity-40">
              <Moon className="w-3 h-3" />
              <p className="text-[10px] uppercase font-bold tracking-widest">Iftar Starts</p>
            </div>
            <p className="text-xl font-medium">{formatTime(today.iftar)}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-zinc-50 dark:bg-zinc-800/50 rounded-full blur-3xl -z-0" />
    </motion.main>
  );
};
