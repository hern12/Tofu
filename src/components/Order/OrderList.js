import React, {Component} from 'react'
import OrderListItem from './OrderListItem'


function OrderList(props){
    function renderCalculatePrice(menuList) {
        let sumPrice = 0
        menuList.map(item => {
            if(item.length === 1 && item[0].tofuType === 'ร้อน'){
                return sumPrice += 7
            }else if(item.length === 1 && item[0].tofuType === 'เย็น'){
                return sumPrice += 12
            }else if(item.length === 2 && item[item.length - 1].tofuType === 'ร้อน'){
                return sumPrice += 12
            }else if(item.length > 1 && item[item.length - 1].tofuType === 'เย็น'){
                return sumPrice += 15
            }else if(item.length > 2 && item[item.length - 1].tofuType === 'ร้อน'){
                return sumPrice += 15
            }
        })

        return (
            <span>
                {sumPrice}
            </span>
        )
    }

    return (
        <div className="order_wrap">
            {props.listQueue.map(item => {
                console.log(item)
                return (
                    <div key={item.id} className="order_box">
                        <div className="order_head">
                            <div className="order_number">รายการที่ {item.id}</div>
                            <div>{'฿ '}
                                 {/* {renderCalculatePrice(item.menuList)} */}
                            </div>
                        </div>
                        <div className="order_list_item">
                            {
                                item.menuList.length > 0 ? 
                                item.menuList.map((subItem, index) => {
                                    return (
                                    <div  key={index} style={{display: 'flex', fontSize: 13}}>
                                        {index + 1}. <OrderListItem 
                                                      orderListItem={subItem.ingredient} 
                                                      tofuType={subItem.tofuType} 
                                                      sweetLevel={subItem.sweetLevel}/>
                                    </div>
                                    )
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