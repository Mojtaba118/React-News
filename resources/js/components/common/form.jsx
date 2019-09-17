import React, {Component} from "react";
import Joi from "joi-browser";
import Input from "./input";
import CheckBox from "./checkBox";
import File from "./file";
import BeautyArea from "./beautyArea";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };
    schema = {};

    validateProperty = ({name, value}) => {
        if (!this.schema[name]) return null;
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    validate = () => {
        const data={...this.state.data};
        for (let i in data){
            if (!this.schema[i]) delete data[i];
        }
        const options = { abortEarly: false };
        const result=Joi.validate(data,this.schema,options);
        if (!result.error) return null;
        const errors={};
        for (let error of result.error.details)
            errors[error.path[0]]=error.message;
        return Object.keys(errors)===0?null:errors;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.state.data};
        data[input.name] = input.type === "checkbox" ? input.checked : input.value;
        this.setState({data, errors});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors:errors||{}});
        if (errors) return;
        this.doSubmit(e);
    };

    renderInput = (name, label, type = "text") => {
        let value = this.state.data[name];
        let error = this.state.errors[name];
        return <Input
            type={type}
            name={name}
            label={label}
            onChange={this.handleChange}
            value={value}
            error={error}
        />
    };

    renderBeautyArea = (name, label,value="") => {
        let error = this.state.errors[name];
        return <BeautyArea
            name={name}
            label={label}
            value={value}
            error={error}
        />
    };

    renderCheckBox = (name, label) => {
        let checked = this.state.data[name];
        let error = this.state.errors[name];
        return <CheckBox
            name={name}
            label={label}
            checked={checked}
            error={error}
            onChange={this.handleChange}
        />
    };

    renderFile = (name, label) => {
        let error = this.state.errors[name];
        return <File
            name={name}
            label={label}
            error={error}
        />
    };

    renderButton = (label, type = "submit") => {
        return <button disabled={this.validate()} type={type} className="btn btn-success">{label}</button>
    };
}

export default Form;
