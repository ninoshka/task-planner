import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './App.scss';
import Loader from './components/Loader';
import { UserContext } from "./context/UserContext";
import Dashboard from './views/Dashboard';
// import { Testcomponent } from './Testcomponent';
import './App.scss';
import LandingComponent from './views/LandingComponent';

const App = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  let navigate = useNavigate();

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token, userId: data.user._id }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  const logoutHandler = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API_ENDPOINT + "/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      if (!response.ok) {
        if (response.status === 400) {
          alert("There was some issue with the request.")
        } else if (response.status === 401) {
          alert("You are not authorized to make this request.")
        }
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, details: undefined, token: null }
        })
        window.localStorage.setItem("logout", Date.now());
        navigate("/");
      }
    })
  }

  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      //window.location.reload()
      navigate("/");
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)
    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

  return (
    <div className="App">

      {/* <Testcomponent /> */}

      {userContext.token === null
        ? <LandingComponent />
        : userContext.token
          ? <Dashboard logoutHandler={logoutHandler} />
          : <Loader />
      }
    </div>
  )
}

export default App