import { Calendar } from 'lucide-react';
import { ForecastItem } from './ForecastItem';
import type { RamadanDay } from '@/types/ramadan';

interface ForecastListProps {
  forecast: RamadanDay[];
  use12Hour: boolean;
}

export const ForecastList = ({ forecast, use12Hour }: ForecastListProps) => (
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
        <ForecastItem 
          key={day.date} 
          day={day} 
          idx={idx} 
          use12Hour={use12Hour} 
        />
      ))}
    </div>
  </section>
);
