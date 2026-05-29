import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import { AuthLayout, DashboardLayout, HomeLayout, PublicLayout, UserLayout } from "./layout/layout";
import LoginUser from "./pages/auth/user/SignIn";
import CreateUser from "./pages/auth/user/SignUp";
import { ConfirmModal, ErrorModal, ErrorRedirectModal, SuccessModal, SuccessRedirectModal } from "./ui/Modal";
import ForgotPassword from "./pages/auth/user/ForgotPassword";
import VerifyOTP from "./pages/auth/user/VerifyOTP";
import ResetPassword from "./pages/auth/user/ResetPassword";
import UserDashboard from "./pages/dashboard/user/Dashboard";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ServicePage from "./pages/Service";
import TermsPage from "./pages/Terms";
import PolicyPage from "./pages/Policy";
import FAQPage from "./pages/FAQ";
import UserProfile from "./pages/dashboard/user/Profile";
import UserSetting from "./pages/dashboard/user/Settings";
import "./App.css";

export default function App() {
  return (
    <>
    <Routes>

      <Route element={<HomeLayout />}>
      <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<PublicLayout />}>
      <Route path="/about/us" element={<AboutPage />} />
      <Route path="/contact/us" element={<ContactPage />} />
      <Route path="/our/service" element={<ServicePage />} />
      <Route path="/terms/of/use" element={<TermsPage />} />
      <Route path="/privacy/policy" element={<PolicyPage />} />
      <Route path="/faq" element={<FAQPage />} />
      </Route>

      <Route element={<AuthLayout />}>
      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/create/user" element={<CreateUser />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/verify/otp" element={<VerifyOTP />} />
      <Route path="/reset/password" element={<ResetPassword />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/settings" element={<UserSetting />} />
      </Route>

    </Routes>

    <SuccessRedirectModal />
    <ErrorRedirectModal />
    <SuccessModal />
    <ErrorModal />
    <ConfirmModal />
    </>
  )
}