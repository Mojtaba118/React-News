import React from "react";

const BeautyArea = ({name,label,error,value}) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea name={name} id={name} defaultValue={value}>
        </textarea>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>)
};

export default BeautyArea;
