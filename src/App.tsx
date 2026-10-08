import { useNavigate, useLocation } from "react-router-dom";
import TopAnnouncementBar from "./components/TopAnnouncementBar/TopAnnouncementBar";
import Navbar from "./components/Navbar/Navbar";
import NewsTicker from "./components/NewsTicker/NewsTicker";
import HeroSection from "./components/HeroSection/HeroSection";
import AirgatePaymentForm from "./components/AirgatePaymentForm/AirgatePaymentForm";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      {location.pathname === "/pay/airgate" ? (
        <AirgatePaymentForm onBack={() => handleNavigate("/")} />
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