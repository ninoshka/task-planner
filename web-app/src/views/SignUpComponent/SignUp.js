import React, { isValidElement, useContext, useState } from "react"
import { UserContext } from "../../context/UserContext";


const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const SignUp = ({ setStartPage }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [userContext, setUserContext] = useContext(UserContext)

    /*
    Blur handlers for firstName
    */
    const handleOnBlurFirstName = (e) => {

        if (!firstName) {

            setFirstNameError("First Name is required");
        } else {
            setFirstNameError("");
        }
    }

    /*
   Blur handlers for Last Name
   */
    const handleOnBlurLastName = (e) => {

        if (!lastName) {

            setLastNameError("Last Name is required");
        } else {
            setLastNameError("");
        }
    }

    /*
  Blur handlers for Email / usernname
  */
    const handleOnBlurUsername = (e) => {

        if (!email) {

            setEmailError("Email ID is required");
        }
        else if (!emailValidator.test(email)) {
            setEmailError("Please valid Username. Example - abc@gmail.com");
        }

        else {
            setEmailError("");
        }
    }

    /*
Blur handlers for Password
*/
    const handleOnBlurPassword = (e) => {

        if (!password) {

            setPasswordError("Password is required");
        }
        else if (!passwordValidator.test(password)) {
            setPasswordError("Password should contain at least one capital letter, total eight characters and one digit");
        }

        else {
            setPasswordError("");
        }
    }

    /**
     * Handling form submit actions
     * @param {Event} e 
     */
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        const genericErrorMessage = "Something went wrong! Please try again later."

        fetch(process.env.REACT_APP_API_ENDPOINT + "/signup", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, username: email, password }),
        })
            .then(async response => {
                setIsSubmitting(false)
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!")
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.")
                    } else if (response.status === 500) {
                        const data = await response.json()
                        if (data.message) setError(data.message || genericErrorMessage)
                    } else {
                        setError(genericErrorMessage)
                    }
                } else {
                    const data = await response.json()
                    if (data.success === true) {
                        setUserContext(oldValues => {
                            return { ...oldValues, token: null }
                        });
                        setStartPage('signin');
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
            <form className="sign-up-form card" onSubmit={handleFormSubmit} style={{ width: "30%" }}>
                <div className="card-header bg-white">
                    <button
                        className="backButton btn"
                        onClick={() => setStartPage("signin")}>
                        <ion-icon name="arrow-back-outline" size="small"></ion-icon>
                    </button>
                    <ion-icon name="calendar"></ion-icon>
                    <strong>Planner Sign Up</strong>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">First Name</label>
                        <input
                            className="form-control "
                            type="text"
                            placeholder="Enter First Name"
                            onBlur={handleOnBlurFirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        />

                        {firstNameError ? <span className="text-danger">{firstNameError}</span> : null}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Last Name"
                            onBlur={handleOnBlurLastName}
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                        />

                        {lastNameError ? <span className="text-danger">{lastNameError}</span> : null}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Email Address</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            onBlur={handleOnBlurUsername}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        {emailError ? <span className="text-danger">{emailError}</span> : null}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Enter Password"
                            onBlur={handleOnBlurPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        {passwordError ? <span className="text-danger">{passwordError}</span> : null}

                    </div>
                    <div className="card-footer text-center bg-white">
                        <button
                            className="btn btn-outline-primary"
                            type="submit"
                            disabled={isSubmitting}
                            text={`${isSubmitting ? "Registering" : "Register"}`}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
            <div className="mt-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                    Already a User?
                    <button
                        className="btn btn-link p-0"
                        onClick={() => setStartPage(`signin`)}>
                        {` Sign In`}
                    </button>
                </label>
            </div>
        </>
    )
}

export default SignUp