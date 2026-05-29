import { Link } from "react-router-dom";
import { LogoutUser } from "../../../ui/Logout";
import { useContext, useState } from "react";
import { ErrorModalContext, SuccessModalContext } from "../../../context/ModalContext";

export default function UserDashboard() {

    const [dashboard, setDashbaord] = useState({
        username: "dhexaya",
        naira_balance: 0,
        naira_token: 0,
        refill: 1000,
    })

    const successContext = useContext(SuccessModalContext);
    if (!successContext) return null;
    const { setSuccessMessage, setShowSuccessModal } = successContext;

    const errorContext = useContext(ErrorModalContext);
    if (!errorContext) return null;
    const { setErrorMessage, setShowErrorModal } = errorContext;

    const HandleClick = () => {
        if (dashboard.refill === 0) {
            setErrorMessage("wait 24hours for refill");
            setShowErrorModal(true);
            return;
        }
        setDashbaord(prev => (
            {...prev, 
                naira_token: dashboard.naira_token + 1, 
                refill: dashboard.refill - 1}
        ))
    }

    const HandleCollect = () => {
        if (dashboard.naira_token === 0) {
            setErrorMessage("no more naira token");
            setShowErrorModal(true);
            return;
        }
        setDashbaord(prev => (
            {...prev, 
                naira_balance: dashboard.naira_balance + dashboard.naira_token, 
                naira_token: dashboard.naira_token - dashboard.naira_token}
        ))

        setSuccessMessage("nairatoken collected successfully");
        setShowSuccessModal(true);
    }

    return (
        <div className="user-dashboard">
            <div className="top">
                <h2>{dashboard.username} dashboard</h2>
                <div>
                    <h3>naira balance</h3>
                    <span>{dashboard.naira_balance}</span>
                </div>
            </div>

            <div className="center">
                <div>
                    <h3>nairatoken</h3>
                    <span>{dashboard.naira_token}</span>
                </div>

                <button 
                onClick={HandleClick}>
                </button>

                <div>
                    <div>
                        <i className="bi bi-lightning-charge-fill"></i>
                        <span>1000/{dashboard.refill}</span>
                    </div>
                    <button 
                    onClick={HandleCollect}>
                        collect token
                    </button>
                </div>
            </div>

            <div className="bottom">
                <Link to="/daily/task">
                <i className="bi bi-calendar-check-fill"></i>
                daily</Link>
                <Link to="/earn/reward">
                <i className="bi bi-briefcase-fill"></i>
                earn</Link>
                <Link to="/referrals">
                <i className="bi bi-people-fill"></i>
                refer</Link>
            </div>
            
        </div>
    )
}