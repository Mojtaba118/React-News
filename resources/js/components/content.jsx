import React,{Component} from "react";
import { Switch, Redirect} from "react-router-dom";
import Users from "./users";
import AddUser from "./addUser";
import EditUser from "./editUser";
import Articles from "./articles";
import AddArticle from "./addArticle";
import EditArticle from "./editArticle";
import PrivateRoute from "./common/privateRoute";

class Content extends Component{
    render() {
        return (<div className="col-12 col-md-10 pt-3 main">
            <Switch>
                <PrivateRoute path="/admin" exact component={Users}/>
                <PrivateRoute path="/admin/user/add" exact component={AddUser}/>
                <PrivateRoute path="/admin/user/edit/:id" exact component={EditUser}/>
                <PrivateRoute path="/admin/articles" exact component={Articles}/>
                <PrivateRoute path="/admin/article/add" exact component={AddArticle}/>
                <PrivateRoute path="/admin/article/edit/:id" exact component={EditArticle}/>
            </Switch>
        </div>);
    }
}

export default Content;
