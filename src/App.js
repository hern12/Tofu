import React, { Component } from 'react'
import Menus from './components/Menus'
import OrderList from './components/Order/OrderList'
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
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
        name: 'น้อย'
      },
      queue: [],
      currentQueue: -1,
      tofuType: true
    }

    this.onAddQueue = this.onAddQueue.bind(this)
    this.handleItemSelected = this.handleItemSelected.bind(this)
    this.submitMenu = this.submitMenu.bind(this)
    this.handleSweetLevel = this.handleSweetLevel.bind(this)
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
    const {queue, currentQueue, menuName, selectedSweetLevel, tofuType} = this.state
    let findQueue = queue.find(item => item.id === currentQueue)

    //get selected order
    let menuOrder = menuName.filter(item => item.checked)

    let data = {
      ingredient: menuOrder,
      tofuType: tofuType,
      sweetLevel: selectedSweetLevel
    }


    //find current queue
    findQueue.menuList.push(data)

    this.setState({
      queue: this.state.queue
    })

    //clear menu
    menuName.map(m => m.checked = false)
    this.setState({
      menuName: menuName
    })
  }


  onAddQueue() {
    let queueId = 0
    if(this.state.queue.length === 0){
      queueId = 0
    }
    else{
      queueId = this.state.queue[this.state.queue.length-1].id + 1
    }

    const newQueue = {
      id: queueId,
      menuList: []
    }
    this.setState(prevState => ({
      queue: [...prevState.queue, newQueue]
    }))

    this.setState({
      currentQueue: this.state.currentQueue + 1
    })

  }

  render() {
    const {menuName, queue, tofuType, sweetLevel} = this.state
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
            <button onClick={this.submitMenu} className="btn_order">
              สั่ง
            </button>
          </div>
        </div>
        <div className="order"> 
          <div className="order_title">รายการสั่ง</div>
          <OrderList listQueue={queue} />
        </div>
      </div>
    );
  }
}

export default App;
