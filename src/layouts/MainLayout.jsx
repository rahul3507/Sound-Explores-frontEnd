// src\layouts\MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import LoadingScreen from "../components/ui/LoadingScreen";
import { StatusBar } from "../components/common/StatusBar";

const MainLayout = () => {
  const { loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <main className="md:container mx-auto flex justify-center">
        <div className="w-full md:max-w-md">
          {/* <StatusBar /> */}
          {/* <NavBar /> */}
          <Outlet />
        </div>
      </main>
    </motion.div>
  );
};

export default MainLayout;
