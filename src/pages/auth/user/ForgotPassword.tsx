import { useState } from "react";
import { ButtonLoader } from "../../../ui/Loader";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    return (
        <div className="auth">
            <h1>Password Recovery</h1>
            <form>
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