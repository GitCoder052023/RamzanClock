import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { formatTime } from '@/utils/time';
import { triggerHaptic } from '@/utils/haptic';
import type { RamadanDay } from '@/types/ramadan';

interface ForecastItemProps {
  day: RamadanDay;
  idx: number;
}

export const ForecastItem = ({ day, idx }: ForecastItemProps) => (
  <motion.div
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.1 * idx }}
    onClick={() => triggerHaptic()}
    className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all active:scale-[0.98] cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase font-bold opacity-40 leading-none mb-0.5">Day</span>
        <span className="text-sm font-bold leading-none">{day.ramadanDay}</span>
      </div>
      <div>
        <p className="text-sm font-semibold">{format(parseISO(day.date), 'EEEE')}</p>
        <p className="text-[10px] opacity-40 uppercase font-bold tracking-wider">{format(parseISO(day.date), 'MMM do')}</p>
      </div>
    </div>
    <div className="flex gap-6 text-right">
      <div>
        <p className="text-[9px] uppercase font-bold opacity-30 tracking-widest">Sehri</p>
        <p className="text-sm font-medium">{formatTime(day.sehri)}</p>
      </div>
      <div>
        <p className="text-[9px] uppercase font-bold opacity-30 tracking-widest">Iftar</p>
        <p className="text-sm font-medium">{formatTime(day.iftar)}</p>
      </div>
    </div>
  </motion.div>
);
