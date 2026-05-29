import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../ui/ui.module.css";

export function PublicNav() {

    const [openNav, setOpenNav] = useState(false);

    const toggleNav = () => {
        setOpenNav(!openNav)
    }

    return (
        <div className={styles.dropdown}>
            <i className=
            {openNav ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            onClick={toggleNav} 
            />
            {openNav && (
            <nav>
                <Link to="/our/service"><i className="bi bi-briefcase"></i>service</Link>
                <Link to="/about/us"><i className="bi bi-info-circle"></i>about</Link>
                <Link to="/contact/us"><i className="bi bi-chat-text"></i>contact</Link>
                <Link to="/faq"><i className="bi bi-question-circle"></i>faq</Link>
                <Link to="/terms/of/use"><i className="bi bi-journal-text"></i>terms of use</Link>
                <Link to="/privacy/policy"><i className="bi bi-shield"></i>privacy policy</Link>
            </nav>
            )}
        </div>
    )
}

export function DashboardNav() {

    const [openNav, setOpenNav] = useState(false);

    const toggleNav = () => {
        setOpenNav(!openNav)
    }

    return (
        <div className={styles.dropdown}>
            <i className=
            {openNav ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            onClick={toggleNav} 
            />
            {openNav && (
            <>
            <nav>
                <Link to="/user/profile"><i className="bi bi-person"></i>profile</Link>
                <Link to="/user/settings"><i className="bi bi-gear"></i>settings</Link>
                <Link to="/our/service"><i className="bi bi-briefcase"></i>service</Link>
                <Link to="/about/us"><i className="bi bi-info-circle"></i>about</Link>
                <Link to="/contact/us"><i className="bi bi-chat-text"></i>contact</Link>
                <Link to="/faq"><i className="bi bi-question-circle"></i>faq</Link>
                <Link to="/terms/of/use"><i className="bi bi-journal-text"></i>terms of use</Link>
                <Link to="/privacy/policy"><i className="bi bi-shield"></i>privacy policy</Link>
            </nav>
            </>
            )}
        </div>
    )
}