import { useRamadan } from '@/hooks/use-ramadan';
import { useTheme } from '@/hooks/use-theme';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { CountdownCard } from '@/components/CountdownCard';
import { ForecastList } from '@/components/ForecastList';
import { EmptyState } from '@/components/EmptyState';
import { Footer } from '@/components/Footer';

const App = () => {
  const { today, nextEvent, forecast } = useRamadan();
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
      />
      <ForecastList 
        forecast={forecast} 
      />
      <Footer />
    </Layout>
  );
};

export default App;
