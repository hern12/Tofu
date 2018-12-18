import React, { Component } from 'react';
import Menus from './components/Menus'
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      menuName: [
        {
          name: 'ถั่วแดง',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          name: 'พุดซา',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          name: 'ลูกเดือย',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          name: 'ข่าวบาเล่ย์',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          name: 'สาคู',
          bgColor: '#ff7f50',
          checked: false
        },
        {
          name: 'แมงลัก',
          bgColor: '#ff7f50',
          checked: false
        },
      ],
      queue: []
    }

    this.onAddQueue = this.onAddQueue.bind(this)
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
  }

  render() {
    const {menuName} = this.state
    return (
      <div className="App">
        <div className="add_q">
          <button className="btn_queue" onClick={this.onAddQueue}>
            Add queue
          </button>
        </div>
        <div className="menu_section">
          <div className="list_menu">
            {menuName.map(m => Menus(m))}
          </div>
          <div className="menu_action"> 
            <button style={{background: '#ff6b81'}}>
              เพิ่มทั้งหมด
            </button>
            <button className="btn_order">
              สั่ง
            </button>
          </div>
        </div>
        <div className="order_list"> 
          {this.state.queue.map(item => item.id)}
        </div>
      </div>
    );
  }
}

export default App;
