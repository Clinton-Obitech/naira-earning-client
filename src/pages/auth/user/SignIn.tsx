import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLoader } from "../../../ui/Loader";
import api from "../../../api/axios";
import axios from "axios";
import { ErrorModalContext, SuccessRedirectModalContext } from "../../../context/ModalContext";
import { LoggedContext } from "../../../context/LoggedContext";

export default function LoginUser() {

    const [formData, setFormData] = useState({
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

    const toggleShowPassword = () => {
        setShowPassword(
            showPassword === "password" ?
            "text" : "password"
        )
    }

    const navigate = useNavigate();

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

            const { data } = await api.post("/api/login/user", formData);

            setSuccessRedirectMessage(data.message);

            setFormData({
                email: "",
                password: ""
            })

            JSON.stringify(localStorage.setItem("logged", "true"));

            setLogged(() => {
                return JSON.parse(localStorage.getItem("logged") || "false")
                }
            )

            setTimeout(() => {
                navigate("/user/dashboard")
                setSuccessRedirectMessage(null)
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
            <h1>Login</h1>
            
            <form onSubmit={HandleFormSubmit}>
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

                <Link to="/forgot/password">forgot password?</Link>

                <button disabled={loading}>
                    {loading ? <ButtonLoader /> : "login"}
                </button>
            </form>

            <nav>
                <h4>don't have an account?</h4>
                <Link to="/create/user">create an account</Link>
            </nav>
        </div>
    )
}