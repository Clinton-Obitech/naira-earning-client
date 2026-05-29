import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLoader } from "../../../ui/Loader";
import axios from "axios";
import { ErrorModalContext, SuccessRedirectModalContext } from "../../../context/ModalContext";
import api from "../../../api/axios";
import { LoggedContext } from "../../../context/LoggedContext";

export default function CreateUser() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const errorContext = useContext(ErrorModalContext);
    if (!errorContext) return null;
    const { setErrorMessage, setShowErrorModal } = errorContext;

    const successContext = useContext(SuccessRedirectModalContext);
    if (!successContext) return null;
    const { setSuccessRedirectMessage } = successContext;

    const loggedContext = useContext(LoggedContext);
    if (!loggedContext) return null;
    const { setLogged } = loggedContext;

    const [showPassword, setShowPassword] = useState("password");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(
            showPassword === "password" ?
            "text" : "password"
        )
    }

    const HandleFormChange = (
        e:React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const HandleFormSubmit = async (
        e:React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (!navigator.onLine) {
                setErrorMessage("no internet connection");
                setShowErrorModal(true);
                return;
            }

            const { data } = await api.post("/api/create/user", formData);

            setSuccessRedirectMessage(data.message);

            setFormData({
                username: "",
                email: "",
                password: ""
            })

            JSON.stringify(localStorage.setItem("logged", "true"));

            setLogged(() => {
                return JSON.parse(localStorage.getItem("logged") || "false")
                }
            )

            setTimeout(() => {
                navigate("/user/dashboard", {replace: true})
            }, 3000)

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErrorMessage(err.response?.data?.error || "something went wrong");
                setShowErrorModal(true);
            } else {
                console.error(err)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth">
            <h1>create account</h1>
            
            <form onSubmit={HandleFormSubmit}>
                <label><i className="bi bi-person"></i>
                    <input
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="enter your username..."
                    onChange={HandleFormChange}
                    />
                </label>

                <label><i className="bi bi-envelope"></i>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="enter your email..."
                    onChange={HandleFormChange}
                    />
                </label>
                
                <label><i className="bi bi-lock"></i>
                    <input
                    type={showPassword}
                    name="password"
                    value={formData.password}
                    placeholder="enter your password..."
                    onChange={HandleFormChange}
                    />
                    <i
                    style={{
                        position: "absolute",
                        right: "0.5rem",
                        color: "var(--divTextColor)"
                    }}
                    onClick={toggleShowPassword}
                    className=
                    {showPassword === 
                    "password" ? "bi bi-eye-slash-fill" 
                    : "bi bi-eye-fill"} 
                    />
                </label>

                <button disabled={loading}>
                    {loading ? <ButtonLoader /> : "login"}
                </button>
            </form>

            <nav>
                <h4>already have an account?</h4>
                <Link to="/login/user">log into your account</Link>
            </nav>
        </div>
    )
}