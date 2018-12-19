import React, {Component} from 'react'

function OrderListItem(props){
    console.log(props)
    //console.log(props.orderListItem, props.orderListItem[props.orderListItem.length - 1])
    return (
        <div className="order_item_box">
            <div className="order_item">
                {props.orderListItem.length > 1 ? 
                    <div>
                        {props.orderListItem.map((item, index) => (
                            <span key={item.id}>{item.name}{index < props.orderListItem.length - 1  ? ', ' : ''}</span>
                        ))}
                    </div>
                    :
                    'เต้าหู้เปล่า'
                }
            </div>
            <strong style={{textAlign: 'center', color: 'white', background: '#2d3436', marginLeft: '5px'}}>
                {props.sweetLevel.name}
            </strong>
            <strong 
            style={{background: props.tofuType === true ? '#ff7675' : '#0984e3', padding: 2, color: 'white'}}>
                {props.tofuType ? 'ร้อน' : 'เย็น'}
            </strong>
        </div>
    )
}

export default OrderListItem