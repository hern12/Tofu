import React, { Component } from 'react'
import Menus from './components/Menus'
import OrderList from './components/Order/OrderList'
import './App.css';
import firebase from 'firebase';

class App extends Component {

  constructor(){
    super()
    let config = {
      apiKey: "AIzaSyBYexSgGHtA99cQimKqWiHeBXqCineu-68",
      authDomain: "tofu-51c07.firebaseapp.com",
      databaseURL: "https://tofu-51c07.firebaseio.com",
      projectId: "tofu-51c07",
      storageBucket: "tofu-51c07.appspot.com",
      messagingSenderId: "165077986550"
    }

    firebase.initializeApp(config)
    this.state = {
      loading: true,
      menuName: [
        {
          id: 1,
          name: 'ถั่วแดง',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          id: 2,
          name: 'พุทรา',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          id: 3,
          name: 'ลูกเดือย',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          id: 4,
          name: 'ข้าวบาร์เลย์',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          id: 5,
          name: 'สาคู',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          id: 6,
          name: 'แมงลัก',
          bgColor: '#ff7f50',
          checked: false
        },
      ],
      sweetLevel: [
        {
          id: 0,
          name: 'ไม่ใส่',
        },
        {
          id: 1,
          name: 'น้อย',
        },
        {
          id: 2,
          name: 'กลาง',
        },
        {
          id: 3,
          name: 'มาก',
        }
      ],
      selectedSweetLevel: {
        id: 0,
        name: 'ไม่ใส่'
      },
      queue: [],
      currentQueue: -1,
      qty: 1,
      tofuType: true
    }

    this.onAddQueue = this.onAddQueue.bind(this)
    this.handleItemSelected = this.handleItemSelected.bind(this)
    this.submitMenu = this.submitMenu.bind(this)
    this.handleSweetLevel = this.handleSweetLevel.bind(this)
    this.handleQty = this.handleQty.bind(this)
  }

  componentDidMount(){
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
          currentQueue: queue[queue.length - 1].id,
          loading: false
        })
      }
    })
    
  }

  handleQty(e){
    this.setState({
      qty: e.target.value
    })
  }

  handleSweetLevel(sweetLevel) {
    this.setState({
      selectedSweetLevel: sweetLevel
    })
  }

  handleItemSelected(menu) {
    const {queue, menuName} = this.state
    if(queue.length === 0){
      return
    }

    let getSelectedMenu = menuName.find(item => item.id === menu.menuItem.id)
    getSelectedMenu.checked = !getSelectedMenu.checked
    this.setState(prevState => ({
      menuName: prevState.menuName
    }))
  }

  submitMenu() {
    const {queue, currentQueue, menuName, selectedSweetLevel, tofuType, qty} = this.state
    if(queue.length > 0){
      //get selected order
      let menuOrder = menuName.filter(item => item.checked)
      let data = {
        ingredient: menuOrder.length > 0 ? menuOrder :  {name: 'น้ำเต้าหู้เปล่า'},
        tofuType: tofuType,
        sweetLevel: selectedSweetLevel,
        qty: qty < 0 ? 1 : qty
      }

      firebase.database().ref('orders/' + currentQueue).push(data)

      //clear menu
      menuName.map(m => m.checked = false)
      this.setState({
        menuName: menuName,
        qty: 1
      })
    }
  }


  onAddQueue() {

    let db = firebase.database().ref('/orders')

    const newQueue = {
      id: ''
    }
    //push new queue to db
    db.push(newQueue)

    //get last add item from firebase
    db.endAt().limitToLast(1).on('value', (snapshot) =>{
      if(snapshot.val()){
        this.setState({
          currentQueue: Object.keys(snapshot.val())[0]
        })
      }
    })
  }

  render() {
    const {menuName, queue, tofuType, sweetLevel, qty, loading} = this.state
    
    return (
      <div className="App">
        <div className="add_q">
          <button className="btn_queue" onClick={this.onAddQueue}>
            Add queue
          </button>
        </div>
        <div className="menu_section">
          <div className="list_menu">
            {menuName.map(m => <Menus key={m.id} menuItem={m} menuSelected={this.handleItemSelected}/>)}
          </div>
          <div className="sweet_level">
            {sweetLevel.map((item, index) => {
              return (
                <div 
                style={{background: item.id === this.state.selectedSweetLevel.id ? '#d63031' : null}}
                key={item.id} 
                onClick={e => this.handleSweetLevel(item)}>
                  {item.name}
                </div>
              )
            })}
          </div>
          <div className="menu_action"> 
            <button onClick={e => this.setState({tofuType: !tofuType})} style={{background: tofuType ? '#ff6b81' : '#74b9ff'}}>
              {tofuType ? 'ร้อน' : 'เย็น'}
            </button>
            <input value={qty} type="number" className="qty" onChange={e => this.handleQty(e)} placeholder="ใส่จำนวน"/>
            <button onClick={this.submitMenu} className="btn_order">
              สั่ง
            </button>
          </div>
        </div>
        <div className="order"> 
          <div className="order_title">รายการสั่ง</div>
          {
            loading ? <div style={{textAlign: 'center'}}>Loading...</div> :  <OrderList listQueue={queue} />
          }
        </div>
      </div>
    );
  }
}

export default App;
