import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRamadan } from '@/hooks/use-ramadan';
import { Moon, Sun, Calendar, Clock } from 'lucide-react';
import { format, parseISO, parse } from 'date-fns';

const App = () => {
  const { today, nextEvent, forecast } = useRamadan();
  const [use12Hour, setUse12Hour] = useState(true);

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const formatTime = (timeStr: string) => {
    const date = parse(timeStr, 'HH:mm', new Date());
    const formatted = use12Hour ? format(date, 'h:mm a') : timeStr;
    return `${formatted}`;
  };

  const formatSeconds = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0'),
    };
  };

  if (!today || !nextEvent) {
    return (
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
  }

  const { h, m, s } = formatSeconds(nextEvent.remainingSeconds);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 selection:bg-amber-200 selection:text-amber-900 font-sans">
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md flex justify-between items-center mb-12"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 bg-zinc-900 dark:bg-zinc-100 rounded-xl">
            < Moon className="w-5 h-5 text-zinc-100 dark:text-zinc-900" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight italic">Ramazan Clock</h1>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest opacity-40 font-bold">Ramazan 2026</p>
          <p className="text-sm font-medium">{format(new Date(), 'EEEE, do MMMM')}</p>
        </div>
      </motion.header>

      {/* Main Countdown Card */}
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
            <button 
              onClick={() => {
                triggerHaptic();
                setUse12Hour(!use12Hour);
              }}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors group"
              title="Switch time format"
            >
              <Clock className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity" />
            </button>
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
              className="text-5xl font-light tabular-nums opacity-60"
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
        
        {/* Subtle Decorative Element */}
        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-zinc-50 dark:bg-zinc-800/50 rounded-full blur-3xl -z-0" />
      </motion.main>

      {/* 7-Day Forecast */}
      <section className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold opacity-40 flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            Next 7 Days
          </h2>
          <span className="text-[9px] uppercase tracking-widest font-bold opacity-20">
            Format: {use12Hour ? '12H' : '24H'}
          </span>
        </div>

        <div className="space-y-2">
          {forecast.slice(1, 8).map((day, idx) => (
            <motion.div
              key={day.date}
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
          ))}
        </div>
      </section>

      {/* Footer / Meta */}
      <footer className="w-full max-w-md mt-auto pt-12 pb-6 text-center">
        <p className="text-[10px] uppercase tracking-widest font-bold opacity-20">
          Built for simplicity & reflection
        </p>
      </footer>
    </div>
  );
};

export default App;
