import React, {Component} from 'react'
import CalculatePrice from './Price'
import OrderListItem from './OrderListItem'

import _ from 'lodash'
function OrderDetail(props) {
    return (
        <div className="order_wrap">
            {props.listQueue.map((item, index) => {
                return (
                    <div key={index} className="order_box">
                        <div className="order_head">
                            <div className="order_number">คิวที่ {index + 1}</div>
                            <div className="edit_order" onClick={e => props.handleEdit(item, index)}>
                                แก้ไข้
                            </div>
                            <div className="delete_order" onClick={e => props.handleRemove(item, index)}>
                                ลบ
                            </div>
                            <div>{'฿ '}
                                 <CalculatePrice order={item} />
                            </div>
                        </div>
                            {
                                Object.keys(item.menuList).length > 1 ?
                                <div className="order_list_item_box">
                                   {
                                    props.editItem.menuList ? 
                                    Object.keys(props.listQueue[props.editItem.orderNumber].menuList).map((subItem, subIndexindex) => {
                                        if(subItem !== 'id'){
                                            if(index === props.editItem.orderNumber){
                                                return (
                                                        <div className="order_list_item"  key={subIndexindex} style={{display: 'flex', fontSize: 13}}>
                                                            {subIndexindex + 1}. <OrderListItem 
                                                                        orderListId={subItem}
                                                                        orderListItem={props.listQueue[props.editItem.orderNumber].menuList[subItem].ingredient} 
                                                                        tofuType={props.listQueue[props.editItem.orderNumber].menuList[subItem].tofuType} 
                                                                        sweetLevel={props.listQueue[props.editItem.orderNumber].menuList[subItem].sweetLevel}
                                                                        qty={props.listQueue[props.editItem.orderNumber].menuList[subItem].qty}/>
                                                        </div>
                                                )
                                            }
                                        }
                                    }) 
                                    : 
                                    null
                                   }
                                   <div>
                                        จำนวน { Object.keys(item.menuList).length - 1  } รายการ
                                    </div>
                                </div>
                                : 
                                null
                            }
                    </div>
                )
            })}
        </div>
    )
}

export default OrderDetail