import { useContext, useState } from "react";
import { ButtonLoader } from "../../../ui/Loader";
import { ErrorModalContext, SuccessRedirectModalContext } from "../../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import axios from "axios";

export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState("password");

    const toggleShowPassword = () => {
        setShowPassword(
            showPassword === "password" ?
            "text" : "password"
        )
    }

    const successContext = useContext(SuccessRedirectModalContext);
    if (!successContext) return null;
    const { setSuccessRedirectMessage } = successContext;
    
    const errorContext = useContext(ErrorModalContext);
    if (!errorContext) return null;
    const { setErrorMessage, setShowErrorModal } = errorContext;

    const navigate = useNavigate();

    const HandleFormSubmit = async (
        e:React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (!navigator.onLine) {
                setShowErrorModal(true);
                setErrorMessage("no internet connection");
                return;
            }

            const { data } = await api.post("/api/forgot/password", {password: password});

            setSuccessRedirectMessage(data.message);
            setPassword("");

            setTimeout(() => {
                navigate("/verify/OTP", {replace: true})
            }, 3000);

        } catch (err) {
            if (axios.isAxiosError(err)) {
                setShowErrorModal(true);
                setErrorMessage(err.response?.data?.error || "something went wrong");
            } else {
                console.error(err)
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth">
            <h1>reset password</h1>
            <form onSubmit={HandleFormSubmit}>
                <label><i className="bi bi-lock"></i>
                    <input
                    type={showPassword}
                    value={password}
                    placeholder="enter new password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
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

                <button
                type="submit"
                >
                    {loading ? <ButtonLoader /> : "save password"}
                </button>
            </form>
        </div>
    )
}