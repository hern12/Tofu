import React, {Component} from 'react'
import OrderListItem from './OrderListItem'
import CalculatePrice from './Price'


function OrderList(props){
    return (
        <div className="order_wrap">
            {props.listQueue.map((item, index) => {
                return (
                    <div key={index} className="order_box">
                        <div className="order_head">
                            <div className="order_number">รายการที่ {index + 1}</div>
                            <div>{'฿ '}
                                 <CalculatePrice order={item} />
                            </div>
                        </div>
                        <div className="order_list_item_box">
                            {
                                Object.keys(item.menuList).length > 1 ?
                                Object.keys(item.menuList).map((subItem, index) => {
                                    if(subItem !== 'id'){
                                        return (
                                        <div className="order_list_item"  key={index} style={{display: 'flex', fontSize: 13}}>
                                            {index + 1}. <OrderListItem 
                                                        orderListItem={item.menuList[subItem].ingredient} 
                                                        tofuType={item.menuList[subItem].tofuType} 
                                                        sweetLevel={item.menuList[subItem].sweetLevel}
                                                        qty={item.menuList[subItem].qty}/>
                                        </div>
                                        )
                                    }
                                }) 
                                : 
                                null
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default OrderList