
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from './Menu'
import Order from './Order'


const AppRouter = (props) => {
    return (
        <Router>
            <div>
                <Route path="/" exact component={Menu} />
                <Route path="/order" exact component={Order} />
            </div>
        </Router>
    )    
}
export default AppRouter