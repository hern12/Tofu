import React, {Component} from 'react' 
import OrderList from './components/Order/OrderList'
import firebase from 'firebase';

class Order extends Component {

    constructor(props) {
        super(props)
        console.log(firebase)
        this.state = {
            queue: [],
            loading: true,
        }
    }

    componentDidMount() {
        let db = firebase.database().ref('orders')
        let queue = []
        db.on('value', snapshot => {
        if(snapshot.val()){
            queue = Object.keys(snapshot.val()).map(item => {
            return {
                id: item,
                menuList: snapshot.val()[item]
            }
            })
            this.setState({
                queue: queue,
                loading: false
            })
        }
        })
    }

    render() {
        const {queue, loading} = this.state
        return (
            <div style={{margin:'0 auto', width: '1000px'}}>
                <h1 style={{textAlign: 'center'}}>
                    รายการสั่ง
                </h1>
                <div className="kitchen_order">
                    {
                        loading ? <div style={{textAlign: 'center'}}>Loading...</div> :  <OrderList listQueue={queue} />
                    }
                </div>
            </div>
        )
    }
}

export default Order