import React from 'react'
import styled from 'styled-components'
import Task from './Task/Task'
import AddTaskButton from './Task/AddTaskButton/AddTaskButton'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 1rem;
    border: 1px solid lightgrey;
    border-radius: 5px;
    width:300px;
    display:flex;
    flex-direction: column;
    background-color:white;
    box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
`;
const Title = styled.h6`
    padding-left:1rem;
    padding-right:1rem;
    padding-bottom: 1rem;
    margin-top: 1rem;
    text-align: start;
    border-bottom: 1px solid #33c481;
`;
const TaskList = styled.div`
    padding: 1rem;
    background-color: ${props => (props.isDraggingOver ? '#d5f3ff' : 'inherit')};
    min-height:100px;
`;

function Bucket(props) {
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {(provided) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}>
                    <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                    <AddTaskButton
                        planMembers = {props.planMembers}
                        setAddTaskResponse={props.setAddTaskResponse}
                        key={props.index}
                        planId={props.planId}
                        bucketSelected={props.column.id}
                    />
                    <Droppable droppableId={props.column.id} type='task'>
                        {(provided, snapshot) => (
                            <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
                                {props.tasks.map((task, index) => <Task
                                planMembers = {props.planMembers} 
                                setAddTaskResponse={props.setAddTaskResponse} 
                                planId={props.planId} 
                                key={task._id} 
                                task={task} 
                                index={index}
                                bucketSelected={props.column.id}
                                />)}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                </Container>

            )}
        </Draggable>
    )
}

export default Bucket
