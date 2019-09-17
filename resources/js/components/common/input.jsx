import React from "react";

const Input = ({type, name,label,error,value,onChange}) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input className="form-control" type={type} name={name} id={name} value={value} onChange={onChange}/>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>)
};

export default Input;
