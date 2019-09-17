import React from "react";
import {Route} from "react-router-dom";
import auth from "../../services/authServices";



const PrivateRoute=({component:Component,render,...rest})=>{
    return <Route {...rest}
        render={props=>{
                if (!auth.authIsValid()){
                    location.replace("/not-found");
                    return;
                }
                return Component?<Component {...props}/>:render(props);
            }
        }
    />
};

export default PrivateRoute;
