import React from "react";

const File = ({name, label, error}) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input type="file" className="mx-3" id={name} name={name}/>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>)
};

export default File;

