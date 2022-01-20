import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import TaskBox from './TaskBox'

const Container = styled.div`
    border: 1px solid lightgrey;
    padding:8px;
    margin-bottom:8px;
    border-radius:2px;
    background-color:${props => (props.isDragging ? '#e0ffe0' : 'white')};
`
function Task(props) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <TaskBox planMembers = {props.planMembers} index={props.index} setAddTaskResponse={props.setAddTaskResponse} planId={props.planId} task={props.task} bucketSelected={props.bucketSelected}/>
                </Container>
            )}
        </Draggable>
    )
}

export default Task
