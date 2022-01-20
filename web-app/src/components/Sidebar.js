import React from 'react';
import { Button } from './ButtonComponent';

const Sidebar = ({ buttonsArray }) => {
    return (
        <div className="h-100 left-panel btn-light d-flex flex-column p-4">
            {
                buttonsArray.map((el, index) => {
                    return <Button key={`button_${index}`} el={el} />
                })
            }
        </div>
    )
}

export default Sidebar
