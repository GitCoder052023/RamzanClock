import { useState } from 'react';
import { triggerHaptic } from '@/utils/haptic';

export const useTimeFormat = () => {
  const [use12Hour, setUse12Hour] = useState(true);

  const toggleFormat = () => {
    triggerHaptic();
    setUse12Hour(prev => !prev);
  };

  return { use12Hour, toggleFormat };
};
