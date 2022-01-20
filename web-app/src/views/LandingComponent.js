import React, { useState } from 'react';
import SignIn from './SignInComponent/SignIn';
import SignUp from './SignUpComponent/SignUp';

const LandingComponent = () => {
    const [startPage, setStartPage] = useState("welcome");

    return (
        <div className="welcome">
            {startPage === "welcome"
                ?
                <div className="card w-50 h-60 padding-20 text-center">
                    <div className="card-body">
                        <h5 className="card-title"><ion-icon name="calendar"></ion-icon></h5>
                        <p className="header"><strong>Task Planner</strong></p>
                        <p className="card-text">A simple visual way to organise Teamwork.</p>
                        <span>
                            <ion-icon name="people-outline" size="small"></ion-icon>
                            <ion-icon name="calendar-outline" size="small"></ion-icon>
                            <ion-icon name="checkbox-outline" size="small"></ion-icon>
                            <ion-icon name="attach-outline" size="small"></ion-icon>
                        </span>
                    </div>
                    <div className="card-footer">
                        <button type='button' className='btn btn-outline-success' onClick={() => setStartPage("signin")}>Welcome</button>
                    </div>
                </div>
                : startPage === "signin"
                    ? <SignIn setStartPage={setStartPage} />
                    : <SignUp setStartPage={setStartPage} />}
        </div>
    )
}

export default LandingComponent
