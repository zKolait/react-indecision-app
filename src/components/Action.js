// Imports
import React from 'react'



// Stateless functional component
const Action = (props) => (
    <div>
        <button
            className="big-button" 
            onClick={props.handlePick}
            disabled={!props.hasOptions}
        >
            What should I do ?
        </button>
    </div>
)



// Export
export default Action