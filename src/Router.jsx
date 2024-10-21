import { Route, Router, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/navbar/Navbar.jsx";
import { lazy, Suspense } from "react";
import Loader from "./component/loader/Loader.jsx";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));

const ChatPage = lazy(() => import("./pages/ChatPage/ChatPage.jsx"));

const Signup = lazy(() => import("./pages/SignUpPage/SignupPage.jsx"));

const DashBoard = lazy(() => import("./pages/Dashboard/DashBoard.jsx"));

const RoutesElement = () => {
  const location = useLocation();

  const noNavbarPaths = ["/", "/register"];

  const shouldDisplayNavbar = !noNavbarPaths.includes(location.pathname);
  return (
    <>
      {shouldDisplayNavbar ? (
        <Navbar>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/DashBoard" element={<DashBoard />} />
              <Route path="/contact" element={<h1>Contact</h1>} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Suspense>
        </Navbar>
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default RoutesElement;
