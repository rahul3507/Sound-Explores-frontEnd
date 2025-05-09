// src\layouts\AuthLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import LoadingScreen from "../components/ui/LoadingScreen";

const AuthLayout = () => {
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
      className='min-h-screen bg-background flex flex-col justify-center items-center'
    >
      <main className='w-full max-w-md'>
        <div className='bg-background w-full h-full text-foreground min-h-screen'>
          <Outlet />
        </div>
      </main>
    </motion.div>
  );
};

export default AuthLayout;
