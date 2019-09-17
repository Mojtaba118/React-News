import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import auth from "../../services/authServices";

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        errors: []
    };

    handleChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value})
    };

    showErrors = (errors) => {
        const allErrors = [];
        if (errors.message === "validation") {
            for (let key in errors.extensions.validation) {
                allErrors.push(errors.extensions.validation[key][0]);
            }
        } else {
            allErrors.push(errors.message);
        }
        this.setState({errors: allErrors});
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {history} = this.props;
        const {name, email, password} = this.state;
        let {data} = await auth.register(name, email, password);
        data = data[0];
        if (data.data && data.data.register) {
            history.replace("/login");
        } else
            this.showErrors(data.errors[0]);
    }

    render() {
        if (auth.authIsValid()){
            location.replace("/admin");
            return null;
        }
        const {name, email, password, errors} = this.state;
        return <React.Fragment>
            <div className="card-header">
                <h5 className="m-0">ثبت نام</h5>
            </div>
            <div className="card-body">
                {errors.length > 0 && <div className="alert alert-danger">
                    <ul className="m-0 p-0">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
                </div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">نام و نام خانوادگی</label>
                        <input onChange={this.handleChange} className="form-control" type="name" id="name" name="name"
                               value={name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">ایمیل</label>
                        <input onChange={this.handleChange} className="form-control" type="email" id="email"
                               name="email" value={email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">رمز عبور</label>
                        <input onChange={this.handleChange} className="form-control" type="password" id="password"
                               name="password" value={password}/>
                    </div>
                    <button className="btn btn-success">ثبت نام</button>
                    <Link to="/login" className="btn btn-primary mr-3">ورود</Link>
                </form>
            </div>
        </React.Fragment>
    }
}

export default Register;
