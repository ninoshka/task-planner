import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

import ModalComponent from '../components/ModalComponent';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Board from './PlanBoardComponent/Board';
import Plan from './Plan';

const Dashboard = ({ logoutHandler }) => {

    const [userContext, setUserContext] = useContext(UserContext);
    const [newPlanName, setNewPlanName] = useState("");
    const [userData, setUserData] = useState({});

    let navigate = useNavigate();
    let pathName = window.location.pathname;

    const userPlansAPI = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userContext.userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext.token}`,
            },
        }).then(async response => {
            const data = await response.json()
            setUserData(data);
            navigate("/plans");
        })
    }

    useEffect(() => {
        userPlansAPI();
    }, [])

    const hubHandler = (e) => {
        e.preventDefault();
        userPlansAPI();
    }

    const planCreationModalSubmissionHandler = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_ENDPOINT + "/plans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext.token}`,
            },
            body: JSON.stringify({ name: newPlanName, createdBy: userContext.userId }),
        })
            .then(async response => {
                const data = await response.json()
                userData.ownedPlans.push(data);
                document.getElementById('closeBtn').click();
                setNewPlanName('')
                if (pathName !== "/plans") {
                    navigate("/plans")
                }
            })
    }

    let headerDetails = {
        "className": "border-bottom border-2 border-success btn-light",
        "buttonName": "Logout",
        "clickFunction": logoutHandler,
        "brandName": "Planner"
    }

    let buttonsArray = [
        {
            id: "myHubBtn",
            buttonName: "Dashboard",
            className: `btn btn-outline-success text-start mt-5 mb-5 ${pathName === "/plans" ? 'active' : null}`,
            iconName: "sync-circle",
            onclickHandler: hubHandler,
        },
        {
            id: "createPlanBtn",
            buttonName: "Create Plan",
            className: "btn btn-outline-success text-start",
            iconName: "add",
            modalData: {
                "toggle": "modal",
                "target": "createPlanModal"
            }
        },
    ]

    const modalData = {
        "id": "createPlan",
        "title": "New Plan",
        "secondaryBtn": "Create Plan",
        "onSubmit": planCreationModalSubmissionHandler
    }

    const createPlanModal = Object.keys(modalData).length > 0
        ? <ModalComponent
            modalProps={modalData}
            newPlanName={newPlanName}
            setNewPlanName={setNewPlanName}
        />
        : null

    return (
        <>
            <Navbar headerProps={headerDetails} />
            <div className="row w-100 h-100">
                <div className="col-2">
                    <Sidebar buttonsArray={buttonsArray} />
                </div>
                <div className="col-10">
                    <Routes>
                        <Route path="plans" element={<Plan userPlans={userData} />} />
                        <Route path="/plans/:id" element={<Board />} />
                    </Routes>
                </div>
            </div>
            {createPlanModal}
        </>
    )
}
export default Dashboard
