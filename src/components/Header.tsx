import { AppMode } from "../ui/Mode";
import { DashboardNav, PublicNav } from "../ui/ToggleNav";
import Logo from "../assets/Translogo.png";

export function HomeHeader() {
    return (
        <header>
            <div>
                <img src={Logo} />
                naira earning app
            </div>
            <div>
                <AppMode />
                <PublicNav />
            </div>
        </header>
    )
}

export function PublicHeader() {

    const goBack = () => {
        window.history.back();
    }

    return (
        <header>
            <div>
                <i onClick={goBack} className="bi bi-arrow-left-short"></i>
                <img src={Logo} />
                naira earning app
            </div>
            <AppMode />
        </header>
    )
}

export function AuthHeader() {

    const goBack = () => {
        window.history.back();
    }

    return (
        <header>
            <div>
                <i onClick={goBack} className="bi bi-arrow-left-short"></i>
                <img src={Logo} />
                <div>naira earning app</div>
            </div>
            <AppMode />
        </header>
    )
}

export function DashHeader() {
    return (
        <header>
            <div>
                <img src={Logo} />
                naira earning app
            </div>
            <div>
                <AppMode />
                <DashboardNav />
            </div>
        </header>
    )
}

export function UserHeader() {

    const goBack = () => {
        window.history.back();
    }

    return (
        <header>
            <div>
                <i onClick={goBack} className="bi bi-arrow-left-short"></i>
                <img src={Logo} />
                naira earning app
            </div>
            <AppMode />
        </header>
    )
}