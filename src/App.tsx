import { useRamadan } from '@/hooks/use-ramadan';
import { useTimeFormat } from '@/hooks/use-time-format';
import { useTheme } from '@/hooks/use-theme';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { CountdownCard } from '@/components/CountdownCard';
import { ForecastList } from '@/components/ForecastList';
import { EmptyState } from '@/components/EmptyState';
import { Footer } from '@/components/Footer';

const App = () => {
  const { today, nextEvent, forecast } = useRamadan();
  const { use12Hour, toggleFormat } = useTimeFormat();
  useTheme();

  if (!today || !nextEvent) {
    return <EmptyState />;
  }

  return (
    <Layout>
      <Header />
      <CountdownCard 
        today={today} 
        nextEvent={nextEvent} 
        use12Hour={use12Hour} 
        onToggleFormat={toggleFormat} 
      />
      <ForecastList 
        forecast={forecast} 
        use12Hour={use12Hour} 
      />
      <Footer />
    </Layout>
  );
};

export default App;
