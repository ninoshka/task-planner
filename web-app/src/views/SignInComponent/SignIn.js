import React, { useState, useContext } from 'react';
import { UserContext } from "../../context/UserContext";

const SignIn = ({ setStartPage }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailConfirmation, setEmailConfirmation] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);

    /**
     * Handling actions on form submit
     * @param {Event} e 
     */
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        //generic error message
        const genericErrorMessage = "Something went wrong! Please try again later."

        /**
         * Fetch API call to fetch response from /login endpoint
         */
        fetch(process.env.REACT_APP_API_ENDPOINT + "/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
        })
            .then(async response => {
                setIsSubmitting(false)
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!")
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.")
                    } else {
                        setError(genericErrorMessage)
                    }
                } else {
                    const data = await response.json()
                    if (data.success === false) {
                        setEmailConfirmation("Please confirm your email, through the link sent to your email!");
                    } else {
                        setUserContext(oldValues => {
                            return { ...oldValues, token: data.token, userId: data.user._id }
                        })
                    }
                }
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })
    }

    return (
        <>
            <form className="sign-in-form card" onSubmit={handleFormSubmit} style={{ width: "30%" }}>
                <div className="card-header bg-white">
                    <button
                        className="backButton btn"
                        onClick={() => setStartPage("welcome")}>
                        <ion-icon name="arrow-back-outline" size="small"></ion-icon>
                    </button>
                    <ion-icon name="calendar"></ion-icon>
                    <strong>Planner Sign In</strong>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        {/* {error ? <span className="text-danger">{error}</span> : null} */}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        {error ? <span className="text-danger">{error}</span> : null}
                        {emailConfirmation ? <span className="text-danger">{emailConfirmation}</span> : null}
                    </div>
                </div>
                <div className="card-footer text-center bg-white">
                    <button
                        disabled={isSubmitting}
                        className="btn btn-outline-primary"
                        type="submit"
                    >
                        {`${isSubmitting ? "Signing In" : "Sign In"}`}
                    </button>
                </div>
            </form>
            <div className="mt-3">
                <label htmlFor="signUpNavigation" className="form-label">
                    No Account?
                    <button
                        className="signUpNavigation btn btn-link"
                        onClick={() => setStartPage(`signup`)}>
                        {` Create One.`}
                    </button>
                </label>
            </div>
        </>
    )
}

export default SignIn
