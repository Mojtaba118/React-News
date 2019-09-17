import jwtDecode from "jwt-decode";
import http from "./httpServices";
import {loginQuery, registerQuery} from "../utils/graphQL";


const tokenKey="rn_token";
const url="/graphql";

const login=(email,password)=>{
    return http.post(url,{
        data:loginQuery(email,password)
    });
};

const register=(name,email,password)=>{
    return http.post(url,{
        data:registerQuery(name,email,password)
    });
};

const logout=()=>{
    localStorage.removeItem(tokenKey);
};

const setToken=jwt=>{
    localStorage.setItem(tokenKey,jwt);
};

const getToken=()=>{
    return localStorage.getItem(tokenKey);
};

const authIsValid=()=>{
    try{
        const tokenInfo=jwtDecode(getToken());
        let now=new Date();
        if (now.getTime()<(tokenInfo.exp*1000))
            return true;
    }catch (e) {
        return false;
    }
    return false;
};


export default {
    login,
    logout,
    register,
    setToken,
    getToken,
    authIsValid
}
