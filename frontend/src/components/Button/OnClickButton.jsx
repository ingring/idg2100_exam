import React from 'react';
import './button.css';


function OnClickButton({ click, value, data, type }) {
    return (
        <button onClick={click || console.log("hei")} data={data || null} type={type || "submit"} className='onclickbtn'>{value || "button"}</button>
    )
}

export default OnClickButton