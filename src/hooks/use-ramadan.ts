import { useState, useEffect } from 'react';
import { differenceInSeconds, isAfter, parseISO, addDays, format } from 'date-fns';
import { RAMADAN_DATA_2026 } from '@/constants/ramadan-data';
import type { RamadanDay } from '@/constants/ramadan-data';

export interface RamadanState {
  today: RamadanDay | null;
  nextEvent: {
    type: 'Sehri' | 'Iftar';
    time: string;
    remainingSeconds: number;
  } | null;
  forecast: RamadanDay[];
}

export const useRamadan = () => {
  const [state, setState] = useState<RamadanState>({
    today: null,
    nextEvent: null,
    forecast: [],
  });

  useEffect(() => {
    const update = () => {
      // Calculate current IST (UTC+5:30) time regardless of local system time
      const nowUtc = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const nowIst = new Date(nowUtc.getTime() + (nowUtc.getTimezoneOffset() * 60 * 1000) + istOffset);
      
      const todayStr = format(nowIst, 'yyyy-MM-dd');
      const todayData = RAMADAN_DATA_2026.find(d => d.date === todayStr);

      if (!todayData) {
        setState({ today: null, nextEvent: null, forecast: [] });
        return;
      }

      const sehriTime = parseISO(`${todayData.date}T${todayData.sehri}:00`);
      const iftarTime = parseISO(`${todayData.date}T${todayData.iftar}:00`);

      let nextEvent: RamadanState['nextEvent'] = null;

      if (!isAfter(nowIst, sehriTime)) {
        nextEvent = {
          type: 'Sehri',
          time: todayData.sehri,
          remainingSeconds: differenceInSeconds(sehriTime, nowIst),
        };
      } else if (!isAfter(nowIst, iftarTime)) {
        nextEvent = {
          type: 'Iftar',
          time: todayData.iftar,
          remainingSeconds: differenceInSeconds(iftarTime, nowIst),
        };
      } else {
        const tomorrowStr = format(addDays(nowIst, 1), 'yyyy-MM-dd');
        const tomorrowData = RAMADAN_DATA_2026.find(d => d.date === tomorrowStr);
        if (tomorrowData) {
          const tomorrowSehri = parseISO(`${tomorrowData.date}T${tomorrowData.sehri}:00`);
          nextEvent = {
            type: 'Sehri',
            time: tomorrowData.sehri,
            remainingSeconds: differenceInSeconds(tomorrowSehri, nowIst),
          };
        }
      }

      const currentIndex = RAMADAN_DATA_2026.findIndex(d => d.date === todayStr);
      const forecast = RAMADAN_DATA_2026.slice(currentIndex, currentIndex + 8);

      setState({
        today: todayData,
        nextEvent,
        forecast,
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return state;
};
