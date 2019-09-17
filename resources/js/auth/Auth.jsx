import React,{Component} from "react";
import {Switch,Route} from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";

class Auth extends Component{
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 mx-auto pt-3">
                    <div className="card">
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/logout" component={Logout}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Auth;
