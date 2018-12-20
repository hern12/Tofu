import React, {Component} from 'react'

function OrderListItem(props){
    return (
        <div className="order_item_box">
            <div className="order_item">
                {
                    <div>
                        {
                            props.orderListItem.name === 'น้ำเต้าหู้เปล่า' ?
                                <span>{props.orderListItem.name}</span>
                            :
                            props.orderListItem.map((item, index) => (
                                <span key={index}>{item.name}{index < props.orderListItem.length - 1  ? ', ' : ''}</span>
                            ))
                        }
                    </div>
                }
            </div>
            <strong style={{textAlign: 'center', color: 'white', background: '#2d3436', marginLeft: '5px'}}>
                {props.sweetLevel.name}
            </strong>
            <strong 
            style={{background: props.tofuType === true ? '#ff7675' : '#0984e3', padding: 2, color: 'white'}}>
                {props.tofuType ? 'ร้อน' : 'เย็น'}
            </strong>
            <strong>
                X {props.qty}
            </strong>
        </div>
    )
}

export default OrderListItem