import  { useState } from 'react';
import TopAnnouncementBar from './components/TopAnnouncementBar/TopAnnouncementBar';
import Navbar from './components/Navbar/Navbar';
import NewsTicker from './components/NewsTicker/NewsTicker';
import HeroSection from './components/HeroSection/HeroSection';
import AirgatePaymentForm from './components/AirgatePaymentForm/AirgatePaymentForm';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  return (
    <div>
      {currentPath === '/pay/airgate' ? (
        <AirgatePaymentForm onBack={() => handleNavigate('/')} />
      ) : (
        <>
          <TopAnnouncementBar />
          <Navbar onNavigate={handleNavigate} />
          <NewsTicker />
          <HeroSection onNavigate={handleNavigate} />
        </>
      )}
    </div>
  );
}