import React from 'react'

const Card = ({ singleElement }) => {

    return (
        <div
            key={singleElement.index}
            className="col-4">
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title fs-5">{singleElement.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted fs-6">{singleElement.subtitle}</h6>
                </div>
                <div className="card-footer text-end">
                    <button
                        className="btn btn-outline-success btn-sm"
                        type="button"
                        onClick={() => singleElement.btnClickHandler(singleElement.planId)}
                    >
                        {singleElement.buttonName}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card