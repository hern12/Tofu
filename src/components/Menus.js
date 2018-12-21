import React, { Component } from 'react';

function Menus(props) {
    return (
        <div onClick={e => props.menuSelected(props.menuIndex)} className="menu_item" style={{background: props.menuItem.checked ? '#2ed573' : props.menuItem.bgColor}}>
            <div className="menuName">
                {props.menuItem.name}
            </div>
        </div>
    )
}

export default Menus