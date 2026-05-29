export type SuccessRedirectContextType = {
    successRedirectMessage: string | null;
    setSuccessRedirectMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export type ErrorRedirectContextType = {
    errorRedirectMessage: string | null;
    setErrorRedirectMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export type SuccessContextType = {
    successMessage: string | null;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
    showSuccessModal: boolean;
    setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ErrorContextType = {
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
    showErrorModal: boolean;
    setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ConfirmContextType = {
    confirmMessage: string | null;
    setConfirmMessage: React.Dispatch<React.SetStateAction<string | null>>;
    confirm: boolean;
    setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export type LoggedContextType = {
    logged: boolean;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ChildrenNode = {
    children: React.ReactNode
}