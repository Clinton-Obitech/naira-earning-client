import { useState } from "react";
import { ButtonLoader } from "../../../ui/Loader";

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

    return (
        <div className="auth">
            <h1>reset password</h1>
            <form>
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