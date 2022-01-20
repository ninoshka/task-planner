import React from 'react'

const ModalComponent = ({ modalProps, newPlanName, setNewPlanName }) => {

    return (
        <form
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
                    <div className="modal-body">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Name"
                            onChange={(e) => setNewPlanName(e.target.value)}
                            value={newPlanName}
                            required
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="closeBtn" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
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

export default ModalComponent
