import { useContext, useState } from "react";
import { ButtonLoader } from "../../../ui/Loader";
import axios from "axios";
import api from "../../../api/axios";
import { ErrorModalContext, SuccessRedirectModalContext } from "../../../context/ModalContext";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

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

            const { data } = await api.post("/api/forgot/password", {email: email});

            setSuccessRedirectMessage(data.message);
            setEmail("");

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
            <h1>Password Recovery</h1>
            <form onSubmit={HandleFormSubmit}>
                <label><i className="bi bi-envelope"></i>
                    <input
                    type="email"
                    value={email}
                    placeholder="enter your email"
                    onChange={(e) => 
                        setEmail(e.target.value)
                    }
                    />
                </label>

                <button
                type="submit"
                >
                    {loading ? <ButtonLoader /> : "send otp"}
                </button>
            </form>
        </div>
    )
}