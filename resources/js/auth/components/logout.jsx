import React from "react";
import auth from "../../services/authServices";
const Logout = ({history}) => {
    auth.logout();
    history.replace("/login");
    return null;
};

export default Logout;
