import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import StickyFooter from "./components/StickyFooter";
import VoiceAssistant from "./components/VoiceAssistant";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import axios from "axios";
import CallOverlay from "./components/CallOverlay";
import { ActivateContextProvider } from "./contexts/ActivateContext";
import {
  AiResponseProvider,
  useAiResponse,
} from "./contexts/AiResponseContext";
import TaskBoard from "./components/TaskBoard";
import ParentControl from "./components/ParentControl";

// ScrollToTop component to handle scroll position on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface Calling {
  calling: boolean;
  setCall: React.Dispatch<React.SetStateAction<boolean>>;
}

// AnimatedRoutes component for page transitions
const AnimatedRoutes: React.FC<Calling> = ({ calling, setCall }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { setAiRes } = useAiResponse();
  const navigate = useNavigate();
  useEffect(() => {
    const ping = () => {
      console.log("Ping");
      axios
        .get("http://localhost:8080/api/chat/current-task", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success && res.data.data) {
            setAiRes(res.data.data.response.userPromptResponse);
            navigate("/calling");
            console.log(res.data.data.response.userPromptResponse);
          }
        });
    };

    const interval = setInterval(ping, 10000);
    ping(); // send one immediately on load

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/TaskBoard" element={<TaskBoard />} />
        <Route path="/parentcontrol" element={<ParentControl/>} />
        <Route
          path="/auth"
          element={!token ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/assistant"
          element={
            token ? (
              <VoiceAssistant />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/calling"
          element={
            token ? (
              <CallOverlay
                onShow={() => setCall(true)}
                onAnswer={() => {
                  setCall(false);
                  navigate("/assistant");
                }}
                onDecline={() => {
                  setCall(false);
                  navigate("/");
                }}
              />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [call, setCall] = useState<boolean>(false);

  return (
    
    <ActivateContextProvider>
    <AiResponseProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />

          <div className="flex flex-col min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            {!call ? <Header /> : ""}
            <main className="flex-grow">
              <AnimatedRoutes calling={call} setCall={setCall} />
            </main>
            {!call ? <Footer /> : ""}
            {!call ? <StickyFooter /> : ""}
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AiResponseProvider>
    </ActivateContextProvider>
  );
}

export default App;
