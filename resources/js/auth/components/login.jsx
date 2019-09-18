import React,{Component} from "react";
import {Link} from "react-router-dom";
import auth from "../../services/authServices";
import axios from "axios";

class Login extends Component{
    state={
        email:"",
        password:"",
        errors:[]
    }

    handleChange=({currentTarget:input})=>{
        this.setState({[input.name]:input.value});
    }

    showErrors=(errors)=>{
        const allErrors=[];
        if(errors.message==="validation"){
            for (let key in errors.extensions.validation){
                allErrors.push(errors.extensions.validation[key][0]);
            }
        }else{
            allErrors.push(errors.message);
        }
        this.setState({errors:allErrors});
    };

    handleSubmit=async (e)=>{
        e.preventDefault();
        const {email,password}=this.state;
        let {data}=await auth.login(email,password);
        data=data[0];
        if (data.data && data.data.login){
            auth.setToken(data.data.login.token);
            window.location="/admin";
        }else
            this.showErrors(data.errors[0]);
    };
    render() {
        if (auth.authIsValid()){
            location.replace("/admin");
            return null;
        }
        const {email,password,errors}=this.state;
        return <React.Fragment>
            <div className="card-header">
                <h5 className="m-0">ورود</h5>
            </div>
            <div className="card-body">
                {errors.length>0 && <div className="alert alert-danger">
                    <ul className="m-0 p-0">{errors.map((e,i)=><li key={i}>{e}</li>)}</ul>
                </div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">ایمیل</label>
                        <input onChange={this.handleChange} className="form-control" type="email" id="email" name="email" value={email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">رمز عبور</label>
                        <input onChange={this.handleChange} className="form-control" type="password" id="password" name="password" value={password}/>
                    </div>
                    <button className="btn btn-success">ورود</button>
                    <Link to="/register" className="btn btn-primary mr-3">ثبت نام</Link>
                </form>
            </div>
        </React.Fragment>
    }
}

export default Login;
