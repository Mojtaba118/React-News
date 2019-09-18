import axios from "axios";

const setHeaderToken=(token)=>{
    axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
};

export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    patch:axios.patch,
    delete:axios.delete,
    setHeaderToken
}
