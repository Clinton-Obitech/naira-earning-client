import { useContext, useState } from "react"
import { ButtonLoader } from "../../../ui/Loader";
import { ErrorModalContext, SuccessRedirectModalContext } from "../../../context/ModalContext";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOTP() {

    const [otp, setOTP] = useState("");

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

            const { data } = await api.post("/api/verify/OTP", {otp: otp});

            setSuccessRedirectMessage(data.message);
            setOTP("");

            setTimeout(() => {
                navigate("/reset/password", {replace: true})
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
            <h1>one time Password</h1>

            <form onSubmit={HandleFormSubmit}>
                <label>
                    <input
                    type="text"
                    value={otp}
                    placeholder="enter your otp..."
                    onChange={(e) => {
                        setOTP(e.target.value)
                    }}
                    />
                </label>

                <button
                type="submit"
                >
                    {loading ? <ButtonLoader /> : "verify otp"}
                </button>
            </form>
        </div>
    )
}