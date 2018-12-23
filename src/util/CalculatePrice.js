export const calCulatePrice = (order) => {
    let sumPrice = 0
    if(Object.keys(order.menuList).length > 1){
        // console.log(Object.keys(order.menuList))
        Object.keys(order.menuList).map(item => {
            if(order.menuList[item]){
                if(Array.isArray(order.menuList[item].ingredient)){
                    if(order.menuList[item].ingredient.length === 1 && order.menuList[item].tofuType){
                        if(order.menuList[item].ingredient[0].name === 'ทั้งหมด'){
                            sumPrice += 15 * parseInt(order.menuList[item].qty)
                            return sumPrice
                        }else{
                            sumPrice += 10 * parseInt(order.menuList[item].qty)
                            return sumPrice
                        }
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
    }
    return sumPrice
}