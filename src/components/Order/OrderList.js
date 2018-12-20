import React, {Component} from 'react'
import OrderListItem from './OrderListItem'



function OrderList(props){


    function renderCalculatePrice(order) {
        if(Object.keys(order.menuList).length > 1){
            // console.log(Object.keys(order.menuList))
            let sumPrice = 0
            Object.keys(order.menuList).map(item => {
                if(order.menuList[item]){
                    if(Array.isArray(order.menuList[item].ingredient)){
                        if(order.menuList[item].ingredient.length === 1 && order.menuList[item].tofuType){
                            sumPrice += 10 * parseInt(item.qty)
                            return sumPrice
                        //ice soil milk and more than 1 ingredient plus 15 * qty
                        }else if(order.menuList[item].ingredient.length > 0 && !order.menuList[item].tofuType){
                            sumPrice += 15 * parseInt(order.menuList[item].qty)
                            return sumPrice
                        //hot soil milk and more than 1 ingredient plus 15 * qty
                        }else if(order.menuList[item].ingredient.length > 1 && order.menuList[item].tofuType){
                            sumPrice += 15 * parseInt(order.menuList[item].qty)
                            return sumPrice
                        }
                    }else{
                        //hot soil milk plus 7 * qty
                        if(order.menuList[item].tofuType){
                            sumPrice += 7 * parseInt(order.menuList[item].qty)
                            return sumPrice
                        //soil milk plus 12 * qty
                        }else if(!order.menuList[item].tofuType){
                            sumPrice += 12 * parseInt(order.menuList[item].qty)
                            //console.log(sumPrice)
                            return sumPrice
                        }
                    }
                }
            })
            return (
                <span>
                    {sumPrice}
                </span>
            )
        }
    }

    return (
        <div className="order_wrap">
            {props.listQueue.map((item, index) => {
                return (
                    <div key={index} className="order_box">
                        <div className="order_head">
                            <div className="order_number">รายการที่ {index + 1}</div>
                            <div>{'฿ '}
                                 {renderCalculatePrice(item)}
                            </div>
                        </div>
                        <div className="order_list_item">
                            {
                                Object.keys(item.menuList).length > 1 ?
                                Object.keys(item.menuList).map((subItem, index) => {
                                    if(subItem !== 'id'){
                                        return (
                                        <div  key={index} style={{display: 'flex', fontSize: 13}}>
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