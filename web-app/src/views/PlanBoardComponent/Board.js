import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import * as Constants from '../../constants/constants.js';
import { UserContext } from "../../context/UserContext";
import Bucket from './Bucket';
import PlanHeader from './PlanHeader/PlanHeader';

const Container = styled.div`
    display : flex;
`
const Board = () => {

  const [userContext, setUserContext] = useContext(UserContext);
  const [boardData, setBoardData] = useState([]);
  const [addTaskResponse, setAddTaskResponse] = useState({});

  let params = useParams();

  const fetchUpdatedPlanData = async () => {
    return await axios.get(process.env.REACT_APP_API_ENDPOINT + `/plans/${params.id}`, {
      headers: {
        "Authorization": `Bearer ${userContext.token}`,
        "Content-Type": "application/json"
      }
    })
  }

  const fetchAllUsers = async () => {
    return await axios.get(process.env.REACT_APP_API_ENDPOINT + "/users", {
      headers: {
        "Authorization": `Bearer ${userContext.token}`,
        "Content-Type": "application/json"
      }
    })
  }

  useEffect(() => {
    Promise.all([fetchUpdatedPlanData(), fetchAllUsers()])
      .then(function (results) {
        const allUsers = results[1].data;
        setUserContext(oldValues => {
          return { ...oldValues, users: allUsers }
        })
        const planData = results[0].data;
        setBoardData(planData);
      });
  }, [addTaskResponse]);

  const onDragEnd = (result) => {

    const { destination, source, draggableId } = result;

    // iff user tries dragging task to anywhere outside a bucket
    // consider no destination selected and return
    if (!destination) { console.log("return"); return }

    // if user tried to add task in same bucket again, return
    if (destination.droppableId === source.droppableId) { return }

    // anything below this happens if you're dragging tasks from one bucket to other
    const taskId = draggableId;
    const destinationBucketId = destination.droppableId;

    console.log("Task Updated:" + taskId);
    console.log("Destination Bucket" + destinationBucketId);

    console.log("Add Task" + taskId + "To Bucket " + destinationBucketId);

    // update task with destination bucket
    fetch(process.env.REACT_APP_API_ENDPOINT + `/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${userContext.token}`,
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ "bucketId": destinationBucketId })
    })
      .then(() => {
        // on successful update of task, fetch plan data again and re-render component
        fetchUpdatedPlanData()
          .then((response) => {
            setBoardData(response.data);
          });

      })
  }

  return (
    <div>
      {boardData && Object.keys(boardData).length > 0
        ? <div className="mt-4" id="projectBoard">
          <PlanHeader plan={boardData} users={userContext.users} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='all-columns' direction='horizontal' type='column'>
              {(provided) => (
                <Container {...provided.droppableProps} ref={provided.innerRef}>
                  {Constants.buckets.map((bucket, index) => {
                    // filter all tasks in a plan to get plans specific to the bucket
                    const tasks = boardData.tasks.filter((task) => task.bucketId === bucket.id);
                    // pass plan id to bucket for new task creation
                    return <Bucket planMembers={boardData.members} setAddTaskResponse={setAddTaskResponse} planId={boardData.id} key={bucket.id} column={bucket} tasks={tasks} index={index} />
                  })}
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        : null
      }
    </div>
  )
}

export default Board
