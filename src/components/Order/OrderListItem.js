import React, {Component} from 'react'
import { removeSubItem } from "../../actions";
import { connect } from 'react-redux'

function OrderListItem(props){
    console.log(props)
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
            <strong 
            className="sweet_level" 
            style={{textAlign: 'center', color: 'white', background: '#2d3436', marginLeft: '5px'}}>
                {props.sweetLevel.name}
            </strong>
            <strong
            className="tofu_type" 
            style={{background: props.tofuType === true ? '#ff7675' : '#0984e3', padding: 2, color: 'white'}}>
                {props.tofuType ? 'ร้อน' : 'เย็น'}
            </strong>
            <strong className="qty_item">
                X {props.qty}
            </strong>
            <strong className="remove_item" onClick={e => props.removeSubItem(props.orderListId)}>
                - 
            </strong>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        subItem: state,
    }
  }
  
  
const mapDispatchToProps = dispatch => {
    return {
        removeSubItem: (item) => {
            return dispatch(removeSubItem(item))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListItem)