import React from 'react';

import '../../App.css';

export const Input = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
    )
}

