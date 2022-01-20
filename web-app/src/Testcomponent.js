import React from 'react';
import './App.scss';
import Select from 'react-select'

const options_buckets = [
    { value: 'To-do', label: 'To-do' },
    { value: 'In-progress', label: 'In-progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Completed', label: 'Completed' }
]

const options_priority = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
]

export const Testcomponent = () => {
    return (
        <div>
            <button type="button" data-bs-target="#exampleModal" class="btn btn-primary" data-bs-toggle="modal" >
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" >

                <div class="modal-dialog" role="document" id="exampleModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Task Name</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div class="dropdown">
                                <div class="buckets">
                                    <label>Bucket </label>
                                    <Select options={options_buckets} />
                                </div>
                                <div class="priority">
                                    <label>Priority </label>
                                    <Select options={options_priority} />
                                </div>
                            </div>


                            <div class="assignedto">
                                <label>Assigned to  : </label>
                                <div class="initials">

                                    AP

                                </div>
                            </div>
                            <div class="date">
                                <label>Due-Date :  </label>
                                <input type="date"></input>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Save changes</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}