import React, { useState, useContext } from 'react';
import AddTaskModal from '../../../../components/AddTaskModal';
import { Button } from '../../../../components/ButtonComponent';
import { UserContext } from '../../../../context/UserContext';
import './Styles.scss';

const AddTaskButton = ({ setAddTaskResponse, ...props }) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [date, setDate] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [priority, setPriority] = useState("");
    const bucketId = props.bucketSelected;
    const planId = props.planId;
    const [userContext, setUserContext] = useContext(UserContext);

    const createTaskModalSubmissionHandler = (e) => {
        e.preventDefault();
        let postData = {
            title: taskTitle,
            bucketId: bucketId,
            plan: planId,
            assignedTo: assignedTo,
            dueDate: date,
            priority: priority
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + "/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext.token}`,
            },
            body: JSON.stringify(postData),
        })
            .then(async response => {
                if (!response.ok) {
                    alert("Something went wrong")
                } else {
                    const data = await response.json()
                    document.getElementById(`${bucketId}_closeBtn`).click();
                    setAddTaskResponse(data);
                }
            })
    }

    const changeHandler = (selectedUser) => {
        setAssignedTo(selectedUser.id);
    }

    let buttonsArray = {
        id: `addTaskBtn_${props.bucketSelected}`,
        buttonName: "Add Task",
        className: "btn bg-success btn-sm addTaskBtn ms-3 me-3 text-white",
        iconName: "add",
        modalData: {
            "toggle": "modal",
            "target": `addTask_${props.bucketSelected}Modal`
        },
        iconClassName: "addBtnIcon"
    }

    const modalData = {
        "id": `addTask_${props.bucketSelected}`,
        "title": "Add Task",
        "secondaryBtn": "Add Task",
        "onSubmit": createTaskModalSubmissionHandler
    }

    const addTaskModal = Object.keys(modalData).length > 0
        ? <AddTaskModal
            planMembers={props.planMembers}
            key={`addTask_${Math.ceil(Math.random())}`}
            modalProps={modalData}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            date={date}
            setDate={setDate}
            changeHandler={changeHandler}
            priority={priority}
            setPriority={setPriority}
            bucketId={bucketId}
        />
        : null

    return (
        <>
            <Button el={buttonsArray} />
            {addTaskModal}
        </>
    )
}

export default AddTaskButton;