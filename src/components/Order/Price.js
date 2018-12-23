import React from 'react'
import {calCulatePrice} from '../../util/CalculatePrice'

function CalculatePrice(props) {
    const {order} = props
    let sumPrice = calCulatePrice(order)
    return (
        <span>
            {sumPrice}
        </span>
    )
}

export default CalculatePrice