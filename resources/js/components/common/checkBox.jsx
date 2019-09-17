import React from "react";

const CheckBox = ({name, label, error, checked, onChange}) => {
    return (<div className="form-group">
        <input onChange={onChange} type="checkbox" id={name} name={name}
               checked={checked}/>
        <label className="mx-3" htmlFor={name}>{label}</label>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>)
};

export default CheckBox;

