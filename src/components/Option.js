// Imports
import React from 'react'



// Stateless functional component
const Option = (props) => (
    <div className="option">
        <p className="option__text">{props.count}. {props.option}</p>
        <button 
            className="button button--link"
            onClick={(e) => {
                props.handleDeleteOption(props.option)
            }}
        >
            Remove
        </button>
    </div>
)



// Export
export default Option