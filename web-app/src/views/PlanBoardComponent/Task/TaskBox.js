import React, { useEffect, useState, useContext } from 'react';
import AddTaskModal from '../../../components/AddTaskModal';
import { Button } from '../../../components/ButtonComponent';
import { UserContext } from "../../../context/UserContext";
import './Styles.scss';


const TaskBox = (props) => {
    const [userContext, setUserContext] = useContext(UserContext);
    let assignedUser = userContext.users.filter(e => { return e.id === props.task.assignedTo })
    const [taskTitle, setTaskTitle] = useState(props.task.title);
    const [date, setDate] = useState(props.task.dueDate.split('T')[0]);
    const [assignedTo, setAssignedTo] = useState(assignedUser[0]);
    const [priority, setPriority] = useState(props.task.priority);

    const modalSubmission = (e) => {
        // var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
        //     keyboard: false
        //   })
        e.preventDefault();
        let finalAssignedTo = "";
        if (typeof assignedTo === "object") {
            finalAssignedTo = assignedTo.id;
        } else {
            finalAssignedTo = assignedTo;
        }
        let postData = {
            title: taskTitle,
            bucketId: props.bucketSelected,
            plan: props.planId,
            assignedTo: finalAssignedTo,
            dueDate: date,
            priority: priority
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + `/tasks/${props.task._id}`, {
            method: "PUT",
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
                    document.getElementById(`${props.bucketSelected}_closeBtn`).click()
                    props.setAddTaskResponse(data);
                }
            })

    }

    const handleTaskClick = (selectedUser) => {
        setAssignedTo(selectedUser.id);
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        // call delete task API from backend
        // deletes task object, removes task from plan
        fetch(process.env.REACT_APP_API_ENDPOINT + `/tasks/${props.task._id}`, {
            method: "Delete",
            headers: {
                "Authorization": `Bearer ${userContext.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "planId": props.planId })
        })
            .then(async (res) => {
                const data = await res.json();
                props.setAddTaskResponse(data);
            })
    }

    let buttonsArray = {
        id: `expand_${props.index}_${props.bucketSelected}`,
        buttonName: "",
        className: "p-0 border-0 bg-white",
        iconName: "expand",
        modalData: {
            "toggle": "modal",
            "target": `expandTask_${props.index}_${props.bucketSelected}Modal`
        },
        iconClassName: "addBtnIcon"
    }

    const modalData = {
        "id": `expandTask_${props.index}_${props.bucketSelected}`,
        "title": "Edit Task",
        "secondaryBtn": "Submit Changes",
        "onSubmit": modalSubmission
    }

    const expandTaskModal = Object.keys(modalData).length > 0
        ? <AddTaskModal
            planMembers={props.planMembers}
            key={`expandTask_${Math.ceil(Math.random())}`}
            modalProps={modalData}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            date={date}
            setDate={setDate}
            changeHandler={handleTaskClick}
            priority={priority}
            setPriority={setPriority}
            bucketId={props.bucketSelected}
            assignedTo={assignedTo}
        />
        : null

    return (
        <div className="taskCard">
            <div className="title"> {props.task.title}</div>
            {/* <div className="d-flex flex-row">{
                props.task.priority ?
                    <span className={props.task.priority}>{props.task.priority}</span> : null
                }
                { 
                props.task.dueDate ? <span className="dueDate">{props.task.dueDate.substring(0, 10)}</span>  : null
                }
            </div> */}
            <div className="flexClass d-flex flex-row">
                <div>
                    <span className={props.task.priority}>{props.task.priority}</span>
                </div>
                <div className="flexLeft">
                    <a href={'javascript.void(0)'} onClick={handleDeleteClick}><ion-icon name="trash-outline"></ion-icon></a>
                    <Button el={buttonsArray} />
                </div>
            </div>
            {expandTaskModal}
        </div>
    )
}

export default TaskBox
