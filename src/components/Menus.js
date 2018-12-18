import React, { Component } from 'react';

function Menus(props) {
    return (
        <div className="menu_item" style={{background: props.checked ? '#2ed573' : props.bgColor}}>
            <div className="menuName">
                {props.name}
            </div>
        </div>
    )
}

export default Menus