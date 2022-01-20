import React, { useContext } from 'react';
import SearchBar from '../views/PlanBoardComponent/Search/SearchBar';
import { UserContext } from '../context/UserContext';

const AddTaskModal = ({
    planMembers,
    modalProps,
    taskTitle,
    setTaskTitle,
    date,
    setDate,
    changeHandler,
    priority,
    setPriority,
    bucketId,
    assignedTo
}) => {

    const [userContext, setUserContext] = useContext(UserContext);

    return (
        <form
            key={`modal_${Math.ceil(Math.random())}`}
            className="modal fade"
            id={`${modalProps.id}Modal`}
            tabIndex="-1"
            aria-labelledby={`${modalProps.id}ModalLabel`}
            aria-hidden="true"
            onSubmit={modalProps.onSubmit ? (e) => modalProps.onSubmit(e) : null}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{modalProps.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="container modal-body">
                        <div className="row gx-1 mb-3">
                            <input
                                className="form-control col"
                                type="text"
                                placeholder="Enter a Task Title"
                                onChange={(e) => setTaskTitle(e.target.value)}
                                value={taskTitle}
                                required
                            />
                        </div>
                        <div className="row gx-1 mb-3">
                            <div className="col">
                                <SearchBar
                                    searchList={planMembers}
                                    shouldIgnoreUser={false}
                                    isMulti={false}
                                    defaultVal={assignedTo !== "" ? assignedTo : []}
                                    onChangeHandler={changeHandler}
                                    disableSelect={false}
                                    placeHolderText={"Assign"}
                                />
                            </div>
                            <div className="col">
                                <input
                                    className="form-control col"
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row gx-1 mb-3">
                            <div className="col-6">
                                <select className={"border btn btn-white dropdown-toggle"} value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option disabled className="text-start" value="">Priority</option>
                                    <option className="text-start" value="HIGH">High</option>
                                    <option className="text-start" value="MEDIUM">Medium</option>
                                    <option className="text-start" value="LOW">Low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id={`${bucketId}_closeBtn`} className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                        <button
                            type="submit"
                            className="btn btn-outline-success"
                        >{modalProps.secondaryBtn}</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddTaskModal
