import { Navigate, Outlet } from "react-router-dom";
import { AuthHeader, DashHeader, HomeHeader, PublicHeader, UserHeader } from "../components/Header";
import { Footer } from "../components/Footer";
import { LoggedContext } from "../context/LoggedContext";
import { useContext } from "react";
import "../pages/auth/auth.css";
import "../pages/page.css";
import "../pages/dashboard/user/user.css";
import "./layout.css";

export function HomeLayout() {
    return (
        <main>
            <HomeHeader />
            <Outlet />
            <Footer />
        </main>
    )
}

export function PublicLayout() {
    return (
        <main>
            <PublicHeader />
            <Outlet />
            <Footer />
        </main>
    )
}

export function AuthLayout() {
    return (
        <main>
            <AuthHeader />
            <Outlet />
        </main>
    )
}

export function DashboardLayout() {

    /*const context = useContext(LoggedContext);

    if (!context) return null;

    const { logged } = context;

    if (!logged) return <Navigate to="/login/user" replace/>*/

    return (
        <div className="dash-layout">
            <DashHeader />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export function UserLayout() {

    const context = useContext(LoggedContext);

    if (!context) return null;

    const { logged } = context;

    if (!logged) return <Navigate to="/login/user" replace/>

    return (
        <main>
            <UserHeader />
            <Outlet />
        </main>
    )
}