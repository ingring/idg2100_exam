import React from 'react';
import './button.css';

function InputButton({ value }) {
    return (
        <input type="submit" value={value} className='input-btn' />
    )
}


export default InputButton