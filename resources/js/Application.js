import React, {Component} from 'react';
import NavBar from "./components/common/navBar";
import SideBar from "./components/common/sideBar";
import Content from "./components/content";
import {switchToDarkMode} from "./admin";
import auth from "./services/authServices";

class App extends Component {
    componentDidMount() {
        switchToDarkMode();
    }

    render() {
        if (!auth.authIsValid()){
            location.replace("/not-found");
            return null;
        }
        return (
            <React.Fragment>
                <NavBar/>
                <div className="container-fluid">
                    <div className="row">
                        <SideBar/>
                        <Content/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;


