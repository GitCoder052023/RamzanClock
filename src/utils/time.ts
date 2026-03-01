import { format, parse } from 'date-fns';

export const formatTime = (timeStr: string) => {
  const date = parse(timeStr, 'HH:mm', new Date());
  return format(date, 'h:mm a');
};

export const formatSeconds = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return {
    h: h.toString().padStart(2, '0'),
    m: m.toString().padStart(2, '0'),
    s: s.toString().padStart(2, '0'),
  };
};
